import React, { useState, useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion';

interface AnimatedVideoSectionProps {
  title: string;
  videoSrc: string;
}

export const AnimatedVideoSection: React.FC<AnimatedVideoSectionProps> = ({ title, videoSrc }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-paper mt-[100px] lg:mt-[150px] py-[100px] lg:py-[140px]"
    >
      <div className="w-full max-w-[1200px] mx-auto px-5 md:px-12 xl:px-0">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8">
            <p className="eyebrow text-accent flex items-center gap-4">
              <span aria-hidden="true" className="inline-block h-px w-10 bg-line"></span>
              El espacio
            </p>
            <h2
              className={`mt-5 font-dm text-[34px] leading-[1.1] md:text-[48px] text-ink max-w-[22ch]
                          transition-all duration-1000 ease-out-smooth
                          ${isVisible ? 'revealed' : 'reveal-init'}
                          motion-reduce:transition-none`}
            >
              {title}
            </h2>
          </div>
          <div className="md:col-span-4 md:text-right">
            <p className="font-jost text-base md:text-lg leading-[28px] text-ink-soft">
              Conoce nuestras instalaciones y déjate consentir.
            </p>
          </div>
        </div>

        <div
          style={isVisible ? { transitionDelay: '150ms' } : undefined}
          className={`mt-12 lg:mt-16
                      transition-all duration-1000 ease-out-smooth
                      ${isVisible ? 'revealed' : 'reveal-init'}
                      motion-reduce:transition-none`}
        >
          <figure className="paper-frame rounded-card overflow-hidden">
            <video
              className="w-full aspect-video object-cover"
              controls
              autoPlay={!prefersReducedMotion}
              loop
              muted
              playsInline
              preload="metadata"
              poster="/about.webp"
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </figure>
          <figcaption className="mt-4 flex items-center justify-between gap-4 font-jost text-sm tracking-tight text-ink-soft">
            <span>Melari Spa — instalaciones</span>
            <span className="hidden sm:inline">Video institucional</span>
          </figcaption>
        </div>
      </div>
    </section>
  );
};
