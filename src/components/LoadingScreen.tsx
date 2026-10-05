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
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#160D08] transition-opacity duration-700 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center space-y-6 text-center px-4">
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
        <span className="font-mono text-xs text-[#C8A46A]/80 tracking-widest">
          {progress}%
        </span>
      </div>
    </div>
  );
};
