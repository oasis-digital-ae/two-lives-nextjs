import type { NextConfig } from "next";

// Netlify sets NETLIFY=true during its builds; anywhere else (next dev, a local next start)
// nothing answers /.netlify/images, so the rewrite below serves the original files.
const onNetlify = process.env.NETLIFY === "true";

const nextConfig: NextConfig = {
  // The theme markup uses plain <img> tags pointed at Netlify's Image CDN
  // (/.netlify/images?url=...), exactly as the static site does.
  images: { unoptimized: true },
  trailingSlash: false,
  // A stray lockfile in the home directory makes Next guess the wrong workspace root.
  turbopack: { root: process.cwd() },
  // Each route group renders its own <html>/<body> (the theme styles the header through
  // body classes), so the 404 page needs its own shell too: app/global-not-found.tsx.
  experimental: { globalNotFound: true },
  // The static site's netlify.toml redirects, so old links keep working here too.
  async redirects() {
    return [
      { source: "/blogs", destination: "/journal", permanent: true },
      { source: "/blogs/:slug*", destination: "/journal/:slug*", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/:path(.*)\\.html", destination: "/:path", permanent: true },
    ];
  },
  async rewrites() {
    if (onNetlify) return [];
    // Netlify's Image CDN answers /.netlify/images at the edge in production, so
    // Next never sees those requests. Serve the original file from /public instead
    // (unresized, which is fine for layout work).
    return [
      {
        source: "/.netlify/images",
        // the url param is root-relative ("/images/x.webp"); capture it without the
        // slash or the destination becomes "//images/x.webp", which next start rejects
        has: [{ type: "query", key: "url", value: "/(?<path>.*)" }],
        destination: "/:path",
      },
    ];
  },
};

export default nextConfig;
