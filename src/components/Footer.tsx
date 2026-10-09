import React from 'react';
import { Mail, MapPin } from 'lucide-react';
import { InstagramIcon, SnapchatIcon, ThreadsIcon, TikTokIcon, XIcon, YoutubeIcon } from './SocialIcons';
import { ShopQrCode } from './ShopQrCode';
import './ShopQrCode.css';
import { brandData } from '../data/brand';

interface FooterProps {
  onNavigate?: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollTo = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative w-full overflow-hidden border-t border-[rgb(var(--color-brand-chocolate-rgb)_/_0.4)] bg-[var(--color-brand-black)] pb-12 pt-16 text-[var(--color-brand-linen)]">
      <div className="brand-stripe-divider absolute inset-x-0 top-0" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* TOP 4 COLUMNS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 text-right pb-12 border-b border-[var(--color-brand-chocolate)]">

          {/* COL 1: BRAND LOGO & BIO */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 space-x-reverse justify-end">
              <div className="flex flex-col text-right">
                <span className="font-brand text-2xl font-light tracking-[0.25em] text-[var(--color-brand-linen)]">
                  مقهى هاجس
                </span>
              </div>
              <div className="w-16 h-auto flex items-center justify-center">
                <img
                  src="/images/logo.png"
                  alt="شعار هاجس"
                  className="brand-logo-warm w-full h-auto object-contain"
                />
              </div>
            </div>

            <p className="font-arabic text-xs text-[var(--color-brand-sand)] leading-relaxed font-light">
              مقهى هاجس — تجربة قهوة مختصة فريدة في حائل. نجمع بين عراقة التراث وكرم الوجار وأحدث أساليب التحميص والتقطير العالمية.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 space-x-reverse justify-end text-[var(--color-brand-sand)] pt-2">
              <a
                href={brandData.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="visual-icon-control rounded-full bg-[var(--color-brand-black)] border border-[var(--color-brand-chocolate)] hover:border-[var(--color-brand-sand)] hover:text-[var(--color-brand-sand)] transition-colors"
                aria-label="إنستغرام"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={brandData.contact.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="visual-icon-control rounded-full bg-[var(--color-brand-black)] border border-[var(--color-brand-chocolate)] hover:border-[var(--color-brand-sand)] hover:text-[var(--color-brand-sand)] transition-colors"
                aria-label="تيك توك"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
              <a
                href={brandData.contact.snapchat}
                target="_blank"
                rel="noopener noreferrer"
                className="visual-icon-control rounded-full bg-[var(--color-brand-black)] border border-[var(--color-brand-chocolate)] hover:border-[var(--color-brand-sand)] hover:text-[var(--color-brand-sand)] transition-colors"
                aria-label="سناب شات"
              >
                <SnapchatIcon className="w-4 h-4" />
              </a>
              <a
                href={brandData.contact.threads}
                target="_blank"
                rel="noopener noreferrer"
                className="visual-icon-control rounded-full bg-[var(--color-brand-black)] border border-[var(--color-brand-chocolate)] hover:border-[var(--color-brand-sand)] hover:text-[var(--color-brand-sand)] transition-colors"
                aria-label="ثريدز"
              >
                <ThreadsIcon className="w-4 h-4" />
              </a>
              <a
                href={brandData.contact.x}
                target="_blank"
                rel="noopener noreferrer"
                className="visual-icon-control rounded-full bg-[var(--color-brand-black)] border border-[var(--color-brand-chocolate)] hover:border-[var(--color-brand-sand)] hover:text-[var(--color-brand-sand)] transition-colors"
                aria-label="إكس"
              >
                <XIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={brandData.contact.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="visual-icon-control rounded-full bg-[var(--color-brand-black)] border border-[var(--color-brand-chocolate)] hover:border-[var(--color-brand-sand)] hover:text-[var(--color-brand-sand)] transition-colors"
                aria-label="يوتيوب"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* COL 2: CONTACT INFORMATION */}
          <div className="space-y-4">
            <h4 className="font-kufi text-base font-bold text-[var(--color-brand-sand)]">
              التواصل
            </h4>

            <div className="space-y-3 font-arabic text-xs text-[var(--color-brand-linen)]">
              <div className="flex items-center justify-end space-x-2 space-x-reverse">
                <a
                  href={`mailto:${brandData.contact.email}`}
                  className="hover:text-[var(--color-brand-sand)] transition-colors"
                >
                  {brandData.contact.email}
                </a>
                <Mail className="w-4 h-4 text-[var(--color-brand-sand)]" />
              </div>

              <div className="flex items-start justify-end space-x-2 space-x-reverse">
                <span className="leading-relaxed">
                  {brandData.location.placeAr}، {brandData.location.cityAr}
                </span>
                <MapPin className="w-4 h-4 text-[var(--color-brand-sand)] mt-0.5 flex-shrink-0" />
              </div>
            </div>
          </div>

          {/* COL 3: STORE & QR CODE */}
          <div className="space-y-3">
            <h4 className="font-kufi text-base font-bold text-[var(--color-brand-sand)]">
              زوروا متجرنا الإلكتروني
            </h4>
            <p className="font-arabic text-xs text-[var(--color-brand-sand)] font-light">
              للحصول على عروض خاصة ومحاصيل طازجة
            </p>

            <div className="flex justify-center pt-1 md:justify-end">
              <ShopQrCode className="w-20 h-20 bg-[var(--color-brand-linen)] p-1.5 rounded-lg border border-[rgb(var(--color-brand-sand-rgb)_/_0.5)]" imageClassName="w-full h-full object-contain" />
            </div>
          </div>

          {/* COL 4: QUICK NAVIGATION LINKS */}
          <div className="space-y-3">
            <h4 className="font-kufi text-base font-bold text-[var(--color-brand-sand)]">
              روابط سريعة
            </h4>
            <ul className="space-y-2 font-arabic text-xs text-[var(--color-brand-linen)]">
              <li>
                <button
                  onClick={() => scrollTo('hero')}
                  className="hover:text-[var(--color-brand-sand)] transition-colors"
                >
                  الرئيسية
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('about')}
                  className="hover:text-[var(--color-brand-sand)] transition-colors"
                >
                  من نحن
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('menu')}
                  className="hover:text-[var(--color-brand-sand)] transition-colors"
                >
                  القائمة
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('v60')}
                  className="hover:text-[var(--color-brand-sand)] transition-colors"
                >
                  خدمات التقطير
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('visit')}
                  className="hover:text-[var(--color-brand-sand)] transition-colors"
                >
                  زيارة هاجس
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT & LEGAL BAR */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[rgb(var(--color-brand-sand-rgb)_/_0.65)] font-arabic gap-4">
          <p>
            حقوق الطبع والنشر © مقهى هاجس — جميع الحقوق محفوظة
          </p>

         

          
        </div>

      </div>
    </footer>
  );
};
