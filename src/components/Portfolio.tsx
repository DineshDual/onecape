const projects = [
  {
    category: "Brand Strategy + Visual Identity",
    title: "Meridian Finance",
    description: "Complete rebrand for a fintech startup entering the European market. From zero to series A with a brand that speaks trust.",
    metrics: "300% increase in brand recall",
    color: "from-[#1a3a5c] to-[#0a1e33]",
  },
  {
    category: "Content Curation + Digital",
    title: "Solara Wellness",
    description: "Content ecosystem and digital campaign that turned a local wellness brand into a national name. Organic growth on steroids.",
    metrics: "4.2M organic impressions in 6 months",
    color: "from-[#3a2a1a] to-[#1a1008]",
  },
  {
    category: "Full Brand Build",
    title: "Aether Labs",
    description: "Born from scratch. Strategy, identity, content, launch — we built Aether from a concept to a brand that closed $8M in seed funding.",
    metrics: "$8M seed round closed post-rebrand",
    color: "from-[#2a1a3a] to-[#140a1e]",
  },
  {
    category: "Visual Identity + Strategy",
    title: "Nomad Supply Co.",
    description: "Visual identity system and brand positioning for a DTC outdoor brand that now leads its category on three continents.",
    metrics: "Category leader within 18 months",
    color: "from-[#1a3a2a] to-[#0a1e10]",
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 sm:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs text-[#d4a853] tracking-[0.3em] uppercase font-medium">
            Selected Work
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-white leading-tight">
            Results speak.{" "}
            <span style={{ fontFamily: "var(--font-playfair)" }} className="text-gradient-gold italic">
              We let them.
            </span>
          </h2>
        </div>

        {/* Project cards */}
        <div className="grid gap-6">
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className={`group relative overflow-hidden rounded-sm transition-all duration-500 hover:translate-y-[-2px] ${
                idx === 0 ? "sm:grid sm:grid-cols-2" : ""
              }`}
            >
              {/* Project visual */}
              <div
                className={`bg-gradient-to-br ${project.color} h-48 sm:h-64 flex items-center justify-center transition-all duration-500 group-hover:scale-[1.02] ${
                  idx === 0 ? "sm:h-full sm:min-h-[320px]" : ""
                }`}
              >
                <span className="text-6xl sm:text-8xl font-bold text-white/[0.06] tracking-wider">
                  {project.title.charAt(0)}
                </span>
              </div>

              {/* Project info */}
              <div className={`p-8 sm:p-10 glass-card ${idx === 0 ? "" : "mt-0"}`}>
                <span className="text-xs text-[#d4a853] tracking-wider uppercase font-medium">
                  {project.category}
                </span>
                <h3 className="mt-3 text-2xl sm:text-3xl font-bold text-white">{project.title}</h3>
                <p className="mt-3 text-gray-400 leading-relaxed">{project.description}</p>
                <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-[#d4a853]/10 border border-[#d4a853]/20 rounded-sm">
                  <svg className="w-4 h-4 text-[#d4a853]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                  </svg>
                  <span className="text-sm text-[#d4a853] font-medium">{project.metrics}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-[#d4a853] font-medium hover:gap-3 transition-all duration-300"
          >
            <span>See what we can do for you</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}