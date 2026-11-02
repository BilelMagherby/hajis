import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../i18n/language';
import { LanguageToggle } from './LanguageToggle';

interface NavbarProps {
  onNavigate?: (sectionId: string) => void;
  onAdminAccess?: () => void;
  enableAdminShortcut?: boolean;
  activeSection?: string;
  inFlow?: boolean;
  variant?: 'default' | 'menu';
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  onAdminAccess,
  enableAdminShortcut = false,
  activeSection,
  inFlow = false,
  variant = 'default'
}) => {
  const { t } = useLanguage();
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
    { id: 'hero', label: t('الرئيسية', 'Home') },
    { id: 'about', label: t('من نحن', 'About') },
    { id: 'menu', label: t('القائمة', 'Menu') },
    { id: 'news', label: t('مستجدات هاجس', 'Hajiss News') },
    { id: 'visit', label: t('زيارة هاجس', 'Visit Hajiss') },
  ];
  const isMenuVariant = variant === 'menu';

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
        className={`${
          inFlow
            ? 'sticky top-0 h-16'
            : `fixed top-0 left-0 right-0 ${isScrolled ? 'py-2' : 'py-1'}`
        } z-40 border-b shadow-lg ${isMenuVariant
          ? 'border-[rgb(var(--color-brand-chocolate-rgb)_/_0.12)] bg-[#F5F0E8] shadow-black/5'
          : 'border-[rgb(var(--color-brand-sand-rgb)_/_0.2)] bg-[#2B180E] shadow-black/20'}`}
      >
        <div className={`max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between ${inFlow ? '' : '-translate-y-2'}`}>
          {/* LEFT: HAJISS BRAND LOGO */}
          <button
            type="button"
            onClick={handleBrandClick}
            aria-label={t('العودة إلى الرئيسية', 'Back to home')}
            className="flex items-center cursor-pointer group bg-transparent border-0 p-0"
          >
            <div className="w-24 sm:w-28 flex items-center justify-center p-1 transition-transform group-hover:scale-105">
              <img
                src="/images/logo.png"
                alt={t('شعار هاجس', 'Hajiss logo')}
                className={`${isMenuVariant ? 'brand-logo-ink' : 'brand-logo-warm'} w-full h-auto object-contain`}
              />
            </div>
          </button>

          {/* CENTER: DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label={t('القائمة الرئيسية', 'Main navigation')}>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                aria-current={activeSection === link.id ? 'page' : undefined}
                className={`visual-button relative inline-flex items-center py-1 font-arabic text-[13px] font-medium transition-colors group ${
                  isMenuVariant
                    ? activeSection === link.id ? 'text-[var(--color-brand-olive)]' : 'text-[rgb(var(--color-brand-chocolate-rgb)_/_0.82)] hover:text-[var(--color-brand-olive)]'
                    : activeSection === link.id ? 'text-[var(--color-brand-sand)]' : 'text-[rgb(var(--color-brand-linen-rgb)_/_0.9)] hover:text-[var(--color-brand-sand)]'
                }`}
              >
                {link.label}
                {/* Sand Underline Animation */}
                <span className={`absolute bottom-0 start-0 h-[2px] bg-gradient-to-l from-[var(--color-brand-sand)] to-[var(--color-brand-sand)] transition-all duration-300 ${
                  activeSection === link.id ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </button>
            ))}
            <LanguageToggle variant={isMenuVariant ? 'light' : 'dark'} />
          </nav>

          {/* MOBILE: LANGUAGE + HAMBURGER BUTTONS */}
          <div className="flex lg:hidden items-center gap-3">
            <LanguageToggle variant={isMenuVariant ? 'light' : 'dark'} />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`visual-icon-control rounded-full focus:outline-none ${isMenuVariant ? 'text-[var(--color-brand-chocolate)] hover:text-[var(--color-brand-olive)]' : 'text-[var(--color-brand-linen)] hover:text-[var(--color-brand-sand)]'}`}
              aria-label={t('فتح وإغلاق القائمة', 'Open or close menu')}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className={`fixed inset-0 z-30 flex flex-col px-6 pt-24 backdrop-blur-xl lg:hidden ${isMenuVariant ? 'bg-[rgb(245_240_232_/_0.98)]' : 'bg-[rgb(43_24_14_/_0.95)]'}`}>
          <div className="flex flex-col space-y-5 text-start">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                aria-current={activeSection === link.id ? 'page' : undefined}
                className={`visual-button w-full font-arabic text-xl py-2 border-b text-start ${
                  isMenuVariant
                    ? `border-[rgb(var(--color-brand-chocolate-rgb)_/_0.14)] ${activeSection === link.id ? 'text-[var(--color-brand-olive)]' : 'text-[var(--color-brand-chocolate)] hover:text-[var(--color-brand-olive)]'}`
                    : `border-[var(--color-brand-chocolate)] ${activeSection === link.id ? 'text-[var(--color-brand-sand)]' : 'text-[var(--color-brand-linen)] hover:text-[var(--color-brand-sand)]'}`
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

        </div>
      )}
    </>
  );
};
