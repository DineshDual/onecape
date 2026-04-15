const industries = [
  "Startups",
  "D2C Brands",
  "SaaS",
  "F&B",
  "Fashion",
  "Healthcare",
  "Real Estate",
  "EdTech",
];

export default function SocialProofBar() {
  return (
    <section className="py-12 sm:py-16 border-y border-[#E5E5E5] bg-[#F0F4F8]">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs text-gray-400 tracking-[0.3em] uppercase font-medium mb-8">
          Industries We Serve
        </p>
        
        <div className="logo-marquee-container">
          <div className="flex animate-marquee">
            {[...industries, ...industries].map((industry, i) => (
              <div
                key={`${industry}-${i}`}
                className="flex-shrink-0 mx-6 sm:mx-8 flex items-center justify-center"
              >
                <div className="flex items-center gap-2 opacity-50 hover:opacity-80 transition-opacity duration-300">
                  <div className="w-8 h-8 rounded bg-white flex items-center justify-center text-[#FF6600] text-xs font-bold border border-[#E5E5E5]">
                    {industry.charAt(0)}
                  </div>
                  <span className="text-sm text-gray-600 font-medium tracking-wide whitespace-nowrap">
                    {industry}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}