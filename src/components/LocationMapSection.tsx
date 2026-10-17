import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { brandData } from '../data/brand';

export const LocationMapSection: React.FC = () => {
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(brandData.location.mapQuery)}&output=embed`;

  return (
    <section
      aria-labelledby="location-map-title"
      className="relative w-full overflow-hidden bg-[#ECE3D2] py-16 text-[#40372D] sm:py-20"
      dir="rtl"
    >
      <div className="relative z-10 mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8" dir="ltr">
        <div className="visual-media relative overflow-hidden rounded-2xl border border-[rgba(120,91,64,0.25)] shadow-[0_16px_36px_rgba(0,0,0,0.1)]">
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
          <h2 id="location-map-title" className="visual-section-title font-kufi text-3xl font-bold text-[#40372D] sm:text-4xl">
            موقعنا
          </h2>
          <p className="mt-4 flex items-start gap-2 font-arabic text-sm leading-7 text-[#40372D]">
            <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-[#785B40]" />
            <span>{brandData.location.placeAr}، {brandData.location.cityAr}</span>
          </p>
          <a
            href={brandData.location.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="brand-button-primary visual-button mt-4 inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-arabic text-sm transition-colors"
          >
            <Navigation className="h-4 w-4" />
            افتح الموقع على الخريطة
          </a>
        </div>
      </div>
    </section>
  );
};
