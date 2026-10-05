import React, { useState } from 'react';
import { Droplet, Flame, Mountain, Coffee, Sparkles } from 'lucide-react';
import { featuresData } from '../data/features';

export const PhilosophySection: React.FC = () => {
  const [activeCard, setActiveCard] = useState<string>('roast');

  const getIcon = (type: string) => {
    switch (type) {
      case 'droplet':
        return <Droplet className="w-5 h-5 text-[#E3C994]" />;
      case 'flame':
        return <Flame className="w-5 h-5 text-[#E3C994]" />;
      case 'mountain':
        return <Mountain className="w-5 h-5 text-[#E3C994]" />;
      case 'bean':
        return <Sparkles className="w-5 h-5 text-[#E3C994]" />;
      case 'coffee':
      default:
        return <Coffee className="w-5 h-5 text-[#E3C994]" />;
    }
  };

  return (
    <section
      id="philosophy"
      className="relative w-full py-28 bg-[#160D08] text-[#F8F4EC] overflow-hidden"
    >
      {/* Background Subtle Gradient & Grain */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#090604] via-[#160D08] to-[#090604] pointer-events-none" />
      <div className="absolute inset-0 grain-overlay pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* TOP ROW: HEADINGS & ROASTER STORY SHOWCASE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          
          {/* LEFT: SECTION TITLE WITH GOLD ACCENT */}
          <div className="lg:col-span-6 text-right">
            <div className="flex items-center justify-end space-x-3 space-x-reverse mb-3">
              <span className="h-[1px] w-12 bg-[#C8A46A]/60" />
              <span className="font-arabic text-xs tracking-widest text-[#E3C994] uppercase font-semibold">
                معايير الجودة والكمال
              </span>
            </div>
            <h2 className="font-kufi text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F8F4EC]">
              ماذا يميّز هاجس؟
            </h2>
          </div>

          {/* RIGHT: STORYTELLING & ROASTER PREVIEW BANNER */}
          <div className="lg:col-span-6 text-right">
            <div className="relative rounded-2xl overflow-hidden border border-[#C8A46A]/30 p-8 bg-[#24150E]/60 backdrop-blur-md shadow-2xl">
              {/* Subtle Roaster Background Image */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <img
                  src="/images/roaster_beans.jpg"
                  alt="Roaster"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="relative z-10 space-y-2">
                <h3 className="font-kufi text-2xl sm:text-3xl font-semibold text-[#F8F4EC] leading-snug">
                  كل كوب محضر <span className="text-[#E3C994]">بعناية فائقة.</span>
                </h3>
                <p className="font-arabic text-sm sm:text-base text-[#D8CEBF] font-light">
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
                    ? 'bg-[#24150E] border border-[#E3C994] shadow-gold-glow -translate-y-2'
                    : 'bg-[#1F130C]/80 border border-[#C8A46A]/20 hover:border-[#C8A46A]/60 hover:-translate-y-1'
                }`}
              >
                {/* Header: Icon & Number */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#C8A46A]/50 tracking-widest">
                    {item.number}
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-[#2A180E] border border-[#C8A46A]/30 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform">
                    {getIcon(item.icon)}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2 mt-4">
                  <h4 className="font-kufi text-lg font-semibold text-[#F8F4EC] group-hover:text-[#E3C994] transition-colors">
                    {item.titleAr}
                  </h4>
                  <p className="font-arabic text-xs text-[#C8A46A] font-medium">
                    {item.subtitleAr}
                  </p>
                  <p className="font-arabic text-xs text-[#D8CEBF]/80 leading-relaxed font-light line-clamp-3">
                    {item.descriptionAr}
                  </p>
                </div>

                {/* Bottom Gold Accent Bar */}
                <div
                  className={`h-[2px] w-full rounded-full transition-all duration-300 mt-4 ${
                    isSelected ? 'bg-gradient-to-r from-[#C8A46A] to-[#E3C994]' : 'bg-transparent'
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
