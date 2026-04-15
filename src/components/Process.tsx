"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "Deep dive into your market, audience, and competitive landscape to uncover your brand's unique edge.",
  },
  {
    number: "02",
    title: "Strategy",
    description: "Craft a roadmap that ties every brand decision to a measurable business outcome.",
  },
  {
    number: "03",
    title: "Creation",
    description: "Build the brand system — visual, verbal, and digital — that brings the strategy to life.",
  },
  {
    number: "04",
    title: "Launch",
    description: "Execute with precision, measure relentlessly, and optimize for maximum impact.",
  },
];

export default function Process() {
  const [activeStep, setActiveStep] = useState(-1);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;
      
      // Calculate which step is active based on scroll position
      const scrollProgress = (viewportHeight - sectionTop) / (sectionHeight + viewportHeight);
      const clampedProgress = Math.min(Math.max(scrollProgress, 0), 1);
      const newActive = Math.floor(clampedProgress * steps.length);
      setActiveStep(newActive >= 0 && newActive < steps.length ? newActive : -1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="process" ref={sectionRef} className="py-24 sm:py-32 px-6 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs text-[#FF6600] tracking-[0.3em] uppercase font-medium">
            How We Work
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold text-[#0D1B2A] leading-tight">
            From insight to impact.{" "}
            <span className="text-gradient-accent font-extrabold">
              In four steps.
            </span>
          </h2>
          <p className="mt-4 text-gray-500 text-lg leading-relaxed">
            Brief → strategy → live in days, not months. We move fast.
          </p>
        </div>

        {/* Steps - mobile: vertical, desktop: horizontal */}
        <div className="sm:hidden process-vertical-line space-y-6">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className={`relative z-10 glass-card p-8 rounded-lg transition-all duration-500 ${
                activeStep === idx ? "process-step-active" : ""
              }`}
            >
              <div className={`process-step-circle w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm mb-4 transition-all duration-300 ${
                activeStep === idx
                  ? "bg-[#FF6600] text-white shadow-[0_0_0_4px_rgba(255,102,0,0.2)]"
                  : "bg-[#FF6600] text-white"
              }`}>
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-[#0D1B2A] mb-3 tracking-wide">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, idx) => (
            <div key={step.number} className="relative group">
              {/* Connector line (desktop only) */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px z-0">
                  <div className="w-full h-px bg-gradient-to-r from-[#FF6600]/20 to-transparent" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-6 border-transparent border-l-[#FF6600]/20" />
                </div>
              )}

              <div className={`relative z-10 glass-card p-8 rounded-lg transition-all duration-500 hover:translate-y-[-4px] accent-border-hover ${
                activeStep === idx ? "process-step-active" : ""
              }`}>
                <div className={`process-step-circle w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm mb-4 transition-all duration-300 ${
                  activeStep === idx
                    ? "bg-[#FF6600] text-white shadow-[0_0_0_4px_rgba(255,102,0,0.2)]"
                    : "bg-[#FF6600] text-white"
                }`}>
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-[#0D1B2A] mb-3 tracking-wide">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="btn-primary inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FF6600] to-[#E55A00] text-white font-bold tracking-wide text-sm transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,102,0,0.3)] rounded-sm min-h-[44px]"
          >
            Start Your Discovery
            <span className="inline-block ml-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}