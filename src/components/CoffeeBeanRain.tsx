import React, { useEffect, useState } from 'react';
import './CoffeeBeanRain.css';

const coffeeBeans = Array.from({ length: 22 }, (_, index) => ({
  id: index,
  left: `${(index * 47 + 11) % 100}%`,
  size: 12 + ((index * 13) % 13),
  duration: 13 + ((index * 7) % 11),
  delay: -((index * 5) % 21),
  drift: `${((index * 17) % 100) - 50}px`,
  rotation: `${(index * 37) % 180}deg`,
  opacity: 0.24 + ((index * 11) % 30) / 100,
}));

export const CoffeeBeanRain: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let frame = 0;

    const updateVisibility = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const viewportMiddle = window.innerHeight / 2;
        const activeSection = Array.from(
          document.querySelectorAll<HTMLElement>('main > section')
        ).find((section) => {
          const bounds = section.getBoundingClientRect();
          return bounds.top <= viewportMiddle && bounds.bottom > viewportMiddle;
        });

        setIsVisible(activeSection?.dataset.beanRain !== 'off');
      });
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
    };
  }, []);

  return (
    <div className={`coffee-bean-rain ${isVisible ? '' : 'coffee-bean-rain--hidden'}`} aria-hidden="true">
      {coffeeBeans.map((bean) => (
        <span
          key={bean.id}
          className="coffee-bean"
          style={{
            left: bean.left,
            width: `${bean.size}px`,
            height: `${bean.size * 1.55}px`,
            animationDuration: `${bean.duration}s`,
            animationDelay: `${bean.delay}s`,
            opacity: bean.opacity,
            '--bean-drift': bean.drift,
            '--bean-rotation': bean.rotation,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};
