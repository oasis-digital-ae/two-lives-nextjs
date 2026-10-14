import Script from "next/script";
import ThemeLayout from "@/components/ThemeLayout";
import { siteMetadata, siteViewport } from "@/lib/site-metadata";

export const metadata = siteMetadata;
export const viewport = siteViewport;

/* request-mentorship: the theme keeps the WhatsApp widget visible through ".contactpage",
   and the page embeds Calendly. */
export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeLayout bodyClass="custom-cursor non-home contactpage">
      <link rel="stylesheet" href="https://assets.calendly.com/assets/external/widget.css" precedence="page" />
      {children}
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />
    </ThemeLayout>
  );
}
