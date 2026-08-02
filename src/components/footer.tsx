import Facebook from "../icons/facebook.tsx";
import Instagram from "../icons/instagram.tsx";
import Logo from "../icons/logo.tsx";

const Footer = () => {
  return (
    <footer className="mt-[120px] w-full bg-ink text-white/80">
      <div className="w-full max-w-[1200px] px-5 md:px-12 xl:px-0 mx-auto pt-20 pb-10 md:pt-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-5 flex flex-col gap-7">
            <a href="/" className="inline-flex w-fit" aria-label="Melari Spa — Inicio">
              <Logo />
            </a>
            <p className="tracking-tight text-base lg:text-[18px] lg:leading-[30px] font-jost text-white/60 max-w-[38ch]">
              Somos una SPA que se dedica a la belleza y el bienestar de las
              personas, ofreciendo servicios de calidad y con los mejores
              productos del mercado.
            </p>
            <div className="flex gap-4">
              <a
                href="/"
                aria-label="Facebook de Melari Spa"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <Facebook />
              </a>
              <a
                href="/"
                aria-label="Instagram de Melari Spa"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <Instagram />
              </a>
            </div>
          </div>

          {/* Páginas */}
          <nav
            className="md:col-span-3 flex flex-col gap-5"
            aria-label="Páginas"
          >
            <h2 className="eyebrow text-white/40">Páginas</h2>
            <div className="flex flex-col gap-4">
              <a
                href="/about"
                className="link-draw w-fit text-white/80 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                Nosotros
              </a>
              <a
                href="/services"
                className="link-draw w-fit text-white/80 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                Servicios
              </a>
              <a
                href="/contact"
                className="link-draw w-fit text-white/80 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                Contacto
              </a>
            </div>
          </nav>

          {/* Servicios */}
          <div className="md:col-span-4 flex flex-col gap-5">
            <h2 className="eyebrow text-white/40">Servicios</h2>
            <div className="flex flex-col gap-4">
              <p className="text-white/80">Masajes</p>
              <p className="text-white/80">Terapias</p>
              <p className="text-white/80">Faciales</p>
              <p className="text-white/80">Nutrición</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm tracking-tight text-white/40">
          <p>Copyright © MelariSpa | Designed by Diego Villagran</p>
          <p className="font-jost">Melari Spa · Spa y Terapia Alternativa</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
