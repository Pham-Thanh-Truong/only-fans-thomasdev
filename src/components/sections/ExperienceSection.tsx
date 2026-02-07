'use client';

import { useEffect, useState } from 'react';
import { useTranslationContext } from '../TranslationProvider';

const ExperienceSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslationContext();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('experience');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const experiences = [
    {
      title: "NestJs Developer",
      company: "ICT Global Solutions",
      period: "Oct 2025 - Present",
      location: "Da Nang, Viet Nam",
      project: "Let Share",
      tech: ["NestJS", "TypeScript", "MongoDB", "Docker", "Redis", "Firebase", "SocketIO"],
      cicd: "AWS",
      responsibilities: [
        "Build endpoint according to project design",
        "Build chat feature with SocketIo"
      ]
    },
    {
      title: "Voip Developer",
      company: "ICT Global Solutions",
      period: "Mar 2025 - Oct 2025",
      location: "Da Nang, Viet Nam",
      project: "Octopush",
      tech: ["Docker", "MySQL", "EC2", "FreePBX", "Asterisk", "Sinch", "Telnyx", "Atlas"],
      cicd: "AWS",
      responsibilities: [
        "Research and deploy voip sip system",
        "Embed phone call sdk into Flutter and React Native mobile apps",
        "Deploy a callback server system to manage calls"
      ]
    },
    {
      title: "Full-stack Developer",
      company: "ICT Global Solutions",
      period: "July 2024 - Mar 2025",
      location: "Da Nang, Viet Nam",
      project: "Enrol (https://profile.enrol.ch/)",
      tech: ["Yii", "AngularJs", "MySQL", "PHP", "Javascript", "Payrexx", "Cloudflare"],
      cicd: "Google Cloud",
      responsibilities: [
        "Built dashboard summaries aggregating key information across academic terms/seasons",
        "Developed drag-and-drop features for scheduling and organizing class timetables",
        "Implemented payment functionality and automated subdomain provisioning"
      ]
    },
    {
      title: "NextJs Developer",
      company: "Mudbath",
      period: "May 2024 - July 2024",
      location: "New South Wales, Australia",
      project: "MYO (https://myomunchee.com/)",
      tech: ["Next.js", "TypeScript", "MUI", "Contentful", "Cloudflare", "LearnWorlds", "BigCommerce"],
      cicd: "AWS",
      responsibilities: [
        "Implemented pixel-perfect frontend components",
        "Integrated dynamic content with Contentful CMS",
        "Collaborated with design and marketing teams"
      ]
    },
    {
      title: "ReactJs Developer",
      company: "Mudbath",
      period: "Feb 2024 - May 2024",
      location: "New South Wales, Australia",
      project: "Milieulabs (https://dev-installer.milieulabs.com.au/)",
      tech: ["ReactJs", "TypeScript", "Serverless", "AWS IOT Core", "AWS Lambda", "API Gateway", "DynamoDB", "Cognito"],
      cicd: "AWS",
      responsibilities: [
        "Migrate UI from Aurelia to ReactJs",
        "Update API endpoint and lambda function"
      ]
    },
    {
      title: "Laravel Developer",
      company: "Mudbath",
      period: "Sep 2023 - Feb 2024",
      location: "New South Wales, Australia",
      project: "Landers & Rogers (https://landers.com.au/)",
      tech: ["Laravel", "PHP", "JavaScript", "VueJs", "Contentful", "Algolia"],
      cicd: "Docker, Azure",
      responsibilities: [
        "Migration from Laravel 7 to 9 & Contentful version",
        "Resolve Docker pipeline and Docker problems, address cybersecurity issues, and fix sitemap issues",
        "Adjust UI post-migration"
      ]
    },
    {
      title: "ETL Developer",
      company: "Mudbath",
      period: "Oct 2023 - Nov 2023",
      location: "New South Wales, Australia",
      project: "DSI mobile app (Ground Support)",
      tech: ["React Native", "TypeScript", "Redux", "Redux Thunk", "Azure Functions", "Contentful"],
      cicd: "AppVeyor",
      responsibilities: [
        "Configured and managed Contentful webhooks for triggering Azure Functions that generate JSON files containing view models",
        "Customized for different languages",
        "Optimized the performance of ETL functions to ensure the efficient and timely delivery of localized content to end-users"
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 mb-4 inline-block">
            {t('experience.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('experience.subtitle')}
          </p>
        </div>

        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative space-y-12">
            {/* Timeline Line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-blue-500/30 to-transparent md:left-1/2 md:-ml-0.5 hidden md:block"></div>

            {experiences.map((exp, index) => (
              <div key={index} className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center`}>

                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background transform -translate-x-2 md:-translate-x-2 mt-6 z-10 hidden md:block"></div>

                {/* Content Card */}
                <div className={`w-full md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}>
                  <div className="group relative bg-card/80 backdrop-blur-sm border-l-4 border-l-primary/70 rounded-r-2xl rounded-l-md p-6 shadow-sm hover:shadow-xl transition-all duration-300">

                    {/* Floating Glow Effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500 -z-10"></div>

                    {/* Header */}
                    <div className="flex flex-col mb-4">
                      <div className="flex lg:flex-row flex-col lg:justify-between lg:items-start items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {exp.title}
                        </h3>
                        <span className="text-xs font-semibold px-2 py-1 bg-primary/10 text-primary rounded-full whitespace-nowrap lg:ml-2 mt-2 lg:mt-0">
                          {exp.period}
                        </span>
                      </div>

                      <div className="flex justify-between items-center w-full mt-1">
                        <div className="text-base font-semibold text-muted-foreground">
                          {exp.company}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground/80 flex items-center mt-1">
                        <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {exp.location}
                      </div>
                    </div>

                    {/* Project Link */}
                    <div className="mb-4">
                      <div className="inline-flex items-center px-3 py-1.5 rounded-md bg-muted/60 border border-border/50 text-sm">
                        <span className="font-semibold mr-1.5 text-foreground/80">Project:</span>
                        <code className="text-primary font-medium">{exp.project}</code>
                      </div>
                    </div>

                    {/* Responsibilities */}
                    <div className="space-y-3 mb-5">
                      <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide opacity-80">
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-2">
                        {exp.responsibilities.map((resp, respIndex) => (
                          <li key={respIndex} className="text-sm text-muted-foreground flex items-start group-hover:text-foreground/80 transition-colors">
                            <span className="w-1.5 h-1.5 bg-primary/60 rounded-full mt-1.5 mr-2.5 flex-shrink-0 group-hover:bg-primary transition-colors"></span>
                            <span className="leading-relaxed">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech & CI/CD */}
                    <div className="pt-4 border-t border-border/40 space-y-3">
                      <div>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.tech.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className={`px-2 py-0.5 rounded text-[11px] font-medium border ${['NestJS', 'Next.js', 'ReactJs', 'Laravel', 'React Native'].includes(tech)
                                ? 'bg-primary/10 text-primary border-primary/20'
                                : 'bg-muted text-muted-foreground border-border'
                                }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center text-xs">
                        <span className="font-semibold text-muted-foreground mr-2">CI/CD:</span>
                        <span className="px-2 py-0.5 bg-secondary/50 text-secondary-foreground rounded border border-secondary">
                          {exp.cicd}
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
