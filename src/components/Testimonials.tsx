const testimonials = [
  {
    quote:
      "OneCape didn't just rebrand us — they repositioned us. Our market perception shifted overnight, and the numbers followed. Best investment we've made.",
    name: "Arjun Mehta",
    role: "CEO, Meridian Finance",
    initials: "AM",
  },
  {
    quote:
      "Working with OneCape felt like having a co-founder who happens to be brilliant at branding. They challenged our assumptions and delivered something far beyond what we imagined.",
    name: "Sofia Chen",
    role: "Founder, Aether Labs",
    initials: "SC",
  },
  {
    quote:
      "The content strategy alone generated more leads in three months than our previous agency managed in a year. These people don't mess around.",
    name: "David Okafor",
    role: "CMO, Solara Wellness",
    initials: "DO",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 sm:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs text-[#d4a853] tracking-[0.3em] uppercase font-medium">
            Client Voices
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-white leading-tight">
            Don&apos;t take our word.{" "}
            <span style={{ fontFamily: "var(--font-playfair)" }} className="text-gradient-gold italic">
              Take theirs.
            </span>
          </h2>
        </div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="glass-card p-8 flex flex-col justify-between transition-all duration-500 hover:translate-y-[-4px]"
            >
              {/* Quote icon */}
              <svg
                className="w-8 h-8 text-[#d4a853]/30 mb-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <p className="text-gray-300 leading-relaxed text-[15px] flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="mt-8 flex items-center gap-3 pt-6 border-t border-gray-800">
                <div className="w-10 h-10 rounded-full bg-[#d4a853]/10 flex items-center justify-center text-[#d4a853] text-sm font-bold">
                  {t.initials}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-gray-500 text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}