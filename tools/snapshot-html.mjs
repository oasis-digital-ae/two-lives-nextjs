// Saves the server-rendered HTML of every route, or diffs a new snapshot against a saved one.
//
//   node tools/snapshot-html.mjs save  http://localhost:8889 /tmp/before
//   node tools/snapshot-html.mjs diff  http://localhost:8889 /tmp/before
//
// The HTML is normalised only by removing Next's own per-build noise (chunk hashes,
// the RSC payload script, build id). A refactor that keeps the markup identical
// produces an empty diff. Routes come from public/sitemap.xml plus /404-check.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";

const [, , mode, base, dir] = process.argv;
if (!mode || !base || !dir) { console.error("usage: snapshot-html.mjs save|diff <base url> <dir>"); process.exit(1); }
const xml = fs.readFileSync(path.join(path.dirname(new URL(import.meta.url).pathname), "../public/sitemap.xml"), "utf8");
const routes = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname).concat(["/this-page-does-not-exist"]);

function normalise(html) {
  return html
    .replace(/<script[^>]*src="\/_next\/static\/[^"]*"[^>]*><\/script>/g, "")
    .replace(/<link[^>]*href="\/_next\/static\/[^"]*"[^>]*\/?>/g, "")
    .replace(/<script>self\.__next_f[\s\S]*?<\/script>/g, "")
    .replace(/<script[^>]*>\(self\.__next_f[\s\S]*?<\/script>/g, "")
    .replace(/<script id="__NEXT_DATA__"[\s\S]*?<\/script>/g, "")
    // React emits preload hints for images/scripts it discovers; their order depends on
    // component boundaries, not on the markup being compared
    .replace(/<link rel="preload"[^>]*>/g, "")
    .replace(/\/_next\/static\/[A-Za-z0-9_-]+\//g, "/_next/static/X/")
    .replace(/<!--\$-->|<!--\/\$-->|<!--\$\?-->|<!--\$!-->/g, "");
}

// Differences that are intended: the shared components use the newest variant of a
// block, and a few older pages carried stale markup. A hunk whose every changed line
// matches one of these is reported as "expected", anything else as a regression.
const EXPECTED = [
  /class="default-logo"(\s+width="200" height="42")?\/>/,                       // header logo: dimensions added
  /logo-black(@2x)?\.svg|logo-mobile\.svg/,                                     // 404 page: stray alternate logos
  /class="scroll-top"( aria-label="scroll")?>/, /class="scroll-text">Scroll<\/span>/, /^[+-]<\/span> ?$/, // scroll-top: aria-label, whitespace
  /class="mega-card"|two-lives\/(exec-h1|poker-h1)\.webp|Elite Competitors|Executives|Execute consistently|Align mindset|explore-your-archetype|Explore Your Archetype|^[+-]<\/?(li|a)>$/, // 404: older menu
  /class="footer-logo"/, /badge-[124]\.webp/,                                   // footer images: dimensions, lazy
  /whatsapp-icon\.svg/,                                                         // WhatsApp button: plain svg
  /^[+-]<a href="\/journal"( class="nav-link")?>(Personal )?Journal$/,         // nav label drift on the legal pages
  /bi-geo-alt|^[+-]<\/i>Location $|Earth — Global clients welcomed|class="w-80 xs-w-100|col-lg-4  col-sm-6|mb-5px fs-18|^[+-]<\/?(span|p|div)>$/, // 404: old footer had a location column
  /srcSet=|sizes=|loading="lazy"|alt="(Meet Basim|method|Entrepreneurs|Athletes|Elite Competitors|Executives &amp; Leaders)"\/>$/, // mega-menu images: responsive everywhere, as on the homepage
  /class="mega-card" href="\/(elite-competitors|executive-leaders)"|mega-card-overlay|<h5>|class="fs-12">/, // 404: card order
  /class="col-lg-4 col-sm-6 text-center text-lg-start last-paragraph-no-margin|icon-circle|class="col-lg-3|footer-badges|bi-envelope|Contact:|mailto:/, // 404: older footer columns
];

const split = (html) => html.replace(/</g, "\n<").split("\n");
function hunks(a, b) {
  // line diff (tags one per line) via git, which is fast and good enough here
  const ta = path.join(os.tmpdir(), "snap-a.html"), tb = path.join(os.tmpdir(), "snap-b.html");
  fs.writeFileSync(ta, split(a).join("\n")); fs.writeFileSync(tb, split(b).join("\n"));
  const out = execFileSync("git", ["diff", "--no-index", "-U0", "--no-color", ta, tb], { encoding: "utf8", maxBuffer: 1 << 26 }).toString();
  return out.split(/^@@.*@@.*$/m).slice(1).map((h) => h.split("\n").filter((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l)));
}

fs.mkdirSync(dir, { recursive: true });
let regressions = 0, expectedPages = 0;
for (const r of routes) {
  const res = await fetch(base + r);
  const html = normalise(await res.text());
  const file = path.join(dir, r.replace(/\//g, "_") + ".html");
  if (mode === "save") { fs.writeFileSync(file, html); continue; }
  // the saved copy is normalised again so a newer rule applies to both sides
  const before = fs.existsSync(file) ? normalise(fs.readFileSync(file, "utf8")) : null;
  if (before === html) continue;
  if (before === null) { regressions++; console.log(`✗ ${r}: no saved snapshot`); continue; }
  let hs;
  try { hs = hunks(before, html); } catch (e) { hs = e.stdout ? e.stdout.toString().split(/^@@.*@@.*$/m).slice(1).map((h) => h.split("\n").filter((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l))) : []; }
  const bad = hs.filter((h) => !h.every((l) => EXPECTED.some((rx) => rx.test(l))));
  if (!bad.length) { expectedPages++; continue; }
  regressions++;
  console.log(`✗ ${r}: ${bad.length} unexpected hunk(s)`);
  for (const h of bad.slice(0, 3)) console.log(h.slice(0, 6).map((l) => "    " + l.slice(0, 160)).join("\n"));
}
if (mode === "save") console.log(`saved ${routes.length} routes to ${dir}`);
else console.log(`${routes.length - regressions}/${routes.length} routes identical or only expected changes (${expectedPages} with expected changes)`);
process.exit(regressions ? 1 : 0);
