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
      className="relative mt-[64px] flex h-[calc(100svh-64px)] min-h-[420px] w-full items-center overflow-hidden bg-[#090604] select-none"
    >
      {/* FULLSCREEN BACKGROUND: Hajiss Café Storefront Facade */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src="/images/main_cafe.jpg"
          alt="Hajiss Café Facade"
          className="w-full h-full object-contain object-center filter brightness-125 contrast-125 saturate-125"
        />

        {/* Very light vignette so the image stays crisp and bright */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090604]/10 via-transparent to-[#090604]/5" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090604]/10 via-transparent to-[#090604]/10" />
      </div>

      {/* Subtle Grain Texture Overlay */}
      <div className="absolute inset-0 grain-overlay pointer-events-none z-10 opacity-30" />

      {/* FOREGROUND CONTENT CONTAINER */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[75vh] items-center justify-center">
          <div className="pointer-events-none opacity-0 h-0 w-0 overflow-hidden">
            <div className="inline-flex items-center justify-center">
              <div className="relative w-28 sm:w-32 flex items-center justify-center p-2">
                <img
                  src="/images/logo.png"
                  alt="Insignia"
                  className="w-full h-auto object-contain filter invert contrast-125"
                />
              </div>
            </div>

            <div className="space-y-1">
              <h1 className="font-kufi text-5xl sm:text-6xl lg:text-7xl font-bold text-[#F8F4EC] tracking-tight leading-none drop-shadow-md">
                هاجس
              </h1>
              <h2 className="font-kufi text-2xl sm:text-3xl lg:text-4xl font-light text-[#E3C994] tracking-wide pt-1">
                هوس التذوّق
              </h2>
            </div>

            <p className="mt-5 font-arabic text-sm sm:text-base text-[#D8CEBF] leading-relaxed max-w-xl font-light">
              {brandData.heroQuote}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4 justify-end">
              <button
                onClick={onDiscoverClick || (() => {
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                })}
                className="group relative inline-flex items-center space-x-3 space-x-reverse px-8 py-3.5 rounded-full border border-[#C8A46A] bg-[#24150E]/80 backdrop-blur-md text-[#F8F4EC] text-sm font-medium tracking-wide hover:bg-[#C8A46A] hover:text-[#090604] transition-all duration-300 shadow-gold-glow hover:shadow-gold-glow-lg"
              >
                <span>اكتشف قصتنا</span>
                <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-full text-[#C8BAA6] hover:text-[#E3C994] text-sm font-arabic transition-colors border border-transparent hover:border-[#C8A46A]/30 bg-[#160D08]/40"
              >
                اكتشف القائمة
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SCROLL INDICATOR ON LEFT/RIGHT EDGE */}
      <div className="hidden lg:flex absolute bottom-8 left-8 z-20 flex-col items-center space-y-2 opacity-75 hover:opacity-100 transition-opacity pointer-events-none">
        <div className="w-5 h-8 rounded-full border border-[#C8A46A]/50 flex justify-center p-1">
          <div className="w-1 h-2 bg-[#E3C994] rounded-full animate-bounce" />
        </div>
        <span className="font-brand text-[9px] tracking-[0.25em] text-[#C8A46A]">
          SCROLL
        </span>
      </div>
    </section>
  );
};
