const values = [
  {
    title: "Relentless Standards",
    description: "Good enough is never good enough. We push until every detail is right.",
  },
  {
    title: "Strategic First",
    description: "Beautiful work without strategy is decoration. Strategy without beautiful work is a spreadsheet. We do both.",
  },
  {
    title: "Outcome Obsessed",
    description: "We measure ourselves by your results, not our hours. Your growth is our scoreboard.",
  },
  {
    title: "No Ego, All In",
    description: "We challenge you. We listen to you. We're in this together — one team, one cape.",
  },
];

const stats = [
  {
    value: "150+",
    label: "Brands",
    description: "From startups to market leaders, we've built brands across every vertical.",
  },
  {
    value: "$2B+",
    label: "Revenue Generated",
    description: "Total client revenue attributed to our brand strategies and campaigns.",
  },
  {
    value: "98%",
    label: "Retention Rate",
    description: "Our clients stay because the results keep compounding year after year.",
  },
  {
    value: "12+",
    label: "Years Experience",
    description: "Over a decade of building brands that dominate their categories.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Why brands choose us - Stat cards */}
        <div className="mb-20">
          <span className="text-xs text-[#d4a853] tracking-[0.3em] uppercase font-medium">
            Why Brands Choose Us
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight max-w-3xl">
            Not another agency.{" "}
            <span style={{ fontFamily: "var(--font-playfair)" }} className="text-gradient-gold italic">
              Your brand&apos;s edge.
            </span>
          </h2>

          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass-card p-6 sm:p-8 rounded-lg gold-border-hover transition-all duration-500 hover:translate-y-[-4px] text-center"
              >
                <div className="text-4xl sm:text-5xl font-black text-[#d4a853] mb-2">{stat.value}</div>
                <div className="text-sm text-white font-bold tracking-wider uppercase mb-3">{stat.label}</div>
                <p className="text-gray-400 text-sm leading-relaxed">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* About section */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: About text */}
          <div>
            <span className="text-xs text-[#d4a853] tracking-[0.3em] uppercase font-medium">
              Who We Are
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-black text-white leading-tight">
              We make brands{" "}
              <span style={{ fontFamily: "var(--font-playfair)" }} className="text-gradient-gold italic">
                impossible to ignore.
              </span>
            </h2>
            <p className="mt-6 text-gray-400 text-lg leading-relaxed">
              OneCape was born from a simple observation: most brands don&apos;t fail because
              of bad products — they fail because they&apos;re invisible. We exist to make
              sure that never happens to our clients.
            </p>
            <p className="mt-4 text-gray-400 text-lg leading-relaxed">
              We&apos;re a tight-knit team of strategists, creatives, and digital operators
              who&apos;ve built brands from garage startups to market leaders. We don&apos;t
              do cookie-cutter. Every engagement is custom, every brand is unique, and
              every result matters.
            </p>
            <p className="mt-4 text-gray-400 text-lg leading-relaxed">
              The cape? It&apos;s what you put on when you&apos;re ready to show up differently.
              Bolder. Sharper. Unstoppable. That&apos;s what we bring to every project.
            </p>
          </div>

          {/* Right: Values */}
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((value, idx) => (
              <div
                key={value.title}
                className="glass-card p-6 rounded-lg transition-all duration-500 hover:translate-y-[-2px] gold-border-hover"
              >
                <span className="text-3xl font-black text-[#d4a853]/20">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-white font-bold tracking-wide">{value.title}</h3>
                <p className="mt-2 text-gray-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}