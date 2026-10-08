import React from 'react';
import { RevealOnScroll } from './RevealOnScroll';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      data-bean-rain="off"
      className="relative w-full py-24 lg:py-32 bg-[#292D1D] text-[#F8F4EC] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* IMAGE CONTAINER (Will appear on LEFT in RTL if it's order-2) */}
          <RevealOnScroll
            className="lg:col-span-6 relative order-2 lg:order-2 flex justify-center"
          >
            <div className="relative w-full max-w-xl">
              {/* Soft decorative shadow background */}
              <div className="absolute -inset-4 bg-[#77764A]/40 rounded-3xl blur-2xl transform -rotate-2" />

              {/* The Image Container with subtle organic border */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#C8A46A]/35 bg-[#292D1D]">
                <img
                  src="/images/about_cafe_pourover.jpeg"
                  alt="قهوة مقطرة وكرم الضيافة العربية"
                  className="w-full h-[400px] sm:h-[480px] object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#160D08]/30 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Small Heritage Tag at bottom-right of image */}
              <div className="absolute -bottom-5 right-6 bg-[#160D08] text-[#E3C994] px-5 py-2.5 rounded-full border border-[#C8A46A]/40 shadow-xl flex items-center space-x-2 space-x-reverse">
                <span className="text-[#C8A46A]">•</span>
                <span className="font-arabic text-xs font-light">حائل منذ 2020</span>
              </div>
            </div>
          </RevealOnScroll>

          {/* TEXT CONTAINER (Will appear on RIGHT in RTL if it's order-1) */}
          <RevealOnScroll
            className="lg:col-span-6 text-right order-1 lg:order-1 space-y-6"
            delay={160}
          >
            {/* Top Insignia Emblem */}
            <div dir="rtl" className="flex items-center justify-start gap-3">
              <span className="font-arabic text-xs tracking-widest text-[#E3C994] uppercase font-medium">
                أصالة المكان وروح الضيافة
              </span>
              <div className="w-12 h-auto flex items-center justify-center">
                <img
                  src="/images/logo.png"
                  alt="شعار هاجس"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            {/* Main Title */}
            <h2 className="font-kufi text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F8F4EC] tracking-tight">
               هاجس ؟
            </h2>

            {/* Introductory sentence */}
            <p className="font-arabic text-base sm:text-lg text-[#E8DCC5] font-medium leading-relaxed">
             
            </p>

            {/* The 3 Pillars List */}
            <ul dir="rtl" className="space-y-4 font-arabic text-sm sm:text-base text-[#F3EBDD] leading-relaxed">
              <li className="flex items-start gap-3 text-right">
                <span className="w-2 h-2 rounded-full bg-[#C8A46A] mt-2 flex-shrink-0" />
                <span>مقهى متخصص يقدم أفضل منتجات علامات التحميص المميزة في المملكة العربية السعودية.
</span>
              </li>
              <li className="flex items-start gap-3 text-right">
                <span className="w-2 h-2 rounded-full bg-[#C8A46A] mt-2 flex-shrink-0" />
                <span>يحضى بجلسات خرجية جميلة يلتقي فيه عشاق وشغوفي القهوة في أهم المواقع بمدينة حائل.
</span>
              </li>
              <li className="flex items-start gap-3 text-right">
                <span className="w-2 h-2 rounded-full bg-[#C8A46A] mt-2 flex-shrink-0" />
                <span>خدمة العملاء هدف ملزم لتحقيق راحتهم وثقتتهم بهاجس. .</span>
              </li>
            </ul>

            {/* Unifying statement */}
            <p className="font-arabic text-sm sm:text-base text-[#E8DCC5] leading-relaxed pt-2">
              وهذي الأشياء الثلاث مو متفرقة عن بعض، أصلها واحد، بس كل وحدة تعبّر عنه بطريقتها.
            </p>

            {/* Final Statement / Punchline */}
            <div className="pt-4 border-t border-[#C8A46A]/35">
              <p className="font-kufi text-2xl sm:text-3xl font-bold text-[#E3C994] tracking-wide">
                القهوة... طقس نعيشه.
              </p>
            </div>
          </RevealOnScroll>

        </div>

        <RevealOnScroll className="mt-24 lg:mt-32" delay={100}>
          <div
            dir="rtl"
            className="overflow-hidden rounded-3xl border border-[#C8A46A]/25 bg-[#967C6D]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="p-7 sm:p-10 lg:col-span-7 lg:p-14">
                <div className="mb-7 flex items-center gap-3">
                  <span className="h-px w-9 bg-[#C8A46A]" />
                  <span className="font-arabic text-xs font-bold tracking-[0.18em] text-[#20140F]">
                    حكاية المكان
                  </span>
                </div>

                <h3 className="font-kufi text-3xl font-bold tracking-tight text-[#160D08] sm:text-4xl">
                  قصتنا
                </h3>

                <blockquote className="mt-6 border-r-2 border-[#C8A46A] pr-5 font-kufi text-xl font-bold leading-relaxed text-[#20140F] sm:text-2xl">
                  «بدأت قصتنا من الوجار»
                </blockquote>

                <div className="mt-7 space-y-5 font-arabic text-sm leading-8 text-[#302019] sm:text-base sm:leading-9">
                  <p>
                    في منتصف التسعينيات، أنشأنا مقهى صغيرًا باسم «الوجار» في مبنى قديم بالموقع نفسه. والوجار اسمٌ تقليديٌّ في حائل، يُطلق على الموقد الذي يجتمع حوله الناس شتاءً طلبًا للدفء، وتبادلًا للأحاديث بين الأهل والأصدقاء.
                  </p>
                  <p>
                    فبعض القصص لا تنتهي؛ بل تتجدّد.
                  </p>
                  <p>
                    واليوم يعود هاجس بحلّة جديدة، بروحٍ لم تتغيّر. ليس بداية قصة جديدة، بل امتداد لحكاية بدأت قبل أكثر من ثلاثين عامًا؛ المكان نفسه، والشغف نفسه، والحرص ذاته على صناعة مساحة يجتمع فيها الناس حول ما يستحق التقدير. كان الوجار البداية، وهاجس هو الجمر الذي لم ينطفئ، واللّهب الذي اشتعل من جديد.
                  </p>
                </div>

                <div className="mt-9 flex items-center gap-3 border-t border-[#C8A46A]/20 pt-6">
                  <span className="h-2 w-2 rounded-full bg-[#C8A46A]" />
                  <span className="font-arabic text-xs font-medium tracking-wide text-[#20140F] sm:text-sm">
                    حائل · حكاية تمتد لأكثر من ثلاثين عامًا
                  </span>
                </div>
              </div>

              <div className="relative min-h-[280px] overflow-hidden lg:col-span-5 lg:min-h-full">
                <img
                  src="/images/story-majlis.png"
                  alt="مجلس حائلي يجتمع حول نار الوجار عند الغروب"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#160D08]/75 via-[#160D08]/10 to-transparent lg:bg-gradient-to-l lg:from-[#967C6D]/25 lg:via-transparent lg:to-[#967C6D]/25" />
                <span className="absolute bottom-5 right-5 rounded-full border border-[#E3C994]/40 bg-[#160D08]/65 px-4 py-2 font-arabic text-xs text-[#F3EBDD] backdrop-blur-sm sm:bottom-7 sm:right-7">
                  من الوجار إلى هاجس
                </span>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
