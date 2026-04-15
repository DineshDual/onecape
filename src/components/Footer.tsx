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
    <footer className="bg-[#0D1B2A] border-t border-[#1A1A2E] pt-16 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Newsletter */}
        <div className="mb-16 max-w-xl">
          <h4 className="text-white font-bold text-lg mb-2">Stay ahead of the curve</h4>
          <p className="text-gray-400 text-sm mb-4">Brand insights, strategy tips, and digital trends — delivered monthly.</p>
          <form onSubmit={handleSubscribe} className="flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-4 py-3 bg-[#1A1A2E]/60 border border-gray-700/50 rounded-sm text-white text-sm placeholder-gray-500 focus:border-[#FF6600] focus:outline-none transition-all"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-[#FF6600] to-[#E55A00] text-white font-bold text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,102,0,0.3)] rounded-sm whitespace-nowrap"
            >
              {subscribed ? "✓ Subscribed" : "Subscribe"}
            </button>
          </form>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-[#FF6600] to-[#E55A00] rounded-md flex items-center justify-center">
                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                  className="w-5 h-5 text-white"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M16 4L6 10v8c0 6 10 10 10 10s10-4 10-10v-8L16 4z" fill="currentColor" opacity="0.3" />
                  <path d="M16 4L6 10v8c0 6 10 10 10 10s10-4 10-10v-8L16 4z" />
                  <path d="M12 16l3 3 5-6" strokeWidth={2.5} />
                </svg>
              </div>
              <span className="text-lg font-bold tracking-wider text-white">
                One<span className="text-[#FF6600]">Cape</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              One Cape for your business. Empowering brands to thrive in the digital era.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wide mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#services" className="hover:text-[#FF6600] transition-colors">Brand Identity & Strategy</a></li>
              <li><a href="#services" className="hover:text-[#FF6600] transition-colors">Social Media Strategy</a></li>
              <li><a href="#services" className="hover:text-[#FF6600] transition-colors">SEO & GEO</a></li>
              <li><a href="#services" className="hover:text-[#FF6600] transition-colors">Performance Campaigns</a></li>
              <li><a href="#services" className="hover:text-[#FF6600] transition-colors">Content Creation</a></li>
              <li><a href="#services" className="hover:text-[#FF6600] transition-colors">Web Design & Dev</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wide mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#about" className="hover:text-[#FF6600] transition-colors">About</a></li>
              <li><a href="#portfolio" className="hover:text-[#FF6600] transition-colors">Capabilities</a></li>
              <li><a href="#process" className="hover:text-[#FF6600] transition-colors">Process</a></li>
              <li><a href="#contact" className="hover:text-[#FF6600] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wide mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-[#FF6600] transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-[#FF6600] transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-[#FF6600] transition-colors">Twitter / X</a></li>
              <li><a href="#contact" className="hover:text-[#FF6600] transition-colors">hello@onecape.agency</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-700/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {currentYear} OneCape. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            One Cape. Unlimited Power.
          </p>
        </div>
      </div>
    </footer>
  );
}