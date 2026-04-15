const results = [
  {
    priority: "#1",
    revenue: "+$45K",
    period: "/mo",
    strategy: "Brand Overhaul",
    investment: "$18K",
    timeline: "90 days",
    description: "Complete repositioning and visual identity redesign for a fintech startup entering the European market.",
  },
  {
    priority: "#2",
    revenue: "+$28K",
    period: "/mo",
    strategy: "Content System",
    investment: "$9K",
    timeline: "60 days",
    description: "Built an organic content engine generating 4.2M impressions and consistent inbound leads.",
  },
  {
    priority: "#3",
    revenue: "+$18K",
    period: "/mo",
    strategy: "Paid Media Scale",
    investment: "$12K",
    timeline: "45 days",
    description: "Optimized paid campaigns achieving 5.2x ROAS across Google, Meta, and LinkedIn channels.",
  },
  {
    priority: "#4",
    revenue: "+$12K",
    period: "/mo",
    strategy: "Visual Identity",
    investment: "$7K",
    timeline: "30 days",
    description: "Brand refresh that increased direct traffic by 67% and dramatically improved brand recall scores.",
  },
];

export default function ResultsGrid() {
  return (
    <section id="results" className="py-24 sm:py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs text-[#E63946] tracking-[0.3em] uppercase font-medium">
            Revenue Impact
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-black text-[#0D1B2A] leading-tight">
            Numbers don&apos;t lie.{" "}
            <span style={{ fontFamily: "var(--font-playfair)" }} className="text-gradient-gold italic">
              We prove it.
            </span>
          </h2>
          <p className="mt-4 text-gray-500 text-lg leading-relaxed">
            We tie every brand investment to measurable financial outcomes. Here&apos;s the revenue impact our clients see.
          </p>
        </div>

        {/* Results Table */}
        <div className="overflow-x-auto -mx-6 px-6">
          {/* Header */}
          <div className="hidden lg:grid lg:grid-cols-[60px_1fr_140px_140px_140px] gap-4 px-6 py-4 border-b border-[#E5E5E5] text-xs text-gray-400 tracking-widest uppercase font-medium bg-[#F9FAFB] rounded-t-lg">
            <div>Rank</div>
            <div>Strategy</div>
            <div>Revenue Gain</div>
            <div>Investment</div>
            <div>Timeline</div>
          </div>

          {/* Rows */}
          <div className="space-y-3">
            {results.map((result, idx) => (
              <div
                key={result.priority}
                className="growth-row glass-card p-6 lg:p-5 rounded-lg cursor-default lg:grid lg:grid-cols-[60px_1fr_140px_140px_140px] lg:gap-4 lg:items-center"
              >
                {/* Priority */}
                <div className="flex items-center gap-3 mb-4 lg:mb-0">
                  <span className={`text-2xl font-black ${idx === 0 ? 'text-[#E63946]' : idx === 1 ? 'text-[#FF6B6B]' : 'text-gray-400'}`}>
                    {result.priority}
                  </span>
                  <div className="lg:hidden">
                    <span className="text-2xl font-black text-[#E63946]">{result.revenue}</span>
                    <span className="text-sm text-[#E63946]/70">{result.period}</span>
                  </div>
                </div>

                {/* Strategy */}
                <div>
                  <h3 className="text-[#0D1B2A] font-bold text-lg">{result.strategy}</h3>
                  <p className="text-gray-500 text-sm mt-1 leading-relaxed">{result.description}</p>
                </div>

                {/* Revenue Gain */}
                <div className="hidden lg:block">
                  <span className="text-2xl font-black text-[#E63946]">{result.revenue}</span>
                  <span className="text-sm text-[#E63946]/70">{result.period}</span>
                </div>

                {/* Investment */}
                <div className="hidden lg:block">
                  <span className="text-[#0D1B2A] font-semibold">{result.investment}</span>
                </div>

                {/* Timeline */}
                <div className="hidden lg:block">
                  <span className="text-gray-500">{result.timeline}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "$103K+", label: "Avg. Monthly Revenue Gain" },
            { value: "5.7x", label: "Average ROI" },
            { value: "56 days", label: "Avg. Time to Results" },
            { value: "98%", label: "Client Retention" },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-4 border border-[#E5E5E5] rounded-lg bg-white">
              <div className="text-2xl sm:text-3xl font-black text-[#E63946]">{stat.value}</div>
              <div className="text-xs text-gray-400 mt-1 tracking-wide uppercase">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-[#E63946] font-bold hover:gap-3 transition-all duration-300 text-lg"
          >
            <span>Want results like these?</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}