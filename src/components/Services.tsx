const services = [
  {
    id: "01",
    title: "Brand Identity & Strategy",
    description:
      "Logo, brand voice, positioning, visual identity system — the face of your brand. We build identities that make businesses unforgettable.",
    badge: "Core",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.624M10.5 1.5H16.5L21 6l-4.5 4.5H10.5l-3-3 3-3z" />
      </svg>
    ),
    featured: true,
  },
  {
    id: "02",
    title: "Social Media Strategy",
    description:
      "Platform strategy, content calendars, community building, influencer collaboration — turn social into your growth engine.",
    badge: null,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.594 1.594 0 011.362-.507 20.39 20.39 0 003.362-.754 3.028 3.028 0 002.707-3.227V6.741c0-1.6-1.123-2.994-2.707-3.227A21.47 21.47 0 0015 3c-2.398 0-4.71.328-6.893.936A3.028 3.028 0 005.4 7.164V15.51z" />
      </svg>
    ),
    featured: false,
  },
  {
    id: "03",
    title: "SEO & GEO",
    description:
      "Search Engine Optimization + Generative Engine Optimization — get your brand found on Google AND in AI answers.",
    badge: "New",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
    featured: false,
  },
  {
    id: "04",
    title: "Performance Campaigns",
    description:
      "Paid media, Google Ads, Meta Ads, ROI-driven campaigns — every rupee works harder with data behind it.",
    badge: null,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.405 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061A1.125 1.125 0 013 16.811V8.69zM12.75 8.689c0-.864.933-1.405 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061a1.125 1.125 0 01-1.683-.977V8.69z" />
      </svg>
    ),
    featured: false,
  },
  {
    id: "05",
    title: "Content Creation",
    description:
      "Reels, carousels, blogs, newsletters — content that converts. We create what your audience actually wants to engage with.",
    badge: null,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    featured: false,
  },
  {
    id: "06",
    title: "Web Design & Development",
    description:
      "Landing pages, websites, e-commerce — your digital storefront. Fast, beautiful, built to convert.",
    badge: null,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-9V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v2.25m18 0v7.5a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 16.5v-7.5m18 0h-18" />
      </svg>
    ),
    featured: false,
  },
  {
    id: "07",
    title: "Brand Launch Package",
    description:
      "End-to-end launch for new brands — strategy + identity + digital presence + launch campaign. Go live with impact.",
    badge: "Most Popular",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37L6 4.84a2.25 2.25 0 013.182-3.182L18.59 11.07a2.25 2.25 0 01-3.182 3.182zm0 0l2.683 2.683a2.25 2.25 0 01-3.182 3.182L12 17.368m-6.22-6.23L2.34 11.36a2.25 2.25 0 013.182-3.182l3.3 3.3" />
      </svg>
    ),
    featured: false,
  },
  {
    id: "08",
    title: "Reputation Management",
    description:
      "Online reviews, PR, crisis management, brand monitoring — protect and grow the brand you've built.",
    badge: null,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    featured: false,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 sm:py-32 px-6 bg-white" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs text-[#FF6600] tracking-[0.3em] uppercase font-medium">
            What We Do
          </span>
          <h2 id="services-heading" className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0D1B2A] leading-tight">
            Your brand&apos;s toolkit.{" "}
            <span className="text-gradient-accent font-extrabold">
              One cape.
            </span>
          </h2>
          <p className="mt-4 text-gray-500 text-lg leading-relaxed">
            Everything your business needs to build, launch, and grow a powerful digital brand.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Featured card (Brand Identity) - spans 2 cols on lg */}
          {services.filter(s => s.featured).map((service) => (
            <div
              key={service.id}
              className="service-card group accent-border-hover lg:col-span-2 glass-card p-8 sm:p-10 lg:p-12 transition-all duration-500 rounded-lg relative overflow-hidden"
            >
              {/* Background accent */}
              <div className="absolute top-0 left-0 w-2 h-full bg-[#FF6600] rounded-l-lg" />
              
              <div className="relative">
                <div className="flex items-start justify-between mb-8">
                  <div className="p-4 bg-[#FF6600]/10 rounded-xl text-[#FF6600] transition-all duration-300 group-hover:bg-[#FF6600]/20 group-hover:scale-110">
                    {service.icon}
                  </div>
                  <span className="text-5xl font-extrabold text-gray-200 group-hover:text-[#FF6600]/15 transition-colors duration-500">
                    {service.id}
                  </span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-extrabold text-[#0D1B2A] mb-4 tracking-wide">
                  {service.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-lg mb-8">{service.description}</p>
                {service.badge && (
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF6600]/8 border border-[#FF6600]/15 rounded-full">
                    <span className="text-sm text-[#FF6600] font-bold">{service.badge}</span>
                  </div>
                )}
                <div className="mt-8 flex items-center gap-2 text-[#FF6600] text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1">
                  <span>Learn more</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}

          {/* Smaller cards */}
          {services.filter(s => !s.featured).map((service) => (
            <div
              key={service.id}
              className="service-card group accent-border-hover glass-card p-8 transition-all duration-500 rounded-lg relative overflow-hidden"
            >
              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 bg-[#FF6600]/10 rounded-lg text-[#FF6600] transition-all duration-300 group-hover:bg-[#FF6600]/20 group-hover:scale-105">
                    {service.icon}
                  </div>
                  <span className="text-3xl font-extrabold text-gray-200 group-hover:text-[#FF6600]/15 transition-colors duration-500">
                    {service.id}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#0D1B2A] mb-3 tracking-wide">
                  {service.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-[15px] mb-5">{service.description}</p>
                {service.badge && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6600]/8 border border-[#FF6600]/15 rounded-full">
                    <span className="text-xs text-[#FF6600] font-bold">{service.badge}</span>
                  </div>
                )}
                <div className="mt-5 flex items-center gap-2 text-[#FF6600] text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span>Learn more</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}