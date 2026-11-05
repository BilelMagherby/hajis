import React, { useState } from 'react';
import { ShoppingBag, ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { useLanguage } from '../i18n/language';
import { ShopQrCode } from './ShopQrCode';
import './ShopQrCode.css';

export const StoreTeaser: React.FC = () => {
  const { t, isEnglish } = useLanguage();
  const [selectedRating, setSelectedRating] = useState(0);
  const [opinion, setOpinion] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedRating || !opinion.trim()) {
      return;
    }

    setIsSubmitted(true);
    setSelectedRating(0);
    setOpinion('');
  };

  return (
    <section className="store-teaser-section relative w-full overflow-hidden border-y border-[rgb(var(--color-brand-sand-rgb)_/_0.3)] bg-[var(--color-brand-linen)] py-8 sm:py-20 lg:py-24">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
          <article className="brand-texture-linen visual-card flex h-full flex-col justify-center gap-6 rounded-3xl border border-[rgb(var(--color-brand-chocolate-rgb)_/_0.2)] p-6 text-start shadow-[0_18px_50px_rgba(0,0,0,0.18)] sm:gap-8 sm:p-9 md:flex-row md:items-center md:justify-between">
            {/* QR CODE & BADGE */}
            <div className="visual-card flex shrink-0 flex-col items-center rounded-2xl border border-[rgb(var(--color-brand-chocolate-rgb)_/_0.2)] bg-[var(--color-brand-linen)] p-4 shadow-lg">
              <ShopQrCode className="w-28 h-28 bg-[var(--color-brand-linen)] p-2 rounded-xl flex items-center justify-center" imageClassName="w-full h-full object-contain" />
              <span className="font-arabic text-[11px] text-[var(--color-brand-chocolate)] mt-2 font-medium">
                {t('امسح الكود لزيارة المتجر', 'Scan to visit the store')}
              </span>
            </div>

            {/* TEXT & CALL TO ACTION */}
            <div className="space-y-3 md:flex-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--color-brand-chocolate-rgb)_/_0.4)] bg-[var(--color-brand-linen)] px-3 py-1 text-xs font-arabic text-[var(--color-brand-chocolate)]">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{t('تسوق أونلاين وتوصيل فوري', 'Shop online with fast delivery')}</span>
              </div>

              <p className="font-arabic text-sm text-[var(--color-brand-chocolate)] max-w-lg leading-relaxed font-medium">
                {t(
                  'لآ يفوتكم متجرنا بهاجس ومتجره الإلكتروني "عروضنا مستمرة" محاصيل مميزة، وأدوات قهوة متنوعة مع التوصيل لجميع مناطق المملكة.',
                  'Don\'t miss our shop at Hajiss and our online store — "our offers never stop." Distinctive beans and a wide range of coffee tools, with delivery across the Kingdom.'
                )}
              </p>

              <div className="pt-2 flex justify-start">
                <a
                  href="https://hajiss.shop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brand-button-primary visual-button inline-flex items-center gap-3 rounded-full px-7 py-3 font-arabic text-sm font-medium transition-all shadow-lg"
                >
                  <span>{t('زيارة المتجر الإلكتروني', 'Visit the online store')}</span>
                  {isEnglish ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                </a>
              </div>
            </div>
          </article>

          <form
            onSubmit={handleSubmit}
            style={{ backgroundColor: '#785b40' }}
            className="visual-card flex h-full w-full flex-col justify-between rounded-[1.75rem] border border-[rgb(var(--color-brand-sand-rgb)_/_0.3)] bg-[#785b40] p-6 text-start shadow-[0_18px_50px_rgba(0,0,0,0.18)] sm:p-8"
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h4 className="mt-1 font-kufi text-xl text-[var(--color-brand-linen)]">
                  {t('قيّم تجربتك', 'Rate your experience')}
                </h4>
              </div>

              <div className="flex items-center gap-1 rounded-full border border-[rgb(var(--color-brand-sand-rgb)_/_0.4)] bg-[var(--color-brand-linen)] px-2 py-1">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    aria-label={t(`تقييم ${value} نجوم`, `Rate ${value} ${value === 1 ? 'star' : 'stars'}`)}
                    onClick={() => setSelectedRating(value)}
                    className="visual-rating-control rounded-full transition-transform hover:scale-110 focus:outline-none"
                  >
                    <Star className={`h-4 w-4 ${selectedRating >= value ? 'fill-[var(--color-brand-chocolate)] text-[var(--color-brand-chocolate)]' : 'text-[var(--color-brand-chocolate)]'}`} />
                  </button>
                ))}
              </div>
            </div>

            <textarea
              value={opinion}
              onChange={(event) => {
                setOpinion(event.target.value);
                if (isSubmitted) setIsSubmitted(false);
              }}
              rows={4}
              placeholder={t('شاركنا رأيك عن المتجر وتجربة التسوق...', 'Tell us what you think of the store and your shopping experience...')}
              className="w-full resize-none rounded-2xl border border-[rgb(var(--color-brand-sand-rgb)_/_0.45)] bg-[var(--color-brand-linen)] px-4 py-4 text-sm leading-7 text-[var(--color-brand-chocolate)] placeholder:text-[var(--color-brand-chocolate)]/75 focus:border-[var(--color-brand-sand)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-brand-sand-rgb)_/_0.4)]"
            />

            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="text-xs font-medium text-[var(--color-brand-linen)]">
                {isSubmitted ? t('شكرًا لك! تم تسجيل رأيك.', 'Thank you! Your feedback has been recorded.') : t('نقرأ كل الآراء بعناية.', 'We read every review carefully.')}
              </span>
              <button
                type="submit"
                disabled={!selectedRating || !opinion.trim()}
                className="brand-button-primary visual-button rounded-full px-5 py-2 text-sm font-medium transition disabled:cursor-not-allowed"
              >
                {t('إرسال', 'Send')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
