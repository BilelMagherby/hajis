import React, { useState } from 'react';
import { useLanguage } from '../i18n/language';
import './LanguageToggle.css';

interface LanguageToggleProps {
  /** `light` matches the cream navbar on the menu page. */
  variant?: 'dark' | 'light';
}

/**
 * Coffee-cup language switch: the cup (seen from above, with the active language
 * drawn as latte art) rolls across the track, the crema stirs and a few beans pop.
 */
export const LanguageToggle: React.FC<LanguageToggleProps> = ({ variant = 'dark' }) => {
  const { t, isEnglish, toggleLanguage } = useLanguage();
  const [switchCount, setSwitchCount] = useState(0);

  const handleClick = () => {
    toggleLanguage();
    setSwitchCount((count) => count + 1);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      dir="ltr"
      aria-label={t('Switch to English', 'التبديل إلى العربية')}
      title={t('English', 'العربية')}
      className={`coffee-lang-toggle coffee-lang-toggle--${variant} ${isEnglish ? 'is-en' : ''}`}
    >
      <span className="coffee-lang-track" aria-hidden="true">
        <span className="coffee-lang-label" lang="ar">ع</span>
        <span className="coffee-lang-label" lang="en">EN</span>

        <span className="coffee-lang-thumb">
          <span className="coffee-lang-steam">
            <i />
            <i />
            <i />
          </span>

          <span className="coffee-lang-cup">
            {/* Re-keyed on every switch so the stir animation replays. */}
            <span key={`crema-${switchCount}`} className={`coffee-lang-crema ${switchCount ? 'is-stirring' : ''}`} />
            <span className="coffee-lang-art" lang={isEnglish ? 'en' : 'ar'}>
              {isEnglish ? 'EN' : 'ع'}
            </span>
          </span>

          {switchCount > 0 && (
            <span key={`beans-${switchCount}`} className="coffee-lang-beans">
              <i />
              <i />
              <i />
              <i />
            </span>
          )}
        </span>
      </span>
    </button>
  );
};
