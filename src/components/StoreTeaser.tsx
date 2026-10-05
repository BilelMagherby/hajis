import React from 'react';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

export const StoreTeaser: React.FC = () => {
  return (
    <section className="relative w-full py-20 bg-[#160D08] border-t border-b border-[#C8A46A]/20 overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#24150E]/80 via-[#160D08] to-[#24150E]/80 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#24150E] to-[#160D08] border border-[#C8A46A]/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 text-right">
          
          {/* QR CODE & BADGE */}
          <div className="flex flex-col items-center p-4 rounded-2xl bg-[#090604] border border-[#C8A46A]/30 shadow-lg">
            {/* High fidelity SVG QR code representation */}
            <div className="w-28 h-28 bg-[#F8F4EC] p-2 rounded-xl flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#160D08]">
                {/* 3 Corner squares */}
                <rect x="5" y="5" width="28" height="28" fill="currentColor" rx="4" />
                <rect x="9" y="9" width="20" height="20" fill="#F8F4EC" rx="2" />
                <rect x="13" y="13" width="12" height="12" fill="currentColor" rx="1" />

                <rect x="67" y="5" width="28" height="28" fill="currentColor" rx="4" />
                <rect x="71" y="9" width="20" height="20" fill="#F8F4EC" rx="2" />
                <rect x="75" y="13" width="12" height="12" fill="currentColor" rx="1" />

                <rect x="5" y="67" width="28" height="28" fill="currentColor" rx="4" />
                <rect x="9" y="71" width="20" height="20" fill="#F8F4EC" rx="2" />
                <rect x="13" y="75" width="12" height="12" fill="currentColor" rx="1" />

                {/* Data blocks */}
                <rect x="38" y="10" width="8" height="8" fill="currentColor" />
                <rect x="50" y="15" width="8" height="8" fill="currentColor" />
                <rect x="38" y="28" width="18" height="6" fill="currentColor" />
                <rect x="10" y="38" width="6" height="16" fill="currentColor" />
                <rect x="22" y="44" width="8" height="8" fill="currentColor" />
                <rect x="36" y="40" width="28" height="28" fill="currentColor" rx="2" />
                <rect x="42" y="46" width="16" height="16" fill="#F8F4EC" />
                <rect x="47" y="51" width="6" height="6" fill="currentColor" />
                <rect x="70" y="40" width="10" height="10" fill="currentColor" />
                <rect x="84" y="48" width="10" height="18" fill="currentColor" />
                <rect x="40" y="75" width="12" height="12" fill="currentColor" />
                <rect x="60" y="72" width="15" height="8" fill="currentColor" />
                <rect x="78" y="78" width="14" height="14" fill="currentColor" />
              </svg>
            </div>
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
                href="#store"
                onClick={(e) => {
                  e.preventDefault();
                  alert('متجر هاجس الإلكتروني متاح قريباً مع كامل خيارات الدفع والشحن السريع!');
                }}
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
