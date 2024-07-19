import React, { useState, useEffect, useRef } from 'react';

interface Service {
  img?: string;
  title: string;
  text: string;
}

interface AnimatedServicesSectionProps {
  services: Service[];
}

const ArrowSec: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

export const AnimatedServicesSection: React.FC<AnimatedServicesSectionProps> = ({ services }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
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
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="lg:max-w-[1200px] flex flex-col gap-8 lg:gap-10 lg:flex-row px-12 xl:px-0 w-full mx-auto pt-[100px] lg:pt-[200px] justify-between"
    >
      {services.map((service, index) => (
        <div 
          key={service.title}
          className={`w-full max-w-[358px] mx-auto flex flex-col justify-end items-center gap-3 md:gap-5
                      transform transition-all duration-1000 ease-out
                      ${isVisible 
                        ? 'translate-y-0 opacity-100' 
                        : 'translate-y-10 opacity-0'}
                      ${isVisible ? `transition-delay-${index * 200}` : ''}`}
        >
          {service.img && <img src={service.img} alt="" className="hover:scale-105 transition-transform duration-300" />}
          <h3 className="text-text-blue font-dm text-[22px] md:text-[25px] leading-loose">
            {service.title}
          </h3>
          <p className="text-base md:text-[22px] tracking-tight font-jost text-text-gray leading-[33px] text-center">
            {service.text}
          </p>
          <a
            href="/services"
            className="text-text-gray-200 leading-snug text-lg tracking-tight font-jost font-semibold gap-2 py-4 md:py-8 flex items-center
                       hover:text-text-blue transition-colors duration-300 group"
          >
            Más información 
            <ArrowSec />
          </a>
        </div>
      ))}
    </section>
  );
};