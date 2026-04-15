export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-800/50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-gradient-to-br from-[#d4a853] to-[#b8912e] rounded-sm flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-4 h-4 text-[#0a0e1a]"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path d="M12 2L3 20h18L12 2z" />
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