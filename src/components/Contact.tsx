"use client";

import { useState } from "react";

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
    // In production, this would submit to an API
    alert("Thank you! We'll be in touch within 24 hours.");
  };

  return (
    <section id="contact" className="py-24 sm:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: CTA */}
          <div className="flex flex-col justify-center">
            <span className="text-xs text-[#d4a853] tracking-[0.3em] uppercase font-medium">
              Start a Project
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-white leading-tight">
              Ready to put on{" "}
              <span style={{ fontFamily: "var(--font-playfair)" }} className="text-gradient-gold italic">
                the cape?
              </span>
            </h2>
            <p className="mt-6 text-gray-400 text-lg leading-relaxed">
              Tell us about your brand, your ambitions, and your timeline. We&apos;ll
              get back to you within 24 hours with a clear path forward.
            </p>

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
              <div>
                <label htmlFor="name" className="block text-sm text-gray-400 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#111827] border border-gray-800 rounded-sm text-white placeholder-gray-600 focus:border-[#d4a853] focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-gray-400 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#111827] border border-gray-800 rounded-sm text-white placeholder-gray-600 focus:border-[#d4a853] focus:outline-none transition-colors"
                  placeholder="you@company.com"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="company" className="block text-sm text-gray-400 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#111827] border border-gray-800 rounded-sm text-white placeholder-gray-600 focus:border-[#d4a853] focus:outline-none transition-colors"
                  placeholder="Company name"
                />
              </div>
              <div>
                <label htmlFor="budget" className="block text-sm text-gray-400 mb-2">
                  Budget Range
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#111827] border border-gray-800 rounded-sm text-white focus:border-[#d4a853] focus:outline-none transition-colors appearance-none"
                >
                  <option value="">Select range</option>
                  <option value="10k-25k">$10K – $25K</option>
                  <option value="25k-50k">$25K – $50K</option>
                  <option value="50k-100k">$50K – $100K</option>
                  <option value="100k+">$100K+</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm text-gray-400 mb-2">
                Tell us about your project *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#111827] border border-gray-800 rounded-sm text-white placeholder-gray-600 focus:border-[#d4a853] focus:outline-none transition-colors resize-none"
                placeholder="What's your vision? What does your brand need?"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-10 py-3.5 bg-gradient-to-r from-[#d4a853] to-[#b8912e] text-[#0a0e1a] font-bold tracking-wide text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,168,83,0.3)] hover:scale-[1.02]"
            >
              Send Your Brief
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}