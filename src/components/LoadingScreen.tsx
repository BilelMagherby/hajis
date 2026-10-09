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
      className={`fixed inset-0 z-50 isolate flex flex-col items-center justify-center overflow-hidden bg-[var(--color-brand-black)] transition-opacity duration-700 ${
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
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[rgb(var(--color-brand-black-rgb)_/_0.45)] via-[rgb(var(--color-brand-black-rgb)_/_0.1)] to-[rgb(var(--color-brand-black-rgb)_/_0.55)]"
      />
      <div className="relative z-10 flex flex-col items-center space-y-6 px-4 text-center">
        <div className="relative mb-2 flex w-44 items-center justify-center sm:w-52">
          <img
            src="/images/logo-loading.png"
            alt="شعار هاجس"
            className="h-auto w-full object-contain"
          />
        </div>

        <div className="space-y-1">
          
          
          <p className="pt-3 font-arabic text-sm leading-7 text-[var(--color-brand-linen)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] sm:text-base">
            أهلاً بك في هاجس، حيث تبدأ حكاية القهوة.
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-56 h-[2px] bg-[var(--color-brand-chocolate)] rounded-full overflow-hidden mt-6 relative">
          <div
            className="h-full bg-gradient-to-r from-[var(--color-brand-sand)] via-[var(--color-brand-sand)] to-[var(--color-brand-sand)] transition-all duration-75 ease-out shadow-[0_0_12px_rgb(var(--color-brand-sand-rgb)_/_0.65)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage Counter */}
        <span className="font-mono text-xs font-medium text-[rgb(var(--color-brand-sand-rgb)_/_0.8)] tracking-widest">
          {progress}%
        </span>
      </div>
    </div>
  );
};
