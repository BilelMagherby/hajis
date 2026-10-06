import React from 'react';
import { ArrowLeft, Clock, Thermometer, Scale, Waves } from 'lucide-react';

export const V60Section: React.FC = () => {
  const steps = [
    {
      icon: <Scale className="w-5 h-5 text-[#E3C994]" />,
      titleAr: 'نسبة استخلاص متوازنة',
      descAr: 'وزن دقيق بمعيار 1:15 لحبيبات البن مقابل الماء النقي المفلتر.',
    },
    {
      icon: <Thermometer className="w-5 h-5 text-[#E3C994]" />,
      titleAr: 'درجة حرارة 92° مئوية',
      descAr: 'استخلاص متناغم يحافظ على المركبات الزيتية الخفيفة دون احتراق.',
    },
    {
      icon: <Waves className="w-5 h-5 text-[#E3C994]" />,
      titleAr: 'صب حلزوني مدروس',
      descAr: 'ترطيب تدريجي (Bloom) لمدة 45 ثانية يطلق أرقى النوتات العطرية.',
    },
    {
      icon: <Clock className="w-5 h-5 text-[#E3C994]" />,
      titleAr: 'توقيت تقطير مثالي',
      descAr: 'دقيقتان ونصف من العناية لإنتاج فنجان متوازن الحمضية والحلاوة.',
    }
  ];

  return (
    <section
      id="v60"
      className="header-primary-mix relative w-full py-28 text-[#20140F] overflow-hidden"
    >
      {/* Background Image with Dark Gradient Vignette */}
      <div className="absolute inset-0 z-0 opacity-[0.12]">
        <img
          src="/images/v60_hero.jpg"
          alt="V60 Ceremony"
          className="w-full h-full object-cover object-center filter brightness-40 contrast-125"
        />
        <div className="header-primary-mix absolute inset-0" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* RIGHT: V60 RITUAL STEPS GRID */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 order-2 lg:order-1">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="bg-[#24150E]/95 p-5 rounded-2xl border border-[#C8A46A]/35 shadow-[0_12px_32px_rgba(0,0,0,0.28)] backdrop-blur-md hover:bg-[#1A100B] hover:border-[#C8A46A]/70 transition-all text-right group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#160D08] border border-[#C8A46A]/35 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <h4 className="font-kufi text-base font-semibold text-[#F8F4EC] group-hover:text-[#E3C994] transition-colors">
                  {step.titleAr}
                </h4>
                <p className="font-arabic text-xs text-[#D8CEBF] mt-1.5 leading-relaxed font-medium">
                  {step.descAr}
                </p>
              </div>
            ))}
          </div>

          {/* LEFT: TEXT & INTRO */}
          <div className="lg:col-span-6 text-right order-1 lg:order-2 space-y-6">
            <div className="flex items-center justify-end space-x-3 space-x-reverse">
                <span className="h-[1px] w-12 bg-[#3D281C]/60" />
                <span className="font-arabic text-xs tracking-widest text-[#3D281C] uppercase font-semibold">
                طقس التقطير اليدوي
              </span>
            </div>

            <h2 className="font-kufi text-3xl sm:text-4xl lg:text-5xl font-bold text-[#20140F] leading-tight">
              خدمات V60
            </h2>

            <p className="font-arabic text-base sm:text-lg text-[#302019] leading-relaxed font-medium">
              تجربة قهوة مختصة تُحضَّر أمامك بعناية، من اختيار الحبة حتى آخر قطرة. نختار لك أندر المحاصيل العالمية ونقطرها بحرفية تكشف أدق تفاصيل المذاق.
            </p>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center space-x-3 space-x-reverse px-8 py-3.5 rounded-full border border-[#C8A46A] bg-[#24150E]/90 text-[#F8F4EC] text-sm font-medium hover:bg-[#C8A46A] hover:text-[#090604] transition-all duration-300 shadow-gold-glow"
              >
                <span>اكتشف خدمات V60</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
