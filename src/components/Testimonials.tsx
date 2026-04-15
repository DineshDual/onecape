const testimonials = [
  {
    quote:
      "OneCape didn't just rebrand us — they repositioned us. Our market perception shifted overnight, and the numbers followed. Best investment we've made. Revenue up 45% in the first quarter post-rebrand.",
    name: "Arjun Mehta",
    role: "CEO, Meridian Finance",
    initials: "AM",
    company: "Meridian Finance",
    rating: 5,
  },
  {
    quote:
      "Working with OneCape felt like having a co-founder who happens to be brilliant at branding. They challenged our assumptions and delivered something far beyond what we imagined. The $8M seed round speaks for itself.",
    name: "Sofia Chen",
    role: "Founder, Aether Labs",
    initials: "SC",
    company: "Aether Labs",
    rating: 5,
  },
  {
    quote:
      "The content strategy alone generated more leads in three months than our previous agency managed in a year. These people don't mess around. 4.2M organic impressions and counting.",
    name: "David Okafor",
    role: "CMO, Solara Wellness",
    initials: "DO",
    company: "Solara Wellness",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 sm:py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs text-[#E63946] tracking-[0.3em] uppercase font-medium">
            Client Voices
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-black text-[#0D1B2A] leading-tight">
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
              className="glass-card p-8 flex flex-col justify-between transition-all duration-500 hover:translate-y-[-4px] rounded-lg"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(t.rating)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#E63946]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote icon */}
              <svg
                className="w-8 h-8 text-[#E63946]/15 mb-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <p className="text-gray-600 leading-relaxed text-[15px] flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="mt-8 flex items-center gap-4 pt-6 border-t border-[#E5E5E5]">
                <div className="w-11 h-11 rounded-full bg-[#E63946]/10 flex items-center justify-center text-[#E63946] text-sm font-bold border border-[#E63946]/15">
                  {t.initials}
                </div>
                <div className="flex-1">
                  <div className="text-[#0D1B2A] font-semibold text-sm">{t.name}</div>
                  <div className="text-gray-400 text-xs">{t.role}</div>
                </div>
                {/* Company logo placeholder */}
                <div className="w-16 h-8 rounded bg-[#F9FAFB] flex items-center justify-center border border-[#E5E5E5]">
                  <span className="text-[10px] text-gray-400 font-medium tracking-wider uppercase">{t.company.split(' ')[0]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}