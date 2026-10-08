import React from 'react';
import { featuresData } from '../data/features';

export const PhilosophySection: React.FC = () => {
  return (
    <section
      id="philosophy"
      className="header-primary-mix relative w-full py-28 text-[#20140F] overflow-hidden"
    >
      <div className="absolute inset-0 grain-overlay pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16" dir="ltr">
          <div className="lg:col-span-6 lg:col-start-1 text-right" dir="rtl">
            <div className="flex items-center justify-start mb-3">
              <span className="font-arabic text-xs tracking-widest text-[#3D281C] uppercase font-medium">
                معايير الجودة والكمال
              </span>
            </div>
            <h2 className="font-kufi text-3xl sm:text-4xl lg:text-5xl font-bold text-[#20140F]">
              يميّز هاجس؟
            </h2>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 text-right" dir="rtl">
            <div className="header-primary-mix relative rounded-2xl overflow-hidden border border-[#C8A46A]/40 p-8 backdrop-blur-md shadow-[0_18px_44px_rgba(0,0,0,0.22)]">
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <img
                  src="/images/roaster_beans.jpg"
                  alt="تحميص القهوة"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="relative z-10 space-y-2">
                <h3 className="font-kufi text-2xl sm:text-3xl font-bold text-[#20140F] leading-snug">
                  كل كوب محضر <span className="text-[#3D281C]">بعناية فائقة.</span>
                </h3>
                <p className="font-arabic text-sm sm:text-base text-[#302019] font-medium">
                  كل كوب يُقدَّم لأنه يستحق تذوّقه. لا شيء عندنا صدفة.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-8">
          {featuresData.map((item) => (
            <div
              key={item.id}
              className="coffee-card group outline-none"
              tabIndex={0}
              aria-label={item.titleAr}
            >
              <div className="coffee-card-inner">
                <div className="coffee-card-face coffee-card-front">
                  <div className="coffee-card-front-content">
                    <span className="coffee-card-number font-arabic">{item.number}</span>
                    <h4 className="coffee-card-title font-kufi">{item.titleAr}</h4>
                    <p className="coffee-card-subtitle font-arabic">{item.subtitleAr}</p>
                  </div>
                </div>

                <div className="coffee-card-face coffee-card-back">
                  <div className="coffee-card-back-content">
                    <span className="font-arabic text-[10px] tracking-[0.2em] text-[#5B3626] opacity-80">
                      {item.number}
                    </span>
                    <p className="font-arabic">{item.descriptionAr}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          dir="rtl"
          className="relative mt-16 overflow-hidden rounded-3xl border border-[#C8A46A]/35 bg-[#20140F] px-7 py-10 text-right shadow-[0_18px_44px_rgba(0,0,0,0.18)] sm:px-12 sm:py-14"
        >
          <div className="absolute inset-y-0 right-0 w-1 bg-[#C8A46A]" />
          <div className="relative mx-auto max-w-4xl">
            <span className="font-arabic text-xs font-bold tracking-[0.2em] text-[#E3C994]">
              المفهوم الأساسي
            </span>
            <h3 className="mt-5 font-kufi text-2xl font-bold leading-relaxed text-[#F8F4EC] sm:text-3xl lg:text-4xl">
              سوّها صح
            </h3>
            <p className="mt-3 font-arabic text-base leading-8 text-[#E8DCC5] sm:text-lg sm:leading-9">
              القهوة المميّزة ما تجي بالصدفة؛ تجي من اهتمامٍ بكل خطوة.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
