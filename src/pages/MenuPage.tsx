import React from 'react';
import {
  ArrowLeft,
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
        <section className="menu-hero" aria-labelledby="menu-page-title">
          <div className="menu-hero-image" aria-hidden="true" />
          <div className="menu-hero-copy" dir="rtl">
            <span className="menu-hero-eyebrow">قائمة المشروبات</span>
            <h1 id="menu-page-title">نكهات مختارة<br />لتجربة استثنائية</h1>
            <p>من حبوب مختارة، نحضّر لك كل كوب بعناية.</p>
            <a href="#menu-poster" className="menu-hero-link">
              اكتشف القائمة <ArrowLeft aria-hidden="true" />
            </a>
          </div>
        </section>

        <div className="menu-catalog-content">
          <div id="menu-poster" className="menu-replacement">
            <img src="/images/menu-coming-soon.png" alt="قريباً ترقبوا — هاجس، قهوة وأكثر" />
          </div>
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
