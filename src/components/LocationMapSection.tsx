import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { brandData } from '../data/brand';

export const LocationMapSection: React.FC = () => {
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(brandData.location.address)}&output=embed`;

  return (
    <section
      aria-labelledby="location-map-title"
      className="w-full bg-[#160D08] py-20 text-[#F8F4EC] sm:py-24"
      dir="rtl"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 text-right sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <span className="font-arabic text-xs font-medium tracking-widest text-[#E3C994]">
              ننتظركم في هاجس
            </span>
            <h2 id="location-map-title" className="font-kufi text-3xl font-bold sm:text-4xl">
              موقعنا
            </h2>
            <p className="flex items-start gap-2 font-arabic text-sm leading-relaxed text-[#D8CEBF]">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#C8A46A]" />
              <span>{brandData.location.address}</span>
            </p>
          </div>
          <a
            href={brandData.location.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-[#C8A46A] px-5 py-3 font-arabic text-sm text-[#F8F4EC] transition-colors hover:bg-[#C8A46A] hover:text-[#090604]"
          >
            <span>افتح في خرائط Google</span>
            <Navigation className="h-4 w-4" />
          </a>
        </div>

        <iframe
          title="موقع مقهى هاجس على الخريطة"
          src={mapEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-[320px] w-full rounded-2xl border border-[#C8A46A]/30 sm:h-[420px]"
        />
      </div>
    </section>
  );
};
