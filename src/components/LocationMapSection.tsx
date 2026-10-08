import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { brandData } from '../data/brand';

export const LocationMapSection: React.FC = () => {
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(brandData.location.mapQuery)}&output=embed`;

  return (
    <section
      aria-labelledby="location-map-title"
      className="w-full bg-[#292D1D] py-16 text-[#F8F4EC] sm:py-20"
      dir="rtl"
    >
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8" dir="ltr">
        <div className="visual-media relative overflow-hidden rounded-2xl border border-[#C8A46A]/25 shadow-[0_16px_36px_rgba(0,0,0,0.18)]">
          <iframe
            title="موقع مقهى هاجس على الخريطة"
            src={mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="pointer-events-none block h-64 w-full border-0 sm:h-80"
          />
          <a
            href={brandData.location.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="افتح موقع مقهى هاجس الدقيق على خرائط Google"
            className="absolute inset-0"
          />
        </div>

        <div className="self-start text-right" dir="rtl">
          <h2 id="location-map-title" className="visual-section-title font-kufi text-3xl font-bold sm:text-4xl">
            موقعنا
          </h2>
          <p className="mt-4 flex items-start gap-2 font-arabic text-sm leading-7 text-[#D8CEBF]">
            <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-[#E3C994]" />
            <span>{brandData.location.placeAr}، {brandData.location.cityAr}</span>
          </p>
          <a
            href={brandData.location.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="visual-button mt-4 inline-flex items-center gap-2 rounded-full border border-transparent px-4 font-arabic text-sm text-[#E3C994] transition-colors hover:border-[#C8A46A]/35 hover:text-[#F8F4EC]"
          >
            <Navigation className="h-4 w-4" />
            افتح الموقع على الخريطة
          </a>
        </div>
      </div>
    </section>
  );
};
