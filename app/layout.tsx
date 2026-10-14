import type { Metadata } from "next";
import Script from "next/script";

/*
 * Root layout for the ported theme.
 *
 * The static site's design is owned by one compiled stylesheet (css/site.min.css) and
 * the theme's jQuery stack (js/site.js). Both are shipped as-is from /public so every
 * page renders pixel-for-pixel like the HTML version. The stylesheet is a plain
 * render-blocking <link>, exactly like the static page, rather than a CSS import
 * that Next would re-process.
 */

const GTM_ID = "GTM-THX6LFQ9";

export const metadata: Metadata = {
  metadataBase: new URL("https://twolivestheory.com"),
  authors: [{ name: "Basim Yafai" }],
  icons: {
    icon: "/images/favicon.svg",
    shortcut: "/images/favicon.svg",
    apple: [
      { url: "/images/favicon.svg" },
      { url: "/images/favicon.svg", sizes: "72x72" },
      { url: "/images/favicon.svg", sizes: "114x114" },
    ],
  },
};

export const viewport = {
  themeColor: "#00E184",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/manrope-latin.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/sora-latin.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="stylesheet" href="/css/site.min.css" />
        {/* Google Tag Manager. On the static site Netlify injected this at the hosting layer;
            server-rendered pages do not get that injection, so it lives here. */}
        <Script id="gtm" strategy="afterInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}</Script>
      </head>
      <body data-mobile-nav-style="classic" className="custom-cursor index-page">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        {/* jQuery + theme vendors + main + app, concatenated. Runs after hydration;
            the bundle replays the DOMContentLoaded/load handlers it registers. */}
        <Script src="/js/site.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
