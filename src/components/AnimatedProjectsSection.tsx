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
      className="w-full aspect-[4/3] object-cover transition-transform duration-500 ease-out-smooth group-hover:scale-[1.03] motion-reduce:transition-none"
    />
  </>
);

export const AnimatedProjectsSection: React.FC<AnimatedProjectsSectionProps> = ({ projects }) => {
  return (
    <section className="w-full lg:max-w-[1200px] px-5 md:px-12 xl:px-0 mx-auto pt-[100px] lg:pt-[140px]">
      {/* Editorial header */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
        <div className="md:col-span-8">
          <p className="eyebrow text-accent flex items-center gap-4">
            <span aria-hidden="true" className="inline-block h-px w-10 bg-line"></span>
            Nuestros servicios
          </p>
          <h2 className="mt-5 font-dm text-[34px] leading-[1.1] md:text-[48px] text-ink max-w-[16ch]">
            Lo Mejor de Nuestros Servicios
          </h2>
        </div>
        <div className="md:col-span-4 md:text-right">
          <p className="font-jost text-base md:text-lg leading-[28px] text-ink-soft max-w-[34ch] md:ml-auto">
            Experimenta la excelencia en bienestar en Melari, donde cada visita
            es una experiencia inolvidable.
          </p>
        </div>
      </div>

      {/* Editorial alternation: every other card drops down and sits off
          the baseline for a magazine-like rhythm. */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-x-10 lg:gap-y-[72px] mt-12 lg:mt-16">
        {projects.map((proj, index) => {
          const offset = index % 2 === 1 ? 'md:mt-16' : '';
          return (
            <a
              key={proj.name}
              href={proj.href ?? '/services'}
              className={`group relative block ${offset} rounded-card overflow-hidden paper-frame
                          focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent`}
            >
              <div className="overflow-hidden">
                <ProjectCardMedia proj={proj} />
              </div>
              <div className="p-6 md:p-7 flex items-start justify-between gap-6">
                <div>
                  <h3 className="font-dm text-[22px] md:text-[26px] leading-snug text-ink">
                    {proj.name}
                  </h3>
                  <p className="mt-2 font-jost text-base leading-[26px] text-ink-soft">
                    {proj.text}
                  </p>
                </div>
                <span
                  className="mt-1 inline-flex shrink-0 items-center gap-2 font-jost text-sm font-semibold uppercase tracking-widest
                             text-accent transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                  aria-hidden="true"
                >
                  <Arrow />
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
};
