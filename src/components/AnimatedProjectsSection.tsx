import React from 'react';

interface Project {
  img: string;
  name: string;
  text: string;
  href?: string;
}

interface AnimatedProjectsSectionProps {
  projects: Project[];
}

const Arrow: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const ProjectCardMedia: React.FC<{ proj: Project }> = ({ proj }) => (
  <>
    <img
      src={proj.img}
      alt={proj.name}
      width={1280}
      height={853}
      loading="lazy"
      decoding="async"
      className="aspect-[3/2] w-full object-cover transition-transform duration-500 ease-out-smooth group-hover:scale-105 motion-reduce:transition-none"
    />
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-linear-to-t from-text-blue/75 via-text-blue/15 to-transparent"
    />
    <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-white">
      <p className="flex flex-col tracking-tight leading-8">
        <span className="font-dm text-[22px] lg:text-[25px]">
          {proj.name}
        </span>
        <span className="font-jost text-sm md:text-base text-white/85">
          {proj.text}
        </span>
      </p>
      {proj.href && (
        <span className="mt-4 inline-flex items-center gap-2 font-jost font-semibold text-sm uppercase tracking-widest border-b-2 border-primary-100 pb-1
                         transition-[border-color,transform] duration-300 group-hover:border-white group-hover:translate-x-1
                         motion-reduce:transition-none">
          Ver más
          <Arrow />
        </span>
      )}
    </div>
  </>
);

export const AnimatedProjectsSection: React.FC<AnimatedProjectsSectionProps> = ({ projects }) => {
  return (
    <section
      className="lg:max-w-[1200px] px-5 md:px-12 xl:px-0 w-full mx-auto pt-[100px] lg:pt-[100px]"
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
        className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-x-[104px] lg:gap-y-[56px] mt-12 lg:mt-[93px]"
      >
        {projects.map((proj) =>
          proj.href ? (
            <a
              key={proj.name}
              href={proj.href}
              className="group relative block rounded-card overflow-hidden shadow-card hover:shadow-lift transition-shadow duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none"
            >
              <ProjectCardMedia proj={proj} />
            </a>
          ) : (
            <div
              key={proj.name}
              className="group relative block rounded-card overflow-hidden shadow-card"
            >
              <ProjectCardMedia proj={proj} />
            </div>
          )
        )}
      </div>
    </section>
  );
};
