import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { brandData } from '../data/brand';

interface HeroProps {
  onDiscoverClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onDiscoverClick }) => {
  return (
    <section
      id="hero"
      className="relative mt-[64px] flex h-[calc(100svh-64px)] min-h-[420px] w-full items-center overflow-hidden bg-[var(--color-brand-black)] select-none"
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/images/hero_cafe_dusk.png"
          alt="واجهة مقهى هاجس"
          draggable={false}
          className="hero-slide-image h-full w-full object-cover object-[center_40%] brightness-125 contrast-125 saturate-125"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgb(var(--color-brand-black-rgb)_/_0.3)] via-transparent to-[rgb(var(--color-brand-black-rgb)_/_0.1)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[rgb(var(--color-brand-black-rgb)_/_0.15)] via-transparent to-[rgb(var(--color-brand-black-rgb)_/_0.15)]" />
      </div>

      <div className="absolute inset-0 grain-overlay pointer-events-none z-10 opacity-30" />

      <div className="relative z-20 w-full pl-4 pr-2 sm:pl-6 sm:pr-2 lg:pl-8 lg:pr-2">
        <div className="flex min-h-[75vh] items-center justify-end" dir="ltr">
          <div dir="rtl" className="w-full max-w-2xl rounded-3xl border border-[rgb(var(--color-brand-sand-rgb)_/_0.5)] bg-gradient-to-br from-[rgb(var(--color-brand-black-rgb)_/_0.95)] to-[rgb(var(--color-brand-chocolate-rgb)_/_0.9)] p-5 text-right shadow-[0_24px_80px_rgba(0,0,0,0.6)] sm:p-7 md:p-8">
            <div className="space-y-2">
              <h1 className="font-kufi text-5xl font-black tracking-[-0.05em] text-[var(--color-brand-linen)] drop-shadow-[0_4px_18px_rgba(0,0,0,0.8)] sm:text-6xl lg:text-7xl">
                هاجس
              </h1>
              <p className="font-kufi text-xl font-bold tracking-[0.08em] text-[var(--color-brand-sand)] drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] sm:text-2xl lg:text-3xl">
                هوس التذوّق
              </p>
            </div>

            <p className="mt-4 w-full text-sm font-medium leading-8 text-[var(--color-brand-linen)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] sm:text-base md:text-lg">
              {brandData.heroQuote}
            </p>

            <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <button
                onClick={onDiscoverClick || (() => {
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                })}
                className="brand-button-primary visual-button group inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-medium tracking-[0.08em] shadow-[0_0_26px_rgb(var(--color-brand-sand-rgb)_/_0.22)] transition-all duration-300"
              >
                <span>اكتشف قصتنا</span>
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              </button>

              <button
                onClick={() => {
                  document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="brand-button-secondary visual-button inline-flex items-center rounded-full px-6 py-3.5 text-sm font-medium transition-colors"
              >
                اكتشف القائمة
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-8 z-20 hidden flex-col items-center gap-2 opacity-80 transition-opacity hover:opacity-100 lg:flex pointer-events-none">
        <div className="flex h-8 w-5 justify-center rounded-full border border-[rgb(var(--color-brand-sand-rgb)_/_0.5)] p-1">
          <div className="h-2 w-1 rounded-full bg-[var(--color-brand-sand)] animate-bounce" />
        </div>
        <span className="text-[9px] tracking-[0.25em] text-[var(--color-brand-sand)]">SCROLL</span>
      </div>
    </section>
  );
};
