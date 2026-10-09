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
        src="/images/loading-pour-over.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-100"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#090604]/45 via-[#160D08]/10 to-[#090604]/55"
      />
      <div className="relative z-10 flex flex-col items-center space-y-6 px-4 text-center">
        <div className="relative mb-2 flex w-40 items-center justify-center rounded-xl bg-white p-2 shadow-lg sm:w-48">
          <img
            src="/images/logo.png"
            alt="شعار هاجس"
            className="h-auto w-full object-contain"
          />
        </div>

        <div className="space-y-1">
          <h1 className="font-kufi text-3xl md:text-4xl font-bold text-white tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            هـاجـس
          </h1>
          <p className="font-brand text-lg md:text-xl font-semibold text-[#E3C994] tracking-[0.3em] drop-shadow-[0_2px_3px_rgba(0,0,0,0.9)]">
            مقهى هاجس
          </p>
          <p className="pt-3 font-arabic text-sm leading-7 text-[#F8F4EC] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] sm:text-base">
            أهلاً بك في هاجس، حيث تبدأ حكاية القهوة.
          </p>
        </div>

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
