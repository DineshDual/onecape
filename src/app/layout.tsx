import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "OneCape — Your Brand's Superpower | Digital Brand Building Agency",
  description:
    "OneCape gives businesses the cape they need to thrive in the digital era. Brand identity, social media, SEO, performance campaigns, and more.",
  keywords: [
    "brand agency",
    "brand strategy",
    "digital marketing",
    "social media strategy",
    "SEO",
    "GEO",
    "performance campaigns",
    "content creation",
    "web design",
    "OneCape",
  ],
  openGraph: {
    title: "OneCape — Your Brand's Superpower",
    description:
      "One Cape for your business. Brand building power for the digital era.",
    type: "website",
    locale: "en_US",
    siteName: "OneCape",
  },
  twitter: {
    card: "summary_large_image",
    title: "OneCape — Your Brand's Superpower",
    description:
      "One Cape for your business. Brand building power for the digital era.",
  },
  robots: {
    index: true,
    follow: true,
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
      <body className="bg-[#0a0e1a] text-gray-100 font-sans min-h-screen">
        {children}
      </body>
    </html>
  );
}