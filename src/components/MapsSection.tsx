import React from "react";

const MapsSection: React.FC = () => {
  return (
    <div className="w-full lg:max-w-[1200px] px-4 xl:px-0 mx-auto pt-12 lg:pt-24">
      <h2 className="font-dm tracking-wide text-center leading-[37px] lg:leading-[62.50px] text-[24px] lg:text-[50px] w-full lg:max-w-[50%] pb-4 mx-auto">
        Ubicación
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-auto lg:h-[600px]">
        {/* Información en la primera columna */}
        <div className="flex flex-col gap-4 justify-center items-center px-4">
          <h2 className="font-dm text-[24px] md:text-[30px] text-text-blue text-center">
            Qué estás esperando para…
          </h2>
          <h1 className="font-dm text-[36px] md:text-[50px] text-primary-200 text-center">
            Sentirte en el cielo
          </h1>
          <p className="text-text-gray-200 font-jost text-base text-center">
            <span className="font-bold">Dirección:</span> pendiente de
            verificación
          </p>
          <p className="text-text-gray-200 font-jost text-base text-center">
            <span className="font-bold">Teléfono:</span> pendiente de
            verificación
          </p>
          <p className="text-text-gray-200 font-jost text-base text-center">
            <span className="font-bold">Horario:</span> pendiente de
            verificación
          </p>
        </div>

        {/* Google Maps en la segunda columna */}
        <div className="flex justify-center items-center px-4">
          <div className="w-full h-[300px] lg:h-full flex items-center justify-center rounded-[20px] bg-primary-300 text-text-gray-200 font-jost text-base text-center px-6">
            El mapa no está disponible por ahora: la ubicación está pendiente
            de verificación.
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapsSection;
