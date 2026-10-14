import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  // The theme markup uses plain <img> tags pointed at Netlify's Image CDN
  // (/.netlify/images?url=...), exactly as the static site does.
  images: { unoptimized: true },
  trailingSlash: false,
  // A stray lockfile in the home directory makes Next guess the wrong workspace root.
  turbopack: { root: process.cwd() },
  async rewrites() {
    if (!isDev) return [];
    // Netlify's Image CDN answers /.netlify/images at the edge in production, so
    // Next never sees those requests. Locally nothing answers them, so serve the
    // original file from /public instead (unresized, which is fine for layout work).
    return [
      {
        source: "/.netlify/images",
        has: [{ type: "query", key: "url", value: "(?<path>.*)" }],
        destination: "/:path",
      },
    ];
  },
};

export default nextConfig;
