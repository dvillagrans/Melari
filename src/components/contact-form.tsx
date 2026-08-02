import Button from "./button.tsx";

const ContactForm = () => {
  return (
    <div className="col-span-1 lg:col-span-2">
      <form className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-[50px]">
        <label htmlFor="name">
          <span className="block mb-1 text-sm lg:text-base font-jost tracking-tight text-text-gray-200">
            Nombre
          </span>
          <input
            id="name"
            type="text"
            name="name"
            className="border-b w-full border-black py-3 text-base lg:text-[22px] lg:leading-[33px] tracking-tight font-jost text-text-gray focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            placeholder="Tu nombre"
          />
        </label>
        <label htmlFor="email">
          <span className="block mb-1 text-sm lg:text-base font-jost tracking-tight text-text-gray-200">
            Correo electrónico
          </span>
          <input
            id="email"
            type="email"
            name="email"
            className="border-b w-full border-black py-3 text-base lg:text-[22px] lg:leading-[33px] tracking-tight font-jost text-text-gray focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            placeholder="Tu correo"
          />
        </label>
        <label htmlFor="subject">
          <span className="block mb-1 text-sm lg:text-base font-jost tracking-tight text-text-gray-200">
            Asunto
          </span>
          <input
            id="subject"
            type="text"
            name="subject"
            className="border-b w-full border-black py-3 text-base lg:text-[22px] lg:leading-[33px] tracking-tight font-jost text-text-gray focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            placeholder="¿Sobre qué nos quieres escribir?"
          />
        </label>
        <label htmlFor="phone">
          <span className="block mb-1 text-sm lg:text-base font-jost tracking-tight text-text-gray-200">
            Teléfono
          </span>
          <input
            id="phone"
            type="number"
            name="phone"
            className="border-b w-full border-black py-3 text-base lg:text-[22px] lg:leading-[33px] tracking-tight font-jost text-text-gray focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            placeholder="Tu teléfono"
          />
        </label>
        <label htmlFor="message" className="col-span-1 sm:col-span-2">
          <span className="block mb-1 text-sm lg:text-base font-jost tracking-tight text-text-gray-200">
            Mensaje
          </span>
          <textarea
            id="message"
            name="message"
            className="w-full border-b border-black py-3 text-base lg:text-[22px] lg:leading-[33px] tracking-tight font-jost text-text-gray focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            cols={30}
            rows={10}
            placeholder="Hola, me interesa un servicio de Melari Spa..."
          ></textarea>
        </label>

        <div className="w-full flex flex-col items-end gap-3 col-span-1 sm:col-span-2">
          <Button text="Enviar" type="submit" disabled />
          <p className="text-sm font-jost tracking-tight text-text-gray-200">
            Este formulario aún no envía mensajes: el canal de correo está
            pendiente de configuración.
          </p>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
