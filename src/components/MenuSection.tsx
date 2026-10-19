import React from 'react';
import '../pages/MenuPage.css';

interface MenuSectionProps {
  onNavigate?: (sectionId: string) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = () => (
  <section id="menu" className="menu-page w-full relative pt-8 sm:pt-12 pb-28 sm:pb-36 lg:pb-44" dir="rtl">
    <div className="menu-catalog-content">
      <div id="menu-poster" className="menu-replacement">
        <img src="/images/menu-coming-soon.png" alt="قريباً ترقبوا — هاجس، قهوة وأكثر" />
      </div>
    </div>
  </section>
);
