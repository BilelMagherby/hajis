import React from 'react';
import { ArrowUpRight, Hammer, ShoppingBag, Truck } from 'lucide-react';
import { useLanguage } from '../i18n/language';

const SHOP_URL = 'https://hajiss.shop';

/** Our other two websites: the online shop (live) and Hajiss Supply (under construction). */
export const SisterSites: React.FC = () => {
  const { t, isEnglish } = useLanguage();

  return (
    <section
      id="our-platforms"
      aria-labelledby="platforms-title"
      className="relative w-full overflow-hidden bg-[#E4D8C3] py-10 text-[#40372D] sm:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{ backgroundImage: 'radial-gradient(rgba(120,91,64,0.10) 1px, transparent 0)', backgroundSize: '22px 22px' }}
      />
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center sm:mb-12">
          <span className="font-arabic text-xs font-semibold tracking-[0.24em] text-[#785B40]">
            {t('عالم هاجس', 'The Hajiss world')}
          </span>
          <h2 id="platforms-title" className="visual-section-title mt-3 font-kufi text-3xl font-bold text-[#40372D] sm:text-4xl">
            {t('منصاتنا', 'Our Platforms')}
          </h2>
          <div className="mx-auto mt-4 flex items-center justify-center gap-3" aria-hidden="true">
            <span className="h-px w-12 bg-[#785B40]/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#785B40]" />
            <span className="h-px w-12 bg-[#785B40]/40" />
          </div>
          <p className="mx-auto mt-4 max-w-xl font-arabic text-sm leading-7 text-[#40372D]/80 sm:text-base">
            {t('بيت واحد لقصة القهوة: اشترِ من متجرنا، وتعرّف على خدماتنا للمقاهي والمشاريع.', 'One home for the coffee story: shop from our store and discover our services for cafés and businesses.')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-7">
          {/* Hajiss Shop: live */}
          <article className="brand-texture-clay visual-card relative flex flex-col overflow-hidden rounded-3xl border border-[rgb(var(--color-brand-sand-rgb)_/_0.35)] bg-[#785b40] p-6 text-start text-[var(--color-brand-linen)] shadow-[0_18px_44px_rgba(64,55,45,0.28)] sm:p-8">
            <div className="mb-5 flex items-start justify-between gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--color-brand-linen)] text-[#785B40] shadow-md">
                <ShoppingBag className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgb(var(--color-brand-sand-rgb)_/_0.5)] bg-black/15 px-3 py-1 font-arabic text-[11px] font-semibold text-[var(--color-brand-linen)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8fd18f]" aria-hidden="true" />
                {t('متاح الآن', 'Open now')}
              </span>
            </div>
            <h3 className="font-kufi text-2xl font-bold text-[var(--color-brand-linen)]">
              {t('متجر هاجس', 'Hajiss Shop')}
            </h3>
            <p dir="ltr" className="mt-1 font-brand text-sm tracking-[0.12em] text-[var(--color-brand-sand)]">hajiss.shop</p>
            <p className="mt-4 flex-1 font-arabic text-sm leading-7 text-[var(--color-brand-linen)]/90 sm:text-base sm:leading-8">
              {t('محاصيل قهوة مختارة وأدوات تحضير متنوعة، مع التوصيل إلى جميع مناطق المملكة.', 'Hand-picked coffee beans and brewing tools, delivered across the Kingdom.')}
            </p>
            <a
              href={SHOP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="brand-button-primary visual-button mt-6 inline-flex items-center justify-center gap-2 self-start rounded-full px-6 py-3 font-arabic text-sm font-medium shadow-lg transition-all"
            >
              <span>{t('زيارة المتجر', 'Visit the shop')}</span>
              <ArrowUpRight className={`h-4 w-4 ${isEnglish ? '' : '-scale-x-100'}`} aria-hidden="true" />
            </a>
          </article>

          {/* Hajiss Supply: under construction */}
          <article
            aria-label={t('هاجس للتوريد — قيد الإنشاء', 'Hajiss Supply — under construction')}
            className="visual-card relative flex flex-col overflow-hidden rounded-3xl border-2 border-dashed border-[#785B40]/45 bg-[var(--color-brand-linen)] p-6 text-start text-[#40372D] shadow-[0_14px_36px_rgba(64,55,45,0.14)] sm:p-8"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-2 opacity-70"
              style={{ backgroundImage: 'repeating-linear-gradient(-45deg, #785B40 0 10px, #E4D8C3 10px 20px)' }}
            />
            <div className="mb-5 mt-2 flex items-start justify-between gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#785b40] text-[var(--color-brand-linen)] shadow-md">
                <Truck className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#785B40]/50 bg-[#E4D8C3] px-3 py-1 font-arabic text-[11px] font-semibold text-[#785B40]">
                <Hammer className="h-3 w-3" aria-hidden="true" />
                {t('قيد الإنشاء', 'Under construction')}
              </span>
            </div>
            <h3 className="font-kufi text-2xl font-bold text-[#40372D]">
              {t('هاجس للتوريد', 'Hajiss Supply')}
            </h3>
            <p className="mt-1 font-arabic text-sm text-[#785B40]">
              {t('خدمات التوزيع والتوريد للمقاهي', 'Distribution & supply for cafés')}
            </p>
            <p className="mt-4 flex-1 font-arabic text-sm leading-7 text-[#40372D]/85 sm:text-base sm:leading-8">
              {t('منصة جديدة لتزويد المقاهي والمشاريع بالبُن ومستلزمات القهوة بتوريد منتظم وسريع. نجهّزها لكم بعناية.', 'A new platform supplying cafés and businesses with coffee beans and coffee essentials, with regular, fast deliveries. We are preparing it with care.')}
            </p>
            <span
              aria-disabled="true"
              className="mt-6 inline-flex cursor-default items-center justify-center gap-2 self-start rounded-full border border-[#785B40]/40 bg-[#E4D8C3] px-6 py-3 font-arabic text-sm font-medium text-[#785B40]"
            >
              {t('قريباً', 'Coming soon')}
            </span>
          </article>
        </div>
      </div>
    </section>
  );
};
