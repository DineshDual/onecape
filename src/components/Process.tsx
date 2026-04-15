const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "Deep dive into your market, audience, and competitive landscape to uncover your brand's unique edge.",
  },
  {
    number: "02",
    title: "Strategy",
    description: "Craft a roadmap that ties every brand decision to a measurable business outcome.",
  },
  {
    number: "03",
    title: "Creation",
    description: "Build the brand system — visual, verbal, and digital — that brings the strategy to life.",
  },
  {
    number: "04",
    title: "Launch",
    description: "Execute with precision, measure relentlessly, and optimize for maximum revenue impact.",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-24 sm:py-32 px-6 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs text-[#E63946] tracking-[0.3em] uppercase font-medium">
            How We Work
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-black text-[#0D1B2A] leading-tight">
            From insight to impact.{" "}
            <span style={{ fontFamily: "var(--font-playfair)" }} className="text-gradient-gold italic">
              In four steps.
            </span>
          </h2>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, idx) => (
            <div key={step.number} className="relative group">
              {/* Connector line (desktop only) */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px z-0">
                  <div className="w-full h-px bg-gradient-to-r from-[#E63946]/20 to-transparent" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-6 border-transparent border-l-[#E63946]/20" />
                </div>
              )}

              <div className="relative z-10 glass-card p-8 rounded-lg transition-all duration-500 hover:translate-y-[-4px] gold-border-hover">
                <div className="w-12 h-12 rounded-full bg-[#E63946] flex items-center justify-center text-white font-bold text-sm mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-[#0D1B2A] mb-3 tracking-wide">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#E63946] to-[#C1121F] text-white font-bold tracking-wide text-sm transition-all duration-300 hover:shadow-[0_0_40px_rgba(230,57,70,0.3)] hover:scale-105 rounded-sm"
          >
            Start Your Discovery
            <span className="inline-block ml-1 transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}