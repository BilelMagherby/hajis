import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavigate?: (sectionId: string) => void;
  onAdminAccess?: () => void;
  enableAdminShortcut?: boolean;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  onAdminAccess,
  enableAdminShortcut = false,
  activeSection
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const logoClickCount = React.useRef(0);
  const logoClickTimer = React.useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', labelAr: 'الرئيسية' },
    { id: 'about', labelAr: 'من نحن' },
    { id: 'philosophy', labelAr: 'ماذا يميّزنا' },
    { id: 'menu', labelAr: 'القائمة' },
    { id: 'v60', labelAr: 'خدمات التقطير' },
    { id: 'visit', labelAr: 'زيارة هاجس' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleBrandClick = () => {
    handleLinkClick('hero');
    if (!enableAdminShortcut || !onAdminAccess) return;

    logoClickCount.current += 1;
    if (logoClickTimer.current) window.clearTimeout(logoClickTimer.current);

    if (logoClickCount.current >= 5) {
      logoClickCount.current = 0;
      onAdminAccess();
      return;
    }

    logoClickTimer.current = window.setTimeout(() => {
      logoClickCount.current = 0;
      logoClickTimer.current = null;
    }, 2200);
  };

  useEffect(() => () => {
    if (logoClickTimer.current) window.clearTimeout(logoClickTimer.current);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 border-b transition-all duration-500 ${
          isScrolled
            ? 'border-[rgb(var(--color-brand-sand-rgb)_/_0.25)] bg-[rgb(var(--color-brand-black-rgb)_/_0.85)] backdrop-blur-md shadow-lg shadow-black/40 py-2'
            : 'border-[rgb(var(--color-brand-sand-rgb)_/_0.15)] bg-[rgb(var(--color-brand-black-rgb)_/_0.75)] backdrop-blur-md shadow-none py-2'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between -translate-y-2">
          {/* LEFT: HAJISS BRAND LOGO */}
          <button
            type="button"
            onClick={handleBrandClick}
            aria-label="العودة إلى الرئيسية"
            className="flex items-center cursor-pointer group bg-transparent border-0 p-0"
          >
            <div className="w-28 sm:w-36 flex items-center justify-center p-1 transition-transform group-hover:scale-105">
              <img
                src="/images/logo.png"
                alt="شعار هاجس"
                className="brand-logo-warm w-full h-auto object-contain"
              />
            </div>
          </button>

          {/* CENTER: DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10" aria-label="القائمة الرئيسية">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                aria-current={activeSection === link.id ? 'page' : undefined}
                className={`visual-button relative inline-flex items-center py-1 font-arabic text-sm font-medium transition-colors tracking-wide group ${
                  activeSection === link.id ? 'text-[var(--color-brand-sand)]' : 'text-[rgb(var(--color-brand-linen-rgb)_/_0.9)] hover:text-[var(--color-brand-sand)]'
                }`}
              >
                {link.labelAr}
                {/* Sand Underline Animation */}
                <span className={`absolute bottom-0 right-0 h-[2px] bg-gradient-to-l from-[var(--color-brand-sand)] to-[var(--color-brand-sand)] transition-all duration-300 ${
                  activeSection === link.id ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </button>
            ))}
          </nav>

          {/* MOBILE HAMBURGER BUTTON */}
          <div className="flex lg:hidden items-center space-x-3 space-x-reverse">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="visual-icon-control rounded-full text-[var(--color-brand-linen)] hover:text-[var(--color-brand-sand)] focus:outline-none"
              aria-label="فتح وإغلاق القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 flex flex-col bg-[rgb(var(--color-brand-black-rgb)_/_0.95)] px-6 pt-24 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col space-y-5 text-right">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                aria-current={activeSection === link.id ? 'page' : undefined}
                className={`visual-button w-full font-arabic text-xl py-2 border-b border-[var(--color-brand-chocolate)] text-right ${
                  activeSection === link.id ? 'text-[var(--color-brand-sand)]' : 'text-[var(--color-brand-linen)] hover:text-[var(--color-brand-sand)]'
                }`}
              >
                {link.labelAr}
              </button>
            ))}
          </div>

        </div>
      )}
    </>
  );
};
