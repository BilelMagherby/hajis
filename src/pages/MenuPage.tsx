import React from 'react';
import {
  House,
  MapPin
} from 'lucide-react';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import { useLanguage } from '../i18n/language';
import './MenuPage.css';

interface MenuPageProps {
  onNavigate: (sectionId: string) => void;
  onOpenCookieSettings: () => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({ onNavigate, onOpenCookieSettings }) => {
  const { t, dir } = useLanguage();

  return (
    <div className="menu-page" dir={dir}>
      <Navbar onNavigate={onNavigate} activeSection="menu" variant="menu" />

      <main>
        <div
          id="menu-poster"
          className="menu-replacement"
        >
          <img
          src={t('/images/menu-coming-soon.jpg', '/images/menu-coming-soon-en.jpg')}
          alt={t('قريباً ترقبوا — هاجس، قهوة وأكثر', 'Stay tuned — Hajiss Coffee, more than a taste')}
        />
        </div>
      </main>

      <Footer onNavigate={onNavigate} onOpenCookieSettings={onOpenCookieSettings} />

      <nav className="menu-mobile-dock" aria-label={t('تنقل سريع', 'Quick navigation')}>
        <button type="button" onClick={() => onNavigate('hero')}>
          <House aria-hidden="true" /><span>{t('الرئيسية', 'Home')}</span>
        </button>
        <button type="button" onClick={() => onNavigate('visit')}>
          <MapPin aria-hidden="true" /><span>{t('زيارة هاجس', 'Visit Hajiss')}</span>
        </button>
      </nav>
    </div>
  );
};
