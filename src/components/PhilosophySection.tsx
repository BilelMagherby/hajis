import React from 'react';
import { featuresData } from '../data/features';
import { RevealOnScroll } from './RevealOnScroll';

export const PhilosophySection: React.FC = () => {
  const item1 = featuresData.find((f) => f.number === '01') || featuresData[0];
  const item2 = featuresData.find((f) => f.number === '02') || featuresData[1];

  return (
    <section
      id="philosophy"
      className="relative w-full overflow-hidden bg-[#181512] py-20 text-[var(--color-brand-chocolate)] sm:py-24 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <img
          src="/images/philosophy-pourover.jpg"
          alt="معايير الجودة والكمال - يميّز هاجس"
          className="h-full w-full object-cover object-center brightness-90"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <div className="grain-overlay pointer-events-none absolute inset-0 z-[1] opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" dir="rtl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          
          {/* Section Header */}
          <div className="lg:col-start-1 lg:row-start-1 flex flex-col justify-center text-right py-4">
            <h2 className="visual-section-title font-kufi text-3xl sm:text-4xl lg:text-5xl font-bold text-[#D5C7B3]">
              ما الذي يميز هاجس؟
            </h2>
            <p className="mt-3 font-kufi text-lg font-semibold leading-relaxed text-[var(--color-brand-sand)] sm:text-xl">
              أكثر من مقهى... وجهتك المتكاملة للقهوة في حائل
            </p>
          </div>

          {/* TOP CENTER: Shop */}
          <div className="lg:col-start-2 lg:row-start-1">
            <div className="visual-card relative h-full overflow-hidden rounded-2xl border border-[rgb(var(--color-brand-sand-rgb)_/_0.45)] bg-[var(--color-brand-chocolate)] p-6 text-[var(--color-brand-sand)] shadow-[0_18px_44px_rgba(0,0,0,0.22)] sm:p-8 flex flex-col justify-center">
              <div className="pointer-events-none absolute inset-0 opacity-15">
                <img
                  src="/images/roaster_beans.jpg"
                  alt="تحميص القهوة"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-[rgb(var(--color-brand-chocolate-rgb)_/_0.45)] to-[rgb(var(--color-brand-chocolate-rgb)_/_0.9)]" />

              <div className="relative z-10 space-y-2">
                <h3 className="font-kufi text-2xl sm:text-3xl font-bold leading-snug text-[#D5C7B3]">
                  متجر في المقهى وعبر الإنترنت
                </h3>
                <p className="font-arabic text-base font-medium leading-[1.8] text-[var(--color-brand-sand)] sm:text-lg">
                  محاصيل مختارة وأدوات تحضير متنوعة، متوفرة في متجرنا داخل المقهى وعبر متجرنا الإلكتروني، مع التوصيل إلى جميع مناطق المملكة.
                </p>
              </div>
            </div>
          </div>

          {/* MIDDLE RIGHT: Coffee preparation */}
          {item1 && (
            <div className="lg:col-start-1 lg:row-start-2">
              <RevealOnScroll delay={100} className="philosophy-card-reveal h-full">
                <article
                  dir="rtl"
                  className="visual-card group relative h-full overflow-hidden rounded-2xl border border-[rgb(var(--color-brand-sand-rgb)_/_0.45)] bg-[var(--color-brand-chocolate)] p-6 text-right shadow-[0_18px_38px_rgba(0,0,0,0.22)] hover:border-[rgb(var(--color-brand-sand-rgb)_/_0.7)] sm:p-8"
                >
                  <div className="absolute inset-y-0 right-0 w-1 bg-[rgb(var(--color-brand-sand-rgb)_/_0.75)] transition-all duration-300 group-hover:w-1.5" />
                  <div className="relative">
                    <span className="font-arabic text-[10px] font-medium tracking-[0.2em] text-[var(--color-brand-sand)]">
                      {item1.number}
                    </span>
                    <h3 className="mt-3 font-kufi text-xl font-bold leading-[1.7] text-[#D5C7B3] sm:mt-4 sm:text-2xl">
                      {item1.titleAr}
                    </h3>
                    {item1.subtitleAr && (
                      <p className="mt-2 font-arabic text-base font-semibold text-[var(--color-brand-sand)]">
                        {item1.subtitleAr}
                      </p>
                    )}
                    <p className="mt-4 font-arabic text-base leading-[1.8] text-[var(--color-brand-sand)] sm:mt-5 sm:text-lg">
                      {item1.descriptionAr}
                    </p>
                  </div>
                </article>
              </RevealOnScroll>
            </div>
          )}

          {/* MIDDLE CENTER: Empty space revealing the pour-over visual */}
          <div className="hidden lg:block lg:col-start-2 lg:row-start-2 min-h-[220px] pointer-events-none" aria-hidden="true" />

          {/* MIDDLE LEFT: Location and seating */}
          {item2 && (
            <div className="lg:col-start-3 lg:row-start-2">
              <RevealOnScroll delay={200} className="philosophy-card-reveal h-full">
                <article
                  dir="rtl"
                  className="visual-card group relative h-full overflow-hidden rounded-2xl border border-[rgb(var(--color-brand-sand-rgb)_/_0.45)] bg-[var(--color-brand-chocolate)] p-6 text-right shadow-[0_18px_38px_rgba(0,0,0,0.22)] hover:border-[rgb(var(--color-brand-sand-rgb)_/_0.7)] sm:p-8"
                >
                  <div className="absolute inset-y-0 right-0 w-1 bg-[rgb(var(--color-brand-sand-rgb)_/_0.75)] transition-all duration-300 group-hover:w-1.5" />
                  <div className="relative">
                    <span className="font-arabic text-[10px] font-medium tracking-[0.2em] text-[var(--color-brand-sand)]">
                      {item2.number}
                    </span>
                    <h3 className="mt-3 font-kufi text-xl font-bold leading-[1.7] text-[#D5C7B3] sm:mt-4 sm:text-2xl">
                      {item2.titleAr}
                    </h3>
                    <p className="mt-2 font-arabic text-base font-semibold text-[var(--color-brand-sand)]">
                      {item2.subtitleAr}
                    </p>
                    <p className="mt-4 font-arabic text-base leading-[1.8] text-[var(--color-brand-sand)] sm:mt-5 sm:text-lg">
                      {item2.descriptionAr}
                    </p>
                  </div>
                </article>
              </RevealOnScroll>
            </div>
          )}

          {/* BOTTOM: Wholesale services */}
          <div className="lg:col-span-3 lg:row-start-3 mt-4 sm:mt-6">
            <div
              dir="rtl"
              className="visual-card relative overflow-hidden rounded-3xl border border-[rgb(var(--color-brand-sand-rgb)_/_0.35)] bg-[var(--color-brand-chocolate)] px-6 py-8 text-right shadow-[0_18px_44px_rgba(0,0,0,0.18)] sm:px-12 sm:py-12"
            >
              <div className="absolute inset-y-0 right-0 w-1 bg-[var(--color-brand-sand)]" />
              <div className="relative mx-auto max-w-4xl">
                <div>
                  <h3 className="font-kufi text-2xl font-bold leading-relaxed text-[#D5C7B3] sm:text-3xl">
                    توزيع ومستودعات لخدمة المقاهي في حائل
                  </h3>
                  <p className="mt-3 font-arabic text-base leading-8 text-[var(--color-brand-sand)] sm:text-lg sm:leading-9">
                    نمتلك مستودعات مجهزة تمكّننا من تزويد المقاهي والمشاريع في حائل بالبُن ومستلزمات القهوة، بتوريد منتظم وسريع.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
