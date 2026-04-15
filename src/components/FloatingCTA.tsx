"use client";

import { useEffect, useState } from "react";

export default function FloatingCTA() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showMobileBar, setShowMobileBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600);
      setShowMobileBar(window.scrollY > window.innerHeight);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
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
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
      </button>

      {/* Mobile sticky CTA bar */}
      <div className={`sticky-cta-mobile lg:hidden ${showMobileBar ? 'visible' : ''}`}>
        <a
          href="#contact"
          className="btn-primary block w-full px-6 py-3.5 bg-gradient-to-r from-[#FF6600] to-[#E55A00] text-white font-bold text-sm tracking-wide text-center rounded-sm transition-all min-h-[44px]"
        >
          Get Free Brand Consultation →
        </a>
      </div>
    </>
  );
}