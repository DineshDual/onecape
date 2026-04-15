const capabilities = [
  {
    category: "Brand Launches",
    title: "Brand Launches",
    description: "Strategy, identity, digital presence, and launch campaigns — everything to go live with impact and clarity.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37L6 4.84a2.25 2.25 0 013.182-3.182L18.59 11.07a2.25 2.25 0 01-3.182 3.182zm0 0l2.683 2.683a2.25 2.25 0 01-3.182 3.182L12 17.368m-6.22-6.23L2.34 11.36a2.25 2.25 0 013.182-3.182l3.3 3.3" />
      </svg>
    ),
  },
  {
    category: "Social Media Transformations",
    title: "Social Media Transformations",
    description: "From zero presence to engaged community — platform strategy, content systems, and audience growth.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.594 1.594 0 011.362-.507 20.39 20.39 0 003.362-.754 3.028 3.028 0 002.707-3.227V6.741c0-1.6-1.123-2.994-2.707-3.227A21.47 21.47 0 0015 3c-2.398 0-4.71.328-6.893.936A3.028 3.028 0 005.4 7.164V15.51z" />
      </svg>
    ),
  },
  {
    category: "SEO Overhauls",
    title: "SEO Overhauls",
    description: "Technical SEO, content optimization, and GEO — get found on search engines and AI platforms.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
  },
  {
    category: "Campaign Sprints",
    title: "Campaign Sprints",
    description: "Focused paid media and performance campaigns — Google Ads, Meta Ads, ROI-driven execution in short bursts.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.405 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061A1.125 1.125 0 013 16.811V8.69zM12.75 8.689c0-.864.933-1.405 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061a1.125 1.125 0 01-1.683-.977V8.69z" />
      </svg>
    ),
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 sm:py-32 px-6 bg-[#F9FAFB]" aria-labelledby="portfolio-heading">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs text-[#FF6600] tracking-[0.3em] uppercase font-medium">
            What We Deliver
          </span>
          <h2 id="portfolio-heading" className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0D1B2A] leading-tight">
            Our capabilities.{" "}
            <span className="text-gradient-accent font-extrabold">
              Your advantage.
            </span>
          </h2>
          <p className="mt-4 text-gray-500 text-lg leading-relaxed">
            Every project type we excel at — ready to deploy for your brand.
          </p>
        </div>

        {/* Capability cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="capability-card group accent-border-hover glass-card p-8 transition-all duration-500 hover:translate-y-[-4px] rounded-lg"
            >
              <div className="capability-visual p-3 bg-[#FF6600]/10 rounded-lg text-[#FF6600] mb-6 transition-all duration-300 group-hover:bg-[#FF6600]/20 inline-block">
                {cap.icon}
              </div>
              <span className="text-xs text-[#FF6600] tracking-widest uppercase font-medium">
                {cap.category}
              </span>
              <h3 className="mt-2 text-xl font-bold text-[#0D1B2A] mb-3">{cap.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{cap.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="#contact"
            className="btn-primary inline-flex items-center gap-2 text-[#FF6600] font-bold hover:gap-3 transition-all duration-300 text-lg min-h-[44px]"
          >
            <span>Let&apos;s build something powerful</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}