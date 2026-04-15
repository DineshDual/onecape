const services = [
  {
    id: "01",
    title: "Brand Strategy",
    description:
      "We dig deep into your market, audience, and ambition to craft a strategy that positions your brand as the only logical choice. Not just a plan — a blueprint for dominance.",
    metric: "Avg. +340% brand recall within 90 days",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
    featured: true,
  },
  {
    id: "02",
    title: "Content Curation",
    description:
      "Content that converts. We create and curate narratives, visuals, and campaigns that make your audience stop scrolling and start engaging.",
    metric: "4.2M avg. organic impressions",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    featured: false,
  },
  {
    id: "03",
    title: "Digital Marketing",
    description:
      "Data-driven campaigns that move people. From SEO to paid media to social strategy, we turn clicks into customers and attention into revenue.",
    metric: "5.2x avg. ROAS achieved",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.405 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061A1.125 1.125 0 013 16.811V8.69zM12.75 8.689c0-.864.933-1.405 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061a1.125 1.125 0 01-1.683-.977V8.69z" />
      </svg>
    ),
    featured: false,
  },
  {
    id: "04",
    title: "Visual Identity",
    description:
      "Logos, type systems, color palettes, guidelines — the full visual system that makes your brand instantly recognizable.",
    metric: "98% brand consistency score",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.624M10.5 1.5H16.5L21 6l-4.5 4.5H10.5l-3-3 3-3z" />
      </svg>
    ),
    featured: false,
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
          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
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

        {/* Service cards — dynamic layout */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Featured card (Brand Strategy) - spans 2 cols on lg */}
          {services.filter(s => s.featured).map((service) => (
            <div
              key={service.id}
              className="group gold-border-hover lg:col-span-2 lg:row-span-2 glass-card p-8 sm:p-10 lg:p-12 transition-all duration-500 hover:translate-y-[-4px] rounded-lg relative overflow-hidden"
            >
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4a853]/[0.03] rounded-full blur-[100px] group-hover:bg-[#d4a853]/[0.06] transition-all duration-700" />
              
              <div className="relative">
                <div className="flex items-start justify-between mb-8">
                  <div className="p-4 bg-[#d4a853]/10 rounded-xl text-[#d4a853] transition-all duration-300 group-hover:bg-[#d4a853]/20 group-hover:scale-110">
                    {service.icon}
                  </div>
                  <span className="text-5xl font-black text-gray-800 group-hover:text-[#d4a853]/20 transition-colors duration-500">
                    {service.id}
                  </span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-black text-white mb-4 tracking-wide">
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-lg mb-8">{service.description}</p>
                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#d4a853]/10 border border-[#d4a853]/20 rounded-full">
                  <svg className="w-4 h-4 text-[#d4a853]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                  </svg>
                  <span className="text-sm text-[#d4a853] font-bold">{service.metric}</span>
                </div>
                <div className="mt-8 flex items-center gap-2 text-[#d4a853] text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1">
                  <span>Learn more</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}

          {/* Smaller cards */}
          {services.filter(s => !s.featured).map((service) => (
            <div
              key={service.id}
              className="group gold-border-hover glass-card p-8 transition-all duration-500 hover:translate-y-[-4px] rounded-lg relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4a853]/[0.02] rounded-full blur-[60px] group-hover:bg-[#d4a853]/[0.05] transition-all duration-700" />
              
              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 bg-[#d4a853]/10 rounded-lg text-[#d4a853] transition-all duration-300 group-hover:bg-[#d4a853]/20 group-hover:scale-105">
                    {service.icon}
                  </div>
                  <span className="text-3xl font-black text-gray-800 group-hover:text-[#d4a853]/20 transition-colors duration-500">
                    {service.id}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-wide">
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-[15px] mb-5">{service.description}</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#d4a853]/10 border border-[#d4a853]/20 rounded-full">
                  <svg className="w-3.5 h-3.5 text-[#d4a853]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                  </svg>
                  <span className="text-xs text-[#d4a853] font-bold">{service.metric}</span>
                </div>
                <div className="mt-5 flex items-center gap-2 text-[#d4a853] text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span>Learn more</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}