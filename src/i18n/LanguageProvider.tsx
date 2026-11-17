import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { LanguageContext, type Language } from './language';
import { setAnalyticsLanguage } from '../utils/analytics';

const STORAGE_KEY = 'hajiss-language';

const meta = {
  ar: {
    title: 'هاجس | مقهى القهوة المختصة في حائل',
    description: 'من أصالة الضيافة الحائلية إلى عالم القهوة المختصة، تبدأ حكاية هاجس. في قلب مدينة حائل، يجمع المقهى بين دفء التراث وشغف الإتقان، ليقدم تجربة تتجاوز حدود المذاق. هنا، تتحول العناية بالتفاصيل إلى لحظات مميزة، ويصبح كل كوب حكاية تستحق أن تُروى.',
  },
  en: {
    title: 'HAJISS | Specialty Coffee Shop in Hail',
    description: 'Hajiss is a specialty coffee shop founded in Hail, offering a distinctive coffee experience that blends authentic local hospitality with modern roasting and brewing standards.',
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
    setAnalyticsLanguage(language);
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
