import React from 'react';
import { MapPin, Navigation, ArrowLeft, Clock } from 'lucide-react';

import { brandData } from '../data/brand';

export const VisitSection: React.FC = () => {
  return (
    <section
      id="visit"
      className="relative w-full py-28 bg-[#090604] text-[#F8F4EC] overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#C8A46A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* TOP ROW: SPLIT IMAGES AND LOCATION DETAILS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT: LUXURY LOUNGE TERRACE PHOTO OVERLOOKING HAIL MOUNTAINS */}
          <div className="lg:col-span-6 relative group overflow-hidden rounded-3xl border border-[#C8A46A]/30 shadow-2xl">
            <img
              src="/images/lounge_terrace.jpg"
              alt="Hajiss Lounge Terrace Hail"
              className="w-full h-[380px] sm:h-[440px] object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090604] via-transparent to-transparent pointer-events-none" />
            
            {/* Overlay badge */}
            <div className="absolute bottom-5 right-5 left-5 p-4 rounded-xl bg-[#160D08]/85 backdrop-blur-md border border-[#C8A46A]/30 text-right">
              <span className="font-brand text-xs text-[#E3C994] uppercase tracking-widest">
                Atmosphere & View
              </span>
              <p className="font-arabic text-sm text-[#F8F4EC] font-semibold mt-0.5">
                إطلالة بانورامية على جبال حائل الشامخة وجلسات خارجية دافئة
              </p>
            </div>
          </div>

          {/* RIGHT: INVITATION & HOURS */}
          <div className="lg:col-span-6 text-right space-y-5">
            <div className="flex items-center justify-end space-x-3 space-x-reverse">
              <span className="h-[1px] w-12 bg-[#C8A46A]/60" />
              <span className="font-arabic text-xs tracking-widest text-[#E3C994] uppercase font-semibold">
                حيث يلتقي الأصدقاء
              </span>
            </div>

            <h2 className="font-kufi text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F8F4EC]">
              زيارة هاجس
            </h2>

            <p className="font-arabic text-base text-[#D8CEBF] leading-relaxed font-light">
              تجربة أكثر من مجرد قهوة ... إنها جلسة، ودفء، وانتماء مستوحى من كرم حائل وضيافتها التاريخية.
            </p>

            {/* Address Card */}
            <div className="p-4 rounded-2xl bg-[#160D08] border border-[#C8A46A]/20 space-y-2">
              <div className="flex items-center justify-end space-x-2 space-x-reverse text-[#E3C994]">
                <span className="font-arabic text-sm font-semibold">{brandData.location.placeAr}</span>
                <MapPin className="w-4 h-4" />
              </div>
              <p className="font-arabic text-xs text-[#C8BAA6]">
                {brandData.location.cityAr}
              </p>
              <div className="flex items-center justify-end space-x-2 space-x-reverse text-[11px] text-[#D8CEBF]/80 pt-1">
                <span>يومياً من 6:00 صباحاً حتى 2:00 بعد منتصف الليل</span>
                <Clock className="w-3.5 h-3.5 text-[#C8A46A]" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3 justify-end">
              <a
                href={brandData.location.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 space-x-reverse px-6 py-3 rounded-full border border-[#C8A46A] bg-[#24150E] text-[#F8F4EC] text-sm hover:bg-[#C8A46A] hover:text-[#090604] transition-all shadow-gold-glow"
              >
                <span>الموقع على الخريطة</span>
                <Navigation className="w-4 h-4" />
              </a>

              <button
                onClick={() => alert('مرحباً بكم في هاجس حائل! للحجز والاستفسار يرجى التواصل عبر الواتساب أو زيارتنا مباشرة.')}
                className="inline-flex items-center space-x-2 space-x-reverse px-6 py-3 rounded-full border border-[#3D281C] text-[#D8CEBF] hover:text-[#E3C994] hover:border-[#C8A46A]/50 text-sm transition-colors"
              >
                <span>احجز زيارتك</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
