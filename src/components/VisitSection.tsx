import React from 'react';
import { Navigation } from 'lucide-react';

import { brandData } from '../data/brand';
import { useLanguage } from '../i18n/language';

export const VisitSection: React.FC = () => {
  const { t, dir } = useLanguage();

  return (
    <section
      id="visit"
      data-bean-rain="off"
      className="relative w-full py-8 sm:py-24 lg:py-28 bg-[#ECE3D2] text-[#40372D] overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#C8BCA7]/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="brand-texture-clay visual-card overflow-hidden rounded-3xl border border-[rgb(var(--color-brand-sand-rgb)_/_0.35)] bg-[#785b40] p-6 sm:p-8 lg:p-10 shadow-[0_18px_44px_rgba(0,0,0,0.22)]">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12" dir="ltr">
            <div className="visual-media group relative overflow-hidden rounded-2xl border border-[rgba(200,188,167,0.25)] shadow-xl lg:col-span-5">
              <img
                src="/images/haijs.jpeg"
                loading="lazy"
                alt={t('قهوة هاجس المثلجة مع التوت', 'Hajiss iced coffee with berries')}
                className="h-[340px] w-full object-cover object-center sm:h-[500px]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(64,55,45,0.8)] via-transparent to-[rgba(64,55,45,0.1)]" />
            </div>

            <div className="space-y-6 text-start lg:col-span-7" dir={dir}>
              <div>
                <h2 className="visual-section-title font-kufi text-3xl font-bold leading-relaxed text-[var(--color-brand-linen)] sm:text-4xl lg:text-5xl">
                  {t('ضيافة هاجس وفلسفتنا', 'Hajiss Hospitality & Philosophy')}
                </h2>
                <p className="mt-4 font-arabic text-base font-light leading-8 text-[var(--color-brand-linen)] sm:text-lg sm:leading-9">
                  {t(
                    'في هاجس، نؤمن بأن القهوة ليست مجرد مشروب يومي، بل هي ثقافة ضيافة متجذرة في الكرم والعناية بأدق التفاصيل لصناعة لحظات لا تُنسى لكل زائر.',
                    'At Hajiss, coffee is more than a daily beverage; it is a cultural ritual rooted in generosity, attention to detail, and a commitment to creating memorable moments for every visitor.'
                  )}
                </p>
              </div>

              <div className="flex justify-start pt-1">
                <a
                  href={brandData.location.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brand-button-primary visual-button inline-flex items-center gap-2 rounded-full px-6 py-3 font-arabic text-sm shadow-gold-glow transition-all"
                >
                  <span>{t('الموقع على الخريطة', 'View on the map')}</span>
                  <Navigation className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
