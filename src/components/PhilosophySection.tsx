import React, { useState } from 'react';
import { Droplet, Flame, Mountain, Coffee, Sparkles } from 'lucide-react';
import { featuresData } from '../data/features';

export const PhilosophySection: React.FC = () => {
  const [activeCard, setActiveCard] = useState<string>('roast');

  const getIcon = (type: string) => {
    switch (type) {
      case 'droplet':
        return <Droplet className="w-5 h-5 text-[#3D281C]" />;
      case 'flame':
        return <Flame className="w-5 h-5 text-[#3D281C]" />;
      case 'mountain':
        return <Mountain className="w-5 h-5 text-[#3D281C]" />;
      case 'bean':
        return <Sparkles className="w-5 h-5 text-[#3D281C]" />;
      case 'coffee':
      default:
        return <Coffee className="w-5 h-5 text-[#3D281C]" />;
    }
  };

  return (
    <section
      id="philosophy"
      className="header-primary-mix relative w-full py-28 text-[#20140F] overflow-hidden"
    >
      {/* Background Subtle Gradient & Grain */}
      <div className="absolute inset-0 grain-overlay pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* TOP ROW: HEADINGS & ROASTER STORY SHOWCASE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16" dir="ltr">
          
          {/* LEFT: SECTION TITLE WITH GOLD ACCENT */}
          <div className="lg:col-span-6 lg:col-start-7 text-right" dir="rtl">
            <div className="flex items-center justify-start mb-3">
              <span className="font-arabic text-xs tracking-widest text-[#3D281C] uppercase font-medium">
                معايير الجودة والكمال
              </span>
            </div>
            <h2 className="font-kufi text-3xl sm:text-4xl lg:text-5xl font-bold text-[#20140F]">
              ماذا يميّز هاجس؟
            </h2>
          </div>

          {/* RIGHT: STORYTELLING & ROASTER PREVIEW BANNER */}
          <div className="lg:col-span-6 lg:col-start-1 text-right" dir="rtl">
            <div className="header-primary-mix relative rounded-2xl overflow-hidden border border-[#C8A46A]/40 p-8 backdrop-blur-md shadow-[0_18px_44px_rgba(0,0,0,0.22)]">
              {/* Subtle Roaster Background Image */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <img
                  src="/images/roaster_beans.jpg"
                  alt="Roaster"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="relative z-10 space-y-2">
                <h3 className="font-kufi text-2xl sm:text-3xl font-bold text-[#20140F] leading-snug">
                  كل كوب محضر <span className="text-[#3D281C]">بعناية فائقة.</span>
                </h3>
                <p className="font-arabic text-sm sm:text-base text-[#302019] font-medium">
                  كل كوب يُقدَّم لأنه يستحق تذوّقه. لا شيء عندنا صدفة.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM: THE 5 LUXURY FROSTED GLASS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
          {featuresData.map((item) => {
            const isSelected = activeCard === item.id;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveCard(item.id)}
                className={`relative group rounded-xl p-6 transition-all duration-500 cursor-pointer text-right flex flex-col justify-between min-h-[220px] ${
                  isSelected
                    ? 'bg-[#E9D9C9] border border-[#3D281C]/70 shadow-[0_18px_38px_rgba(0,0,0,0.18)] -translate-y-2'
                    : 'bg-[#A88F81] border border-[#3D281C]/45 hover:border-[#3D281C]/75 hover:-translate-y-1'
                }`}
              >
                {/* Header: Icon & Number */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-medium text-[#302019] tracking-widest">
                    {item.number}
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-[#E9D9C9] border border-[#3D281C]/40 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform">
                    {getIcon(item.icon)}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2 mt-4">
                  <h4 className="font-kufi text-lg font-bold text-[#20140F] group-hover:text-[#5B3626] transition-colors">
                    {item.titleAr}
                  </h4>
                  <p className="font-arabic text-xs text-[#3D281C] font-medium">
                    {item.subtitleAr}
                  </p>
                  <p className="font-arabic text-xs text-[#302019] leading-relaxed font-medium line-clamp-3">
                    {item.descriptionAr}
                  </p>
                </div>

                {/* Bottom Gold Accent Bar */}
                <div
                  className={`h-[2px] w-full rounded-full transition-all duration-300 mt-4 ${
                    isSelected ? 'bg-gradient-to-r from-[#5B3626] to-[#A7653E]' : 'bg-transparent'
                  }`}
                />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
