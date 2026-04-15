export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a] via-[#0f1528] to-[#0a0e1a]" />
        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#d4a853 1px, transparent 1px), linear-gradient(90deg, #d4a853 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#d4a853]/[0.03] blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-1.5 mb-8 border border-[#d4a853]/20 rounded-full bg-[#d4a853]/5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#d4a853] animate-pulse" />
          <span className="text-xs text-[#d4a853] tracking-widest uppercase font-medium">
            Brand Building Agency
          </span>
        </div>

        {/* Headline */}
        <h1 className="animate-fade-up delay-200 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-6">
          <span className="block text-white">Brands That</span>
          <span className="block text-gradient-gold" style={{ fontFamily: "var(--font-playfair)" }}>
            Command
          </span>
          <span className="block text-white">Attention</span>
        </h1>

        {/* Subheadline */}
        <p className="animate-fade-up delay-400 max-w-2xl mx-auto text-lg sm:text-xl text-gray-400 leading-relaxed mb-10">
          We don&apos;t just build brands — we craft legacies. Strategy, content, digital,
          and identity — unified under one cape.
        </p>

        {/* CTAs */}
        <div className="animate-fade-up delay-500 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="group px-8 py-3.5 bg-gradient-to-r from-[#d4a853] to-[#b8912e] text-[#0a0e1a] font-semibold tracking-wide text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,168,83,0.3)] hover:scale-105"
          >
            Start Your Brand Journey
            <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="#portfolio"
            className="px-8 py-3.5 border border-gray-700 text-gray-300 hover:border-[#d4a853]/50 hover:text-[#d4a853] font-semibold tracking-wide text-sm transition-all duration-300"
          >
            View Our Work
          </a>
        </div>

        {/* Stats */}
        <div className="animate-fade-up delay-700 mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { value: "150+", label: "Brands Built" },
            { value: "98%", label: "Client Retention" },
            { value: "12+", label: "Years Leading" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[#d4a853]">{stat.value}</div>
              <div className="text-xs text-gray-500 tracking-wider uppercase mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 rounded-full border border-gray-600 flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-[#d4a853] rounded-full" />
        </div>
      </div>
    </section>
  );
}