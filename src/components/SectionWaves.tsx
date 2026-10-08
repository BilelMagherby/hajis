import React from 'react';

interface SectionWavesProps {
  topColor: string;
  bottomColor: string;
}

export const SectionWaves: React.FC<SectionWavesProps> = ({ topColor, bottomColor }) => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
    <svg
      className="absolute inset-x-0 top-0 h-20 w-full"
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      focusable="false"
    >
      <path
        fill={topColor}
        d="M0 0H1440V40C1240 76 1110 20 900 48C690 76 520 20 320 52C190 72 90 40 0 62V0Z"
      />
    </svg>
    <svg
      className="absolute inset-x-0 bottom-0 h-20 w-full"
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      focusable="false"
    >
      <path
        fill={bottomColor}
        d="M0 100H1440V50C1240 22 1110 76 900 48C690 20 520 80 320 48C190 28 90 64 0 40V100Z"
      />
    </svg>
  </div>
);
