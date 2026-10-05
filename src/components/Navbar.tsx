import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';
import { InstagramIcon, XIcon, YoutubeIcon } from './SocialIcons';
import { brandData } from '../data/brand';

interface NavbarProps {
  onNavigate?: (sectionId: string) => void;
  isAudioPlaying?: boolean;
  toggleAudio?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  isAudioPlaying = false,
  toggleAudio
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLang, setActiveLang] = useState<'ar' | 'en'>('ar');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', labelAr: 'الرئيسية', labelEn: 'Home' },
    { id: 'about', labelAr: 'من نحن', labelEn: 'About' },
    { id: 'philosophy', labelAr: 'ماذا يميّزنا', labelEn: 'Philosophy' },
    { id: 'menu', labelAr: 'القائمة', labelEn: 'Menu' },
    { id: 'v60', labelAr: 'خدمات V60', labelEn: 'V60 Ritual' },
    { id: 'visit', labelAr: 'زيارة هاجس', labelEn: 'Visit Us' },
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

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${isScrolled
            ? 'bg-[#160D08]/90 backdrop-blur-md border-b border-[#C8A46A]/25 py-3 shadow-lg shadow-black/40'
            : 'bg-transparent py-5 md:py-6'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* LEFT: HAJISS BRAND LOGO */}
          <div
            onClick={() => handleLinkClick('hero')}
            className="flex items-center cursor-pointer group"
          >
            <div className="w-28 sm:w-36 flex items-center justify-center p-1 transition-transform group-hover:scale-105">
              <img
                src="/images/logo.png"
                alt="Hajiss"
                className="w-full h-auto object-contain filter invert contrast-125"
              />
            </div>
          </div>

          {/* CENTER: DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center space-x-8 space-x-reverse" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="relative py-1 font-arabic text-sm text-[#F3EBDD]/90 hover:text-[#E3C994] transition-colors tracking-wide group"
              >
                {link.labelAr}
                {/* Gold Underline Animation */}
                <span className="absolute bottom-0 right-0 w-0 h-[2px] bg-gradient-to-l from-[#C8A46A] to-[#E3C994] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* RIGHT: ACTIONS & SOCIALS */}
          <div className="hidden md:flex items-center space-x-5 space-x-reverse">
            {/* Social Icons */}
            <div className="flex items-center space-x-3 space-x-reverse text-[#C8BAA6]">
              <a
                href={brandData.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full hover:text-[#E3C994] hover:bg-[#24150E] transition-all"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={brandData.contact.x}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full hover:text-[#E3C994] hover:bg-[#24150E] transition-all"
                aria-label="X Twitter"
              >
                <XIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={brandData.contact.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full hover:text-[#E3C994] hover:bg-[#24150E] transition-all"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>

            {/* Subtle Divider */}
            <div className="w-[1px] h-4 bg-[#3D281C]" />

            {/* Ambient Sound Toggle */}
            {toggleAudio && (
              <button
                onClick={toggleAudio}
                className="p-1.5 rounded-full text-[#C8A46A] hover:text-[#E3C994] bg-[#24150E]/80 border border-[#C8A46A]/20 hover:border-[#C8A46A] transition-all"
                title={isAudioPlaying ? 'كتم الصوت' : 'تشغيل أجواء المقهى الهادئة'}
                aria-label="Toggle ambient café sound"
              >
                {isAudioPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            )}

            {/* Language Selector */}
            <button
              onClick={() => setActiveLang(activeLang === 'ar' ? 'en' : 'ar')}
              className="px-2.5 py-1 text-xs rounded border border-[#C8A46A]/30 text-[#E3C994] hover:border-[#E3C994] transition-colors font-arabic"
            >
              {activeLang === 'ar' ? 'عربي' : 'EN'}
            </button>
          </div>

          {/* MOBILE HAMBURGER BUTTON */}
          <div className="flex md:hidden items-center space-x-3 space-x-reverse">
            {toggleAudio && (
              <button
                onClick={toggleAudio}
                className="p-2 text-[#C8A46A] rounded-md bg-[#24150E]/80 border border-[#C8A46A]/30"
                aria-label="Ambient audio"
              >
                {isAudioPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#F8F4EC] hover:text-[#E3C994] focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#160D08]/98 backdrop-blur-xl flex flex-col pt-24 px-6 md:hidden">
          <div className="flex flex-col space-y-5 text-right">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="font-arabic text-xl text-[#F8F4EC] hover:text-[#E3C994] py-2 border-b border-[#2A180E] text-right"
              >
                {link.labelAr}
              </button>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-[#3D281C] flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse text-[#C8A46A]">
              <a href={brandData.contact.instagram} target="_blank" rel="noopener noreferrer">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href={brandData.contact.x} target="_blank" rel="noopener noreferrer">
                <XIcon className="w-4 h-4" />
              </a>
              <a href={brandData.contact.youtube} target="_blank" rel="noopener noreferrer">
                <YoutubeIcon className="w-5 h-5" />
              </a>
            </div>

            <span className="font-arabic text-xs text-[#C8BAA6]">
              ميدان داني • حائل
            </span>
          </div>
        </div>
      )}
    </>
  );
};
