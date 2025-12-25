'use client';

import { useState, useEffect } from 'react';

type TranslationKeys = {
  navigation: {
    home: string;
    about: string;
    experience: string;
    skills: string;
    education: string;
    contact: string;
    cv: string;
  };
  home: {
    title: string;
    subtitle: string;
    description: string;
    techStack: string;
    contactMe: string;
    viewExperience: string;
    viewCV: string;
  };
  about: {
    title: string;
    subtitle: string;
    description: string;
    experience: string;
    years: string;
    projects: string;
    clients: string;
    technologies: string;
  };
  experience: {
    title: string;
    subtitle: string;
    mudbathNextjs: {
      title: string;
      period: string;
      project: string;
      tech: string;
      cicd: string;
      achievements: string[];
    };
    mudbathReactNative: {
      title: string;
      period: string;
      project: string;
      tech: string;
      cicd: string;
      achievements: string[];
    };
    mudbathLaravel: {
      title: string;
      period: string;
      project: string;
      tech: string;
      cicd: string;
      achievements: string[];
    };
    mudbathETL: {
      title: string;
      period: string;
      project: string;
      tech: string;
      cicd: string;
      achievements: string[];
    };
  };
  skills: {
    title: string;
    subtitle: string;
    frameworks: string;
    languages: string;
    tools: string;
  };
  education: {
    title: string;
    subtitle: string;
    education: string;
    degree: string;
    school: string;
    period: string;
    location: string;
    description: string;
    achievements: string;
    gpa: string;
    projects: string;
    certifications: string;
    reactCert: {
      name: string;
      issuer: string;
      date: string;
      description: string;
    };
    awsCert: {
      name: string;
      issuer: string;
      date: string;
      description: string;
    };
    tsCert: {
      name: string;
      issuer: string;
      date: string;
      description: string;
    };
    philosophy: string;
    continuousLearning: string;
    continuousLearningDesc: string;
    practicalApplication: string;
    practicalApplicationDesc: string;
  };
  contact: {
    title: string;
    subtitle: string;
    description: string;
    getInTouch: string;
    email: string;
    phone: string;
    github: string;
    linkedin: string;
    location: string;
    locationValue: string;
    availability: string;
    availabilityValue: string;
    responseTime: string;
    responseTimeValue: string;
    preferredContact: string;
    preferredContactValue: string;
    thankYou: string;
    lookingForward: string;
  };
  cv: {
    title: string;
    backToPortfolio: string;
    downloadCV: string;
    loading: string;
    error: string;
    downloadPDF: string;
    navigation: string;
    navigationGuide: string;
    navigationTips: string[];
    downloadGuide: string;
    downloadDesc: string;
    previous: string;
    next: string;
    page: string;
    of: string;
  };
  footer: {
    rights: string;
    builtWith: string;
    quickLinks: string;
    contactInfo: string;
    followMe: string;
  };
};

const useTranslation = () => {
  const [translations, setTranslations] = useState<TranslationKeys | null>(null);
  const [locale, setLocale] = useState<string>('en');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if we're on client side
    if (typeof window === 'undefined') {
      // Server-side: load default translations
      const loadDefaultTranslations = async () => {
        try {
          const translationModule = await import('../locales/en.json');
          setTranslations(translationModule.default);
          setIsLoading(false);
        } catch (error) {
          console.error('Error loading default translations:', error);
          setIsLoading(false);
        }
      };
      loadDefaultTranslations();
      return;
    }

    // Client-side: get locale from localStorage
    const savedLocale = localStorage.getItem('locale') || 'en';
    setLocale(savedLocale);
    
    // Load translations
    const loadTranslations = async () => {
      try {
        setIsLoading(true);
        const translationModule = await import(`../locales/${savedLocale}.json`);
        setTranslations(translationModule.default);
      } catch (error) {
        console.error('Error loading translations:', error);
        // Fallback to English
        try {
          const fallbackModule = await import('../locales/en.json');
          setTranslations(fallbackModule.default);
        } catch (fallbackError) {
          console.error('Error loading fallback translations:', fallbackError);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, []);

  const t = (key: string): string => {
    if (!translations) return key;
    
    const keys = key.split('.');
    let value: unknown = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  const changeLanguage = (newLocale: string) => {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem('locale', newLocale);
    setLocale(newLocale);
    
    // Reload translations
    const loadTranslations = async () => {
      try {
        setIsLoading(true);
        const translationModule = await import(`../locales/${newLocale}.json`);
        setTranslations(translationModule.default);
      } catch (error) {
        console.error('Error loading translations:', error);
        // Fallback to English
        try {
          const fallbackModule = await import('../locales/en.json');
          setTranslations(fallbackModule.default);
        } catch (fallbackError) {
          console.error('Error loading fallback translations:', fallbackError);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  };

  return {
    t,
    locale,
    changeLanguage,
    translations,
    isLoading
  };
};

export default useTranslation;
