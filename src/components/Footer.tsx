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
    <footer className="bg-[#0D1B2A] border-t border-[#1A1A2E] pt-16 pb-12 px-6" role="contentinfo">
      <div className="max-w-7xl mx-auto">
        {/* Newsletter */}
        <div className="mb-16 max-w-xl">
          <h4 className="text-white font-bold text-lg mb-2">Stay ahead of the curve</h4>
          <p className="text-gray-400 text-sm mb-4">Brand insights, strategy tips, and digital trends — delivered monthly.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3" aria-label="Newsletter signup">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-4 py-3 bg-[#1A1A2E]/60 border border-gray-700/50 rounded-sm text-white text-sm placeholder-gray-500 focus:border-[#FF6600] focus:outline-none transition-all min-h-[44px]"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="btn-primary px-6 py-3 bg-gradient-to-r from-[#FF6600] to-[#E55A00] text-white font-bold text-sm tracking-wide transition-all duration-300 rounded-sm whitespace-nowrap min-h-[44px]"
            >
              {subscribed ? "✓ Subscribed" : "Subscribe"}
            </button>
          </form>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-[#FF6600] to-[#E55A00] rounded-md flex items-center justify-center" aria-hidden="true">
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
            <nav aria-label="Footer services navigation">
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#services" className="hover:text-[#FF6600] transition-colors min-h-[44px] inline-flex items-center">Brand Identity & Strategy</a></li>
                <li><a href="#services" className="hover:text-[#FF6600] transition-colors min-h-[44px] inline-flex items-center">Social Media Strategy</a></li>
                <li><a href="#services" className="hover:text-[#FF6600] transition-colors min-h-[44px] inline-flex items-center">SEO & Digital Presence</a></li>
                <li><a href="#services" className="hover:text-[#FF6600] transition-colors min-h-[44px] inline-flex items-center">Performance Campaigns</a></li>
                <li><a href="#services" className="hover:text-[#FF6600] transition-colors min-h-[44px] inline-flex items-center">Content Creation</a></li>
                <li><a href="#services" className="hover:text-[#FF6600] transition-colors min-h-[44px] inline-flex items-center">Web Design & Dev</a></li>
              </ul>
            </nav>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wide mb-4">Company</h4>
            <nav aria-label="Footer company navigation">
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#about" className="hover:text-[#FF6600] transition-colors min-h-[44px] inline-flex items-center">About</a></li>
                <li><a href="#portfolio" className="hover:text-[#FF6600] transition-colors min-h-[44px] inline-flex items-center">Capabilities</a></li>
                <li><a href="#process" className="hover:text-[#FF6600] transition-colors min-h-[44px] inline-flex items-center">Process</a></li>
                <li><a href="#contact" className="hover:text-[#FF6600] transition-colors min-h-[44px] inline-flex items-center">Contact</a></li>
              </ul>
            </nav>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wide mb-4">Connect</h4>
            <nav aria-label="Footer social navigation">
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-[#FF6600] transition-colors min-h-[44px] inline-flex items-center" rel="noopener">LinkedIn</a></li>
                <li><a href="#" className="hover:text-[#FF6600] transition-colors min-h-[44px] inline-flex items-center" rel="noopener">Instagram</a></li>
                <li><a href="#" className="hover:text-[#FF6600] transition-colors min-h-[44px] inline-flex items-center" rel="noopener">Twitter / X</a></li>
                <li><a href="mailto:hello@onecape.agency" className="hover:text-[#FF6600] transition-colors min-h-[44px] inline-flex items-center">hello@onecape.agency</a></li>
              </ul>
            </nav>
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