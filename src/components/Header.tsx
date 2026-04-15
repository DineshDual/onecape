"use client";

import { useState, useEffect } from "react";

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
    { label: "Work", href: "#portfolio" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0e1a]/90 backdrop-blur-xl border-b border-[#d4a853]/10 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-br from-[#d4a853] to-[#b8912e] rounded-sm flex items-center justify-center transition-transform group-hover:scale-110">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-5 h-5 text-[#0a0e1a]"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path d="M12 2L3 20h18L12 2z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-wider">
            One<span className="text-[#d4a853]">Cape</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-gray-400 hover:text-[#d4a853] transition-colors duration-300 tracking-wide uppercase"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-2 px-5 py-2 text-sm font-semibold border border-[#d4a853] text-[#d4a853] hover:bg-[#d4a853] hover:text-[#0a0e1a] transition-all duration-300 tracking-wide"
          >
            Start a Project
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-400 hover:text-[#d4a853] transition-colors"
          aria-label="Toggle menu"
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

      {/* Mobile Nav */}
      {menuOpen && (
        <nav className="md:hidden bg-[#0a0e1a]/95 backdrop-blur-xl border-t border-[#d4a853]/10 px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-gray-400 hover:text-[#d4a853] transition-colors tracking-wide uppercase text-sm"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-2 px-5 py-2 text-sm font-semibold border border-[#d4a853] text-[#d4a853] hover:bg-[#d4a853] hover:text-[#0a0e1a] transition-all duration-300 tracking-wide text-center"
          >
            Start a Project
          </a>
        </nav>
      )}
    </header>
  );
}