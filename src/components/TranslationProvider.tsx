'use client';

import { createContext, useContext, ReactNode } from 'react';
import useTranslation from '@/hooks/useTranslation';

interface TranslationContextType {
  t: (key: string) => string;
  locale: string;
  changeLanguage: (locale: string) => void;
  isLoading: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider = ({ children }: TranslationProviderProps) => {
  const translation = useTranslation();

  return (
    <TranslationContext.Provider value={translation}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslationContext = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslationContext must be used within a TranslationProvider');
  }
  return context;
};
