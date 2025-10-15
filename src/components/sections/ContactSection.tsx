'use client';

import { useEffect, useState } from 'react';
import { useTranslationContext } from '../TranslationProvider';

// Type definition for reCAPTCHA Enterprise
interface GrecaptchaEnterprise {
  ready: (callback: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
}

interface WindowWithGrecaptcha extends Window {
  grecaptcha: {
    enterprise: GrecaptchaEnterprise;
  };
}

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslationContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('contact');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  // Check reCAPTCHA loading status
  useEffect(() => {
    const checkRecaptcha = () => {
      if (typeof window !== 'undefined' && (window as unknown as WindowWithGrecaptcha).grecaptcha) {
        const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
        
        if (!siteKey) {
          setRecaptchaError('reCAPTCHA site key not configured');
          return;
        }

        try {
          (window as unknown as WindowWithGrecaptcha).grecaptcha.enterprise.ready(() => {
            setRecaptchaLoaded(true);
            setRecaptchaError(null);
            console.log('reCAPTCHA Enterprise loaded successfully');
          });
        } catch (error) {
          setRecaptchaError('Failed to load reCAPTCHA Enterprise');
          console.error('reCAPTCHA loading error:', error);
        }
      } else {
        // Retry after a short delay
        setTimeout(checkRecaptcha, 1000);
      }
    };

    checkRecaptcha();
  }, []);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if reCAPTCHA is ready
    if (!recaptchaLoaded) {
      setSubmitStatus('error');
      setRecaptchaError('reCAPTCHA is not ready. Please wait and try again.');
      return;
    }

    if (recaptchaError) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setRecaptchaError(null);

    try {
      // Execute reCAPTCHA Enterprise with better error handling
      const token = await new Promise<string>((resolve, reject) => {
        const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
        
        if (!siteKey) {
          reject(new Error('reCAPTCHA site key not configured'));
          return;
        }

        if (typeof window !== 'undefined' && (window as unknown as WindowWithGrecaptcha).grecaptcha) {
          (window as unknown as WindowWithGrecaptcha).grecaptcha.enterprise.ready(async () => {
            try {
              console.log('Executing reCAPTCHA with site key:', siteKey);
              const recaptchaToken = await (window as unknown as WindowWithGrecaptcha).grecaptcha.enterprise.execute(
                siteKey,
                { action: 'CONTACT_FORM' }
              );
              console.log('reCAPTCHA token generated successfully');
              resolve(recaptchaToken);
            } catch (error) {
              console.error('reCAPTCHA execution error:', error);
              reject(error);
            }
          });
        } else {
          reject(new Error('reCAPTCHA not loaded'));
        }
      });

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken: token,
        }),
      });

      await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Handle specific reCAPTCHA errors
      if (error instanceof Error) {
        if (error.message.includes('Invalid site key')) {
          setRecaptchaError('Invalid reCAPTCHA site key. Please check your configuration.');
        } else if (error.message.includes('not loaded')) {
          setRecaptchaError('reCAPTCHA is not loaded. Please refresh the page.');
        } else if (error.message.includes('not configured')) {
          setRecaptchaError('reCAPTCHA site key is not configured.');
        } else {
          setRecaptchaError(`reCAPTCHA error: ${error.message}`);
        }
      }
      
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
        setRecaptchaError(null);
      }, 5000);
    }
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email",
      value: "thanhtruongdn@gmail.com",
      link: "mailto:thanhtruongdn@gmail.com"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "Điện thoại",
      value: "(+84) 382 848 272",
      link: "tel:+84382848272"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Địa chỉ",
      value: "Đà Nẵng, Việt Nam",
      link: "#"
    }
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/thomas-pham-617855312/",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5V5c0-2.761-2.239-5-5-5zm-10.75 19h-3V9h3v10zm-1.5-11.268c-.966 0-1.75-.805-1.75-1.732 0-.926.784-1.732 1.75-1.732s1.75.806 1.75 1.732c0 .927-.784 1.732-1.75 1.732zm14.25 11.268h-3v-5.604c0-1.366-.027-3.124-1.904-3.124-1.906 0-2.196 1.493-2.196 3.027v5.701h-3V9h2.879v1.367h.041c.401-.758 1.387-1.559 2.854-1.559 3.052 0 3.617 2.008 3.617 4.617V19z"/>
        </svg>
      )
    },
    {
      name: "GitHub",
      url: "https://github.com/Pham-Thanh-Truong/",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/thisistruong/",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
        </svg>
      )
    }
    // {
    //   name: "Portfolio",
    //   url: "https://onlyfansthomasdev.netlify.app/",
    //   icon: (
    //     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    //     </svg>
    //   )
    // }
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-6">
                  {t('contact.contactInfo')}
                </h3>
                <p className="text-muted-foreground mb-8">
                  {t('contact.description')}
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    className="flex items-center space-x-4 p-4 bg-card rounded-lg border border-border hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{info.title}</h4>
                      <p className="text-muted-foreground">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-4">
                  {t('contact.followMe')}
                </h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card rounded-lg border border-border p-8">
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                {t('contact.sendMessage')}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      {t('contact.fullName')} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                      placeholder={t('contact.fullNamePlaceholder')}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      {t('contact.email')} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                      placeholder={t('contact.emailPlaceholder')}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    {t('contact.subject')} *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                    placeholder={t('contact.subjectPlaceholder')}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    {t('contact.message')} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground resize-none"
                    placeholder={t('contact.messagePlaceholder')}
                  />
                </div>

                       <button
                         type="submit"
                         disabled={isSubmitting || !recaptchaLoaded || !!recaptchaError}
                         className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-medium hover:bg-primary/90 focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                       >
                         {isSubmitting ? t('contact.sending') : 
                          !recaptchaLoaded ? 'Loading reCAPTCHA...' : 
                          recaptchaError ? 'reCAPTCHA Error' : 
                          t('contact.send')}
                       </button>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                    {t('contact.success')}
                  </div>
                )}

                       {recaptchaError && (
                         <div className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg">
                           <strong>reCAPTCHA Error:</strong> {recaptchaError}
                         </div>
                       )}

                       {submitStatus === 'error' && !recaptchaError && (
                         <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                           {t('contact.error')}
                         </div>
                       )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
