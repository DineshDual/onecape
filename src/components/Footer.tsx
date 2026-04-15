"use client";

import { useState } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="border-t border-gray-800/50 pt-16 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Newsletter */}
        <div className="mb-16 max-w-xl">
          <h4 className="text-white font-bold text-lg mb-2">Stay ahead of the curve</h4>
          <p className="text-gray-400 text-sm mb-4">Brand insights, strategy tips, and case studies — delivered monthly.</p>
          <form onSubmit={handleSubscribe} className="flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-4 py-3 bg-[#111827]/60 border border-gray-800/50 rounded-sm text-white text-sm placeholder-gray-600 focus:border-[#d4a853] focus:outline-none transition-all"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-[#d4a853] to-[#b8912e] text-[#0a0e1a] font-bold text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,168,83,0.2)] rounded-sm whitespace-nowrap"
            >
              {subscribed ? "✓ Subscribed" : "Subscribe"}
            </button>
          </form>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-[#d4a853] to-[#b8912e] rounded-md flex items-center justify-center">
                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                  className="w-5 h-5 text-[#0a0e1a]"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M16 4L6 10v8c0 6 10 10 10 10s10-4 10-10v-8L16 4z" fill="currentColor" opacity="0.3" />
                  <path d="M16 4L6 10v8c0 6 10 10 10 10s10-4 10-10v-8L16 4z" />
                  <path d="M12 16l3 3 5-6" strokeWidth={2.5} />
                </svg>
              </div>
              <span className="text-lg font-bold tracking-wider">
                One<span className="text-[#d4a853]">Cape</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Building brands that command attention. Strategy, content, digital, identity —
              unified under one cape.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wide mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#services" className="hover:text-[#d4a853] transition-colors">Brand Strategy</a></li>
              <li><a href="#services" className="hover:text-[#d4a853] transition-colors">Content Curation</a></li>
              <li><a href="#services" className="hover:text-[#d4a853] transition-colors">Digital Marketing</a></li>
              <li><a href="#services" className="hover:text-[#d4a853] transition-colors">Visual Identity</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wide mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#about" className="hover:text-[#d4a853] transition-colors">About</a></li>
              <li><a href="#portfolio" className="hover:text-[#d4a853] transition-colors">Work</a></li>
              <li><a href="#results" className="hover:text-[#d4a853] transition-colors">Results</a></li>
              <li><a href="#testimonials" className="hover:text-[#d4a853] transition-colors">Clients</a></li>
              <li><a href="#contact" className="hover:text-[#d4a853] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wide mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-[#d4a853] transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-[#d4a853] transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-[#d4a853] transition-colors">Twitter / X</a></li>
              <li><a href="#contact" className="hover:text-[#d4a853] transition-colors">hello@onecape.agency</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © {currentYear} OneCape. All rights reserved.
          </p>
          <p className="text-xs text-gray-700">
            Strategy. Content. Digital. Identity.
          </p>
        </div>
      </div>
    </footer>
  );
}