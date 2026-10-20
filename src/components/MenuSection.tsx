import React from 'react';
import '../pages/MenuPage.css';

interface MenuSectionProps {
  onNavigate?: (sectionId: string) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = () => (
  <section id="menu" className="menu-page w-full relative pb-[4cm]" dir="rtl">
    <div
      id="menu-poster"
      className="menu-replacement"
    >
      <img src="/images/menu-coming-soon.png" alt="قريباً ترقبوا — هاجس، قهوة وأكثر" />
    </div>
  </section>
);
