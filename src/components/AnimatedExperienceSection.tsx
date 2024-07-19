import React, { useState, useEffect, useRef } from 'react';
import { Experience } from './experience'; 

interface ExperienceItem {
  text: string;
  num: number;
}

interface AnimatedExperienceSectionProps {
  experiences: ExperienceItem[];
}

export const AnimatedExperienceSection: React.FC<AnimatedExperienceSectionProps> = ({ experiences }) => {
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
      className="w-full bg-primary-300 px-12 xl:px-0 mx-auto mt-[100px] lg:mt-[200px] py-[151px] lg:pt[100px}"
    >
      <div className="w-full max-w-[1200px] mx-auto flex lg:justify-center items-center overflow-x-scroll no-scrollbar">
        {experiences.map((exp, i) => (
          <Experience key={i} text={exp.text} num={exp.num} i={i} isVisible={isVisible} />
        ))}
        </div>
    </section>
  );
};