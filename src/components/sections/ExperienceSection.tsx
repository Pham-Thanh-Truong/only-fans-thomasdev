'use client';

import { useEffect, useState } from 'react';

const ExperienceSection = () => {
  const [isVisible, setIsVisible] = useState(false);

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
      title: "Next.js Developer",
      company: "Mudbath",
      period: "May 2024 - July 2024",
      location: "New South Wales, Australia",
      project: "MYO (https://myomunchee.com/)",
      tech: ["TypeScript", "MUI", "Contentful", "Cloudflare", "LearnWorlds", "BigCommerce"],
      cicd: "AWS",
      responsibilities: [
        "Implemented pixel-perfect frontend components",
        "Integrated dynamic content with Contentful CMS",
        "Collaborated with design and marketing teams"
      ]
    },
    {
      title: "React Native Developer",
      company: "Mudbath",
      period: "Feb 2024 - May 2024",
      location: "New South Wales, Australia",
      project: "Milieulabs (https://dev-installer.milieulabs.com.au/)",
      tech: ["TypeScript", "ReactJs", "Serverless", "AWS IOT Core", "AWS Lambda Function", "AWS API Gateway", "AWS DynamoDB", "AWS Cognito"],
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
      tech: ["PHP", "JavaScript", "VueJs", "Contentful", "Algolia"],
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
      tech: ["TypeScript", "React Native", "Redux", "Redux Thunk", "Azure Functions", "Contentful"],
      cicd: "AppVeyor",
      responsibilities: [
        "Configured and managed Contentful webhooks for triggering Azure Functions that generate JSON files containing view models",
        "Customized for different languages",
        "Optimized the performance of ETL functions to ensure the efficient and timely delivery of localized content to end-users"
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Kinh Nghiệm Làm Việc
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hành trình phát triển nghề nghiệp và các dự án đã tham gia
          </p>
        </div>

        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {exp.title}
                    </h3>
                    <div className="text-primary font-medium mb-2">
                      {exp.company}
                    </div>
                    <div className="text-muted-foreground text-sm mb-2">
                      {exp.period} • {exp.location}
                    </div>
                    <div className="text-sm text-muted-foreground mb-4">
                      <strong>Dự án:</strong> {exp.project}
                    </div>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-foreground mb-2">Công nghệ sử dụng:</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CI/CD */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-foreground mb-2">CI/CD:</h4>
                  <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium">
                    {exp.cicd}
                  </span>
                </div>

                {/* Responsibilities */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Trách nhiệm:</h4>
                  <ul className="space-y-1">
                    {exp.responsibilities.map((resp, respIndex) => (
                      <li key={respIndex} className="text-sm text-muted-foreground flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {resp}
                      </li>
                    ))}
                  </ul>
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
