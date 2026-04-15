const services = [
  {
    id: "01",
    title: "Brand Strategy",
    description:
      "We dig deep into your market, audience, and ambition to craft a strategy that positions your brand as the only logical choice. Not just a plan — a blueprint for dominance.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
  },
  {
    id: "02",
    title: "Content Curation",
    description:
      "Content that converts. We create and curate narratives, visuals, and campaigns that make your audience stop scrolling and start engaging. Every word earns its place.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    id: "03",
    title: "Digital Marketing",
    description:
      "Data-driven campaigns that don't just reach people — they move them. From SEO to paid media to social strategy, we turn clicks into customers and attention into revenue.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.405 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061A1.125 1.125 0 013 16.811V8.69zM12.75 8.689c0-.864.933-1.405 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061a1.125 1.125 0 01-1.683-.977V8.69z" />
      </svg>
    ),
  },
  {
    id: "04",
    title: "Visual Identity",
    description:
      "Logos, type systems, color palettes, guidelines — the full visual system that makes your brand instantly recognizable. Beautiful. Consistent. Unforgettable.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-91.624M10.5 1.5H16.5L21 6l-4.5 4.5H10.5l-3-3 3-3z" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 sm:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs text-[#d4a853] tracking-[0.3em] uppercase font-medium">
            What We Do
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-white leading-tight">
            Four pillars.{" "}
            <span style={{ fontFamily: "var(--font-playfair)" }} className="text-gradient-gold italic">
              One cape.
            </span>
          </h2>
          <p className="mt-4 text-gray-400 text-lg leading-relaxed">
            Every great brand stands on a foundation of strategy, content, reach, and identity.
            We master all four.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid sm:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="group glass-card p-8 sm:p-10 transition-all duration-500 hover:translate-y-[-4px]"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 bg-[#d4a853]/10 rounded-lg text-[#d4a853] transition-colors group-hover:bg-[#d4a853]/20">
                  {service.icon}
                </div>
                <span className="text-4xl font-bold text-gray-800 group-hover:text-[#d4a853]/20 transition-colors duration-500">
                  {service.id}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-wide">
                {service.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">{service.description}</p>
              <div className="mt-6 flex items-center gap-2 text-[#d4a853] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>Learn more</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}