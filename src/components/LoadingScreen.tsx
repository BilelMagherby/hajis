import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1600; // ~1.6 seconds smooth luxury load

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const current = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFading(true);
          setTimeout(onComplete, 600);
        }, 200);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 isolate flex flex-col items-center justify-center overflow-hidden bg-[#160D08] transition-opacity duration-700 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <img
        src="/images/hajiss-loading.gif"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-55 motion-reduce:hidden"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#090604]/75 via-[#160D08]/40 to-[#090604]/80"
      />
      <div className="relative z-10 flex flex-col items-center space-y-6 px-4 text-center">
        {/* Logo Monogram */}
        <div className="relative w-40 sm:w-48 mb-2 flex justify-center items-center">
          <img
            src="/images/logo.png"
            alt="هاجس Hajiss"
            className="w-full h-auto object-contain filter invert contrast-125"
          />
        </div>

        {/* Brand Name */}
        <div className="space-y-1">
          <h1 className="font-kufi text-3xl md:text-4xl text-[#F8F4EC] tracking-wide">
            هـاجـس
          </h1>
          <p className="font-brand text-lg md:text-xl text-[#C8A46A] tracking-[0.3em]">
            HAJISS CAFÉ
          </p>
        </div>

        {/* Tagline */}
        <p className="font-arabic text-sm text-[#D8CEBF] tracking-wider">
          هوس التذوّق • حائل
        </p>

        {/* Progress Bar Container */}
        <div className="w-56 h-[2px] bg-[#2A180E] rounded-full overflow-hidden mt-6 relative">
          <div
            className="h-full bg-gradient-to-r from-[#C8A46A] via-[#E3C994] to-[#C8A46A] transition-all duration-75 ease-out shadow-[0_0_12px_#E3C994]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage Counter */}
        <span className="font-mono text-xs font-medium text-[#C8A46A]/80 tracking-widest">
          {progress}%
        </span>
      </div>
    </div>
  );
};
