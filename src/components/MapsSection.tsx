import React from "react";

const MapsSection: React.FC = () => {
  return (
    <section className="w-full mt-[100px] lg:mt-[150px] bg-ink text-white">
      <div className="w-full max-w-[1200px] px-5 md:px-12 xl:px-0 mx-auto py-[100px] lg:py-[130px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10 items-center">
          {/* Editorial copy */}
          <div className="md:col-span-5">
            <p className="eyebrow text-primary-100 flex items-center gap-4">
              <span aria-hidden="true" className="inline-block h-px w-10 bg-primary-100/60"></span>
              Ubicación
            </p>
            <h2 className="mt-5 font-dm text-[32px] leading-[1.12] md:text-[44px] text-white">
              Qué estás esperando para sentirte en el cielo
            </h2>
            <p className="mt-6 font-jost text-base md:text-lg leading-[30px] text-white/65">
              Dirección, teléfono y horario están pendientes de verificación.
              En cuanto estén confirmados, publicaremos aquí cómo llegar.
            </p>
            <div className="mt-8 flex flex-col gap-3 font-jost text-base tracking-tight text-white/85">
              <p>
                <span className="font-semibold text-white">Dirección:</span>{" "}
                <span className="text-white/50">pendiente de verificación</span>
              </p>
              <p>
                <span className="font-semibold text-white">Teléfono:</span>{" "}
                <span className="text-white/50">pendiente de verificación</span>
              </p>
              <p>
                <span className="font-semibold text-white">Horario:</span>{" "}
                <span className="text-white/50">pendiente de verificación</span>
              </p>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="md:col-span-7">
            <div className="paper-frame rounded-card p-6 md:p-10 flex items-center justify-center bg-white text-center">
              <div className="max-w-[34ch]">
                <span className="block eyebrow text-accent">Mapa</span>
                <p className="mt-4 font-jost text-base leading-[26px] text-ink-soft">
                  El mapa no está disponible por ahora: la ubicación está
                  pendiente de verificación.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapsSection;
