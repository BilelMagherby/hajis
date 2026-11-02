import React from 'react';
import '../pages/MenuPage.css';
import { useLanguage } from '../i18n/language';

interface MenuSectionProps {
  onNavigate?: (sectionId: string) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = () => {
  const { t, dir } = useLanguage();

  return (
    <section id="menu" className="menu-page w-full relative pb-[4cm]" dir={dir}>
      <div
        id="menu-poster"
        className="menu-replacement"
      >
        <img src="/images/menu-coming-soon.png" alt={t('قريباً ترقبوا — هاجس، قهوة وأكثر', 'Coming soon — Hajiss, coffee and more')} />
      </div>
    </section>
  );
};
