import React from 'react';

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
                        Que estás esperando para…
                    </h2>
                    <h1 className="font-dm text-[36px] md:text-[50px] text-primary-200 text-center">
                        Sentirte en el cielo
                    </h1>
                    <p className="text-text-gray-200 font-jost text-base text-center">
                        <span className="font-bold">Dirección:</span> Santa Anita 364, Evolución, Nezahualcóyotl,
                        Estado de México
                    </p>
                    <p className="text-text-gray-200 font-jost text-base text-center">
                        <span className="font-bold">Teléfono:</span> 55-8354-1965
                    </p>
                    <p className="text-text-gray-200 font-jost text-base text-center">
                        <span className="font-bold">Horario:</span>
                        Lun-Vie : 8:00 am – 7:00 pm <br />
                        &emsp;&emsp;&emsp;&emsp; Sábados : 8:00 am -1:00 pm hrs.
                    </p>
                </div>

                {/* Google Maps en la segunda columna */}
                <div className="flex justify-center items-center px-4">
                    <iframe
                        title="map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235.20794098462065!2d-99.01667146606853!3d19.39826993992335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2aac5e41083a1423%3A0xcda09ac42c85f4fd!2sMELARI!5e0!3m2!1ses!2smx!4v1720114729449!5m2!1ses!2smx"
                        width="100%"
                        height="300"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        className="w-full h-full"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default MapsSection;