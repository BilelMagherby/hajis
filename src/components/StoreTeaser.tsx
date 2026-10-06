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
    <section className="header-primary-mix relative w-full py-20 border-t border-b border-[#C8A46A]/30 overflow-hidden">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="header-primary-mix p-8 sm:p-12 rounded-3xl border border-[#C8A46A]/40 shadow-[0_18px_50px_rgba(0,0,0,0.22)] flex flex-col gap-8 text-right lg:flex-row lg:items-stretch lg:justify-between">
          <div className="flex flex-1 flex-col gap-8 md:flex-row md:items-center md:justify-between">
            {/* QR CODE & BADGE */}
            <div className="header-primary-mix flex flex-col items-center p-4 rounded-2xl border border-[#C8A46A]/30 shadow-lg">
              <ShopQrCode className="w-28 h-28 bg-[#F8F4EC] p-2 rounded-xl flex items-center justify-center" imageClassName="w-full h-full object-contain" />
              <span className="font-arabic text-[11px] text-[#302019] mt-2 font-medium">
                امسح الكود لزيارة المتجر
              </span>
            </div>

            {/* TEXT & CALL TO ACTION */}
            <div className="space-y-3 flex-1">
              <div className="header-primary-mix inline-flex items-center space-x-2 space-x-reverse px-3 py-1 rounded-full border border-[#3D281C]/40 text-[#302019] text-xs font-arabic">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>تسوق أونلاين وتوصيل فوري</span>
              </div>

              <h3 className="font-kufi text-2xl sm:text-3xl font-bold text-[#20140F]">
                زوروا متجرنا الإلكتروني
              </h3>

              <p className="font-arabic text-sm text-[#302019] max-w-lg leading-relaxed font-medium">
                للحصول على عروض خاصة ومحاصيل هاجس الطازجة، وأدوات القهوة المختصة مع التوصيل لجميع مناطق المملكة.
              </p>

              <div className="pt-2 flex justify-end">
                <a
                  href="https://hajiss.shop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-3 space-x-reverse px-7 py-3 rounded-full bg-[#3D281C] text-[#F8F4EC] font-arabic font-semibold text-sm hover:bg-[#24150E] transition-all shadow-lg"
                >
                  <span>زيارة المتجر الإلكتروني</span>
                  <ArrowLeft className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-[#A88F81] w-full max-w-md rounded-[1.75rem] border border-[#3D281C]/45 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.22em] text-[#3D281C] uppercase">
                  opinion
                </p>
                <h4 className="mt-1 font-kufi text-xl text-[#20140F]">
                  قيّم تجربتك
                </h4>
              </div>

              <div className="bg-[#E9D9C9] flex items-center gap-1 rounded-full border border-[#3D281C]/40 px-2 py-1">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    aria-label={`تقييم ${value} نجوم`}
                    onClick={() => setSelectedRating(value)}
                    className="transition-transform hover:scale-110 focus:outline-none"
                  >
                    <Star className={`h-4 w-4 ${selectedRating >= value ? 'fill-[#3D281C] text-[#3D281C]' : 'text-[#7A5849]'}`} />
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
              className="w-full resize-none rounded-2xl border border-[#3D281C]/45 bg-[#F9EFE3] px-3 py-3 text-sm leading-7 text-[#20140F] placeholder:text-[#5B463A] focus:border-[#3D281C] focus:outline-none"
            />

            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="text-xs font-medium text-[#302019]">
                {isSubmitted ? 'شكرًا لك! تم تسجيل رأيك.' : 'نقرأ كل الآراء بعناية.'}
              </span>
              <button
                type="submit"
                disabled={!selectedRating || !opinion.trim()}
                className="rounded-full bg-[#3D281C] px-4 py-2 text-sm font-medium text-[#FDF4EC] transition enabled:hover:bg-[#24150E] disabled:cursor-not-allowed disabled:bg-[#72594B] disabled:text-[#F5E7D6]"
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
