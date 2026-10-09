import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './LoadingScreen.css';

interface LoadingScreenProps {
  onComplete: () => void;
}

const entranceSessionKey = 'hajiss-entrance-seen';
const particles = Array.from({ length: 18 }, (_, index) => ({
  left: `${8 + ((index * 37) % 84)}%`,
  top: `${14 + ((index * 53) % 70)}%`,
  delay: `${(index % 7) * -0.7}s`,
}));

export const shouldPlayEntrance = (pathname: string): boolean => {
  if (pathname !== '/') return false;

  try {
    return window.sessionStorage.getItem(entranceSessionKey) !== 'true';
  } catch (error) {
    console.warn('The HAJISS entrance was skipped because session storage is unavailable.', error);
    return false;
  }
};

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    try {
      window.sessionStorage.setItem(entranceSessionKey, 'true');
    } catch (error) {
      console.warn('The HAJISS entrance could not be saved for this session.', error);
    }

    const scene = sceneRef.current;
    if (!scene) {
      onComplete();
      return;
    }

    skipRef.current?.focus();

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const doors = scene.querySelectorAll<HTMLElement>('.hajiss-intro__door');
    const timeline = gsap.timeline({ onComplete });

    if (reducedMotion) {
      timeline
        .set(doors, { rotationY: (index) => (index === 0 ? 108 : -108) })
        .set(scene.querySelector('.hajiss-intro__door-mark'), { opacity: 0 })
        .set(scene.querySelector('.hajiss-intro__copy'), { opacity: 1, y: 0 })
        .set(scene.querySelector('.hajiss-intro__welcome'), { opacity: 1, y: 0 })
        .set(scene.querySelector('.hajiss-intro__subtitle'), { opacity: 1, y: 0 })
        .to(scene, { opacity: 0, duration: 0.28, delay: 0.35, ease: 'power1.out' });
    } else {
      timeline
        .to(doors[0], { rotationY: 108, duration: 1.35, ease: 'power3.inOut' }, 0.48)
        .to(doors[1], { rotationY: -108, duration: 1.35, ease: 'power3.inOut' }, 0.48)
        .to(scene.querySelector('.hajiss-intro__door-mark'), { opacity: 0, duration: 0.24 }, 0.55)
        .to(scene.querySelector('.hajiss-intro__sanctuary'), { scale: 1.09, duration: 2.7, ease: 'power1.inOut' }, 0.48)
        .to(scene.querySelector('.hajiss-intro__light'), { opacity: 1, scaleX: 1, duration: 1.15, ease: 'power2.out' }, 0.9)
        .to(scene.querySelectorAll('.hajiss-intro__particle'), {
          opacity: 0.75,
          y: -30,
          duration: 1.2,
          stagger: 0.035,
          ease: 'sine.out',
        }, 1.12)
        .to(scene.querySelector('.hajiss-intro__copy'), { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 1.62)
        .to(scene.querySelector('.hajiss-intro__welcome'), { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' }, 1.78)
        .to(scene.querySelector('.hajiss-intro__subtitle'), { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' }, 2.05)
        .to(scene.querySelector('.hajiss-intro__light'), { opacity: 0.96, scale: 1.25, duration: 0.66, ease: 'power2.in' }, 3.42)
        .to(scene, { opacity: 0, scale: 1.035, duration: 0.65, ease: 'power2.inOut' }, 3.56);
    }

    const skipIntro = () => timeline.progress(1);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') skipIntro();
    };

    skipRef.current?.addEventListener('click', skipIntro);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      timeline.kill();
      skipRef.current?.removeEventListener('click', skipIntro);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  return (
    <div
      ref={sceneRef}
      className="hajiss-intro"
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to HAJISS"
      dir="ltr"
    >
      <div className="hajiss-intro__sanctuary" aria-hidden="true">
        <img
          className="hajiss-intro__sanctuary-image"
          src="/images/hero-cafe-interior.jpeg"
          alt=""
          fetchPriority="low"
          decoding="async"
        />
        <div className="hajiss-intro__room-shade" />
        <div className="hajiss-intro__light" />
        {particles.map((particle, index) => (
          <span
            key={index}
            className="hajiss-intro__particle"
            style={{ left: particle.left, top: particle.top, animationDelay: particle.delay }}
          />
        ))}
      </div>

      <div className="hajiss-intro__frame" aria-hidden="true">
        <div className="hajiss-intro__frame-inset" />
        <div className="hajiss-intro__door hajiss-intro__door--left">
          <span className="hajiss-intro__door-face">
            <span className="hajiss-intro__door-panel" />
            <span className="hajiss-intro__hinge hajiss-intro__hinge--top" />
            <span className="hajiss-intro__hinge hajiss-intro__hinge--bottom" />
            <span className="hajiss-intro__handle hajiss-intro__handle--left" />
          </span>
        </div>
        <div className="hajiss-intro__door hajiss-intro__door--right">
          <span className="hajiss-intro__door-face">
            <span className="hajiss-intro__door-panel" />
            <span className="hajiss-intro__hinge hajiss-intro__hinge--top" />
            <span className="hajiss-intro__hinge hajiss-intro__hinge--bottom" />
            <span className="hajiss-intro__handle hajiss-intro__handle--right" />
          </span>
        </div>
        <div className="hajiss-intro__door-mark">
          <img src="/images/logo.png" alt="" />
        </div>
      </div>

      <div className="hajiss-intro__copy" aria-live="polite">
        <img className="hajiss-intro__logo" src="/images/logo.png" alt="HAJISS هاجس" />
        <p className="hajiss-intro__welcome">Welcome to HAJISS.</p>
        <p className="hajiss-intro__subtitle">Where every cup becomes a ritual.</p>
      </div>

      <button ref={skipRef} className="hajiss-intro__skip" type="button">
        Skip intro <span aria-hidden="true">↗</span>
      </button>
    </div>
  );
};
