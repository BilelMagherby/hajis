import React from 'react';
import { Mail, MapPin } from 'lucide-react';
import { InstagramIcon, SnapchatIcon, TikTokIcon, XIcon, YoutubeIcon } from './SocialIcons';
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
    <footer className="w-full bg-[#090604] text-[#F8F4EC] border-t border-[#3D281C]/40 pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* TOP 4 COLUMNS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 text-right pb-12 border-b border-[#2A180E]">

          {/* COL 1: BRAND LOGO & BIO */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 space-x-reverse justify-end">
              <div className="flex flex-col text-right">
                <span className="font-brand text-2xl font-light tracking-[0.25em] text-[#F8F4EC]">
                  HAJISS
                </span>
                <span className="text-[10px] tracking-[0.4em] text-[#C8A46A] -mt-1 font-sans">
                  CAFÉ
                </span>
              </div>
              <div className="w-16 h-auto flex items-center justify-center">
                <img
                  src="/images/logo.png"
                  alt="Hajiss Logo"
                  className="w-full h-auto object-contain filter invert contrast-125"
                />
              </div>
            </div>

            <p className="font-arabic text-xs text-[#C8BAA6] leading-relaxed font-light">
              مقهى هاجس — تجربة قهوة مختصة فريدة في حائل. نجمع بين عراقة التراث وكرم الوجار وأحدث أساليب التحميص والتقطير العالمية.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 space-x-reverse justify-end text-[#C8A46A] pt-2">
              <a
                href={brandData.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-[#160D08] border border-[#3D281C] hover:border-[#E3C994] hover:text-[#E3C994] transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={brandData.contact.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-[#160D08] border border-[#3D281C] hover:border-[#E3C994] hover:text-[#E3C994] transition-colors"
                aria-label="TikTok"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
              <a
                href={brandData.contact.snapchat}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-[#160D08] border border-[#3D281C] hover:border-[#E3C994] hover:text-[#E3C994] transition-colors"
                aria-label="Snapchat"
              >
                <SnapchatIcon className="w-4 h-4" />
              </a>
              <a
                href={brandData.contact.x}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-[#160D08] border border-[#3D281C] hover:border-[#E3C994] hover:text-[#E3C994] transition-colors"
                aria-label="Twitter X"
              >
                <XIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={brandData.contact.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-[#160D08] border border-[#3D281C] hover:border-[#E3C994] hover:text-[#E3C994] transition-colors"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* COL 2: CONTACT INFORMATION */}
          <div className="space-y-4">
            <h4 className="font-kufi text-base font-bold text-[#E3C994]">
              التواصل
            </h4>

            <div className="space-y-3 font-arabic text-xs text-[#D8CEBF]">
              <div className="flex items-center justify-end space-x-2 space-x-reverse">
                <a
                  href={`mailto:${brandData.contact.email}`}
                  className="hover:text-[#E3C994] transition-colors"
                >
                  {brandData.contact.email}
                </a>
                <Mail className="w-4 h-4 text-[#C8A46A]" />
              </div>

              <div className="flex items-start justify-end space-x-2 space-x-reverse">
                <span className="leading-relaxed">
                  {brandData.location.placeAr} — {brandData.location.cityAr}
                </span>
                <MapPin className="w-4 h-4 text-[#C8A46A] mt-0.5 flex-shrink-0" />
              </div>
            </div>
          </div>

          {/* COL 3: STORE & QR CODE */}
          <div className="space-y-3">
            <h4 className="font-kufi text-base font-bold text-[#E3C994]">
              زوروا متجرنا الإلكتروني
            </h4>
            <p className="font-arabic text-xs text-[#C8BAA6] font-light">
              للحصول على عروض خاصة ومحاصيل طازجة
            </p>

            <div className="flex justify-end pt-1">
              <ShopQrCode className="w-20 h-20 bg-[#F8F4EC] p-1.5 rounded-lg border border-[#C8A46A]/50" imageClassName="w-full h-full object-contain" />
            </div>
          </div>

          {/* COL 4: QUICK NAVIGATION LINKS */}
          <div className="space-y-3">
            <h4 className="font-kufi text-base font-bold text-[#E3C994]">
              روابط سريعة
            </h4>
            <ul className="space-y-2 font-arabic text-xs text-[#D8CEBF]">
              <li>
                <button
                  onClick={() => scrollTo('hero')}
                  className="hover:text-[#E3C994] transition-colors"
                >
                  الرئيسية
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('about')}
                  className="hover:text-[#E3C994] transition-colors"
                >
                  من نحن
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('menu')}
                  className="hover:text-[#E3C994] transition-colors"
                >
                  القائمة
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('v60')}
                  className="hover:text-[#E3C994] transition-colors"
                >
                  خدمات V60
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('visit')}
                  className="hover:text-[#E3C994] transition-colors"
                >
                  زيارة هاجس
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT & LEGAL BAR */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8A7969] font-arabic gap-4">
          <p>
            حقوق الطبع والنشر © مقهى هاجس — جميع الحقوق محفوظة
          </p>

          <p className="text-[11px] text-[#6E5F52]">
            مشغّل بواسطة أنود — رقم واحد للتجارة الإلكترونية مفتوحة المصدر
          </p>

          <a
            href="#privacy"
            onClick={(e) => {
              e.preventDefault();
              alert('سياسة الخصوصية: نحترم خصوصية زوارنا الكرام وبياناتهم بما يتوافق مع الأنظمة المعمول بها في المملكة العربية السعودية.');
            }}
            className="hover:text-[#E3C994] transition-colors"
          >
            سياسة الخصوصية
          </a>
        </div>

      </div>
    </footer>
  );
};
