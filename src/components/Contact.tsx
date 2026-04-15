"use client";

import { useState } from "react";

const trustIndicators = [
  { icon: "✓", text: "Free brand audit" },
  { icon: "⚡", text: "Response within 24 hours" },
  { icon: "🔒", text: "No commitment required" },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! We'll be in touch within 24 hours.");
  };

  return (
    <section id="contact" className="py-24 sm:py-32 px-6 bg-[#0c1020]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: CTA */}
          <div className="flex flex-col justify-center">
            <span className="text-xs text-[#d4a853] tracking-[0.3em] uppercase font-medium">
              Get Started
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
              Get Your Free{" "}
              <span style={{ fontFamily: "var(--font-playfair)" }} className="text-gradient-gold italic">
                Brand Audit
              </span>
            </h2>
            <p className="mt-6 text-gray-400 text-lg leading-relaxed">
              Tell us about your brand, your ambitions, and your timeline. We&apos;ll
              get back to you within 24 hours with a clear path forward — no strings attached.
            </p>

            {/* Trust indicators */}
            <div className="mt-10 space-y-4">
              {trustIndicators.map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <span className="text-[#d4a853] text-lg">{item.icon}</span>
                  <span className="text-gray-300 font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Social proof near form */}
            <div className="mt-10 inline-flex items-center gap-3 px-5 py-3 bg-[#d4a853]/[0.06] border border-[#d4a853]/10 rounded-full">
              <div className="flex -space-x-2">
                {["AM", "SC", "DO", "+"].map((initials, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-[#d4a853]/10 border-2 border-[#0a0e1a] flex items-center justify-center text-[#d4a853] text-[10px] font-bold">
                    {initials}
                  </div>
                ))}
              </div>
              <span className="text-sm text-gray-400">Join <span className="text-[#d4a853] font-bold">150+</span> brands who started here</span>
            </div>

            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-3 text-gray-400">
                <svg className="w-5 h-5 text-[#d4a853]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span>hello@onecape.agency</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <svg className="w-5 h-5 text-[#d4a853]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span>Global — Based in Chennai, India</span>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="float-label relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder=" "
                  className="w-full px-4 py-4 bg-[#111827]/60 border border-gray-800/50 rounded-lg text-white placeholder-transparent focus:border-[#d4a853] focus:outline-none transition-all"
                />
                <label htmlFor="name" className="text-gray-500">Name *</label>
              </div>
              <div className="float-label relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder=" "
                  className="w-full px-4 py-4 bg-[#111827]/60 border border-gray-800/50 rounded-lg text-white placeholder-transparent focus:border-[#d4a853] focus:outline-none transition-all"
                />
                <label htmlFor="email" className="text-gray-500">Email *</label>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="float-label relative">
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder=" "
                  className="w-full px-4 py-4 bg-[#111827]/60 border border-gray-800/50 rounded-lg text-white placeholder-transparent focus:border-[#d4a853] focus:outline-none transition-all"
                />
                <label htmlFor="company" className="text-gray-500">Company</label>
              </div>
              <div className="relative">
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-4 bg-[#111827]/60 border border-gray-800/50 rounded-lg text-white focus:border-[#d4a853] focus:outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="">Budget Range</option>
                  <option value="10k-25k">$10K – $25K</option>
                  <option value="25k-50k">$25K – $50K</option>
                  <option value="50k-100k">$50K – $100K</option>
                  <option value="100k+">$100K+</option>
                </select>
                <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
            </div>
            <div className="float-label relative">
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder=" "
                className="w-full px-4 py-4 bg-[#111827]/60 border border-gray-800/50 rounded-lg text-white placeholder-transparent focus:border-[#d4a853] focus:outline-none transition-all resize-none"
              />
              <label htmlFor="message" className="text-gray-500">Tell us about your project *</label>
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-[#d4a853] to-[#b8912e] text-[#0a0e1a] font-black tracking-wide text-sm transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,168,83,0.35)] hover:scale-[1.02] rounded-sm"
            >
              Get Your Free Brand Audit →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}