import React, { useState, useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion';

interface Service {
  img?: string;
  title: string;
  text: string;
}

interface AnimatedServicesSectionProps {
  services: Service[];
}

const ArrowSec: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

export const AnimatedServicesSection: React.FC<AnimatedServicesSectionProps> = ({ services }) => {
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
      className="lg:max-w-[1200px] flex flex-col gap-8 lg:gap-10 lg:flex-row px-5 md:px-12 xl:px-0 w-full mx-auto pt-[100px] lg:pt-[100px] justify-between"
    >
      {services.map((service, index) => (
        <div
          key={service.title}
          style={isVisible ? { transitionDelay: `${index * 120}ms` } : undefined}
          className={`group relative w-full max-w-[358px] mx-auto flex flex-col items-center gap-5 text-center
                      rounded-card bg-white p-8 md:p-10
                      shadow-card hover:shadow-lift
                      transition-[transform,box-shadow,opacity] duration-700 ease-out-smooth
                      ${isVisible ? 'revealed' : 'reveal-init'}
                      motion-reduce:transition-none`}
        >
          {service.img && (
            <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-surface/50 transition-colors duration-300 group-hover:bg-surface/80 motion-reduce:transition-none">
              <img
                src={service.img}
                alt=""
                width={64}
                height={64}
                loading="lazy"
                decoding="async"
                className="w-8 h-8 md:w-10 md:h-10 object-contain"
              />
            </div>
          )}
          <h3 className="text-text-blue font-dm text-[22px] md:text-[25px] leading-snug">
            {service.title}
          </h3>
          <p className="text-base md:text-[22px] tracking-tight font-jost text-text-gray leading-[33px]">
            {service.text}
          </p>
          <a
            href="/services"
            className="mt-2 inline-flex items-center gap-2 text-lg font-semibold font-jost tracking-tight leading-snug text-text-gray-200
                       transition-colors duration-300 group-hover:text-accent-dark
                       focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent
                       motion-reduce:transition-none"
          >
            Más información
            <ArrowSec className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
          </a>
        </div>
      ))}
    </section>
  );
};
