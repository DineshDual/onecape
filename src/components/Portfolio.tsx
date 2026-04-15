const projects = [
  {
    category: "Brand Strategy + Visual Identity",
    title: "Meridian Finance",
    description: "Complete rebrand for a fintech startup entering the European market. From zero to series A with a brand that speaks trust.",
    metrics: "300% increase in brand recall",
    color: "from-[#1a3a5c] to-[#0a1e33]",
    initial: "M",
    size: "large",
  },
  {
    category: "Full Brand Build",
    title: "Aether Labs",
    description: "Born from scratch. Strategy, identity, content, launch — we built Aether from a concept to a brand that closed $8M in seed funding.",
    metrics: "$8M seed round closed post-rebrand",
    color: "from-[#2a1a3a] to-[#140a1e]",
    initial: "A",
    size: "medium",
  },
  {
    category: "Content Curation + Digital",
    title: "Solara Wellness",
    description: "Content ecosystem and digital campaign that turned a local wellness brand into a national name.",
    metrics: "4.2M organic impressions in 6 months",
    color: "from-[#3a2a1a] to-[#1a1008]",
    initial: "S",
    size: "medium",
  },
  {
    category: "Visual Identity + Strategy",
    title: "Nomad Supply Co.",
    description: "Visual identity system and brand positioning for a DTC outdoor brand that now leads its category.",
    metrics: "Category leader within 18 months",
    color: "from-[#1a3a2a] to-[#0a1e10]",
    initial: "N",
    size: "wide",
  },
  {
    category: "Digital Marketing + Content",
    title: "TechVault",
    description: "Full-funnel digital strategy that drove 5.2x ROAS and transformed a B2B SaaS into a category leader.",
    metrics: "5.2x ROAS achieved",
    color: "from-[#2a2a3a] to-[#0e1020]",
    initial: "T",
    size: "medium",
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 sm:py-32 px-6 bg-[#0c1020]">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs text-[#d4a853] tracking-[0.3em] uppercase font-medium">
            Selected Work
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
            Results speak.{" "}
            <span style={{ fontFamily: "var(--font-playfair)" }} className="text-gradient-gold italic">
              We let them.
            </span>
          </h2>
        </div>

        {/* Masonry grid */}
        <div className="masonry-grid">
          {projects.map((project) => (
            <div
              key={project.title}
              className={`group relative overflow-hidden rounded-lg transition-all duration-500 hover:translate-y-[-4px] gold-border-hover cursor-default ${
                project.size === "large" ? "masonry-item" : 
                project.size === "wide" ? "masonry-item" : "masonry-item"
              }`}
            >
              {/* Visual area */}
              <div className={`bg-gradient-to-br ${project.color} relative overflow-hidden ${
                project.size === "large" ? "h-64 sm:h-80" : "h-48 sm:h-56"
              }`}>
                {/* Large initial */}
                <span className="absolute inset-0 flex items-center justify-center text-[8rem] sm:text-[10rem] font-black text-white/[0.04] tracking-wider select-none">
                  {project.initial}
                </span>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#0a0e1a]/0 group-hover:bg-[#0a0e1a]/70 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="text-center px-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-xs text-[#d4a853] tracking-widest uppercase font-medium">
                      {project.category}
                    </span>
                    <h3 className="mt-2 text-xl sm:text-2xl font-bold text-white">{project.title}</h3>
                    <p className="mt-2 text-gray-300 text-sm leading-relaxed max-w-xs">{project.description}</p>
                  </div>
                </div>
              </div>

              {/* Info area */}
              <div className="p-6 sm:p-8 glass-card">
                <span className="text-xs text-[#d4a853] tracking-widest uppercase font-medium">
                  {project.category}
                </span>
                <h3 className="mt-2 text-xl sm:text-2xl font-bold text-white">{project.title}</h3>
                <p className="mt-2 text-gray-400 text-sm leading-relaxed line-clamp-2">{project.description}</p>
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#d4a853]/10 border border-[#d4a853]/20 rounded-full">
                  <svg className="w-4 h-4 text-[#d4a853]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                  </svg>
                  <span className="text-sm text-[#d4a853] font-bold">{project.metrics}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-[#d4a853] font-bold hover:gap-3 transition-all duration-300 text-lg"
          >
            <span>See what we can do for you</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}