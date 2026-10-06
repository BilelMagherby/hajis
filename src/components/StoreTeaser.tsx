import React from 'react';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { ShopQrCode } from './ShopQrCode';
import './ShopQrCode.css';

export const StoreTeaser: React.FC = () => {
  return (
    <section className="relative w-full py-20 bg-[#160D08] border-t border-b border-[#C8A46A]/20 overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#24150E]/80 via-[#160D08] to-[#24150E]/80 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#24150E] to-[#160D08] border border-[#C8A46A]/40 shadow-2xl flex flex-col md:flex-row-reverse items-center justify-between gap-8 text-right">
          
          {/* QR CODE & BADGE */}
          <div className="flex flex-col items-center p-4 rounded-2xl bg-[#090604] border border-[#C8A46A]/30 shadow-lg">
            {/* High fidelity SVG QR code representation */}
            <ShopQrCode className="w-28 h-28 bg-[#F8F4EC] p-2 rounded-xl flex items-center justify-center" imageClassName="w-full h-full object-contain" />
            <span className="font-arabic text-[11px] text-[#C8BAA6] mt-2 font-light">
              امسح الكود لزيارة المتجر
            </span>
          </div>

          {/* TEXT & CALL TO ACTION */}
          <div className="space-y-3 flex-1">
            <div className="inline-flex items-center space-x-2 space-x-reverse px-3 py-1 rounded-full bg-[#3D281C]/50 border border-[#C8A46A]/30 text-[#E3C994] text-xs font-arabic">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>تسوق أونلاين وتوصيل فوري</span>
            </div>

            <h3 className="font-kufi text-2xl sm:text-3xl font-bold text-[#F8F4EC]">
              زوروا متجرنا الإلكتروني
            </h3>

            <p className="font-arabic text-sm text-[#D8CEBF] max-w-lg leading-relaxed font-light">
              للحصول على عروض خاصة ومحاصيل هاجس الطازجة، وأدوات القهوة المختصة مع التوصيل لجميع مناطق المملكة.
            </p>

            <div className="pt-2 flex justify-end">
              <a
                href="https://hajiss.shop"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 space-x-reverse px-7 py-3 rounded-full bg-gradient-to-r from-[#C8A46A] to-[#E3C994] text-[#090604] font-arabic font-semibold text-sm hover:brightness-110 transition-all shadow-gold-glow"
              >
                <span>زيارة المتجر الإلكتروني</span>
                <ArrowLeft className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
