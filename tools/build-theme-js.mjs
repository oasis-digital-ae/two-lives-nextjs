// Builds public/js/site.js: the theme's JavaScript as one bundle.
//
//   node tools/build-theme-js.mjs ../two-lives
//
// The argument is the static site's checkout. The bundle is, in order:
//   tools/theme-shim.js   captures DOMContentLoaded/load handlers (see the file)
//   js/jquery.js          from the static site
//   js/vendors.min.js     swiper, anime, skrollr, imagesloaded, etc.
//   js/main.min.js        the theme's init code (rebuilt there with `npm run minify`)
//   js/app.min.js         site-specific code
//   tools/inline-home.js  the homepage's former inline <script>
// and ends by replaying the captured handlers.
import fs from "node:fs";
import path from "node:path";

const staticRoot = process.argv[2];
if (!staticRoot) {
  console.error("usage: node tools/build-theme-js.mjs <path to static site checkout>");
  process.exit(1);
}
const here = path.dirname(new URL(import.meta.url).pathname);
const read = (p) => fs.readFileSync(p, "utf8");
const parts = [
  read(path.join(here, "theme-shim.js")),
  read(path.join(staticRoot, "js/jquery.js")),
  read(path.join(staticRoot, "js/vendors.min.js")),
  read(path.join(staticRoot, "js/main.min.js")),
  read(path.join(staticRoot, "js/app.min.js")),
  read(path.join(here, "inline-home.js")),
  "window.__tltReplayEvents && window.__tltReplayEvents();\n",
];
const out = path.join(here, "..", "public/js/site.js");
fs.writeFileSync(out, parts.join("\n;\n"));
new Function(read(out)); // syntax check
console.log(`wrote ${path.relative(process.cwd(), out)} (${(fs.statSync(out).size / 1024) | 0} KB)`);
