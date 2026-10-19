import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  CakeSlice,
  Coffee,
  CupSoda,
  Leaf,
  Package,
  X
} from 'lucide-react';
import { menuCategories, type MenuCategory, type MenuItem } from '../data/menu';
import '../pages/MenuPage.css';

interface MenuSectionProps {
  onNavigate?: (sectionId: string) => void;
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

export const MenuSection: React.FC<MenuSectionProps> = ({ onNavigate: _onNavigate }) => {
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
    <section id="menu" className="menu-page w-full relative pt-8 sm:pt-12 pb-28 sm:pb-36 lg:pb-44" dir="rtl">
      <div>
        <div className="menu-catalog-content">
          <div className="menu-featured-groups">
            {drinks.map((category) => (
              <CategorySection key={category.id} category={category} onSelect={setSelectedProduct} featured />
            ))}
          </div>

          <aside className="menu-story-banner" dir="rtl">
            <div>
              <span>هاجس — قهوة مختصة</span>
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
      </div>

      {selectedProduct && (
        <div
          className="menu-product-dialog-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget) setSelectedProduct(null);
          }}
        >
          <div
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
          </div>
        </div>
      )}
    </section>
  );
};
