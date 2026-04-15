"use client";

import { useEffect, useRef, useState } from "react";

function AnimatedCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const start = Date.now();
          const animate = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 hero-animated-bg" />
      
      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#d4a853 1px, transparent 1px), linear-gradient(90deg, #d4a853 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      
      {/* Multiple radial glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#d4a853]/[0.04] blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#d4a853]/[0.03] blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-[#d4a853]/[0.02] blur-[200px]" />

      {/* Floating particles (CSS only) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#d4a853]/20"
            style={{
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 25}%`,
              animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-20">
        {/* Trust Badge */}
        <div className="animate-fade-up inline-flex items-center gap-2 px-5 py-2 mb-8 border border-[#d4a853]/20 rounded-full bg-[#d4a853]/[0.06] backdrop-blur-sm animate-float">
          <div className="w-2 h-2 rounded-full bg-[#d4a853] animate-pulse" />
          <span className="text-[13px] text-[#d4a853] tracking-widest uppercase font-semibold">
            Trusted by 150+ brands worldwide
          </span>
        </div>

        {/* Headline */}
        <h1 className="animate-fade-up delay-200 mt-6">
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-black leading-[0.9] tracking-tight text-white">
            We Build Brands
          </span>
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-black leading-[0.9] tracking-tight text-gradient-gold mt-2" style={{ fontFamily: "var(--font-playfair)" }}>
            That Print Money
          </span>
        </h1>

        {/* Subheadline */}
        <p className="animate-fade-up delay-400 max-w-2xl mx-auto text-lg sm:text-xl text-gray-400 leading-relaxed mt-8 mb-12">
          Strategy, content, digital, and identity — unified under one cape.
          <span className="text-[#d4a853] font-medium"> We don&apos;t just make you look good. We make you money.</span>
        </p>

        {/* CTAs */}
        <div className="animate-fade-up delay-500 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="group px-8 py-4 bg-gradient-to-r from-[#d4a853] to-[#b8912e] text-[#0a0e1a] font-bold tracking-wide text-sm transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,168,83,0.35)] hover:scale-105 rounded-sm"
          >
            Get Your Free Brand Audit
            <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#results"
            className="px-8 py-4 border border-gray-700 text-gray-300 hover:border-[#d4a853]/50 hover:text-[#d4a853] font-bold tracking-wide text-sm transition-all duration-300 rounded-sm"
          >
            See Our Results
          </a>
        </div>

        {/* Animated Stats */}
        <div className="animate-fade-up delay-700 mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 max-w-3xl mx-auto">
          {[
            { value: 150, suffix: "+", label: "Brands Built", prefix: "" },
            { value: 98, suffix: "%", label: "Retention Rate", prefix: "" },
            { value: 2, suffix: "B+", label: "Revenue Generated", prefix: "$" },
            { value: 12, suffix: "+", label: "Years Experience", prefix: "" },
          ].map((stat) => (
            <div key={stat.label} className="text-center group cursor-default">
              <div className="text-3xl sm:text-4xl font-black text-[#d4a853] group-hover:scale-110 transition-transform duration-300">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              </div>
              <div className="text-xs text-gray-500 tracking-wider uppercase mt-2 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator - more subtle */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-40">
        <div className="w-5 h-8 rounded-full border border-gray-600 flex items-start justify-center p-1.5">
          <div className="w-1 h-1.5 bg-[#d4a853] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}