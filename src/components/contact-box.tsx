import Mail from "../icons/mail.tsx";
import Phone from "../icons/phone.tsx";
import Web from "../icons/web.tsx";

const ContactInfo = () => {
  return (
    <div className="col-span-1 bg-ink rounded-card px-8 py-12 md:py-16 flex flex-col gap-8 w-full text-white">
      <h2 className="eyebrow text-white/50">Información de contacto</h2>

      <div className="flex flex-col gap-6">
        <p className="flex flex-col md:flex-row gap-4 items-start md:items-center font-jost text-base tracking-tight text-white/85">
          <span className="shrink-0">
            <Mail />
          </span>
          <span>
            Correo: <span className="text-white/50">pendiente de verificación</span>
          </span>
        </p>
        <p className="flex flex-col md:flex-row gap-4 items-start md:items-center font-jost text-base tracking-tight text-white/85">
          <span className="shrink-0">
            <Phone />
          </span>
          <span>
            Teléfono: <span className="text-white/50">pendiente de verificación</span>
          </span>
        </p>
        <p className="flex flex-col md:flex-row gap-4 items-start md:items-center font-jost text-base tracking-tight text-white/85">
          <span className="shrink-0">
            <Web />
          </span>
          <span>
            Sitio web: <span className="text-white/50">pendiente de verificación</span>
          </span>
        </p>
      </div>

      <p className="font-jost text-sm leading-[22px] text-white/40 border-t border-white/10 pt-6">
        Los datos de contacto se publicarán en cuanto estén verificados.
      </p>
    </div>
  );
};

export default ContactInfo;
