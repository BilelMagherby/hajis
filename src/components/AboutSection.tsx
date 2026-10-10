import React from 'react';
import { RevealOnScroll } from './RevealOnScroll';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      data-bean-rain="off"
      className="relative w-full py-20 sm:py-24 lg:py-28 bg-[var(--color-brand-olive)] text-[var(--color-brand-linen)] overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="parallax-background pointer-events-none absolute inset-0 opacity-50"
        style={{ backgroundImage: "url('/images/about-parallax.png')" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[rgb(var(--color-brand-olive-rgb)_/_0.65)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* IMAGE CONTAINER (Will appear on LEFT in RTL if it's order-2) */}
          <RevealOnScroll
            direction="left"
            className="lg:col-span-6 relative order-2 lg:order-2 flex justify-center"
          >
            <div className="relative w-full max-w-xl">
              {/* Soft decorative shadow background */}
              <div className="absolute -inset-4 bg-[rgb(var(--color-brand-olive-rgb)_/_0.4)] rounded-3xl blur-2xl transform -rotate-2" />

              {/* The Image Container with subtle organic border */}
              <div className="visual-media relative rounded-2xl overflow-hidden shadow-2xl border border-[rgb(var(--color-brand-sand-rgb)_/_0.35)] bg-[var(--color-brand-olive)]">
                <img
                  src="/images/about_cafe_pourover.jpeg"
                  alt="قهوة مقطرة وكرم الضيافة العربية"
                  className="w-full h-[400px] sm:h-[480px] object-cover object-center"
                />
                
                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--color-brand-black-rgb)_/_0.3)] via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Small Heritage Tag at bottom-right of image */}
              <div className="absolute -bottom-5 right-6 bg-[var(--color-brand-black)] text-[var(--color-brand-sand)] px-5 py-2.5 rounded-full border border-[rgb(var(--color-brand-sand-rgb)_/_0.4)] shadow-xl flex items-center space-x-2 space-x-reverse">
                <span className="text-[var(--color-brand-sand)]">•</span>
                <span className="font-arabic text-xs font-light">حائل منذ 2020</span>
              </div>
            </div>
          </RevealOnScroll>

          {/* TEXT CONTAINER (Will appear on RIGHT in RTL if it's order-1) */}
          <RevealOnScroll
            direction="right"
            className="lg:col-span-6 order-1 space-y-5 text-right lg:order-1 lg:space-y-6"
            delay={160}
          >
            {/* Top Insignia Emblem */}
            <div dir="rtl" className="flex items-center justify-start gap-3">
              <span className="font-arabic text-sm tracking-widest text-[var(--color-brand-sand)] uppercase font-semibold">
                أصالة المكان وروح الضيافة
              </span>
              <div className="w-12 h-auto flex items-center justify-center">
                <img
                  src="/images/logo.png"
                  alt="شعار هاجس"
                  className="brand-logo-warm w-full h-auto object-contain"
                />
              </div>
            </div>

            {/* Main Title */}
            <h2 className="visual-section-title font-kufi text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-brand-linen)] tracking-tight">
               هاجس ؟
            </h2>

            {/* Introductory sentence */}
            <p className="font-arabic text-base sm:text-lg text-[var(--color-brand-linen)] font-medium leading-relaxed">
             
            </p>

            {/* The 3 Pillars List */}
            <ul dir="rtl" className="space-y-4 font-arabic text-base leading-[1.8] text-[var(--color-brand-linen)] sm:text-lg">
              <li className="flex items-start gap-3 text-right">
                <span className="w-2 h-2 rounded-full bg-[var(--color-brand-sand)] mt-2 flex-shrink-0" />
                <span>مقهى متخصص يقدم أفضل منتجات القهوة المحمصة والمميزة في السوق السعودي "هاجس بيت لأجود أنواع القهوة".</span>
              </li>
              <li className="flex items-start gap-3 text-right">
                <span className="w-2 h-2 rounded-full bg-[var(--color-brand-sand)] mt-2 flex-shrink-0" />
                <span>وجهة لشغوفي وعشاق القهوة، في ارقى مجمع يحظى بجلسات خارجية جميلة في أهم المواقع بمدينة حائل.</span>
              </li>
              <li className="flex items-start gap-3 text-right">
                <span className="w-2 h-2 rounded-full bg-[var(--color-brand-sand)] mt-2 flex-shrink-0" />
                <span>راحة زبائننا هدف ملزم لتحقيق ثقتهم بهاجس.</span>
              </li>
            </ul>

            {/* Unifying statement */}
            <p className="pt-1 font-arabic text-base leading-[1.8] text-[var(--color-brand-linen)] sm:text-lg">
              وهذي الأشياء الثلاث مو متفرقة عن بعض، أصلها واحد، بس كل وحدة تعبّر عنه بطريقتها.
            </p>

            {/* Final Statement / Punchline */}
            <div className="pt-4 border-t border-[rgb(var(--color-brand-sand-rgb)_/_0.35)]">
              <p className="font-kufi text-2xl sm:text-3xl font-bold text-[var(--color-brand-sand)] tracking-wide">
                القهوة... طقس نعيشه.
              </p>
            </div>
          </RevealOnScroll>

        </div>

        <RevealOnScroll className="mt-16 sm:mt-20 lg:mt-24" delay={100}>
          <div
            dir="rtl"
            className="brand-texture-clay visual-card overflow-hidden rounded-3xl border border-[rgb(var(--color-brand-sand-rgb)_/_0.35)]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="p-6 sm:p-10 lg:col-span-7 lg:p-14">
                <div className="story-copy-reveal story-reveal-delay-1 mb-4 flex items-center gap-3 sm:mb-5">
                  <span className="font-arabic text-sm font-bold tracking-[0.12em] text-[var(--color-brand-black)]">
                    حكاية المكان
                  </span>
                </div>

                <h3 className="story-copy-reveal story-reveal-delay-2 font-kufi text-3xl font-bold leading-[1.5] tracking-tight text-[var(--color-brand-black)] sm:text-4xl">
                  قصتنا
                </h3>

                <blockquote className="story-copy-reveal story-reveal-delay-3 mt-4 border-r-2 border-[var(--color-brand-chocolate)] pr-5 font-kufi text-xl font-bold leading-[1.8] text-[var(--color-brand-black)] sm:mt-5 sm:text-2xl">
                  "بدأت قصتنا من الوجار"
                </blockquote>

                <div className="mt-5 max-w-prose space-y-4 font-arabic text-base leading-[1.9] text-[var(--color-brand-black)] sm:mt-6 sm:space-y-5 sm:text-lg">
                  <p className="story-copy-reveal story-reveal-delay-4">
                    في منتصف التسعينيات، أنشأنا مقهى صغيرًا بمسمى "الوجار" في مبنى قديم بنفس الموقع، فالوجار أسم تقليدي حائلي يشير إلى مجمر ناري يجتمع حوله الناس بالشتاء للدفء وكذلك للتفاعل والمناقشات بين الأهل والأصحاب.
                  </p>
                  <p className="story-copy-reveal story-reveal-delay-5">
                    فبعض القصص لا تنتهي... بل تتجدد.
                  </p>
                  <p className="story-copy-reveal story-reveal-delay-6">
                    اليوم نرجع بهاجس بحلّة جديدة تواكب العصر لبداية قصة جديدة امتدادً لحكاية بدأت من أكثر من ثلاثين سنة…. نفس المكان... ونفس الشغف... ونفس الحرص على صناعة مكان يجتمع فيه الناس حول شيء يستحق التقدير. وكان الوجار هو البداية... وهاجس هو الجمر اللي ما طفى، واللّهب اللي اشتعل من جديد.
                  </p>
                </div>
              </div>

              <div className="visual-media relative min-h-[280px] overflow-hidden lg:col-span-5 lg:min-h-full">
                <img
                  src="/images/555.jpeg"
                  alt="مجلس حائلي يجتمع حول نار الوجار عند الغروب"
                  className="story-image-reveal absolute inset-0 h-full w-full object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--color-brand-black-rgb)_/_0.75)] via-[rgb(var(--color-brand-black-rgb)_/_0.1)] to-transparent lg:bg-gradient-to-l lg:from-[rgb(var(--color-brand-terracotta-rgb)_/_0.25)] lg:via-transparent lg:to-[rgb(var(--color-brand-terracotta-rgb)_/_0.25)]" />
                <span className="absolute bottom-5 right-5 rounded-full border border-[rgb(var(--color-brand-sand-rgb)_/_0.4)] bg-[rgb(var(--color-brand-black-rgb)_/_0.65)] px-4 py-2 font-arabic text-xs text-[var(--color-brand-linen)] backdrop-blur-sm sm:bottom-7 sm:right-7">
                  من الوجار إلى هاجس
                </span>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
