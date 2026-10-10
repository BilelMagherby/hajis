import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, MoveHorizontal, X } from 'lucide-react';
import type { MenuBookPage as MenuBookPageData, MenuItem } from '../data/menu';
import { menuBookPages } from '../data/menu';
import { Navbar } from '../components/Navbar';
import './MenuBookPage.css';

interface MenuBookPageProps {
  onNavigate: (sectionId: string) => void;
}

type TurnDirection = 'next' | 'previous';

const findPage = (pageNumber: number): MenuBookPageData => {
  const page = menuBookPages.find((entry) => entry.id === pageNumber);
  if (!page) {
    throw new Error(`Menu book page ${pageNumber} is missing.`);
  }
  return page;
};

const BookLeaf: React.FC<{
  page: MenuBookPageData;
  side: 'left' | 'right';
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  onPointerDown?: React.PointerEventHandler<HTMLElement>;
  onPointerUp?: React.PointerEventHandler<HTMLElement>;
  onSelectItem?: (item: MenuItem) => void;
}> = ({ page, side, className = '', onClick, onKeyDown, onPointerDown, onPointerUp, onSelectItem }) => {
  if (page.type === 'cover') {
    return (
      <article
        className={`book-leaf book-cover-leaf book-cover-leaf--${side} ${className}`}
        onClick={onClick}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        aria-label="غلاف قائمة هاجس"
      >
        <div className="cover-emboss" aria-hidden="true" />
      </article>
    );
  }

  if (page.type === 'closing') {
    return (
      <article className={`book-leaf book-closing-leaf ${className}`}>
        <img src="/images/logo.png" alt="شعار هاجس" />
        <h2>قهوتك... طقسك... مكانك.</h2>
        <span>حائل — المملكة العربية السعودية</span>
      </article>
    );
  }

  return (
    <article
      className={`book-leaf book-menu-leaf book-menu-leaf--${side} ${className}`}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      dir="rtl"
    >
      <header className="leaf-heading">
        <div>
          <h2>{page.titleAr}</h2>
        </div>
      </header>

      <div className="leaf-items">
        {page.items.map((item) => (
          <button
            className="leaf-item"
            key={item.id}
            type="button"
            onClick={() => onSelectItem?.({ ...item, image: item.image || page.image })}
            aria-label={`عرض تفاصيل ${item.nameAr}`}
          >
            <img
              className="leaf-item-image"
              src={item.image || page.image}
              alt=""
              loading="lazy"
            />
            <div className="leaf-item-copy">
              <div className="leaf-item-title">
                <div>
                  <h3>{item.nameAr}</h3>
                </div>
                <span className="leaf-item-price">{item.price}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

    </article>
  );
};

export const MenuBookPage: React.FC<MenuBookPageProps> = ({
  onNavigate
}) => {
  const [pageNumber, setPageNumber] = useState(2);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [turnDirection, setTurnDirection] = useState<TurnDirection>('next');
  const [isTurning, setIsTurning] = useState(false);
  const [flippingPage, setFlippingPage] = useState<MenuBookPageData | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const dragStartX = useRef<number | null>(null);
  const turnTimer = useRef<number | null>(null);
  const pageCommitTimer = useRef<number | null>(null);
  const preloadedImages = useRef<HTMLImageElement[]>([]);
  const totalPages = menuBookPages.length;
  const leftPage = findPage(pageNumber);
  const rightPage = findPage(pageNumber + 1);
  const displayedPageNumber = isBookOpen ? pageNumber : 1;

  const openBook = () => {
    if (isBookOpen || isOpening) return;
    setIsOpening(true);
    const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 80 : 1600;
    turnTimer.current = window.setTimeout(() => {
      setIsBookOpen(true);
      setIsOpening(false);
      turnTimer.current = null;
    }, delay);
  };

  const turnPage = useCallback((direction: TurnDirection) => {
    if (!isBookOpen || isTurning) return;
    const nextNumber = pageNumber + (direction === 'next' ? 1 : -1);
    if (nextNumber < 2 || nextNumber >= totalPages) return;

    setTurnDirection(direction);
    setFlippingPage(direction === 'next' ? rightPage : leftPage);
    setIsTurning(true);
    const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 80 : 1200;
    pageCommitTimer.current = window.setTimeout(() => {
      setPageNumber(nextNumber);
      pageCommitTimer.current = null;
    }, Math.min(140, delay / 2));
    turnTimer.current = window.setTimeout(() => {
      setIsTurning(false);
      setFlippingPage(null);
      turnTimer.current = null;
    }, delay);
  }, [isBookOpen, isTurning, leftPage, pageNumber, rightPage, totalPages]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      if ((event.target as HTMLElement).closest('input, textarea, select, [contenteditable="true"]')) return;
      event.preventDefault();
      turnPage(event.key === 'ArrowRight' ? 'next' : 'previous');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [turnPage]);

  useEffect(() => () => {
    if (turnTimer.current) window.clearTimeout(turnTimer.current);
    if (pageCommitTimer.current) window.clearTimeout(pageCommitTimer.current);
  }, []);

  useEffect(() => {
    const imageUrls = new Set(
      menuBookPages.flatMap((page) =>
        page.type === 'menu' ? page.items.map((item) => item.image || page.image) : []
      )
    );

    preloadedImages.current = Array.from(imageUrls, (url) => {
      const image = new Image();
      image.decoding = 'async';
      image.src = url;
      return image;
    });
  }, []);

  const handlePointerMove: React.PointerEventHandler<HTMLElement> = (event) => {
    if (event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    setTilt({ x: -y * 4, y: x * 5 });
  };

  const handlePointerDown: React.PointerEventHandler<HTMLElement> = (event) => {
    if (event.target instanceof Element && event.target.closest('.leaf-item')) {
      dragStartX.current = null;
      return;
    }
    dragStartX.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerUp: React.PointerEventHandler<HTMLElement> = (event) => {
    if (dragStartX.current === null) return;
    const delta = event.clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(delta) < 46) return;
    turnPage(delta < 0 ? 'next' : 'previous');
  };

  const handlePointerLeave = () => {
    dragStartX.current = null;
    setTilt({ x: 0, y: 0 });
  };

  const handleOutsideBookClick: React.MouseEventHandler<HTMLElement> = (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest('.book-frame, .book-controls, .book-side-navigation, .book-swipe-hint, .product-detail-backdrop')) return;
    if (isBookOpen) {
      setIsBookOpen(false);
      setIsTurning(false);
      setFlippingPage(null);
      if (turnTimer.current) window.clearTimeout(turnTimer.current);
      if (pageCommitTimer.current) window.clearTimeout(pageCommitTimer.current);
    }
  };

  useEffect(() => {
    if (!selectedProduct) return;

    const handleModalKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedProduct(null);
    };

    window.addEventListener('keydown', handleModalKeyDown);
    return () => window.removeEventListener('keydown', handleModalKeyDown);
  }, [selectedProduct]);

  return (
    <div className="menu-book-experience" dir="rtl">
      <div
        className="menu-book-backdrop"
        style={{ transform: `translate3d(${tilt.y * -1}px, ${tilt.x * -1}px, 0) scale(1.04)` }}
        aria-hidden="true"
      />
      <div className="menu-book-vignette" aria-hidden="true" />
      <div className="menu-book-grain" aria-hidden="true" />

      <Navbar
        onNavigate={onNavigate}
        activeSection="menu"
      />

      <main className="menu-book-main" onClick={handleOutsideBookClick}>
        <div className="menu-book-scene">
          <div
            className={`book-frame ${isBookOpen ? 'book-frame--open' : ''} ${isOpening ? 'book-frame--opening' : ''}`}
            style={{ transform: `perspective(1800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
          >
            <div className="book-block" aria-label="كتاب قائمة هاجس التفاعلي">
              <div className="book-page-stack" aria-hidden="true" />
              <div className="book-spine" aria-hidden="true" />
              <div className="book-spread">
                <BookLeaf
                  page={leftPage}
                  side="left"
                  className="book-leaf-static"
                  onPointerDown={handlePointerDown}
                  onPointerUp={handlePointerUp}
                  onSelectItem={setSelectedProduct}
                />
                <BookLeaf
                  page={rightPage}
                  side="right"
                  className="book-leaf-static"
                  onPointerDown={handlePointerDown}
                  onPointerUp={handlePointerUp}
                  onSelectItem={setSelectedProduct}
                />
                <BookLeaf
                  page={findPage(1)}
                  side="right"
                  className={`book-front-cover ${isOpening ? 'book-front-cover--opening' : ''} ${isBookOpen ? 'book-front-cover--open' : ''}`}
                  onClick={openBook}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      openBook();
                    }
                  }}
                  onPointerDown={handlePointerDown}
                  onPointerUp={handlePointerUp}
                />
                {isTurning && (
                  <BookLeaf
                    page={flippingPage ?? (turnDirection === 'next' ? rightPage : leftPage)}
                    side={turnDirection === 'next' ? 'right' : 'left'}
                    className={`book-page-flip book-page-flip--${turnDirection}`}
                    onPointerDown={handlePointerDown}
                    onPointerUp={handlePointerUp}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <nav className={`book-side-navigation ${isBookOpen ? 'book-side-navigation--open' : ''}`} aria-label="التنقل بالسهمين">
          <button
            type="button"
            className="book-side-button book-side-button--left"
            onClick={() => turnPage('next')}
            disabled={!isBookOpen || pageNumber >= totalPages - 1 || isTurning}
            aria-label="الصفحة التالية"
            title="الصفحة التالية"
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <button
            type="button"
            className="book-side-button book-side-button--right"
            onClick={() => turnPage('previous')}
            disabled={!isBookOpen || pageNumber <= 2 || isTurning}
            aria-label="الصفحة السابقة"
            title="الصفحة السابقة"
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </nav>

        <nav className="book-controls" aria-label="التنقل بين صفحات القائمة">
          <button
            type="button"
            className="book-control-button"
            onClick={() => turnPage('previous')}
            disabled={!isBookOpen || pageNumber <= 2 || isTurning}
            aria-label="الصفحة السابقة"
          >
            <ChevronRight aria-hidden="true" />
            <span>السابق</span>
          </button>

          <div className="book-pagination" aria-live="polite">
            <span className="book-page-count">{String(displayedPageNumber).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}</span>
            <div className="book-progress" aria-label={`الصفحة ${displayedPageNumber} من ${totalPages}`}>
              <span>01</span>
              <div className="book-progress-track">
                <span style={{ width: `${((displayedPageNumber - 1) / (totalPages - 1)) * 100}%` }} />
              </div>
              <span>{String(totalPages).padStart(2, '0')}</span>
            </div>
          </div>

          <button
            type="button"
            className="book-control-button"
            onClick={() => turnPage('next')}
            disabled={!isBookOpen || pageNumber >= totalPages - 1 || isTurning}
            aria-label="الصفحة التالية"
          >
            <span>التالي</span>
            <ChevronLeft aria-hidden="true" />
          </button>
        </nav>

        {!isBookOpen && (
          <p className={`book-open-prompt ${isOpening ? 'book-open-prompt--opening' : ''}`}>
            {isOpening ? 'تُفتح القائمة...' : 'اضغط على الغلاف لفتح القائمة'}
          </p>
        )}

        <div className="book-swipe-hint" aria-hidden="true">
          <MoveHorizontal />
          <span>استخدم الأسهم للتنقل</span>
        </div>

        {selectedProduct && (
          <div
            className="product-detail-backdrop"
            onClick={(event) => {
              if (event.target === event.currentTarget) setSelectedProduct(null);
            }}
          >
            <section
              className="product-detail-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="product-detail-title"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="product-detail-close"
                onClick={() => setSelectedProduct(null)}
                aria-label="إغلاق تفاصيل المنتج"
              >
                <X aria-hidden="true" />
              </button>
              <img
                className="product-detail-image"
                src={selectedProduct.image || '/images/main_cafe.jpg'}
                alt={selectedProduct.nameAr}
              />
              <div className="product-detail-copy">
                <h2 id="product-detail-title">{selectedProduct.nameAr}</h2>
                <span className="product-detail-price">{selectedProduct.price}</span>
                <p>{selectedProduct.descriptionAr}</p>
                {selectedProduct.notes && (
                  <p className="product-detail-notes">ملاحظات التذوق: {selectedProduct.notes}</p>
                )}
                {selectedProduct.tags && selectedProduct.tags.length > 0 && (
                  <ul className="product-detail-tags" aria-label="خصائص المنتج">
                    {selectedProduct.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                )}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
};
