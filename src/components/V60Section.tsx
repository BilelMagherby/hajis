import React from 'react';
import { Clock, Scale, Thermometer, Waves } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';

export const V60Section: React.FC = () => {
  const brewingDetails = [
    {
      icon: Scale,
      title: 'نسبة استخلاص متوازنة',
      description: 'وزن دقيق بمعيار 1:15 لحبيبات البن مقابل الماء النقي المفلتر.'
    },
    {
      icon: Thermometer,
      title: 'درجة حرارة 92° مئوية',
      description: 'درجة حرارة مدروسة تساعد على إبراز النكهات والروائح المميزة للقهوة.'
    },
    {
      icon: Waves,
      title: 'صب حلزوني آلي دقيق  مع ترطيب تدريجي',
      description: 'ترطيب أولي لمدة 45 ثانية يساعد على تهيئة البن لمرحلة الاستخلاص وإبراز خصائصه العطرية.'
    },
    {
      icon: Clock,
      title: 'توقيت تقطير مثالي',
      description: 'دقيقتان ونصف من العناية لإنتاج فنجان متوازن الحموضة والحلاوة.'
    }
  ];

  return (
    <section
      id="v60"
      className="relative w-full overflow-clip bg-[var(--color-brand-black)] py-20 text-[var(--color-brand-linen)] sm:py-24 lg:py-28"
    >
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8" dir="ltr">
        <div className="text-right lg:col-start-1 lg:row-start-1" dir="rtl">
          <span className="font-arabic text-xs font-medium tracking-[0.24em] text-[var(--color-brand-sand)]">
            خدمات V60
          </span>

          <h2 className="visual-section-title mt-5 font-kufi text-3xl font-bold leading-relaxed text-[var(--color-brand-linen)] sm:text-4xl lg:text-5xl">
            V60 في هاجس... هنا تبدأ الحكاية.
          </h2>

          <div className="my-8 h-px w-20 bg-[var(--color-brand-sand)]" />

          <div className="space-y-5 font-arabic text-base leading-8 text-[var(--color-brand-linen)] sm:text-lg sm:leading-9">
            <p>
              الـ <span dir="ltr" className="font-semibold text-[var(--color-brand-sand)]">V60</span> عندنا مو مجرد طريقة لتحضير القهوة...
            </p>
            <p className="font-kufi text-xl font-semibold text-[var(--color-brand-linen)] sm:text-2xl">
              هو فن، وكل خطوة فيه لها أثر.
            </p>
            <p>
              الماء، ودرجة الطحن، والوقت، وطريقة الصب...
              <br className="hidden sm:block" />
              كلها تتحكم فيها الأجهزة المتطورة تحت أشراف باريستا مختص لحظة بلحظة.
            </p>

            <p className="border-r-2 border-[var(--color-brand-sand)] pr-5 text-[var(--color-brand-linen)]">
              في <strong className="font-bold text-[var(--color-brand-sand)]">هاجس</strong>، كل كوب يُحضَّر بعناية، لأننا نؤمن أن التفاصيل الصغيرة هي اللي تصنع الفرق الكبير.
            </p>
          </div>

          <div className="mt-12 border-t border-[rgb(var(--color-brand-sand-rgb)_/_0.25)] pt-8 sm:mt-14 sm:pt-10">
            <div className="mb-7 text-right">
              <span className="font-arabic text-xs font-medium tracking-[0.2em] text-[var(--color-brand-sand)]">
                طقس التقطير اليدوي
              </span>
              <p className="mt-4 max-w-4xl font-arabic text-base leading-8 text-[var(--color-brand-linen)] sm:text-lg sm:leading-9">
                تجربة قهوة مختصة تُحضَّر أمامك بكل عناية، من انتقاء أجود الحبوب حتى آخر قطرة. نختار لك أندر وأفضل المحاصيل ونحضّرها بحرفية تُبرز أدق تفاصيل النكهة وغنى المذاق.
              </p>
            </div>

            <div className="space-y-4">
              {brewingDetails.map(({ icon: Icon, title, description }, index) => (
                <RevealOnScroll
                  key={title}
                  direction="left"
                  delay={index * 90}
                >
                  <article className="visual-card rounded-2xl border border-[rgb(var(--color-brand-sand-rgb)_/_0.25)] bg-[rgb(var(--color-brand-chocolate-rgb)_/_0.95)] p-5 text-right shadow-[0_12px_32px_rgba(0,0,0,0.2)] backdrop-blur-sm hover:border-[rgb(var(--color-brand-sand-rgb)_/_0.6)] sm:p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="font-arabic text-[10px] tracking-[0.2em] text-[rgb(var(--color-brand-sand-rgb)_/_0.8)]">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[rgb(var(--color-brand-sand-rgb)_/_0.3)] bg-[var(--color-brand-black)]">
                        <Icon className="h-5 w-5 text-[var(--color-brand-sand)]" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="font-kufi text-base font-semibold leading-7 text-[var(--color-brand-linen)]">
                      {title}
                    </h3>
                    <p className="mt-2 font-arabic text-sm leading-7 text-[var(--color-brand-linen)]">
                      {description}
                    </p>
                  </article>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:col-start-2 lg:row-start-1">
          <div className="visual-media relative h-[55svh] min-h-[320px] overflow-hidden rounded-3xl border border-[rgb(var(--color-brand-sand-rgb)_/_0.35)] shadow-[0_24px_60px_rgba(0,0,0,0.4)] lg:h-[78svh] lg:max-h-[760px] lg:min-h-[480px]">
            <img
              src="/images/v60-ritual.png"
              alt="تحضير قهوة V60 بالتقطير اليدوي"
              className="h-full w-full object-cover object-center"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgb(var(--color-brand-black-rgb)_/_0.45)] via-transparent to-[rgb(var(--color-brand-black-rgb)_/_0.1)]" />
          </div>
        </div>
      </div>
    </section>
  );
};
