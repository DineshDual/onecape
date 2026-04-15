"use client";

import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        setOffset(scrollY * 0.15);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Magnetic button effect
  useEffect(() => {
    const btn = ctaRef.current;
    if (!btn) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const maxDist = 8;
      const dist = Math.sqrt(x * x + y * y);
      const factor = Math.min(maxDist / dist, 1);
      btn.style.transform = `translate(${x * factor * 0.3}px, ${y * factor * 0.3}px) scale(1.05)`;
    };

    const handleMouseLeave = () => {
      btn.style.transform = "";
    };

    btn.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      btn.removeEventListener("mousemove", handleMouseMove);
      btn.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Animated gradient background with parallax */}
      <div className="absolute inset-0 hero-animated-bg hero-parallax-bg" style={{ transform: `translateY(${offset}px)` }} />
      
      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#FF6600 1px, transparent 1px), linear-gradient(90deg, #FF6600 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      
      {/* Multiple radial glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#FF6600]/[0.03] blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#0D1B2A]/[0.02] blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-[#FF6600]/[0.015] blur-[200px]" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#FF6600]/15"
            style={{
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 25}%`,
              animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-20 hero-stagger">
        {/* New agency badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 mb-8 border border-[#FF6600]/15 rounded-full bg-[#FF6600]/[0.04] backdrop-blur-sm animate-float">
          <div className="w-2 h-2 rounded-full bg-[#FF6600] animate-pulse" />
          <span className="text-[13px] text-[#FF6600] tracking-widest uppercase font-semibold">
            New agency. Bold vision.
          </span>
        </div>

        {/* Headline */}
        <h1 className="mt-6">
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[6.5rem] font-extrabold leading-[0.9] tracking-tight text-[#0D1B2A]">
            One Cape.
          </span>
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[6.5rem] font-extrabold leading-[0.9] tracking-tight text-gradient-accent mt-2">
            Unlimited Power.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-500 leading-relaxed mt-8 mb-12">
          The cape your business needs to thrive in the digital era.
          <span className="text-[#FF6600] font-semibold"> Full-stack branding. AI-ready. Built for builders.</span>
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            ref={ctaRef}
            href="#contact"
            className="btn-primary group px-8 py-4 bg-gradient-to-r from-[#FF6600] to-[#E55A00] text-white font-bold tracking-wide text-sm transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,102,0,0.3)] rounded-sm min-h-[44px] inline-flex items-center justify-center"
          >
            Get Your Free Brand Consultation
            <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#services"
            className="px-8 py-4 border border-gray-300 text-[#0D1B2A] hover:border-[#FF6600]/50 hover:text-[#FF6600] font-bold tracking-wide text-sm transition-all duration-300 rounded-sm min-h-[44px] inline-flex items-center justify-center"
          >
            Explore Services
          </a>
        </div>

        {/* Aspirational line */}
        <div className="mt-20">
          <p className="text-sm text-gray-400 tracking-wider uppercase font-medium">
            Building brands from day one
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-40">
        <div className="w-5 h-8 rounded-full border border-gray-300 flex items-start justify-center p-1.5">
          <div className="w-1 h-1.5 bg-[#FF6600] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}