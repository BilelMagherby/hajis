import React from 'react';
import { Navigation } from 'lucide-react';

import { brandData } from '../data/brand';

export const VisitSection: React.FC = () => {
  return (
    <section
      id="visit"
      data-bean-rain="off"
      className="relative w-full py-20 sm:py-24 lg:py-28 bg-[#ECE3D2] text-[#40372D] overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#C8BCA7]/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14" dir="ltr">
          <div className="visual-media group relative overflow-hidden rounded-3xl border border-[rgba(120,91,64,0.25)] shadow-2xl lg:col-span-5">
            <img
              src="/images/haijs.jpeg"
              alt="قهوة هاجس المثلجة مع التوت"
              className="h-[420px] w-full object-cover object-center sm:h-[560px]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(64,55,45,0.8)] via-transparent to-[rgba(64,55,45,0.1)]" />
            <div className="absolute bottom-5 right-5 left-5 rounded-2xl border border-[rgba(200,188,167,0.3)] bg-[rgba(64,55,45,0.85)] p-5 text-right backdrop-blur-md sm:bottom-7 sm:right-7 sm:left-7">
              <span className="font-arabic text-[10px] font-medium tracking-[0.2em] text-[var(--color-brand-sand)]">
                ضيافة هاجس
              </span>
              <p className="mt-2 font-kufi text-lg font-semibold leading-relaxed text-[var(--color-brand-linen)] sm:text-xl">
                هاجس تحس إنه منك... من أول لحظة تزوره.
              </p>
            </div>
          </div>

          <div className="space-y-7 text-right lg:col-span-7" dir="rtl">
            <div>
              <span className="font-arabic text-xs font-medium tracking-[0.24em] text-[#785B40]">
                حيث تبدأ الحكايات
              </span>
              <h2 className="visual-section-title mt-4 font-kufi text-3xl font-bold leading-relaxed text-[#40372D] sm:text-4xl lg:text-5xl">
                زيارة هاجس
              </h2>
              <p className="mt-5 font-arabic text-base font-light leading-8 text-[#40372D] sm:text-lg sm:leading-9">
                هاجس مو مجرد مكان تشرب فيه قهوتك المختصة...
              </p>
              <p className="mt-4 font-arabic text-base font-light leading-8 text-[#40372D] sm:text-lg sm:leading-9">
                هو مكان رايق لأحلى السوالف و لأحلى الهواجيس، وتبقى فيه أحلى الذكريات.
              </p>
              <p className="mt-4 font-arabic text-base font-light leading-8 text-[#40372D] sm:text-lg sm:leading-9">
                مكان مصمّم لناس اليوم، لكن محافظ على روح الماضي الجميل.
              </p>
            </div>

            <div className="border-t border-[rgba(120,91,64,0.25)] pt-6">
              <span className="font-arabic text-xs font-medium tracking-[0.2em] text-[#785B40]">
                فلسفتنا
              </span>
              <p className="mt-4 font-arabic text-base font-light leading-8 text-[#40372D] sm:text-lg sm:leading-9">
                اللي يميّز المقهى مو بس القهوة الي يقدّمها...
              </p>
              <p className="mt-4 font-arabic text-base font-light leading-8 text-[#40372D] sm:text-lg sm:leading-9">
                اللي يميّزه هو الشعور اللي يتركه في نفوس الناس.
              </p>
              <p className="mt-4 font-arabic text-base font-light leading-8 text-[#40372D] sm:text-lg sm:leading-9">
                والدليل الحقيقي على هالشعور بسيط جدًا "هاجس تحس انه منك .. من أول لحظة تزوره".
              </p>
            </div>

            <div className="flex justify-end pt-1">
              <a
                href={brandData.location.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="brand-button-primary visual-button inline-flex items-center space-x-2 space-x-reverse rounded-full px-6 py-3 font-arabic text-sm shadow-gold-glow transition-all"
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
