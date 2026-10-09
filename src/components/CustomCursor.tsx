import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement;
      const hovered =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        Boolean(target.closest('button')) ||
        Boolean(target.closest('a')) ||
        target.getAttribute('role') === 'button';

      setIsHovered(hovered);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
      setIsHovered(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 transition-transform duration-75 ease-out hidden md:block"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) scale(${isHovered ? 1.6 : 1})`,
      }}
    >
      <div
        className={`rounded-full transition-all duration-300 ${
          isHovered
            ? 'w-10 h-10 border border-[var(--color-brand-sand)] bg-[rgb(var(--color-brand-sand-rgb)_/_0.2)] backdrop-blur-[1px] shadow-[0_0_15px_rgb(var(--color-brand-sand-rgb)_/_0.4)]'
            : 'w-4 h-4 rounded-full bg-[rgb(var(--color-brand-sand-rgb)_/_0.8)] shadow-[0_0_8px_rgb(var(--color-brand-sand-rgb)_/_0.5)]'
        }`}
      />
    </div>
  );
};
