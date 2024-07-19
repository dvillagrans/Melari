import React, { useState, useEffect, useRef } from 'react';

interface AnimatedVideoSectionProps {
  title: string;
  videoSrc: string;
}

export const AnimatedVideoSection: React.FC<AnimatedVideoSectionProps> = ({ title, videoSrc }) => {
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
      className="w-full px-12 xl:px-0 mx-auto pt-[100px] lg:pt-[100px] pb-[100px]"
    >
      <div
        className="w-full max-w-[1200px] mx-auto flex flex-col items-center gap-8 lg:gap-10"
      >
        <h2
          className={`font-dm tracking-wide text-center leading-[37px] lg:leading-[62.50px] text-[30px] lg:text-[50px] w-full lg:max-w-[50%] pb-2 mx-auto
                      transform transition-all duration-1000 ease-out
                      ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          {title}
        </h2>
        <div 
          className={`w-full h-[500px] lg:h-[600px]
                      transform transition-all duration-1000 ease-out
                      ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
                      ${isVisible ? 'transition-delay-200' : ''}`}
        >
          <video
            className="w-full h-full object-cover"
            controls
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
};