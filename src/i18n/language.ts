import { createContext, useContext } from 'react';

export type Language = 'ar' | 'en';

export interface LanguageContextValue {
  language: Language;
  dir: 'rtl' | 'ltr';
  isEnglish: boolean;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  /** Picks the copy for the active language: t('مرحبا', 'Welcome'). */
  t: (ar: string, en: string) => string;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);

export const useLanguage = () => {
  const value = useContext(LanguageContext);
  if (!value) throw new Error('useLanguage must be used inside <LanguageProvider>.');
  return value;
};
