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
                {t('هاجس | مقهى القهوة المختصة في حائل', 'HAJISS | Specialty Coffee Shop in Hail')}
              </span>
            </div>

            {/* Main Title */}
            <h2 className="visual-section-title font-kufi text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-brand-linen)] tracking-tight">
              {t('عن هاجس', 'About Hajiss')}
            </h2>

            <p dir={dir} className="font-arabic text-base leading-[1.8] text-[var(--color-brand-linen)] sm:text-lg">
              {t(
                'من أصالة الضيافة الحائلية إلى عالم القهوة المختصة، تبدأ حكاية هاجس. في قلب مدينة حائل، يجمع المقهى بين دفء التراث وشغف الإتقان، ليقدم تجربة تتجاوز حدود المذاق. هنا، تتحول العناية بالتفاصيل إلى لحظات مميزة، ويصبح كل كوب حكاية تستحق أن تُروى.',
                'Hajiss is a specialty coffee shop founded in Hail, offering a distinctive coffee experience that blends authentic local hospitality with modern roasting and brewing standards.'
              )}
            </p>
          </RevealOnScroll>

        </div>

        <RevealOnScroll className="mt-6 sm:mt-20 lg:mt-24" delay={100}>
          <div
            dir={dir}
            className="brand-texture-clay visual-card overflow-hidden rounded-3xl border border-[rgb(var(--color-brand-sand-rgb)_/_0.35)] bg-[#785b40]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
              <div className="p-6 sm:p-10 lg:p-14">
                <h3 className="story-copy-reveal story-reveal-delay-1 font-kufi text-3xl font-bold leading-[1.5] tracking-tight text-[var(--color-brand-linen)] sm:text-4xl">
                  {t('قصة المكان (الوجار)', 'Story of the Place (Al-Wujar)')}
                </h3>

                <p className="story-copy-reveal story-reveal-delay-2 mt-5 max-w-prose font-arabic text-base leading-[1.9] text-[var(--color-brand-linen)] sm:mt-6 sm:text-lg">
                  {t(
                    'استلهم هاجس هويته من «الوجار» الحائلي الأصيل، رمز الكرم والترحيب واجتماع الضيوف حول دلال القهوة، ليعيد إحياء هذه الروح الدافئة بأسلوب عصري يجمع بين الراحة والأناقة.',
                    'Inspired by traditional Haili "Wujar" — the welcoming hearth where guests gather around freshly roasted coffee — Hajiss revives this spirit of warmth and generosity in a contemporary setting designed for comfort and connection.'
                  )}
                </p>
              </div>

              <div className="visual-media relative min-h-[280px] overflow-hidden lg:min-h-full">
                <img
                  src="/images/555.jpeg"
                  alt={t('مجلس حائلي يجتمع حول نار الوجار عند الغروب', 'A traditional Hail gathering around the Wujar fire at sunset')}
                  className="story-image-reveal absolute inset-0 h-full w-full object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--color-brand-black-rgb)_/_0.75)] via-[rgb(var(--color-brand-black-rgb)_/_0.1)] to-transparent lg:bg-gradient-to-l lg:from-[rgb(var(--color-brand-terracotta-rgb)_/_0.25)] lg:via-transparent lg:to-[rgb(var(--color-brand-terracotta-rgb)_/_0.25)]" />
                <span className="absolute bottom-5 start-5 rounded-full border border-[rgb(var(--color-brand-sand-rgb)_/_0.4)] bg-[rgb(var(--color-brand-black-rgb)_/_0.65)] px-4 py-2 font-arabic text-xs text-[var(--color-brand-linen)] backdrop-blur-sm sm:bottom-7 sm:start-7">
                  {t('من الوجار إلى هاجس', 'From Al-Wujar to Hajiss')}
                </span>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
