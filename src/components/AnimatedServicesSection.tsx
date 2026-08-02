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

const Index: React.FC<{ n: string }> = ({ n }) => (
  <span className="eyebrow text-accent" aria-hidden="true">
    {n}
  </span>
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
      className="w-full lg:max-w-[1200px] px-5 md:px-12 xl:px-0 mx-auto pt-[100px] lg:pt-[150px]"
    >
      {/* Editorial header: numbered eyebrow + asymmetric heading block */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
        <div className="md:col-span-7">
          <p className="eyebrow text-accent flex items-center gap-4">
            <span aria-hidden="true" className="inline-block h-px w-10 bg-line"></span>
            Nuestros servicios
          </p>
          <h2 className="mt-5 font-dm text-[34px] leading-[1.1] md:text-[48px] text-ink max-w-[18ch]">
            Una pausa para ti, donde la calma es el punto de partida
          </h2>
        </div>
        <div className="md:col-span-4 md:col-start-9">
          <p className="font-jost text-base md:text-lg leading-[28px] text-ink-soft max-w-[36ch]">
            Tratamientos pensados para que cada visita sea una experiencia
            completa de bienestar.
          </p>
        </div>
      </div>

      {/* Asymmetric staggered grid: the middle card drops down to build
          rhythm; each card reveals in sequence (max 3 steps). */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mt-12 lg:mt-16 items-start">
        {services.map((service, index) => {
          const offset = index === 1 ? 'md:mt-16' : index === 2 ? 'md:mt-8' : '';
          const delay = { transitionDelay: `${index * 120}ms` };
          return (
            <article
              key={service.title}
              style={isVisible ? delay : undefined}
              className={`md:col-span-4 flex flex-col ${offset}
                          transition-all duration-700 ease-out-smooth
                          ${isVisible ? 'revealed' : 'reveal-init'}
                          motion-reduce:transition-none`}
            >
              <div className="paper-frame rounded-card overflow-hidden group">
                <div className="overflow-hidden">
                  {service.img ? (
                    <img
                      src={service.img}
                      alt=""
                      width={720}
                      height={540}
                      loading="lazy"
                      decoding="async"
                      className="w-full aspect-[4/3] object-cover transition-transform duration-500 ease-out-smooth group-hover:scale-[1.03] motion-reduce:transition-none"
                    />
                  ) : (
                    <div className="w-full aspect-[4/3] bg-paper-soft" />
                  )}
                </div>
                <div className="p-6 md:p-7 flex flex-col gap-3">
                  <Index n={`0${index + 1}`} />
                  <h3 className="font-dm text-[22px] md:text-[26px] leading-snug text-ink">
                    {service.title}
                  </h3>
                  <p className="font-jost text-base leading-[26px] text-ink-soft">
                    {service.text}
                  </p>
                </div>
              </div>
              <a
                href="/services"
                className="mt-5 inline-flex items-center gap-2 font-jost text-sm font-semibold tracking-[0.08em] uppercase text-ink
                           group-hover:text-accent transition-colors duration-300
                           link-draw w-fit
                           focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent
                           motion-reduce:transition-none"
              >
                Ver servicios
                <ArrowSec className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
};
