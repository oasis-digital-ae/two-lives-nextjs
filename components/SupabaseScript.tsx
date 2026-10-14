"use client";

import Script from "next/script";

/*
 * The journal/blog pages fill their "Recent Posts" sidebar and the listing grids
 * from Supabase in the browser, exactly as the static site does: supabase-js from
 * the CDN, then a small page script that expects `window.supabase` to exist.
 * next/script does not guarantee order between two afterInteractive scripts, so the
 * page script is appended once supabase-js has loaded.
 */
export default function SupabaseScript({ src }: { src: string }) {
  return (
    <Script
      src="https://unpkg.com/@supabase/supabase-js@2"
      strategy="afterInteractive"
      onLoad={() => {
        const s = document.createElement("script");
        s.src = src;
        document.body.appendChild(s);
      }}
    />
  );
}
