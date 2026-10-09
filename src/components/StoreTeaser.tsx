import React, { useState } from 'react';
import { ShoppingBag, ArrowLeft, Star } from 'lucide-react';
import { ShopQrCode } from './ShopQrCode';
import './ShopQrCode.css';

export const StoreTeaser: React.FC = () => {
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
    <section className="store-teaser-section relative w-full overflow-hidden border-y border-[rgb(var(--color-brand-sand-rgb)_/_0.3)] bg-[var(--color-brand-linen)] py-16 sm:py-20 lg:py-24">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
          <article className="brand-texture-linen visual-card flex h-full flex-col justify-center gap-6 rounded-3xl border border-[rgb(var(--color-brand-chocolate-rgb)_/_0.2)] p-6 text-right shadow-[0_18px_50px_rgba(0,0,0,0.18)] sm:gap-8 sm:p-9 md:flex-row md:items-center md:justify-between">
            {/* QR CODE & BADGE */}
            <div className="visual-card flex shrink-0 flex-col items-center rounded-2xl border border-[rgb(var(--color-brand-chocolate-rgb)_/_0.2)] bg-[var(--color-brand-linen)] p-4 shadow-lg">
              <ShopQrCode className="w-28 h-28 bg-[var(--color-brand-linen)] p-2 rounded-xl flex items-center justify-center" imageClassName="w-full h-full object-contain" />
              <span className="font-arabic text-[11px] text-[var(--color-brand-chocolate)] mt-2 font-medium">
                امسح الكود لزيارة المتجر
              </span>
            </div>

            {/* TEXT & CALL TO ACTION */}
            <div className="space-y-3 md:flex-1">
              <div className="inline-flex items-center space-x-2 space-x-reverse rounded-full border border-[rgb(var(--color-brand-chocolate-rgb)_/_0.4)] bg-[var(--color-brand-linen)] px-3 py-1 text-xs font-arabic text-[var(--color-brand-chocolate)]">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>تسوق أونلاين وتوصيل فوري</span>
              </div>

              <p className="font-arabic text-sm text-[var(--color-brand-chocolate)] max-w-lg leading-relaxed font-medium">
                لآ يفوتكم متجرنا بهاجس ومتجره الإلكتروني "عروضنا مستمرة" 

محاصيل مميزة، وأدوات قهوة متنوعة مع التوصيل لجميع مناطق المملكة. 
.
              </p>

              <div className="pt-2 flex justify-end">
                <a
                  href="https://hajiss.shop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brand-button-primary visual-button inline-flex items-center space-x-3 space-x-reverse rounded-full px-7 py-3 font-arabic text-sm font-medium transition-all shadow-lg"
                >
                  <span>زيارة المتجر الإلكتروني</span>
                  <ArrowLeft className="w-4 h-4" />
                </a>
              </div>
            </div>
          </article>

          <form onSubmit={handleSubmit} className="brand-texture-clay visual-card flex h-full w-full flex-col justify-between rounded-[1.75rem] border border-[rgb(var(--color-brand-chocolate-rgb)_/_0.3)] p-6 text-right shadow-[0_18px_50px_rgba(0,0,0,0.18)] sm:p-8">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h4 className="mt-1 font-kufi text-xl text-[var(--color-brand-black)]">
                  قيّم تجربتك
                </h4>
              </div>

              <div className="flex items-center gap-1 rounded-full border border-[rgb(var(--color-brand-chocolate-rgb)_/_0.4)] bg-[var(--color-brand-linen)] px-2 py-1">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    aria-label={`تقييم ${value} نجوم`}
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
              placeholder="شاركنا رأيك عن المتجر وتجربة التسوق..."
              className="w-full resize-none rounded-2xl border border-[rgb(var(--color-brand-chocolate-rgb)_/_0.45)] bg-[var(--color-brand-linen)] px-4 py-4 text-sm leading-7 text-[var(--color-brand-chocolate)] placeholder:text-[var(--color-brand-chocolate)] focus:border-[var(--color-brand-chocolate)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-brand-chocolate-rgb)_/_0.4)]"
            />

            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="text-xs font-medium text-[var(--color-brand-black)]">
                {isSubmitted ? 'شكرًا لك! تم تسجيل رأيك.' : 'نقرأ كل الآراء بعناية.'}
              </span>
              <button
                type="submit"
                disabled={!selectedRating || !opinion.trim()}
                className="brand-button-primary visual-button rounded-full px-5 py-2 text-sm font-medium transition disabled:cursor-not-allowed"
              >
                إرسال
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
