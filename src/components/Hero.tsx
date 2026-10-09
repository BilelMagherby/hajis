import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative flex min-h-[360px] h-[calc(100svh-4rem)] w-full items-center overflow-hidden bg-[var(--color-brand-black)] select-none"
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/images/hero_cafe_dusk.png"
          alt="واجهة مقهى هاجس"
          draggable={false}
          className="hero-slide-image h-full w-full object-cover object-[center_40%] brightness-125 contrast-125 saturate-125"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgb(var(--color-brand-black-rgb)_/_0.3)] via-transparent to-[rgb(var(--color-brand-black-rgb)_/_0.1)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[rgb(var(--color-brand-black-rgb)_/_0.15)] via-transparent to-[rgb(var(--color-brand-black-rgb)_/_0.15)]" />
      </div>

      <div className="absolute inset-0 grain-overlay pointer-events-none z-10 opacity-30" />

    </section>
  );
};
