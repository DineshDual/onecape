import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "OneCape Admin — Client Management",
  description: "Internal admin panel for OneCape brand building agency",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${jakarta.variable} font-sans antialiased`}>
      {children}
    </div>
  );
}