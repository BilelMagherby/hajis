import React from 'react';
import { Clock, Scale, Thermometer, Waves } from 'lucide-react';

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
      className="relative w-full overflow-hidden bg-[#17130F] py-20 text-[#F8F4EC] sm:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <img
          src="/images/v60_hero.jpg"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[#17130F]/95 via-[#17130F]/80 to-[#17130F]/65" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(200,164,106,0.12),transparent_55%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-right" dir="rtl">
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
.
            </p>
            
            <p className="border-r-2 border-[#C8A46A] pr-5 text-[#F8F4EC]">
              في <strong className="font-bold text-[#E3C994]">هاجس</strong>، كل كوب يُحضَّر بعناية، لأننا نؤمن أن التفاصيل الصغيرة هي اللي تصنع الفرق الكبير.
            </p>
          </div>

          <div className="mt-12 border-t border-[#C8A46A]/25 pt-8 sm:mt-14 sm:pt-10" dir="rtl">
            <div className="mb-7 text-right">
              <span className="font-arabic text-xs font-medium tracking-[0.2em] text-[#E3C994]">
                طقس التقطير اليدوي
              </span>
              <p className="mt-4 max-w-4xl font-arabic text-base leading-8 text-[#E3D9C8] sm:text-lg sm:leading-9">
                تجربة قهوة مختصة تُحضَّر أمامك بكل عناية، من انتقاء أجود الحبوب حتى آخر قطرة. نختار لك أندر وأفضل المحاصيل ونحضّرها بحرفية تُبرز أدق تفاصيل النكهة وغنى المذاق. 

              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {brewingDetails.map(({ icon: Icon, title, description }, index) => (
                <article
                  key={title}
                  className="visual-card rounded-2xl border border-[#C8A46A]/25 bg-[#705747]/95 p-5 text-right shadow-[0_12px_32px_rgba(0,0,0,0.2)] backdrop-blur-sm hover:border-[#C8A46A]/60"
                >
                  <div className="mb-5 flex items-center justify-between">
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
