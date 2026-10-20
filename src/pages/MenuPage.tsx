import React from 'react';
import {
  House,
  Leaf
} from 'lucide-react';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import './MenuPage.css';

interface MenuPageProps {
  onNavigate: (sectionId: string) => void;
  onOpenCookieSettings: () => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({ onNavigate, onOpenCookieSettings }) => {
  return (
    <div className="menu-page" dir="rtl">
      <Navbar onNavigate={onNavigate} activeSection="menu" variant="menu" />

      <main>
        <div
          id="menu-poster"
          className="menu-replacement"
        >
          <img src="/images/menu-coming-soon.png" alt="قريباً ترقبوا — هاجس، قهوة وأكثر" />
        </div>
      </main>

      <Footer onNavigate={onNavigate} onOpenCookieSettings={onOpenCookieSettings} />

      <nav className="menu-mobile-dock" aria-label="تنقل سريع">
        <button type="button" onClick={() => onNavigate('hero')}>
          <House aria-hidden="true" /><span>الرئيسية</span>
        </button>
        <button type="button" onClick={() => onNavigate('v60')}>
          <Leaf aria-hidden="true" /><span>التقطير</span>
        </button>
      </nav>
    </div>
  );
};
