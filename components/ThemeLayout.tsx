import Script from "next/script";

/*
 * The <html>/<body> shell every root layout renders.
 *
 * The static site's design is owned by one compiled stylesheet (css/site.min.css) and the
 * theme's jQuery stack (js/site.js). Both ship as-is from /public so every page renders
 * pixel-for-pixel like the HTML version. Stylesheets carry a `precedence` so React keeps
 * them in head in this order: theme first, then any page-specific sheet.
 *
 * bodyClass varies per route group because the theme styles the header through it
 * (".index-page header ...", ".non-home header .navbar", ".contactpage .whatsapp-widget").
 */

const GTM_ID = "GTM-THX6LFQ9";

export default function ThemeLayout({
  bodyClass,
  children,
}: Readonly<{ bodyClass: string; children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/manrope-latin.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/sora-latin.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="stylesheet" href="/css/site.min.css" precedence="theme" />
        {/* Google Tag Manager. On the static site Netlify injected this at the hosting layer;
            server-rendered pages do not get that injection, so it lives here. */}
        <Script id="gtm" strategy="afterInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}</Script>
      </head>
      <body data-mobile-nav-style="classic" className={bodyClass}>
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

/** Stylesheet the journal, blog and case-study pages add after the theme. */
export function BlogDetailStylesheet() {
  return <link rel="stylesheet" href="/css/blog-detail.css" precedence="page" />;
}
