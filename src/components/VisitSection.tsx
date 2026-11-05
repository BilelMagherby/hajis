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
              <div dir={dir} className="absolute bottom-5 right-5 left-5 rounded-xl border border-[rgba(200,188,167,0.3)] bg-[rgba(64,55,45,0.85)] p-4 text-start backdrop-blur-md sm:bottom-6 sm:right-6 sm:left-6">
                <span className="font-arabic text-[10px] font-medium tracking-[0.2em] text-[var(--color-brand-sand)]">
                  {t('ضيافة هاجس', 'Hajiss hospitality')}
                </span>
                <p className="mt-2 font-kufi text-base font-semibold leading-relaxed text-[var(--color-brand-linen)] sm:text-lg">
                  {t('هاجس تحس إنه منك... من أول لحظة تزوره.', 'Hajiss feels like yours... from the very first visit.')}
                </p>
              </div>
            </div>

            <div className="space-y-6 text-start lg:col-span-7" dir={dir}>
              <div>
                <span className="font-arabic text-xs font-semibold tracking-[0.24em] text-[var(--color-brand-sand)]">
                  {t('حيث تبدأ الحكايات', 'Where stories begin')}
                </span>
                <h2 className="visual-section-title mt-3 font-kufi text-3xl font-bold leading-relaxed text-[var(--color-brand-linen)] sm:text-4xl lg:text-5xl">
                  {t('زيارة هاجس', 'Visit Hajiss')}
                </h2>
                <p className="mt-4 font-arabic text-base font-light leading-8 text-[var(--color-brand-linen)] sm:text-lg sm:leading-9">
                  {t('هاجس مو مجرد مكان تشرب فيه قهوتك المختصة...', 'Hajiss isn\'t just a place to drink your specialty coffee...')}
                </p>
                <p className="mt-3 font-arabic text-base font-light leading-8 text-[var(--color-brand-linen)] sm:text-lg sm:leading-9">
                  {t('هو مكان رايق لأحلى السوالف و لأحلى الهواجيس، وتبقى فيه أحلى الذكريات.', 'It\'s a relaxed place for the best conversations and the best thoughts, where the best memories stay.')}
                </p>
                <p className="mt-3 font-arabic text-base font-light leading-8 text-[var(--color-brand-linen)] sm:text-lg sm:leading-9">
                  {t('مكان مصمّم لناس اليوم، لكن محافظ على روح الماضي الجميل.', 'A place designed for today, while keeping the spirit of the beautiful past.')}
                </p>
              </div>

              <div className="border-t border-[rgb(var(--color-brand-sand-rgb)_/_0.25)] pt-5">
                <span className="font-arabic text-xs font-semibold tracking-[0.2em] text-[var(--color-brand-sand)]">
                  {t('فلسفتنا', 'Our philosophy')}
                </span>
                <p className="mt-3 font-arabic text-base font-light leading-8 text-[var(--color-brand-linen)] sm:text-lg sm:leading-9">
                  {t('اللي يميّز المقهى مو بس القهوة الي يقدّمها...', 'What makes a café special isn\'t only the coffee it serves...')}
                </p>
                <p className="mt-3 font-arabic text-base font-light leading-8 text-[var(--color-brand-linen)] sm:text-lg sm:leading-9">
                  {t('اللي يميّزه هو الشعور اللي يتركه في نفوس الناس.', 'It\'s the feeling it leaves with people.')}
                </p>
                <p className="mt-3 font-arabic text-base font-light leading-8 text-[var(--color-brand-linen)] sm:text-lg sm:leading-9">
                  {t('والدليل الحقيقي على هالشعور بسيط جدًا "هاجس تحس انه منك .. من أول لحظة تزوره".', 'And the real proof of that feeling is simple: "Hajiss feels like yours... from the very first visit."')}
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
