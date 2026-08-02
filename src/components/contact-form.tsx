import Button from "./button.tsx";

const fieldClass =
  "w-full border-b border-ink/25 bg-transparent py-3 text-base lg:text-lg tracking-tight font-jost text-ink placeholder:text-ink/30 " +
  "transition-colors duration-300 hover:border-ink/45 focus:border-accent " +
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

const labelClass = "block mb-2 text-sm font-jost tracking-tight text-ink-soft";

const ContactForm = () => {
  return (
    <div className="col-span-1 lg:col-span-8">
      <form className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-9">
        <label htmlFor="name">
          <span className={labelClass}>Nombre</span>
          <input
            id="name"
            type="text"
            name="name"
            autoComplete="name"
            required
            className={fieldClass}
            placeholder="Tu nombre"
          />
        </label>
        <label htmlFor="email">
          <span className={labelClass}>Correo electrónico</span>
          <input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            required
            className={fieldClass}
            placeholder="Tu correo"
          />
        </label>
        <label htmlFor="subject">
          <span className={labelClass}>Asunto</span>
          <input
            id="subject"
            type="text"
            name="subject"
            className={fieldClass}
            placeholder="¿Sobre qué nos quieres escribir?"
          />
        </label>
        <label htmlFor="phone">
          <span className={labelClass}>Teléfono</span>
          <input
            id="phone"
            type="tel"
            name="phone"
            autoComplete="tel"
            inputMode="tel"
            className={fieldClass}
            placeholder="Tu teléfono"
          />
        </label>
        <label htmlFor="message" className="col-span-1 sm:col-span-2">
          <span className={labelClass}>Mensaje</span>
          <textarea
            id="message"
            name="message"
            required
            className={`${fieldClass} resize-none`}
            cols={30}
            rows={7}
            placeholder="Hola, me interesa un servicio de Melari Spa..."
          ></textarea>
        </label>

        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-5 col-span-1 sm:col-span-2 pt-2">
          <Button text="Enviar" type="submit" disabled />
          <p className="font-jost text-sm leading-[22px] text-ink-soft max-w-[38ch]">
            El formulario aún no envía mensajes: el canal de correo está
            pendiente de configuración.
          </p>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
