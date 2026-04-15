import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OneCape — Brand Building Agency | Strategy. Content. Digital. Identity.",
  description:
    "OneCape is a premium brand building agency specializing in brand strategy, content curation, digital marketing, and visual identity. We craft brands that command attention.",
  keywords: [
    "brand agency",
    "brand strategy",
    "content curation",
    "digital marketing",
    "visual identity",
    "branding agency",
    "OneCape",
  ],
  openGraph: {
    title: "OneCape — Brand Building Agency",
    description:
      "Strategy. Content. Digital. Identity. We craft brands that command attention.",
    type: "website",
    locale: "en_US",
    siteName: "OneCape",
  },
  twitter: {
    card: "summary_large_image",
    title: "OneCape — Brand Building Agency",
    description:
      "Strategy. Content. Digital. Identity. We craft brands that command attention.",
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
      className={`${inter.variable} ${playfair.variable} scroll-smooth antialiased`}
    >
      <body className="bg-[#0a0e1a] text-gray-100 font-sans min-h-screen">
        {children}
      </body>
    </html>
  );
}