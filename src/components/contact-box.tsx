import Mail from "../icons/mail.tsx";
import Phone from "../icons/phone.tsx";
import Web from "../icons/web.tsx";
import {
  isLive,
  business,
  phoneHref,
  emailHref,
} from "../lib/business";

const ContactInfo = () => {
  // Live: verified channels render as real links. Preview: only the channels
  // that exist, otherwise a clean "pendiente" state — never fake links.
  const items = [
    {
      icon: <Mail />,
      label: "Correo",
      value: business.email || "pendiente de verificación",
      href: emailHref,
    },
    {
      icon: <Phone />,
      label: "Teléfono",
      value: business.phone || "pendiente de verificación",
      href: phoneHref,
    },
    {
      icon: <Web />,
      label: "Sitio web",
      value: business.web || "pendiente de verificación",
      href: business.web || "",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-primary-100 flex items-center gap-4">
            <span aria-hidden="true" className="inline-block h-px w-10 bg-primary-100/60"></span>
            Información de contacto
          </p>
          <h2 className="mt-4 font-dm text-[28px] leading-[1.12] md:text-[36px] text-white max-w-[18ch]">
            Estamos aquí para ti
          </h2>
        </div>
        {!isLive && (
          <p className="font-jost text-sm leading-[22px] text-white/40 max-w-[30ch]">
            Los datos de contacto se publicarán en cuanto estén verificados.
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {items.map(({ icon, label, value, href }) => (
          <div
            key={label}
            className="flex flex-col gap-4 rounded-card border border-white/10 bg-white/[0.04] px-6 py-7"
          >
            <span className="shrink-0 text-white/80">{icon}</span>
            <div>
              <h3 className="eyebrow text-white/40">{label}</h3>
              {href && isLive ? (
                <a
                  href={href}
                  className="mt-2 block font-jost text-base leading-[24px] text-white/80 link-draw hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  {value}
                </a>
              ) : (
                <p className="mt-2 font-jost text-base leading-[24px] text-white/60">
                  {value}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactInfo;
