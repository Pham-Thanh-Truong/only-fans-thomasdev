import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { RecaptchaEnterpriseServiceClient } from '@google-cloud/recaptcha-enterprise';

const resend = new Resend(process.env.RESEND_API_KEY || 'dummy-key-for-build');

/**
 * Create an assessment to analyze the risk of a UI action.
 * Based on Google Cloud reCAPTCHA Enterprise documentation
 */
async function createAssessment({
  projectID = process.env.GOOGLE_CLOUD_PROJECT_ID || "my-project-onlyfans",
  recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6Lc9GOsrAAAAAIK48eUomlAPBW96z99GCupAotrf",
  token = "action-token",
  recaptchaAction = "CONTACT_FORM",
}) {
  // Create the reCAPTCHA client
  const client = new RecaptchaEnterpriseServiceClient();
  const projectPath = client.projectPath(projectID);

  // Build the assessment request
  const request = {
    assessment: {
      event: {
        token: token,
        siteKey: recaptchaKey,
      },
    },
    parent: projectPath,
  };

  const [response] = await client.createAssessment(request);

  // Check if the token is valid
  if (!response.tokenProperties?.valid) {
    console.log(`The CreateAssessment call failed because the token was: ${response.tokenProperties?.invalidReason}`);
    return null;
  }

  // Check if the expected action was executed
  if (response.tokenProperties?.action === recaptchaAction) {
    // Get the risk score and the reason(s)
    console.log(`The reCAPTCHA score is: ${response.riskAnalysis?.score}`);
    if (response.riskAnalysis?.reasons) {
      response.riskAnalysis.reasons.forEach((reason) => {
        console.log(reason);
      });
    }

    return response.riskAnalysis?.score;
  } else {
    console.log("The action attribute in your reCAPTCHA tag does not match the action you are expecting to score");
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'dummy-key-for-build') {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { name, email, subject, message, recaptchaToken } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA token
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification required' },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA Enterprise using Google Cloud client
    try {
      const riskScore = await createAssessment({
        projectID: process.env.GOOGLE_CLOUD_PROJECT_ID,
        recaptchaKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        token: recaptchaToken,
        recaptchaAction: "CONTACT_FORM",
      });

      if (riskScore === null) {
        return NextResponse.json(
          { error: 'reCAPTCHA verification failed' },
          { status: 400 }
        );
      }

      // Optional: Check risk score threshold (0.0 to 1.0, higher is better)
      if (riskScore !== undefined && riskScore < 0.5) {
        console.log(`reCAPTCHA risk score too low: ${riskScore}`);
        return NextResponse.json(
          { error: 'reCAPTCHA verification failed - low risk score' },
          { status: 400 }
        );
      }

      console.log(`reCAPTCHA verification successful with score: ${riskScore}`);
    } catch (recaptchaError) {
      console.error('reCAPTCHA Enterprise error:', recaptchaError);
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed' },
        { status: 400 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL || 'thanhtruongdn@gmail.com'],
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #495057; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
            <h3 style="color: #495057; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 8px; font-size: 14px; color: #6c757d;">
            <p><strong>Sent from:</strong> Portfolio Contact Form</p>
            <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Email sent successfully', id: data?.id },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
