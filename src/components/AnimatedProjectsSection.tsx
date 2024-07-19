import React, { useState, useEffect, useRef } from 'react';

interface Project {
  img: string;
  name: string;
  text: string;
}

interface AnimatedProjectsSectionProps {
  projects: Project[];
}

export const AnimatedProjectsSection: React.FC<AnimatedProjectsSectionProps> = ({ projects }) => {
  return (
    <section
      className="lg:max-w-[1200px] px-12 xl:px-0 w-full mx-auto pt-[100px] lg:pt-[200px]"
    >
      <h2
        className="font-dm tracking-wide text-center leading-[37px] lg:leading-[62.50px] text-[30px] lg:text-[50px] w-full lg:max-w-[50%] pb-2 mx-auto"
      >
        Lo Mejor de Nuestros Servicios
      </h2>
      <p
        className="text-base md:text-[22px] text-center tracking-tight font-jost text-text-gray leading-[33px] lg:max-w-[60%] mx-auto"
      >
        Experimenta la excelencia en bienestar en Melari. Nuestros servicios
        estrella te llevan a un mundo de relajación y rejuvenecimiento, donde cada
        visita es una experiencia inolvidable.
      </p>
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-x-[104px] lg:gap-y-[56px] mt-12 lg:mt-[93px]"
      >
        {projects.map((proj) => (
          <div key={proj.name} className="w-full flex flex-col gap-4">
            <img src={proj.img} alt={proj.name} />
            <p className="flex flex-col tracking-tight leading-9">
              <span className="text-primary-200 text-lg lg:text-[25px] font-dm">
                {proj.name}
              </span>
              <span className="text-text-gray-200 text-base lg:text-lg font-jost">
                {proj.text}
              </span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
