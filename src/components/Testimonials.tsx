const testimonials = [
  {
    quote:
      "OneCape gave us a brand identity that finally feels like us. They didn't just design a logo — they gave us a whole identity system that we're proud to put everywhere.",
    attribution: "Founder, D2C Fashion Brand",
    rating: 5,
  },
  {
    quote:
      "The SEO and GEO strategy they built has us showing up in AI answers, not just Google. That's future-proofing our brand visibility.",
    attribution: "Marketing Lead, SaaS Startup",
    rating: 5,
  },
  {
    quote:
      "From zero online presence to a full brand launch in weeks. The cape metaphor is real — they made us feel unstoppable going to market.",
    attribution: "CEO, Health-Tech Company",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 sm:py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs text-[#FF6600] tracking-[0.3em] uppercase font-medium">
            Client Voices
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0D1B2A] leading-tight">
            Don&apos;t take our word.{" "}
            <span className="text-gradient-accent font-extrabold">
              Take theirs.
            </span>
          </h2>
        </div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="glass-card p-8 flex flex-col justify-between transition-all duration-500 hover:translate-y-[-4px] rounded-lg"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(t.rating)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#FF6600]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote icon */}
              <svg
                className="w-8 h-8 text-[#FF6600]/15 mb-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <p className="text-gray-600 leading-relaxed text-[15px] flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="mt-8 flex items-center gap-4 pt-6 border-t border-[#E5E5E5]">
                <div className="w-11 h-11 rounded-full bg-[#FF6600]/10 flex items-center justify-center text-[#FF6600] text-sm font-bold border border-[#FF6600]/15">
                  {t.attribution.split(",")[0].charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="text-[#0D1B2A] font-semibold text-sm">{t.attribution.split(",")[0]}</div>
                  <div className="text-gray-400 text-xs">{t.attribution.split(",")[1]?.trim()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}