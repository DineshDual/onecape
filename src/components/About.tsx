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
    <section id="about" className="py-24 sm:py-32 px-6 bg-[#F9FAFB]" aria-labelledby="about-heading">
      <div className="max-w-7xl mx-auto">
        {/* About section */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Mission & Vision */}
          <div>
            <span className="text-xs text-[#FF6600] tracking-[0.3em] uppercase font-medium">
              Why OneCape
            </span>
            <h2 id="about-heading" className="mt-4 text-3xl sm:text-4xl font-extrabold text-[#0D1B2A] leading-tight">
              We believe every business{" "}
              <span className="text-gradient-accent font-extrabold">
                deserves a cape.
              </span>
            </h2>
            <p className="mt-6 text-gray-500 text-lg leading-relaxed">
              We started OneCape because we saw too many great businesses remain invisible. Not because their product wasn&apos;t good enough — because they didn&apos;t have the right cape. The right strategy. The right voice. The right digital presence.
            </p>
            <p className="mt-4 text-gray-500 text-lg leading-relaxed">
              We believe every business — whether you&apos;re a founder in a garage or a D2C brand scaling to millions — deserves a brand that stands out, shows up in search (and AI search), and converts attention into growth.
            </p>
            <p className="mt-4 text-gray-500 text-lg leading-relaxed">
              We&apos;re a team of strategists, creatives, and digital operators passionate about empowering brands. From startups launching for the first time to established businesses reinventing themselves — we put the cape on and help you fly.
            </p>
            <p className="mt-4 text-gray-500 text-lg leading-relaxed">
              The cape isn&apos;t just a metaphor. It&apos;s what you put on when you&apos;re ready to show up differently. Bolder. Sharper. Unstoppable. That&apos;s what we bring to every project.
            </p>
          </div>

          {/* Right: Values */}
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((value, idx) => (
              <div
                key={value.title}
                className="bg-white p-6 rounded-lg border border-[#E5E5E5] shadow-sm transition-all duration-500 hover:translate-y-[-2px] hover:shadow-md"
              >
                <span className="text-3xl font-extrabold text-[#FF6600]/15" aria-hidden="true">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-[#0D1B2A] font-bold tracking-wide">{value.title}</h3>
                <p className="mt-2 text-gray-500 text-sm leading-relaxed">
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