import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppWidget from "@/components/layout/WhatsAppWidget";
import ScrollProgress from "@/components/layout/ScrollProgress";
import CustomCursor from "@/components/layout/CustomCursor";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sora",
});

const gotham = localFont({
  src: "./fonts/Gotham-Black.woff2",
  weight: "900",
  variable: "--font-gotham",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Two Lives Theory - Step Into Your Next Life",
  description:
    "Private Mentorship led by Basim Yafai, Mindset & Growth Mentor. Two Lives Theory is trusted by high performing leaders, entrepreneurs & elite athletes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${sora.variable} ${gotham.variable}`}>
      <body className="flex min-h-screen flex-col bg-white text-carbon">
        <CustomCursor />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppWidget />
        <ScrollProgress />
      </body>
    </html>
  );
}
