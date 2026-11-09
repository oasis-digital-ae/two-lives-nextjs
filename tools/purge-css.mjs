// Builds public/css/site.min.css from the theme's full stylesheet, keeping only the rules
// the site can use. Runs before every `next build`, so a class added to a page is kept.
//
// To change the theme CSS itself, edit tools/theme/site.full.min.css.
// Classes are collected from the pages and from public/js/site.js, which adds state
// classes at runtime. Post bodies come from the CMS, so their tags and classes are listed.
import fs from "node:fs";
import { PurgeCSS } from "purgecss";

const FULL = "tools/theme/site.full.min.css";
const OUT = "public/css/site.min.css";

const POST_CONTENT = [
  "table", "thead", "tbody", "tr", "th", "td", "blockquote", "pre", "code", "hr", "strong", "em", "b", "i", "u",
  "ul", "ol", "li", "h1", "h2", "h3", "h4", "h5", "h6", "p", "a", "img", "figure", "figcaption", "iframe", "video",
  "flex", "flex-col", "inline", "relative", "mt-3", "w-full", "text-start", "gap-1", "gap-2", "gap-4",
];

const [result] = await new PurgeCSS().purge({
  css: [FULL],
  content: [
    "app/**/*.tsx", "components/**/*.tsx", "content/**/*.tsx", "lib/**/*.ts",
    "public/js/site.js", "netlify/functions/templates/*.html",
  ],
  defaultExtractor: (text) => text.match(/[A-Za-z0-9_-]+/g) || [],
  safelist: { standard: POST_CONTENT, greedy: [/swiper/, /atropos/, /splitting/, /word/, /char/] },
  keyframes: false,
  fontFace: false,
  variables: false,
});

fs.writeFileSync(OUT, result.css);
const kb = (n) => `${Math.round(n / 1024)} KB`;
console.log(`purge-css: ${kb(fs.statSync(FULL).size)} -> ${kb(result.css.length)}`);
