import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { LanguageContext, type Language } from './language';

const STORAGE_KEY = 'hajiss-language';

const meta = {
  ar: {
    title: 'هاجس | مقهى القهوة المختصة في حائل',
    description: 'هاجس مقهى متخصص في القهوة المختصة في حائل، حيث تلتقي جودة القهوة بدفء المكان وروح الضيافة.',
  },
  en: {
    title: 'Hajiss | Specialty Coffee Café in Hail',
    description: 'Hajiss is a specialty coffee café in Hail, where great coffee meets a warm place and genuine hospitality.',
  },
} as const;

const readStoredLanguage = (): Language => {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'ar';
  } catch {
    return 'ar';
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(readStoredLanguage);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = language;
    root.dir = language === 'en' ? 'ltr' : 'rtl';
    document.title = meta[language].title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta[language].description);
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Private mode / blocked storage: the choice simply isn't remembered.
    }
  }, [language]);

  const toggleLanguage = useCallback(() => setLanguage((current) => (current === 'ar' ? 'en' : 'ar')), []);

  const value = useMemo(() => ({
    language,
    dir: language === 'en' ? 'ltr' as const : 'rtl' as const,
    isEnglish: language === 'en',
    setLanguage,
    toggleLanguage,
    t: (ar: string, en: string) => (language === 'en' ? en : ar),
  }), [language, toggleLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
