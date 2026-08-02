import { useEffect, useRef, useState } from "react";
import Logo from "../icons/logo.tsx";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/about", label: "Sobre nosotros" },
  { href: "/services", label: "Servicios" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    toggleButtonRef.current?.focus();
  };

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const menu = mobileMenuRef.current;
    const items = menu?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    items?.[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMobileMenu();
        return;
      }
      if (event.key !== "Tab") return;

      const currentMenu = mobileMenuRef.current;
      if (!currentMenu) return;
      const focusable = currentMenu.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      } else if (!currentMenu.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  const headerClass = [
    "fixed inset-x-0 top-0 z-50",
    isScrolled
      ? "bg-ink/90 backdrop-blur-md border-b border-white/10"
      : "bg-transparent",
    "motion-safe:transition-[background-color,border-color,box-shadow] motion-safe:duration-300",
    "motion-reduce:transition-none",
  ].join(" ");

  const desktopLinkClass = [
    "text-sm font-normal tracking-[0.06em] text-white/90",
    "link-draw hover:text-white",
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
  ].join(" ");

  const mobileLinkClass =
    "py-3 text-lg font-normal text-white/90 hover:text-primary-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  const ctaClass =
    "rounded-full border border-white/25 px-6 py-2.5 text-sm font-semibold tracking-[0.04em] text-white transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  return (
    <header className={headerClass}>
      <div className="relative max-w-[1200px] m-auto w-full px-5 md:px-12">
        <div className="flex justify-between items-center py-4 md:py-5">
          <a href="/" className="shrink-0" aria-label="Melari Spa — Inicio">
            <Logo />
          </a>

          <nav className="hidden md:flex flex-row gap-9 items-center" aria-label="Principal">
            {NAV_LINKS.map(({ href, label }) => (
              <a key={href} href={href} className={desktopLinkClass}>
                {label}
              </a>
            ))}
            <a href="/contact" className={ctaClass}>
              Agendar una cita
            </a>
          </nav>

          <button
            type="button"
            ref={toggleButtonRef}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            className="md:hidden text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        <nav
          id="mobile-menu"
          ref={mobileMenuRef}
          aria-label="Menú"
          className={[
            "md:hidden absolute top-full left-0 right-0 flex flex-col gap-1 bg-ink/95 backdrop-blur-md px-5 md:px-12 py-6",
            "motion-safe:transition-[opacity,visibility] motion-safe:duration-300 ease-out",
            "motion-reduce:transition-none",
            isMobileMenuOpen
              ? "visible opacity-100"
              : "invisible opacity-0 pointer-events-none",
          ].join(" ")}
        >
          {NAV_LINKS.map(({ href, label }) => (
            <a key={href} href={href} onClick={closeMobileMenu} className={mobileLinkClass}>
              {label}
            </a>
          ))}
          <a href="/contact" onClick={closeMobileMenu} className={`${ctaClass} mt-4 text-center`}>
            Agendar una cita
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
