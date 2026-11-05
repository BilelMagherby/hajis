import React from 'react';
import '../pages/MenuPage.css';
import { useLanguage } from '../i18n/language';

interface MenuSectionProps {
  onNavigate?: (sectionId: string) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = () => {
  const { t, dir } = useLanguage();

  return (
    <section id="menu" className="menu-page w-full relative sm:pb-[4cm]" dir={dir}>
      <div
        id="menu-poster"
        className="menu-replacement"
      >
        <img
          src={t('/images/menu-coming-soon.jpg', '/images/menu-coming-soon-en.jpg')}
          alt={t('قريباً ترقبوا — هاجس، قهوة وأكثر', 'Stay tuned — Hajiss Coffee, more than a taste')}
        />
      </div>
    </section>
  );
};
