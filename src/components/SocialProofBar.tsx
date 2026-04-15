const brands = [
  "Meridian Finance",
  "Aether Labs",
  "Solara Wellness",
  "Nomad Supply",
  "TechVault",
  "Prism Health",
  "Cirrus Media",
  "Verida",
];

export default function SocialProofBar() {
  return (
    <section className="py-12 sm:py-16 border-y border-[#d4a853]/5 bg-[#0a0e1a]/80">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs text-gray-500 tracking-[0.3em] uppercase font-medium mb-8">
          Brands that trust OneCape
        </p>
        
        <div className="logo-marquee-container">
          <div className="flex animate-marquee">
            {/* Duplicate for seamless loop */}
            {[...brands, ...brands].map((brand, i) => (
              <div
                key={`${brand}-${i}`}
                className="flex-shrink-0 mx-6 sm:mx-8 flex items-center justify-center"
              >
                <div className="flex items-center gap-2 opacity-30 hover:opacity-60 transition-opacity duration-300 grayscale hover:grayscale-0">
                  <div className="w-8 h-8 rounded bg-gray-800/50 flex items-center justify-center text-gray-500 text-xs font-bold border border-gray-700/30">
                    {brand.charAt(0)}
                  </div>
                  <span className="text-sm text-gray-400 font-medium tracking-wide whitespace-nowrap">
                    {brand}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}