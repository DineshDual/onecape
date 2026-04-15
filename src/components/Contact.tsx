"use client";

import { useState } from "react";

const trustIndicators = [
  { icon: "✓", text: "Free brand consultation" },
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
    <section id="contact" className="py-24 sm:py-32 px-6 bg-[#F9FAFB]" aria-labelledby="contact-heading">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: CTA */}
          <div className="flex flex-col justify-center">
            <span className="text-xs text-[#FF6600] tracking-[0.3em] uppercase font-medium">
              Get Started
            </span>
            <h2 id="contact-heading" className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0D1B2A] leading-tight">
              Get Your Free{" "}
              <span className="text-gradient-accent font-extrabold">
                Brand Consultation
              </span>
            </h2>
            <p className="mt-6 text-gray-500 text-lg leading-relaxed">
              Tell us about your brand, your ambitions, and your timeline. We&apos;ll
              get back to you within 24 hours with a clear path forward — no strings attached.
            </p>

            {/* Trust indicators */}
            <div className="mt-10 space-y-4">
              {trustIndicators.map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <span className="text-[#FF6600] text-lg" aria-hidden="true">{item.icon}</span>
                  <span className="text-gray-600 font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-3 text-gray-500">
                <svg className="w-5 h-5 text-[#FF6600]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <a href="mailto:hello@onecape.agency" className="hover:text-[#FF6600] transition-colors">hello@onecape.agency</a>
              </div>
              <div className="flex items-center gap-3 text-gray-500">
                <svg className="w-5 h-5 text-[#FF6600]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span>Global — Based in Chennai, India</span>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <form onSubmit={handleSubmit} className="space-y-5" aria-label="Contact form">
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
                  className="w-full px-4 py-4 bg-white border border-[#E5E5E5] rounded-lg text-[#0D1B2A] placeholder-transparent focus:border-[#FF6600] focus:outline-none transition-all min-h-[44px]"
                  aria-required="true"
                />
                <label htmlFor="name" className="text-gray-400">Name *</label>
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
                  className="w-full px-4 py-4 bg-white border border-[#E5E5E5] rounded-lg text-[#0D1B2A] placeholder-transparent focus:border-[#FF6600] focus:outline-none transition-all min-h-[44px]"
                  aria-required="true"
                />
                <label htmlFor="email" className="text-gray-400">Email *</label>
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
                  className="w-full px-4 py-4 bg-white border border-[#E5E5E5] rounded-lg text-[#0D1B2A] placeholder-transparent focus:border-[#FF6600] focus:outline-none transition-all min-h-[44px]"
                />
                <label htmlFor="company" className="text-gray-400">Company</label>
              </div>
              <div className="relative">
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-4 bg-white border border-[#E5E5E5] rounded-lg text-[#0D1B2A] focus:border-[#FF6600] focus:outline-none transition-all appearance-none cursor-pointer min-h-[44px]"
                  aria-label="Budget range"
                >
                  <option value="">Budget Range</option>
                  <option value="10k-25k">₹1L – ₹5L</option>
                  <option value="25k-50k">₹5L – ₹15L</option>
                  <option value="50k-100k">₹15L – ₹50L</option>
                  <option value="100k+">₹50L+</option>
                </select>
                <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
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
                className="w-full px-4 py-4 bg-white border border-[#E5E5E5] rounded-lg text-[#0D1B2A] placeholder-transparent focus:border-[#FF6600] focus:outline-none transition-all resize-none"
                aria-required="true"
              />
              <label htmlFor="message" className="text-gray-400">Tell us about your project *</label>
            </div>
            <button
              type="submit"
              className="btn-primary w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-[#FF6600] to-[#E55A00] text-white font-bold tracking-wide text-sm transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,102,0,0.3)] rounded-sm min-h-[44px]"
            >
              Get Your Free Brand Consultation →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}