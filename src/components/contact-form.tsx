import Button from "./button.tsx";

const ContactForm = () => {
  return (
    <div className="col-span-1 lg:col-span-2">
      <form className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-9">
        <label htmlFor="name">
          <span className="block mb-2 text-sm font-jost tracking-tight text-ink-soft">
            Nombre
          </span>
          <input
            id="name"
            type="text"
            name="name"
            className="border-b w-full border-ink/25 bg-transparent py-3 text-base lg:text-lg tracking-tight font-jost text-ink placeholder:text-ink/30 focus:border-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            placeholder="Tu nombre"
          />
        </label>
        <label htmlFor="email">
          <span className="block mb-2 text-sm font-jost tracking-tight text-ink-soft">
            Correo electrónico
          </span>
          <input
            id="email"
            type="email"
            name="email"
            className="border-b w-full border-ink/25 bg-transparent py-3 text-base lg:text-lg tracking-tight font-jost text-ink placeholder:text-ink/30 focus:border-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            placeholder="Tu correo"
          />
        </label>
        <label htmlFor="subject">
          <span className="block mb-2 text-sm font-jost tracking-tight text-ink-soft">
            Asunto
          </span>
          <input
            id="subject"
            type="text"
            name="subject"
            className="border-b w-full border-ink/25 bg-transparent py-3 text-base lg:text-lg tracking-tight font-jost text-ink placeholder:text-ink/30 focus:border-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            placeholder="¿Sobre qué nos quieres escribir?"
          />
        </label>
        <label htmlFor="phone">
          <span className="block mb-2 text-sm font-jost tracking-tight text-ink-soft">
            Teléfono
          </span>
          <input
            id="phone"
            type="number"
            name="phone"
            className="border-b w-full border-ink/25 bg-transparent py-3 text-base lg:text-lg tracking-tight font-jost text-ink placeholder:text-ink/30 focus:border-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            placeholder="Tu teléfono"
          />
        </label>
        <label htmlFor="message" className="col-span-1 sm:col-span-2">
          <span className="block mb-2 text-sm font-jost tracking-tight text-ink-soft">
            Mensaje
          </span>
          <textarea
            id="message"
            name="message"
            className="w-full border-b border-ink/25 bg-transparent py-3 text-base lg:text-lg tracking-tight font-jost text-ink placeholder:text-ink/30 focus:border-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            cols={30}
            rows={8}
            placeholder="Hola, me interesa un servicio de Melari Spa..."
          ></textarea>
        </label>

        <div className="w-full flex flex-col items-start gap-3 col-span-1 sm:col-span-2">
          <Button text="Enviar" type="submit" disabled />
          <p className="text-sm font-jost tracking-tight text-ink-soft">
            Este formulario aún no envía mensajes: el canal de correo está
            pendiente de configuración.
          </p>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
