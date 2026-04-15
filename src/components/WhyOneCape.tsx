"use client";

import { useEffect, useRef, useState } from "react";

const usps = [
  {
    number: "01",
    headline: "One Cape. Full Stack.",
    description: "Most agencies specialize in one thing. OneCape does everything under one roof. One team, one strategy, one cape. No handoffs between agencies. No conflicting advice.",
  },
  {
    number: "02",
    headline: "GEO, Not Just SEO.",
    description: "Other agencies still optimize for Google. We optimize for AI too. Generative Engine Optimization means your brand shows up in ChatGPT, Perplexity, and AI-powered search — not just blue links.",
  },
  {
    number: "03",
    headline: "Built for Builders.",
    description: "We don't chase enterprise retainers. We work with founders, startups, and growing brands who need a partner that moves fast, thinks bold, and cares like it's their own brand.",
  },
  {
    number: "04",
    headline: "Speed Over Ceremony.",
    description: "No 3-week onboarding. No 47-page strategy decks that collect dust. We move fast: brief → strategy → live in days, not months. Done is better than perfect.",
  },
  {
    number: "05",
    headline: "Data-Informed, Not Data-Paralyzed.",
    description: "We use data to make decisions, not to avoid them. We test fast, learn faster, and optimize continuously. No vanity metrics — only numbers that move your business.",
  },
  {
    number: "06",
    headline: "Your Brand, Your Cape.",
    description: "Every brand is unique. We don't do templates or cookie-cutter. Your strategy, your voice, your identity — custom-built from scratch. The cape fits YOU.",
  },
];

const comparisons = [
  { others: "One service", onecape: "Full stack under one cape" },
  { others: "SEO only", onecape: "SEO + GEO (AI search)" },
  { others: "Slow onboarding", onecape: "Live in days, not months" },
  { others: "Template solutions", onecape: "Custom-built for you" },
  { others: "You're a ticket", onecape: "You're our mission" },
];

export default function WhyOneCape() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="why-onecape" ref={sectionRef} className="py-24 sm:py-32 px-6 bg-[#FFF5EB]">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs text-[#FF6600] tracking-[0.3em] uppercase font-medium">
            What Makes Us Different
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0D1B2A] leading-tight">
            Why OneCape
          </h2>
          <p className="mt-4 text-gray-500 text-lg leading-relaxed">
            We&apos;re not another agency. We&apos;re the cape your brand&apos;s been waiting for.
          </p>
        </div>

        {/* USP Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {usps.map((usp, idx) => (
            <div
              key={usp.number}
              className={`service-card glass-card p-8 rounded-lg border border-[#E5E5E5] transition-all duration-500 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: visible ? `${idx * 100}ms` : "0ms" }}
            >
              <span className="text-3xl font-extrabold text-[#FF6600]/20 block mb-4">{usp.number}</span>
              <h3 className="text-xl font-extrabold text-[#0D1B2A] mb-3 tracking-wide">
                <span className="text-[#FF6600]">{usp.headline}</span>
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{usp.description}</p>
            </div>
          ))}
        </div>

        {/* Comparison strip */}
        <div className="rounded-xl overflow-hidden">
          <div className="bg-[#0D1B2A] p-8 sm:p-10">
            <h3 className="text-white font-extrabold text-2xl sm:text-3xl mb-2">Others vs OneCape</h3>
            <p className="text-gray-400 text-sm mb-8">No shade. Just facts.</p>
            
            <div className="space-y-4">
              {comparisons.map((comp, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-0 transition-all duration-500 ${
                    visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                  }`}
                  style={{ transitionDelay: visible ? `${600 + idx * 100}ms` : "0ms" }}
                >
                  <div className="flex-1 flex items-center gap-3 min-h-[44px]">
                    <span className="text-gray-500 text-sm">✕</span>
                    <span className="text-gray-400 text-sm sm:text-base">{comp.others}</span>
                  </div>
                  <div className="hidden sm:block w-px h-6 bg-gray-700 mx-6" />
                  <div className="flex-1 flex items-center gap-3 min-h-[44px]">
                    <span className="text-[#FF6600] text-sm font-bold">✓</span>
                    <span className="text-white text-sm sm:text-base font-semibold">{comp.onecape}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}