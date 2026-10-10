import React from 'react';

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
  return (
    <div
      {...elementProps}
      className={`${className}`.trim()}
      style={{ animationDelay: `${delay}ms` }}
      data-reveal-direction={direction}
    >
      {children}
    </div>
  );
};
