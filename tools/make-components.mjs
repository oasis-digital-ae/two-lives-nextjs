// Seeds the static shared components from their canonical page in the static site.
//
//   node tools/make-components.mjs ../two-lives
//
// Writes components/site/<Name>.generated.tsx for the blocks that are identical on the
// dominant set of pages (see tools/analyze-repeats.mjs). Header and Footer are then
// hand-edited into data-driven components (components/site/Header.tsx, Footer.tsx);
// the generated files are the reference for what the markup must come out as.
import fs from "node:fs";
import path from "node:path";
import { parseHtml, nodeToJsx } from "./convert-html.mjs";
import { classes } from "./dom.mjs";

const STATIC = process.argv[2];
const ROOT = path.join(path.dirname(new URL(import.meta.url).pathname), "..");
const out = path.join(ROOT, "components/site");
fs.mkdirSync(out, { recursive: true });

const SEEDS = [
  { name: "Header", page: "about.html", pick: (n) => n.nodeName === "header" },
  { name: "Footer", page: "about.html", pick: (n) => n.nodeName === "footer" },
  { name: "WhatsAppWidget", page: "about.html", pick: (n) => n.nodeName === "a" && classes(n).includes("whatsapp-widget") },
  { name: "ScrollTop", page: "about.html", pick: (n) => n.nodeName === "div" && classes(n).includes("scroll-progress") },
  { name: "CursorPageInner", page: "about.html", pick: (n) => n.nodeName === "div" && classes(n).includes("cursor-page-inner") },
  { name: "LogoMarquee", page: "about.html", pick: (n) => n.nodeName === "section" && classes(n).includes("half-section") },
  { name: "LogoMarqueePersona", page: "athlete.html", pick: (n) => n.nodeName === "section" && classes(n).includes("half-section") },
  { name: "PostCta", page: "journal/the-life-you-never-planned.html", pick: (n) => n.nodeName === "section" && classes(n).includes("h-400px") },
];

for (const s of SEEDS) {
  const { body } = parseHtml(fs.readFileSync(path.join(STATIC, s.page), "utf8"));
  const node = body.childNodes.find(s.pick);
  if (!node) { console.error(`${s.name}: block not found in ${s.page}`); continue; }
  const jsx = nodeToJsx(node, 2);
  const file = path.join(out, `${s.name}.generated.tsx`);
  fs.writeFileSync(file, `// GENERATED from ${s.page} by tools/make-components.mjs. Reference markup for ${s.name}.\n${/as CSSProperties/.test(jsx) ? 'import type { CSSProperties } from "react";\n' : ""}
export default function ${s.name}() {
  return (
${jsx}  );
}
`);
  console.log(`${s.name.padEnd(20)} <- ${s.page} (${(jsx.length / 1024).toFixed(1)} KB)`);
}
