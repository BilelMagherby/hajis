import React, { useState } from 'react';
import { ArrowLeft, X, Sparkles } from 'lucide-react';
import { menuCategories, type MenuCategory, type MenuItem } from '../data/menu';
import { RevealOnScroll } from './RevealOnScroll';

interface MenuSectionProps {
  onNavigate?: (sectionId: string) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | null>(null);

  return (
    <section
      id="menu"
      data-bean-rain="off"
      className="relative w-full py-28 bg-[#292D1D] text-[#F8F4EC] overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#3B4028]/35 via-[#292D1D] to-[#292D1D] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <RevealOnScroll
          dir="rtl"
          className="mb-14 flex w-full flex-col items-start text-right"
        >
          <div className="mb-3 flex items-center justify-start">
            <span className="font-arabic text-xs font-medium tracking-[0.24em] text-[#E3C994]">
              إبداعات هاجس
            </span>
          </div>
          <h2 className="font-kufi text-3xl font-bold text-[#F8F4EC] sm:text-4xl lg:text-5xl">
            قائمة القهوة
          </h2>
          <p className="mt-4 max-w-2xl font-arabic text-sm font-light leading-8 text-[#D8CEBF] sm:text-base">
            من القهوة الكلاسيكية إلى تجارب V60 الفريدة، كل كوب يروي حكاية شغف وتفانٍ للمذاق الأصيل.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12" dir="ltr">
          <RevealOnScroll
            className="flex flex-col items-center justify-center rounded-2xl border border-[#C8A46A]/25 bg-[#252A1B]/80 p-5 shadow-2xl backdrop-blur-md sm:p-6 lg:col-span-5"
            dir="rtl"
            delay={120}
          >
            <div className="relative mb-6 w-full overflow-hidden rounded-xl shadow-[0_0_30px_rgba(200,164,106,0.12)]">
              <img
                src="/images/espresso_pour.jpg"
                alt="قهوة هاجس المختصة"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171A12]/60 via-transparent to-transparent" />
              <span className="absolute bottom-4 right-4 font-arabic text-xs tracking-wide text-[#F8F4EC]">
                مذاقٌ يُحضّر على مهل
              </span>
            </div>

            <button
              onClick={() => {
                if (onNavigate) {
                  onNavigate('menu');
                } else {
                  setSelectedCategory(menuCategories[0]);
                }
              }}
              className="flex w-full items-center justify-center space-x-2 space-x-reverse rounded-full border border-[#C8A46A]/80 bg-[#24150E]/80 px-6 py-3.5 font-arabic text-sm font-medium text-[#F8F4EC] shadow-gold-glow transition-all duration-300 hover:bg-[#C8A46A] hover:text-[#090604]"
            >
              <span>اكتشف القائمة الكاملة</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </RevealOnScroll>

          <RevealOnScroll
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7"
            dir="rtl"
            delay={200}
          >
            {[
              {
                number: '01',
                title: 'مشروبات ساخنة',
                description: 'محضّرة بعناية لترافق لحظاتك.'
              },
              {
                number: '02',
                title: 'مشروبات باردة',
                description: 'خيارات منعشة من قائمة هاجس.'
              },
              {
                number: '03',
                title: 'حلى حايلنا',
                description: 'حلوياتنا من حلى حايلنا، بنكهة محلية أصيلة.'
              },
              {
                number: '04',
                title: 'محاصيل القهوة',
                description: 'نختارها من أطيب وأميز محامص مملكتنا الغالية.'
              }
            ].map((item) => (
              <article
                key={item.number}
                className="group flex min-h-36 flex-col justify-between rounded-2xl border border-[#C8A46A]/20 bg-gradient-to-br from-[#353927]/90 to-[#222619]/80 p-5 text-right shadow-[0_12px_28px_rgba(0,0,0,0.12)] transition-colors duration-300 hover:border-[#C8A46A]/55 sm:p-6"
              >
                <div className="flex flex-col items-start gap-2">
                  <span className="font-arabic text-[10px] tracking-[0.2em] text-[#C8A46A]/80">
                    {item.number}
                  </span>
                  <h3 className="font-kufi text-lg font-semibold text-[#F8F4EC] transition-colors group-hover:text-[#E3C994] sm:text-xl">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-5 font-arabic text-sm font-light leading-7 text-[#D8CEBF]">
                  {item.description}
                </p>
                <div className="mt-4 h-px w-10 self-end bg-[#C8A46A]/55 transition-all duration-300 group-hover:w-16" />
              </article>
            ))}
          </RevealOnScroll>
        </div>
      </div>

      {/* LUXURY MENU MODAL / DRAWER */}
      {selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#160D08] border border-[#C8A46A]/40 rounded-3xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setSelectedCategory(null)}
              className="absolute top-5 left-5 p-2 rounded-full border border-[#C8A46A]/30 text-[#D8CEBF] hover:text-[#F8F4EC] hover:bg-[#24150E] transition-colors"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="text-right pb-6 border-b border-[#3D281C]">
              <span className="font-brand text-xs text-[#C8A46A] tracking-widest uppercase">
              </span>
              <h3 className="font-kufi text-2xl sm:text-3xl font-bold text-[#F8F4EC]">
                {selectedCategory.titleAr}
              </h3>
              <p className="font-arabic text-sm text-[#D8CEBF] mt-1">
                {selectedCategory.descriptionAr}
              </p>
            </div>

            {/* Items List */}
            <div className="mt-6 space-y-4">
              {selectedCategory.items.map((item: MenuItem) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-[#24150E]/60 border border-[#C8A46A]/15 hover:border-[#C8A46A]/50 transition-colors text-right flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between">
                    {/* Price */}
                    <span className="font-mono text-base font-bold text-[#E3C994]">
                      {item.price}
                    </span>

                    {/* Name */}
                    <div>
                      <h4 className="font-kufi text-lg font-bold text-[#F8F4EC]">
                        {item.nameAr}
                      </h4>
                      <span className="font-brand text-xs text-[#C8BAA6]">
                      </span>
                    </div>
                  </div>

                  <p className="font-arabic text-xs text-[#D8CEBF]/90 mt-2 font-light">
                    {item.descriptionAr}
                  </p>

                  {item.notes && (
                    <div className="mt-2 flex items-center justify-end space-x-1 space-x-reverse text-[11px] text-[#C8A46A]">
                      <Sparkles className="w-3 h-3" />
                      <span>{item.notes}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
