'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslationContext } from '../TranslationProvider';

const HomeSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslationContext();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Profile Image */}
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden shadow-lg ring-4 ring-primary/20">
              <Image
                src="/assets/profile_2.jpg"
                alt="Pham Thanh Truong"
                width={128}
                height={128}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>

          {/* Main Content */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              {t('home.title')}
            </h1>
            <h2 className="text-xl md:text-2xl text-primary mb-4 font-semibold">
              {t('home.subtitle')}
            </h2>

            {/* Tech Stack */}
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-3">{t('home.techStack')}</p>
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {['React', 'Next.js', 'TypeScript', 'React Native', 'Node.js', 'Laravel'].map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-accent text-accent-foreground rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                {t('home.contactMe')}
              </a>
              <a
                href="#experience"
                className="inline-flex items-center px-6 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-accent transition-colors"
              >
                {t('home.viewExperience')}
              </a>
              <a
                href="/cv"
                className="inline-flex items-center px-6 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-accent transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {t('home.viewCV')}
              </a>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg
              className="w-6 h-6 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
