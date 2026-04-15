import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "OneCape — Brand Building Agency | Strategy, Social Media, SEO & Digital Presence",
  description:
    "OneCape is the brand building agency that gives your business its cape. We build brands that connect, resonate, and grow. Strategy, social media, SEO, content, and more.",
  keywords: [
    "brand building agency",
    "digital branding",
    "social media strategy",
    "SEO agency",
    "brand connection",
    "brand storytelling",
    "brand identity",
    "brand launch",
    "content creation",
    "performance marketing",
    "digital presence",
    "startup branding",
    "D2C branding",
  ],
  openGraph: {
    title: "OneCape — Brand Building Agency",
    description:
      "Brands that connect. Brands that grow.",
    url: "https://onecape-marketing.netlify.app",
    type: "website",
    locale: "en_US",
    siteName: "OneCape",
  },
  twitter: {
    card: "summary_large_image",
    title: "OneCape — Brand Building Agency",
    description:
      "Brands that connect. Brands that grow.",
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
  description: "Brand building agency that builds brands that connect, resonate, and grow",
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