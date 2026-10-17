import React, { useState, useEffect } from 'react';

const heroImages = [
  {
    src: '/images/hero-hajis-night.jpg',
    alt: 'واجهة مقهى هاجس الخارجية ليلاً',
  },
  {
    src: '/images/hero-cafe-counter.jpeg',
    alt: 'بار قهوة مقهى هاجس',
  },
  {
    src: '/images/hero-slide-1.jpeg',
    alt: 'صالة مقهى هاجس الداخلية وشجرة الزيتون',
  },
  {
    src: '/images/hero-slide-2.jpeg',
    alt: 'ركن منتجات ومعدات قهوة هاجس',
  },
];

export const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 20000); // 20 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex w-full items-center overflow-hidden bg-[var(--color-brand-black)] select-none aspect-[16/10] sm:aspect-auto sm:min-h-[420px] sm:h-[calc(100svh-4rem)]"
    >
      <div className="absolute inset-0 overflow-hidden">
        {heroImages.map((image, index) => (
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            draggable={false}
            className={`hero-slide-image absolute inset-0 h-full w-full object-cover object-center brightness-115 contrast-115 saturate-115 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-0' : 'opacity-0 -z-10'
            }`}
          />
        ))}

        <div className="pointer-events-none absolute inset-0 z-1 bg-gradient-to-t from-[rgb(var(--color-brand-black-rgb)_/_0.3)] via-transparent to-[rgb(var(--color-brand-black-rgb)_/_0.1)]" />
        <div className="pointer-events-none absolute inset-0 z-1 bg-gradient-to-r from-[rgb(var(--color-brand-black-rgb)_/_0.15)] via-transparent to-[rgb(var(--color-brand-black-rgb)_/_0.15)]" />
      </div>

      <div className="absolute inset-0 grain-overlay pointer-events-none z-10 opacity-30" />

      {/* Navigation Indicators */}
      <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 sm:gap-2.5 bg-black/40 backdrop-blur-md px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-white/10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`الانتقال إلى الصورة ${index + 1}`}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-5 sm:w-7 h-1.5 sm:h-2 bg-[var(--color-brand-gold,#d4af37)] shadow-sm'
                : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
