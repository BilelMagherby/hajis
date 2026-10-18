import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  CakeSlice,
  Coffee,
  CupSoda,
  House,
  Leaf,
  Package,
  ShoppingBag,
  X
} from 'lucide-react';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import { menuCategories, type MenuCategory, type MenuItem } from '../data/menu';
import './MenuPage.css';

interface MenuPageProps {
  onNavigate: (sectionId: string) => void;
  onOpenCookieSettings: () => void;
}

const brandedDrinkIds = new Set([
  'espresso-double-shot', 'macchiato', 'cortado', 'flat-white',
  'cappuccino', 'latte', 'coffee-of-the-day-drip', 'americano', 'matcha-hot', 'v60-hot',
  'alfredo', 'iced-americano', 'iced-latte', 'v60-iced', 'matcha-iced', 'cold-hibiscus',
  'cold-coffee-of-the-day'
]);

const getCategoryIcon = (categoryId: string) => {
  switch (categoryId) {
    case 'cold-drinks': return CupSoda;
    case 'desserts': return CakeSlice;
    case 'coffee-beans': return ShoppingBag;
    case 'drip-bags': return Package;
    case 'tea-syrups': return Leaf;
    default: return Coffee;
  }
};

const ProductCard: React.FC<{
  category: MenuCategory;
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
}> = ({ category, item, onSelect }) => (
  <article className="menu-product-card">
    <button
      type="button"
      className={`menu-product-photo${category.id === 'hot-drinks' || category.id === 'cold-drinks' ? ' menu-product-photo--branded' : ''}`}
      onClick={() => onSelect({ ...item, image: item.image || category.image })}
      aria-label={`عرض تفاصيل ${item.nameAr}`}
    >
      <img src={item.image || category.image} alt="" loading="lazy" />
    </button>
    <div className="menu-product-copy" dir="rtl">
      <div className="menu-product-heading">
        <div className="menu-product-names">
          <h3>{item.nameAr}</h3>
        </div>
      </div>
    </div>
  </article>
);

const CategorySection: React.FC<{
  category: MenuCategory;
  onSelect: (item: MenuItem) => void;
  featured?: boolean;
}> = ({ category, onSelect, featured = false }) => {
  const Icon = getCategoryIcon(category.id);

  return (
    <section
      id={category.id}
      dir="rtl"
      className={`menu-category-section${featured ? ' menu-category-section--featured' : ''}`}
      aria-labelledby={`${category.id}-title`}
    >
      <header className="menu-category-heading" dir="rtl">
        <span className="menu-category-icon"><Icon aria-hidden="true" /></span>
        <div className="menu-category-title-wrap">
          <h2 id={`${category.id}-title`}>{category.titleAr}</h2>
        </div>
        <span className="menu-category-rule" aria-hidden="true" />
      </header>
      <p className="menu-category-description">{category.descriptionAr}</p>
      <div className="menu-product-grid">
        {category.items.map((item) => (
          <ProductCard key={item.id} category={category} item={item} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
};

export const MenuPage: React.FC<MenuPageProps> = ({ onNavigate, onOpenCookieSettings }) => {
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const drinks = menuCategories.slice(0, 2);
  const moreCategories = menuCategories.slice(2);

  useEffect(() => {
    if (!selectedProduct) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedProduct(null);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedProduct]);

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
            <a href="#hot-drinks" className="menu-hero-link">
              اكتشف القائمة <ArrowLeft aria-hidden="true" />
            </a>
          </div>
        </section>

        <div className="menu-catalog-content">
          <div className="menu-featured-groups">
            {drinks.map((category) => (
              <CategorySection key={category.id} category={category} onSelect={setSelectedProduct} featured />
            ))}
          </div>

          <aside className="menu-story-banner" dir="rtl">
            <div>
              <span>هاجس قهوة مختصة</span>
              <h2>كل كوب يحكي قصة</h2>
              <p>لحظات متوازنة، ونكهات نحضّرها لك بعناية.</p>
            </div>
            <a href="#desserts" aria-label="اكتشف الحلويات">
              <ArrowLeft aria-hidden="true" />
            </a>
          </aside>

          <div className="menu-more-categories">
            {moreCategories.map((category) => (
              <CategorySection key={category.id} category={category} onSelect={setSelectedProduct} />
            ))}
          </div>

          <div className="menu-foodics-wrapper">
            <a
              href="https://hajiss.foodics.online/menu/-337793"
              target="_blank"
              rel="noopener noreferrer"
              className="menu-foodics-cta"
              dir="rtl"
              title="للإطلاع على القائمة الإلكترونية"
            >
              <span className="menu-foodics-cta__text">
                للإطلاع على القائمة الإلكترونية
              </span>
              <div className="menu-foodics-cta__qr">
                <img src="/images/foodics-menu-qr.png" alt="رمز QR للقائمة الإلكترونية" />
              </div>
            </a>
          </div>
        </div>
      </main>

      <Footer onNavigate={onNavigate} onOpenCookieSettings={onOpenCookieSettings} />

      <nav className="menu-mobile-dock" aria-label="تنقل سريع">
        <button type="button" onClick={() => onNavigate('hero')}>
          <House aria-hidden="true" /><span>الرئيسية</span>
        </button>
        <a href="#hot-drinks" aria-current="page">
          <Coffee aria-hidden="true" /><span>المشروبات</span>
        </a>
        <a href="#desserts">
          <CakeSlice aria-hidden="true" /><span>الحلويات</span>
        </a>
        <button type="button" onClick={() => onNavigate('v60')}>
          <Leaf aria-hidden="true" /><span>التقطير</span>
        </button>
      </nav>

      {selectedProduct && (
        <div
          className="menu-product-dialog-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget) setSelectedProduct(null);
          }}
        >
          <section
            className="menu-product-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="menu-product-dialog-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="menu-product-dialog-close"
              onClick={() => setSelectedProduct(null)}
              aria-label="إغلاق تفاصيل المنتج"
            >
              <X aria-hidden="true" />
            </button>
            <img
              className={brandedDrinkIds.has(selectedProduct.id) ? 'menu-product-dialog-image--branded' : undefined}
              src={selectedProduct.image || '/images/main_cafe.jpg'}
              alt={selectedProduct.nameAr}
            />
            <div className="menu-product-dialog-copy" dir="rtl">
              <h2 id="menu-product-dialog-title">{selectedProduct.nameAr}</h2>
              <p>{selectedProduct.descriptionAr}</p>
              {selectedProduct.notes && <p>ملاحظات التذوق: {selectedProduct.notes}</p>}
              {selectedProduct.tags && selectedProduct.tags.length > 0 && (
                <ul>{selectedProduct.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
