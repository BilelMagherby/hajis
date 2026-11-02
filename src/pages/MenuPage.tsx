import React from 'react';
import {
  House,
  Leaf
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
          <img src="/images/menu-coming-soon.png" alt={t('قريباً ترقبوا — هاجس، قهوة وأكثر', 'Coming soon — Hajiss, coffee and more')} />
        </div>
      </main>

      <Footer onNavigate={onNavigate} onOpenCookieSettings={onOpenCookieSettings} />

      <nav className="menu-mobile-dock" aria-label={t('تنقل سريع', 'Quick navigation')}>
        <button type="button" onClick={() => onNavigate('hero')}>
          <House aria-hidden="true" /><span>{t('الرئيسية', 'Home')}</span>
        </button>
        <button type="button" onClick={() => onNavigate('v60')}>
          <Leaf aria-hidden="true" /><span>{t('التقطير', 'Pour-over')}</span>
        </button>
      </nav>
    </div>
  );
};
