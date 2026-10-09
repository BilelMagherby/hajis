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
      description: 'استخلاص متناغم يحافظ على المركبات الزيتية الخفيفة دون احتراق.'
    },
    {
      icon: Waves,
      title: 'صب حلزوني آلي دقيق',
      description: 'ترطيب تدريجي (Bloom) لمدة 45 ثانية يطلق أرقى النوتات العطرية.'
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
      className="relative w-full overflow-clip bg-[#17130F] py-20 text-[#F8F4EC] sm:py-24 lg:py-28"
    >
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8" dir="ltr">
        <div className="text-right lg:col-start-1 lg:row-start-1" dir="rtl">
          <span className="font-arabic text-xs font-medium tracking-[0.24em] text-[#E3C994]">
            خدمات V60
          </span>

          <h2 className="visual-section-title mt-5 font-kufi text-3xl font-bold leading-relaxed text-[#F8F4EC] sm:text-4xl lg:text-5xl">
            V60 في هاجس... هنا تبدأ الحكاية.
          </h2>

          <div className="my-8 h-px w-20 bg-[#C8A46A]" />

          <div className="space-y-5 font-arabic text-base leading-8 text-[#E3D9C8] sm:text-lg sm:leading-9">
            <p>
              الـ <span dir="ltr" className="font-semibold text-[#E3C994]">V60</span> عندنا مو مجرد طريقة لتحضير القهوة...
            </p>
            <p className="font-kufi text-xl font-semibold text-[#F8F4EC] sm:text-2xl">
              هو فن، وكل خطوة فيه لها أثر.
            </p>
            <p>
              الماء، ودرجة الطحن، والوقت، وطريقة الصب...
              <br className="hidden sm:block" />
              كلها تتحكم فيها الأجهزة المتطورة تحت أشراف باريستا مختص لحظة بلحظة.
            </p>

            <p className="border-r-2 border-[#C8A46A] pr-5 text-[#F8F4EC]">
              في <strong className="font-bold text-[#E3C994]">هاجس</strong>، كل كوب يُحضَّر بعناية، لأننا نؤمن أن التفاصيل الصغيرة هي اللي تصنع الفرق الكبير.
            </p>
          </div>

          <div className="mt-12 border-t border-[#C8A46A]/25 pt-8 sm:mt-14 sm:pt-10">
            <div className="mb-7 text-right">
              <span className="font-arabic text-xs font-medium tracking-[0.2em] text-[#E3C994]">
                طقس التقطير اليدوي
              </span>
              <p className="mt-4 max-w-4xl font-arabic text-base leading-8 text-[#E3D9C8] sm:text-lg sm:leading-9">
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
                  <article className="visual-card rounded-2xl border border-[#C8A46A]/25 bg-[#705747]/95 p-5 text-right shadow-[0_12px_32px_rgba(0,0,0,0.2)] backdrop-blur-sm hover:border-[#C8A46A]/60 sm:p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="font-arabic text-[10px] tracking-[0.2em] text-[#C8A46A]/80">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#C8A46A]/30 bg-[#17130F]">
                        <Icon className="h-5 w-5 text-[#E3C994]" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="font-kufi text-base font-semibold leading-7 text-[#F8F4EC]">
                      {title}
                    </h3>
                    <p className="mt-2 font-arabic text-sm leading-7 text-[#D8CEBF]">
                      {description}
                    </p>
                  </article>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:col-start-2 lg:row-start-1">
          <div className="visual-media relative h-[55svh] min-h-[320px] overflow-hidden rounded-3xl border border-[#C8A46A]/35 shadow-[0_24px_60px_rgba(0,0,0,0.4)] lg:h-[78svh] lg:max-h-[760px] lg:min-h-[480px]">
            <img
              src="/images/v60-ritual.png"
              alt="تحضير قهوة V60 بالتقطير اليدوي"
              className="h-full w-full object-cover object-center"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#17130F]/45 via-transparent to-[#17130F]/10" />
          </div>
        </div>
      </div>
    </section>
  );
};
