import React, { useEffect, useRef, useState } from 'react';

interface RevealOnScrollProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> {
  delay?: number;
  direction?: 'left' | 'right';
}

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'right',
  ...elementProps
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const revealWhenVisible = () => {
      const bounds = element.getBoundingClientRect();
      if (bounds.top < window.innerHeight * 0.9 && bounds.bottom > 0) {
        setIsVisible(true);
        window.removeEventListener('scroll', revealWhenVisible);
        window.removeEventListener('resize', revealWhenVisible);
      }
    };

    revealWhenVisible();
    window.addEventListener('scroll', revealWhenVisible, { passive: true });
    window.addEventListener('resize', revealWhenVisible);
    return () => {
      window.removeEventListener('scroll', revealWhenVisible);
      window.removeEventListener('resize', revealWhenVisible);
    };
  }, []);

  return (
    <div
      {...elementProps}
      ref={elementRef}
      className={`scroll-reveal-from-${direction}${isVisible ? ' is-visible' : ''} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
