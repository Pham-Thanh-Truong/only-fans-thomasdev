'use client';

import { useEffect, useState } from 'react';
import { useTranslationContext } from '../TranslationProvider';

const AboutSection = () => {
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

    const element = document.getElementById('about');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('about.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Content */}
          <div className="space-y-6">
            <div>
              <p className="text-muted-foreground leading-relaxed">
                {t('about.description')}
              </p>
            </div>

            {/* Key Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-foreground">3+ năm kinh nghiệm</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-foreground">Frontend, Mobile & Backend</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-foreground">React, React Native, Next.js & Laravel</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-foreground">TypeScript, JavaScript & PHP</span>
              </div>
            </div>
          </div>

          {/* Stats/Info Cards */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-lg border border-border text-center">
                <div className="text-3xl font-bold text-primary mb-2">3+</div>
                <div className="text-muted-foreground">{t('about.stats.yearsExperience')}</div>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border text-center">
                <div className="text-3xl font-bold text-primary mb-2">6+</div>
                <div className="text-muted-foreground">{t('about.stats.completedProjects')}</div>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border text-center">
                <div className="text-3xl font-bold text-primary mb-2">5+</div>
                <div className="text-muted-foreground">{t('about.stats.mainTechnologies')}</div>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border text-center">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-muted-foreground">{t('about.stats.qualityCommitment')}</div>
              </div>
            </div>

            {/* Personal Info */}
            <div className="bg-card p-6 rounded-lg border border-border">
              <h4 className="text-lg font-semibold text-foreground mb-4">{t('about.personalInfo.title')}</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  {/* Keep age dynamic but add ability to hardcode if needed in future */}
                  <span className="text-muted-foreground">{t('about.personalInfo.age')}:</span>
                  <span className="text-foreground">{new Date().getFullYear() - 2001}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground">{t('about.personalInfo.address')}:</span>
                  <span className="text-foreground text-right">{t('about.personalInfo.addressValue')}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground">{t('about.personalInfo.email')}:</span>
                  <span className="text-foreground break-all text-right">thanhtruongdn@gmail.com</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground">{t('about.personalInfo.phone')}:</span>
                  <span className="text-foreground text-right">(+84) 382 848 272</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
