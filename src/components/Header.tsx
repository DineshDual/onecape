"use client";

import { useState, useEffect, useRef } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Why Us", href: "#why-onecape" },
    { label: "Process", href: "#process" },
    { label: "Capabilities", href: "#portfolio" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`header-enter fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl py-3 shadow-[0_1px_0_0_#E5E5E5]"
          : "bg-transparent py-6"
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group logo-hover" aria-label="OneCape home">
          <div className="w-9 h-9 bg-gradient-to-br from-[#FF6600] to-[#E55A00] rounded-md flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg shadow-[#FF6600]/10">
            <svg
              viewBox="0 0 32 32"
              fill="none"
              className="w-5 h-5 text-white"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path d="M16 4L6 10v8c0 6 10 10 10 10s10-4 10-10v-8L16 4z" fill="currentColor" opacity="0.3" />
              <path d="M16 4L6 10v8c0 6 10 10 10 10s10-4 10-10v-8L16 4z" />
              <path d="M12 16l3 3 5-6" strokeWidth={2.5} />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-wider text-[#0D1B2A]">
            One<span className="text-[#FF6600]">Cape</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link text-[13px] text-gray-500 hover:text-[#FF6600] transition-colors duration-300 tracking-widest uppercase font-medium min-h-[44px] flex items-center"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-primary ml-3 px-5 py-2.5 text-[13px] font-bold border-2 border-[#FF6600] text-[#FF6600] hover:bg-[#FF6600] hover:text-white transition-all duration-300 tracking-widest uppercase rounded-sm min-h-[44px] inline-flex items-center"
          >
            Book a Call
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-gray-500 hover:text-[#FF6600] transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Line on scroll */}
      {scrolled && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF6600]/20 to-transparent" />
      )}

      {/* Mobile Nav */}
      <nav
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-label="Mobile navigation"
      >
        <div className="bg-white/98 backdrop-blur-xl border-t border-[#E5E5E5] px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-gray-600 hover:text-[#FF6600] transition-colors tracking-widest uppercase text-sm font-medium min-h-[44px] flex items-center"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-2 px-5 py-3 text-sm font-bold border-2 border-[#FF6600] text-[#FF6600] hover:bg-[#FF6600] hover:text-white transition-all duration-300 tracking-widest uppercase text-center rounded-sm min-h-[44px] flex items-center justify-center"
          >
            Book a Call
          </a>
        </div>
      </nav>
    </header>
  );
}