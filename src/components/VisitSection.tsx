import React from 'react';
import { Navigation } from 'lucide-react';

import { brandData } from '../data/brand';

export const VisitSection: React.FC = () => {
  return (
    <section
      id="visit"
      data-bean-rain="off"
      className="relative w-full py-28 bg-[#292D1D] text-[#F8F4EC] overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#77764A]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14" dir="ltr">
          <div className="group relative overflow-hidden rounded-3xl border border-[#C8A46A]/30 shadow-2xl lg:col-span-5">
            <img
              src="/images/visit_v60.jpeg"
              alt="قهوة هاجس المثلجة مع التوت"
              className="h-[420px] w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 sm:h-[560px]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#17130F]/80 via-transparent to-[#17130F]/10" />
            <div className="absolute bottom-5 right-5 left-5 rounded-2xl border border-[#C8A46A]/30 bg-[#160D08]/80 p-5 text-right backdrop-blur-md sm:bottom-7 sm:right-7 sm:left-7">
              <span className="font-arabic text-[10px] font-medium tracking-[0.2em] text-[#E3C994]">
                ضيافة هاجس
              </span>
              <p className="mt-2 font-kufi text-lg font-semibold leading-relaxed text-[#F8F4EC] sm:text-xl">
                مكان تحس إنك منه... من أول خطوة تدخل فيها الباب.
              </p>
            </div>
          </div>

          <div className="space-y-7 text-right lg:col-span-7" dir="rtl">
            <div>
              <span className="font-arabic text-xs font-medium tracking-[0.24em] text-[#E3C994]">
                حيث تبدأ الحكايات
              </span>
              <h2 className="mt-4 font-kufi text-3xl font-bold leading-relaxed text-[#F8F4EC] sm:text-4xl lg:text-5xl">
                زيارة هاجس
              </h2>
              <p className="mt-5 font-arabic text-base font-light leading-8 text-[#E3D9C8] sm:text-lg sm:leading-9">
                هاجس مو مجرد مكان تشرب فيه قهوتك المختصة... هو مكان تبدأ فيه السوالف، وتقوى فيه العلاقات، وتبقى فيه الذكريات.
              </p>
              <p className="mt-4 font-arabic text-base font-light leading-8 text-[#E3D9C8] sm:text-lg sm:leading-9">
                مكان يحافظ على روح الماضي وتقاليده، لكنه مصمّم لناس اليوم.
              </p>
            </div>

            <div className="border-t border-[#C8A46A]/25 pt-6">
              <span className="font-arabic text-xs font-medium tracking-[0.2em] text-[#E3C994]">
                فلسفتنا
              </span>
              <p className="mt-4 font-arabic text-base font-light leading-8 text-[#E3D9C8] sm:text-lg sm:leading-9">
                اللي يميّز المقهى مو بس القهوة الي يقدّمها... اللي يميّزه هو الشعور اللي يتركه في نفوس الناس.
              </p>
              <p className="mt-4 font-arabic text-base font-light leading-8 text-[#E3D9C8] sm:text-lg sm:leading-9">
                والدليل الحقيقي على هالشعور بسيط جدًا: كم الوقت اللي يختار الضيف يقضيه فيه... وهو ما أحد طلب منه يبقى.
              </p>
            </div>

            <div className="flex justify-end pt-1">
              <a
                href={brandData.location.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 space-x-reverse rounded-full border border-[#C8A46A] bg-[#303522] px-6 py-3 font-arabic text-sm text-[#F8F4EC] shadow-gold-glow transition-all hover:bg-[#C8A46A] hover:text-[#090604]"
              >
                <span>الموقع على الخريطة</span>
                <Navigation className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
