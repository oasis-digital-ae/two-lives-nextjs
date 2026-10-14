// Builds public/js/site.js: the theme's JavaScript as one bundle, with the unused
// Crafto vendor libraries left out.
//
//   node tools/build-theme-js.mjs ../two-lives            # pruned (default)
//   node tools/build-theme-js.mjs ../two-lives --full     # everything, as the static site ships it
//
// The argument is the static site's checkout. The bundle is, in order:
//   tools/theme-shim.js   captures DOMContentLoaded/load handlers (see the file)
//   js/jquery.js
//   js/vendors.js         only the libraries a page actually uses (KEEP below), minified here
//   js/main.js            the theme's init code, minified here (one patch, see PATCHES)
//   js/app.js             site-specific code, minified here
//   tools/inline-home.js  the homepage's former inline <script>
//   tools/inline-post.js  the journal/blog posts' former inline <script>
// and ends by replaying the captured handlers.
//
// Why pruning is safe: main.js guards every optional plugin ("typeof $.fn.isotope ===
// 'function'") and no page's markup uses the dropped features (checked with
// tools/compare-pages.mjs, which also reports new runtime errors against production).
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const staticRoot = process.argv[2];
const full = process.argv.includes("--full");
if (!staticRoot) {
  console.error("usage: node tools/build-theme-js.mjs <path to static site checkout> [--full]");
  process.exit(1);
}
const here = path.dirname(new URL(import.meta.url).pathname);
const read = (p) => fs.readFileSync(p, "utf8");
const { minify } = createRequire(path.join(staticRoot, "package.json"))("terser");

/* vendors.js is a concatenation of libraries, each starting with a Crafto-style header:
     /*!
         <Name>
   Libraries are kept by the first word(s) of that name. */
const KEEP = [
  "Atropos",             // 3D tilt cards (home, persona pages)
  "GSAP",                // the drag cursor on the carousels (.magic-cursor) tweens with TweenLite/TweenMax
  "Images Loaded",       // main.js waits for images before initialising sliders
  "jQuery appear",       // triggers counters / anime when elements scroll into view
  "jQuery countTo",      // .counter numbers
  "Crafto - Parallax",   // [data-parallax-background-ratio] backgrounds
  "Retina",              // [data-no-retina] handling
  "Skrollr",             // data-bottom-top / data-top-bottom scroll transforms
  "Splitting",           // split-text animations
];
// Replaced by tools/vendor-lite/entry.js (same versions, only the used parts, same globals):
const LITE = ["Anime.js", "Bootstrap", "Swiper"];
// With --full these three come from vendors.js like everything else.
// Dropped (no page uses them): GSAP, Carto portfolio, Isotope + Masonry, jQuery Cookie,
// Final Countdown, Easy pie chart, FitVids, Magnific Popup, Custom scrollbar, Justified
// Gallery, Google Map Style, Particles, jQuery Smooth Scroll, Sticky-kit.

function splitVendors(src) {
  const lines = src.split("\n");
  const heads = [];
  for (let i = 0; i < lines.length; i++) {
    // Crafto headers are "/*!" then an indented name; a library's own license block
    // ("/*!" then " * GSAP 3.13.0") is not a boundary.
    if (/^\s*\/\*!\s*$/.test(lines[i]) && /^\s{2,}[^\s*]/.test(lines[i + 1] || "")) heads.push({ line: i, name: lines[i + 1].trim() });
  }
  return heads.map((h, j) => ({ name: h.name, code: lines.slice(h.line, j + 1 < heads.length ? heads[j + 1].line : lines.length).join("\n") }));
}

/* main.js only uses GSAP for the custom cursor's position loop; a requestAnimationFrame
   loop does the same job without the 250 KB library. */
const PATCHES = [
  {
    file: "main.js",
    find: 'if (typeof gsap !== "undefined") {\n            gsap.ticker.add(updatePosition);\n        }',
    replace: 'if (typeof gsap !== "undefined") {\n            gsap.ticker.add(updatePosition);\n        } else {\n            (function tick() { updatePosition(); requestAnimationFrame(tick); })();\n        }',
  },
];

async function min(code, label) {
  let out;
  try {
    out = await minify(code, { compress: { passes: 1 }, mangle: true, format: { comments: /^!/ } });
  } catch (e) {
    throw new Error(`terser failed on ${label} at line ${e.line}: ${e.message}`);
  }
  console.log(`  ${label.padEnd(16)} ${String((code.length / 1024) | 0).padStart(4)} KB -> ${String((out.code.length / 1024) | 0).padStart(4)} KB`);
  return out.code;
}

const segments = splitVendors(read(path.join(staticRoot, "js/vendors.js")));
const kept = full ? segments : segments.filter((s) => KEEP.some((k) => s.name.startsWith(k)));
const missing = [...KEEP, ...LITE].filter((k) => !segments.some((s) => s.name.startsWith(k)));
if (missing.length) throw new Error(`vendors.js no longer contains: ${missing.join(", ")}`);
console.log(`vendors: keeping ${kept.length} of ${segments.length} libraries${full ? " (--full)" : ""}: ${kept.map((s) => s.name.split(/\s+-\s+|\sv?\d/)[0]).join(", ")}`);

// Swiper, Bootstrap and anime.js rebuilt from npm with only the used parts (see the entry file).
async function buildLite() {
  const esbuild = createRequire(import.meta.url)("esbuild");
  const r = await esbuild.build({
    entryPoints: [path.join(here, "vendor-lite/entry.js")], bundle: true, minify: true, format: "iife",
    write: false, target: ["es2017"], legalComments: "none", logLevel: "silent",
  });
  const code = r.outputFiles[0].text;
  console.log(`  ${"vendor-lite".padEnd(16)} Swiper+Bootstrap+anime from npm -> ${String((code.length / 1024) | 0).padStart(4)} KB`);
  return code;
}

let main = read(path.join(staticRoot, "js/main.js"));
for (const p of PATCHES.filter((p) => p.file === "main.js")) {
  if (!main.includes(p.find)) throw new Error(`main.js patch target not found: ${p.find.slice(0, 50)}...`);
  main = main.replace(p.find, p.replace);
}

const parts = [
  read(path.join(here, "theme-shim.js")),
  read(path.join(staticRoot, "js/jquery.js")),
  // each library minified on its own, so a failure names the library
  ...(await Promise.all(kept.map((s) => min(s.code, s.name.split(/\s+-\s+|\sv?\d/)[0])))),
  ...(full ? [] : [await buildLite()]),
  await min(main, "main"),
  await min(read(path.join(staticRoot, "js/app.js")), "app"),
  read(path.join(here, "inline-home.js")),
  read(path.join(here, "inline-post.js")),
  "window.__tltReplayEvents && window.__tltReplayEvents();\n",
];
const out = path.join(here, "..", "public/js/site.js");
fs.writeFileSync(out, parts.join("\n;\n"));
new Function(read(out)); // syntax check
console.log(`wrote ${path.relative(process.cwd(), out)} (${(fs.statSync(out).size / 1024) | 0} KB)`);
