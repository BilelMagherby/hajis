import React from 'react';
import { featuresData } from '../data/features';
import { RevealOnScroll } from './RevealOnScroll';

export const PhilosophySection: React.FC = () => {
  return (
    <section
      id="philosophy"
      className="relative w-full overflow-hidden bg-[var(--color-brand-linen)] py-20 text-[var(--color-brand-chocolate)] sm:py-24 lg:py-28"
    >
      <RevealOnScroll
        aria-hidden="true"
        className="philosophy-background-reveal pointer-events-none absolute inset-0"
      >
        <img
          src="/images/coffee-parallax.png"
          alt=""
          className="philosophy-background-zoom h-full w-full object-cover opacity-[0.08]"
        />
      </RevealOnScroll>
      <div className="grain-overlay pointer-events-none absolute inset-0 z-[1] opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12 grid grid-cols-1 items-center gap-6 lg:mb-16 lg:grid-cols-12 lg:gap-12" dir="ltr">
          <div className="lg:col-span-6 lg:col-start-1 text-right" dir="rtl">
            <div className="flex items-center justify-start mb-3">
              <span className="font-arabic text-sm font-semibold tracking-widest text-[var(--color-brand-chocolate)] uppercase">
                معايير الجودة والكمال
              </span>
            </div>
            <h2 className="visual-section-title font-kufi text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-brand-chocolate)]">
              يميّز هاجس؟
            </h2>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 text-right" dir="rtl">
            <div className="visual-card relative overflow-hidden rounded-2xl border border-[rgb(var(--color-brand-sand-rgb)_/_0.45)] bg-[var(--color-brand-chocolate)] p-6 text-[var(--color-brand-linen)] shadow-[0_18px_44px_rgba(0,0,0,0.22)] sm:p-8">
              <div className="pointer-events-none absolute inset-0 opacity-15">
                <img
                  src="/images/roaster_beans.jpg"
                  alt="تحميص القهوة"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-[rgb(var(--color-brand-chocolate-rgb)_/_0.45)] to-[rgb(var(--color-brand-chocolate-rgb)_/_0.9)]" />

              <div className="relative z-10 space-y-2">
                <h3 className="font-kufi text-2xl sm:text-3xl font-bold leading-snug text-[var(--color-brand-linen)]">
                  كل كوب محضر <span className="text-[var(--color-brand-sand)]">بعناية فائقة.</span>
                </h3>
                <p className="font-arabic text-base font-medium leading-[1.8] text-[var(--color-brand-linen)] sm:text-lg">
                  كل كوب يُقدَّم لأنه يستحق تذوّقه. لا شيء عندنا صدفة.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2 lg:gap-8">
          {featuresData.map((item, index) => (
            <RevealOnScroll
              key={item.id}
              delay={index * 110}
              className="philosophy-card-reveal"
            >
              <article
                dir="rtl"
              className="visual-card group relative h-full overflow-hidden rounded-2xl border border-[rgb(var(--color-brand-chocolate-rgb)_/_0.2)] bg-[var(--color-brand-linen)] p-6 text-right shadow-[0_18px_38px_rgba(0,0,0,0.14)] hover:border-[rgb(var(--color-brand-sand-rgb)_/_0.7)] sm:p-8"
              >
                <div className="absolute inset-y-0 right-0 w-1 bg-[rgb(var(--color-brand-sand-rgb)_/_0.75)] transition-all duration-300 group-hover:w-1.5" />
                <div className="relative">
                  <span className="font-arabic text-[10px] font-medium tracking-[0.2em] text-[var(--color-brand-sand)]">
                    {item.number}
                  </span>
                  <h3 className="mt-3 font-kufi text-xl font-bold leading-[1.7] text-[var(--color-brand-chocolate)] sm:mt-4 sm:text-2xl">
                    {item.titleAr}
                  </h3>
                  <p className="mt-2 font-arabic text-base font-semibold text-[var(--color-brand-chocolate)]">
                    {item.subtitleAr}
                  </p>
                  <p className="mt-4 font-arabic text-base leading-[1.8] text-[var(--color-brand-chocolate)] sm:mt-5 sm:text-lg">
                    {item.descriptionAr}
                  </p>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>

        <div
          dir="rtl"
          className="visual-card relative mt-10 overflow-hidden rounded-3xl border border-[rgb(var(--color-brand-sand-rgb)_/_0.35)] bg-[var(--color-brand-chocolate)] px-6 py-8 text-right shadow-[0_18px_44px_rgba(0,0,0,0.18)] sm:mt-12 sm:px-12 sm:py-12"
        >
          <div className="absolute inset-y-0 right-0 w-1 bg-[var(--color-brand-sand)]" />
          <div className="relative mx-auto max-w-4xl">
            <span className="font-arabic text-xs font-bold tracking-[0.2em] text-[var(--color-brand-sand)]">
              المفهوم الأساسي
            </span>
            <h3 className="mt-5 font-kufi text-2xl font-bold leading-relaxed text-[var(--color-brand-linen)] sm:text-3xl lg:text-4xl">
              سوّها صح
            </h3>
            <p className="mt-3 font-arabic text-base leading-8 text-[var(--color-brand-linen)] sm:text-lg sm:leading-9">
              القهوة المميّزة ما تجي بالصدفة؛ تجي من اهتمامٍ بكل خطوة.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
