import React from 'react';
import { RevealOnScroll } from './RevealOnScroll';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      data-bean-rain="off"
      className="relative w-full py-24 lg:py-32 bg-[#3B4028] text-[#F8F4EC] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* IMAGE CONTAINER (Will appear on LEFT in RTL if it's order-2) */}
          <RevealOnScroll
            className="lg:col-span-6 relative order-2 lg:order-2 flex justify-center"
          >
            <div className="relative w-full max-w-xl">
              {/* Soft decorative shadow background */}
              <div className="absolute -inset-4 bg-[#77764A]/40 rounded-3xl blur-2xl transform -rotate-2" />

              {/* The Image Container with subtle organic border */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#C8A46A]/35 bg-[#292D1D]">
                <img
                  src="/images/about_coffee_pourover.png"
                  alt="قهوة مقطرة وكرم الضيافة العربية"
                  className="w-full h-[400px] sm:h-[480px] object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#160D08]/30 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Small Heritage Tag at bottom-right of image */}
              <div className="absolute -bottom-5 right-6 bg-[#160D08] text-[#E3C994] px-5 py-2.5 rounded-full border border-[#C8A46A]/40 shadow-xl flex items-center space-x-2 space-x-reverse">
                <span className="text-[#C8A46A]">•</span>
                <span className="font-arabic text-xs font-light">حائل منذ 2020</span>
              </div>
            </div>
          </RevealOnScroll>

          {/* TEXT CONTAINER (Will appear on RIGHT in RTL if it's order-1) */}
          <RevealOnScroll
            className="lg:col-span-6 text-right order-1 lg:order-1 space-y-6"
            delay={160}
          >
            {/* Top Insignia Emblem */}
            <div dir="rtl" className="flex items-center justify-start gap-3">
              <span className="font-arabic text-xs tracking-widest text-[#E3C994] uppercase font-medium">
                أصالة المكان وروح الضيافة
              </span>
              <div className="w-12 h-auto flex items-center justify-center">
                <img
                  src="/images/logo.png"
                  alt="شعار هاجس"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            {/* Main Title */}
            <h2 className="font-kufi text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F8F4EC] tracking-tight">
              ما هو هاجس ؟
            </h2>

            {/* Introductory sentence */}
            <p className="font-arabic text-base sm:text-lg text-[#E8DCC5] font-medium leading-relaxed">
              في هاجس، تلتقي ثلاث أشياء في مكان واحد:
            </p>

            {/* The 3 Pillars List */}
            <ul dir="rtl" className="space-y-4 font-arabic text-sm sm:text-base text-[#F3EBDD] leading-relaxed">
              <li className="flex items-start gap-3 text-right">
                <span className="w-2 h-2 rounded-full bg-[#C8A46A] mt-2 flex-shrink-0" />
                <span>مقهى متخصص، ما هو أي مقهى.</span>
              </li>
              <li className="flex items-start gap-3 text-right">
                <span className="w-2 h-2 rounded-full bg-[#C8A46A] mt-2 flex-shrink-0" />
                <span>مكان للتجمّعات، جذوره من الوجار، عادة أهل حائل الأصيلة بالكرم والدفا..</span>
              </li>
              <li className="flex items-start gap-3 text-right">
                <span className="w-2 h-2 rounded-full bg-[#C8A46A] mt-2 flex-shrink-0" />
                <span>انتماء، مو مجرد راحة تجيك وتروح.</span>
              </li>
            </ul>

            {/* Unifying statement */}
            <p className="font-arabic text-sm sm:text-base text-[#E8DCC5] leading-relaxed pt-2">
              وهذي الأشياء الثلاث مو متفرقة عن بعض، أصلها واحد، بس كل وحدة تعبّر عنه بطريقتها.
            </p>

            {/* Final Statement / Punchline */}
            <div className="pt-4 border-t border-[#C8A46A]/35">
              <p className="font-kufi text-2xl sm:text-3xl font-bold text-[#E3C994] tracking-wide">
                القهوة... طقس نعيشه.
              </p>
            </div>
          </RevealOnScroll>

        </div>
      </div>
    </section>
  );
};
