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

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: About text */}
          <div>
            <span className="text-xs text-[#d4a853] tracking-[0.3em] uppercase font-medium">
              Who We Are
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-white leading-tight">
              Not another agency.{" "}
              <span style={{ fontFamily: "var(--font-playfair)" }} className="text-gradient-gold italic">
                Your brand&apos;s edge.
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
                className="glass-card p-6 transition-all duration-500 hover:translate-y-[-2px]"
              >
                <span className="text-3xl font-bold text-[#d4a853]/20">
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