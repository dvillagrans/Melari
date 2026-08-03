import React from "react";
import {
  isLive,
  business,
  phoneHref,
  whatsappHref,
} from "../lib/business";

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
            {isLive ? (
              <>
                <p className="mt-6 font-jost text-base md:text-lg leading-[30px] text-white/65">
                  {business.address}, {business.city}
                  {business.region ? `, ${business.region}` : ""}
                  {business.country ? `, ${business.country}` : ""}
                </p>
                <div className="mt-8 flex flex-col gap-3 font-jost text-base tracking-tight text-white/85">
                  <p>
                    <span className="font-semibold text-white">Dirección:</span>{" "}
                    <span className="text-white/70">{business.address}, {business.city}</span>
                  </p>
                  {phoneHref && (
                    <p>
                      <span className="font-semibold text-white">Teléfono:</span>{" "}
                      <a href={phoneHref} className="text-white/70 link-draw hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                        {business.phone}
                      </a>
                    </p>
                  )}
                  {whatsappHref && (
                    <p>
                      <span className="font-semibold text-white">WhatsApp:</span>{" "}
                      <a href={whatsappHref} className="text-white/70 link-draw hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                        {business.whatsapp}
                      </a>
                    </p>
                  )}
                  {business.hours && (
                    <p>
                      <span className="font-semibold text-white">Horario:</span>{" "}
                      <span className="text-white/70">{Object.values(business.hours).filter(Boolean).join(" · ")}</span>
                    </p>
                  )}
                </div>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>

          {/* Map: real embed in live, honest placeholder in preview */}
          <div className="md:col-span-7">
            {isLive && business.mapUrl ? (
              <div className="paper-frame rounded-card overflow-hidden bg-white">
                <iframe
                  title="Ubicación de Melari Spa en el mapa"
                  src={business.mapUrl}
                  className="w-full aspect-[4/3] border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                <div className="p-5 flex items-center justify-between gap-4 flex-wrap">
                  <p className="font-jost text-sm tracking-tight text-ink-soft">
                    {business.address}, {business.city}
                  </p>
                  <a
                    href={business.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-jost text-sm font-semibold tracking-tight text-accent link-draw focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    Cómo llegar
                  </a>
                </div>
              </div>
            ) : (
              <div className="paper-frame rounded-card p-6 md:p-10 flex items-center justify-center bg-white text-center">
                <div className="max-w-[34ch]">
                  <span className="block eyebrow text-accent">Mapa</span>
                  <p className="mt-4 font-jost text-base leading-[26px] text-ink-soft">
                    El mapa no está disponible por ahora: la ubicación está
                    pendiente de verificación.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapsSection;
