"use client";

import { useState, useEffect } from "react";

export default function FloatingCTA() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showMobileBar, setShowMobileBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600);
      setShowMobileBar(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Scroll to top button (desktop) */}
      <button
        onClick={scrollToTop}
        className={`scroll-top-btn ${showScrollTop ? 'visible' : ''}`}
        aria-label="Scroll to top"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
      </button>

      {/* Mobile sticky CTA bar */}
      <div className={`sticky-cta-mobile lg:hidden ${showMobileBar ? 'visible' : ''}`}>
        <a
          href="#contact"
          className="block w-full px-6 py-3.5 bg-gradient-to-r from-[#E63946] to-[#C1121F] text-white font-black text-sm tracking-wide text-center rounded-sm transition-all hover:shadow-[0_0_30px_rgba(230,57,70,0.3)]"
        >
          Get Free Brand Audit →
        </a>
      </div>
    </>
  );
}