import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "OneCape — Brand Building Agency for the Digital Era | Strategy, Social Media, SEO & GEO",
  description:
    "OneCape is the brand building agency that gives your business its cape — strategy, social media, SEO/GEO, performance campaigns, and more. Built for startups and growing brands in the digital era.",
  keywords: [
    "brand building agency",
    "digital branding",
    "social media strategy",
    "SEO agency",
    "GEO optimization",
    "brand identity",
    "brand launch",
    "content creation",
    "performance marketing",
    "startup branding",
    "D2C branding",
  ],
  openGraph: {
    title: "OneCape — Brand Building Agency for the Digital Era",
    description:
      "The cape your business needs to thrive in the digital era. Full-stack branding. AI-ready. Built for builders.",
    url: "https://onecape-marketing.netlify.app",
    type: "website",
    locale: "en_US",
    siteName: "OneCape",
  },
  twitter: {
    card: "summary_large_image",
    title: "OneCape — Brand Building Agency for the Digital Era",
    description:
      "The cape your business needs to thrive in the digital era. Full-stack branding. AI-ready. Built for builders.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://onecape-marketing.netlify.app",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "OneCape",
  description: "Brand building agency for the digital era",
  url: "https://onecape-marketing.netlify.app",
  logo: "https://onecape-marketing.netlify.app/logo.svg",
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@onecape.agency",
    contactType: "sales",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} scroll-smooth antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-white text-gray-100 font-sans min-h-screen">
        {children}
      </body>
    </html>
  );
}