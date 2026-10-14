import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // The ported theme markup uses plain <img>; the Netlify Image CDN does the resizing.
      "@next/next/no-img-element": "off",
      // Plain <a href> is deliberate: every page is a full load so the theme's jQuery
      // initialises once, exactly as on the static site (verified by tools/compare-pages.mjs).
      "@next/next/no-html-link-for-pages": "off",
      // ThemeLayout renders the theme stylesheet as a plain <link> inside <head> on purpose
      // (not through Next's CSS pipeline), so the page gets the compiled CSS byte-for-byte.
      "@next/next/no-css-tags": "off",
      "@next/next/no-head-element": "off",
    },
  },
  {
    // Swiper.use() is a static method, not a React hook.
    files: ["tools/**"],
    rules: { "react-hooks/rules-of-hooks": "off" },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
