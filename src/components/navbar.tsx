import React, { useEffect, useState } from "react";
import Logo from "../icons/logo.tsx";

const Navbar = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const linkStyle = "text-sm leading-10 font-normal text-white hover:text-primary-200 transition-colors size-100";

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsNavbarVisible(scrollTop === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 bg-transparent ${isNavbarVisible ? "" : "hidden"}`}>
      <div className="max-w-[1200px] px-4 md:px-12 m-auto w-full py-6 flex justify-between items-center">
        <a href="/" className="flex-shrink-0">
          <Logo />
        </a>

        <nav className="flex flex-row gap-8 items-center md:hidden">
          <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
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
        </nav>

        <nav className={`flex flex-row gap-8 items-center ${isMobileMenuOpen ? "flex" : "hidden"} md:flex`}>
          <a href="/" className={`${linkStyle} md:text-lg`}>
            HOME
          </a>
          <a href="/about" className={`${linkStyle} md:text-lg`}>
            ABOUT
          </a>
          <a href="/services" className={`${linkStyle} md:text-lg`}>
            SERVICES
          </a>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
