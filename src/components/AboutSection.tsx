import React from 'react';
import { RevealOnScroll } from './RevealOnScroll';
import { useLanguage } from '../i18n/language';

export const AboutSection: React.FC = () => {
  const { t, dir } = useLanguage();

  return (
    <section
      id="about"
      data-bean-rain="off"
      className="relative w-full py-8 sm:py-24 lg:py-28 bg-[#ECE3D2] text-[#40372D] overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="parallax-background pointer-events-none absolute inset-0 opacity-40"
        style={{ backgroundImage: "url('/images/about-parallax.jpg')" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[#ECE3D2]/75" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0 items-stretch">
          
          {/* IMAGE BOX */}
          <RevealOnScroll
            direction="left"
            className="brand-texture-clay visual-card relative order-2 lg:order-2 flex min-w-0 justify-center overflow-hidden rounded-3xl border border-[rgb(var(--color-brand-sand-rgb)_/_0.35)] bg-[#785b40] p-3 sm:p-4 lg:h-[480px] lg:rounded-s-none lg:border-s-0"
          >
            <div className="visual-media relative h-[360px] w-full overflow-hidden rounded-2xl sm:h-[440px] lg:h-full">
              <img
                src="/images/about_cafe_drinks.jpg"
                loading="lazy"
                alt={t('مشروبات هاجس المختصة', 'Hajiss specialty drinks')}
                className="h-full w-full object-cover object-center"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(64,55,45,0.25)] via-transparent to-transparent" />
            </div>
          </RevealOnScroll>

          {/* TEXT BOX */}
          <RevealOnScroll
            direction="right"
            className="brand-texture-clay visual-card order-1 flex min-w-0 flex-col justify-center space-y-5 overflow-hidden rounded-3xl border border-[rgb(var(--color-brand-sand-rgb)_/_0.35)] bg-[#785b40] p-6 text-start text-[var(--color-brand-linen)] lg:order-1 lg:h-[480px] lg:space-y-6 lg:p-10 lg:rounded-e-none lg:border-e-0 lg:-me-px"
            delay={160}
          >
            {/* Top Insignia Emblem */}
            <div dir={dir} className="flex items-center justify-start gap-3">
              <span className="font-arabic text-sm tracking-widest text-[var(--color-brand-sand)] uppercase font-semibold">
                {t('أصالة المكان وروح الضيافة', 'An authentic place, a spirit of hospitality')}
              </span>
            </div>

            {/* Main Title */}
            <h2 className="visual-section-title font-kufi text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-brand-linen)] tracking-tight">
               {t('هاجس ؟', 'What is Hajiss?')}
            </h2>

            {/* The 3 Pillars List */}
            <ul dir={dir} className="space-y-4 font-arabic text-base leading-[1.8] text-[var(--color-brand-linen)] sm:text-lg">
              <li className="flex items-start gap-3 text-start">
                <span className="w-2 h-2 rounded-full bg-[var(--color-brand-sand)] mt-2 flex-shrink-0" />
                <span>{t('مقهى متخصص يقدم أفضل منتجات القهوة المحمصة والمميزة في السوق السعودي "هاجس بيت لأجود أنواع القهوة".', 'A specialty café serving the finest roasted and distinctive coffees in the Saudi market — "Hajiss, home of the finest coffee."')}</span>
              </li>
              <li className="flex items-start gap-3 text-start">
                <span className="w-2 h-2 rounded-full bg-[var(--color-brand-sand)] mt-2 flex-shrink-0" />
                <span>{t('وجهة لشغوفي وعشاق القهوة، في ارقى مجمع يحظى بجلسات خارجية جميلة في أهم المواقع بمدينة حائل.', 'A destination for coffee lovers, in one of the finest complexes in Hail, with beautiful outdoor seating in a prime location.')}</span>
              </li>
              <li className="flex items-start gap-3 text-start">
                <span className="w-2 h-2 rounded-full bg-[var(--color-brand-sand)] mt-2 flex-shrink-0" />
                <span>{t('راحة زبائننا هدف ملزم لتحقيق ثقتهم بهاجس.', 'Our guests\' comfort is a commitment we keep to earn their trust in Hajiss.')}</span>
              </li>
            </ul>

            {/* Unifying statement */}
            <p className="pt-1 font-arabic text-base leading-[1.8] text-[var(--color-brand-linen)] sm:text-lg">
              {t('وهذي الأشياء الثلاث مو متفرقة عن بعض، أصلها واحد، بس كل وحدة تعبّر عنه بطريقتها.', 'These three things aren\'t separate — they share one root, and each expresses it in its own way.')}
            </p>

            {/* Final Statement / Punchline */}
            <div className="pt-4">
              <p className="font-kufi text-2xl sm:text-3xl font-bold text-[var(--color-brand-sand)] tracking-wide">
                {t('القهوة... طقس نعيشه.', 'Coffee... a ritual we live.')}
              </p>
            </div>
          </RevealOnScroll>

        </div>

        <RevealOnScroll className="mt-6 sm:mt-20 lg:mt-24" delay={100}>
          <div
            dir={dir}
            className="brand-texture-clay visual-card overflow-hidden rounded-3xl border border-[rgb(var(--color-brand-sand-rgb)_/_0.35)] bg-[#785b40]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
              <div className="p-6 sm:p-10 lg:p-14">
                <div className="story-copy-reveal story-reveal-delay-1 mb-4 flex items-center gap-3 sm:mb-5">
                  <span className="font-arabic text-sm font-bold tracking-[0.12em] text-[var(--color-brand-sand)]">
                    {t('حكاية المكان', 'The story of the place')}
                  </span>
                </div>

                <h3 className="story-copy-reveal story-reveal-delay-2 font-kufi text-3xl font-bold leading-[1.5] tracking-tight text-[var(--color-brand-linen)] sm:text-4xl">
                  {t('قصتنا', 'Our Story')}
                </h3>

                <blockquote className="story-copy-reveal story-reveal-delay-3 mt-4 border-s-2 border-[var(--color-brand-sand)] ps-5 font-kufi text-xl font-bold leading-[1.8] text-[var(--color-brand-linen)] sm:mt-5 sm:text-2xl">
                  {t('"بدأت قصتنا من الوجار"', '"Our story began at Al-Wijar"')}
                </blockquote>

                <div className="mt-5 max-w-prose space-y-4 font-arabic text-base leading-[1.9] text-[var(--color-brand-linen)] sm:mt-6 sm:space-y-5 sm:text-lg">
                  <p className="story-copy-reveal story-reveal-delay-4">
                    {t('في منتصف التسعينيات، أنشأنا مقهى صغيرًا بمسمى "الوجار" في مبنى قديم بنفس الموقع، فالوجار أسم تقليدي حائلي يشير إلى مجمر ناري يجتمع حوله الناس بالشتاء للدفء وكذلك للتفاعل والمناقشات بين الأهل والأصحاب.', 'In the mid-1990s, we opened a small café called "Al-Wijar" in an old building on this very spot. Al-Wijar is a traditional Hail word for the fire hearth that people gather around in winter — for warmth, and for conversation among family and friends.')}
                  </p>
                  <p className="story-copy-reveal story-reveal-delay-5">
                    {t('فبعض القصص لا تنتهي... بل تتجدد.', 'Some stories never end... they are renewed.')}
                  </p>
                  <p className="story-copy-reveal story-reveal-delay-6">
                    {t('اليوم نرجع بهاجس بحلّة جديدة تواكب العصر لبداية قصة جديدة امتدادً لحكاية بدأت من أكثر من ثلاثين سنة…. نفس المكان... ونفس الشغف... ونفس الحرص على صناعة مكان يجتمع فيه الناس حول شيء يستحق التقدير. وكان الوجار هو البداية... وهاجس هو الجمر اللي ما طفى، واللّهب اللي اشتعل من جديد.', 'Today we return as Hajiss, with a fresh, modern look — a new chapter in a story that began more than thirty years ago. The same place... the same passion... and the same care for creating a place where people gather around something worth savoring. Al-Wijar was the beginning... and Hajiss is the ember that never went out, the flame that has been lit again.')}
                  </p>
                </div>
              </div>

              <div className="visual-media relative min-h-[280px] overflow-hidden lg:min-h-full">
                <img
                  src="/images/555.jpeg"
                  alt={t('مجلس حائلي يجتمع حول نار الوجار عند الغروب', 'A traditional Hail gathering around the Wijar fire at sunset')}
                  className="story-image-reveal absolute inset-0 h-full w-full object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--color-brand-black-rgb)_/_0.75)] via-[rgb(var(--color-brand-black-rgb)_/_0.1)] to-transparent lg:bg-gradient-to-l lg:from-[rgb(var(--color-brand-terracotta-rgb)_/_0.25)] lg:via-transparent lg:to-[rgb(var(--color-brand-terracotta-rgb)_/_0.25)]" />
                <span className="absolute bottom-5 start-5 rounded-full border border-[rgb(var(--color-brand-sand-rgb)_/_0.4)] bg-[rgb(var(--color-brand-black-rgb)_/_0.65)] px-4 py-2 font-arabic text-xs text-[var(--color-brand-linen)] backdrop-blur-sm sm:bottom-7 sm:start-7">
                  {t('من الوجار إلى هاجس', 'From Al-Wijar to Hajiss')}
                </span>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
