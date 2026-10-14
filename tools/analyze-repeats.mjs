// Finds markup that repeats across the static site's pages, to decide what becomes a
// shared component.
//
//   node tools/analyze-repeats.mjs ../two-lives
//
// Each page is parsed with parse5 (as the converter does); every top-level child of
// <body> gets a fingerprint of its normalised markup. Blocks whose fingerprint appears
// on several pages are listed. For blocks that look alike (same tag + classes) but do
// not fingerprint equal, the differing attribute/text values are shown, which tells
// you what the component's props need to be.
import * as parse5 from "parse5";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const STATIC = process.argv[2];
const files = [];
for (const dir of [".", "case-study", "journal", "blog"]) for (const f of fs.readdirSync(path.join(STATIC, dir))) if (f.endsWith(".html")) files.push(path.join(dir, f));

const SITE = "https://twolivestheory.com";
const norm = (v) => v.replace(SITE, "").replace(/^(images|img|css|js)\//, "/$1/").replace(/\.html$/, "");
function serialize(n, out) {
  if (n.nodeName === "#comment") return;
  if (n.nodeName === "#text") { const t = n.value.replace(/[ \t\n\r\f]+/g, " "); if (t.trim()) out.push(t.trim()); return; }
  if (n.nodeName === "script") { out.push("<script>"); return; }
  const attrs = (n.attrs || []).map((a) => `${a.name}=${norm(a.value.replace(/\s+/g, " ").trim())}`).sort().join(" ");
  out.push(`<${n.nodeName} ${attrs}>`);
  for (const c of n.childNodes || []) serialize(c, out);
  out.push(`</${n.nodeName}>`);
}
const blocks = new Map(); // fingerprint -> { label, pages:[], size, tokens }
const byLabel = new Map(); // label -> [fingerprint...]
for (const f of files) {
  const doc = parse5.parse(fs.readFileSync(path.join(STATIC, f), "utf8").replace(/^﻿/, ""));
  const body = doc.childNodes.find((n) => n.nodeName === "html").childNodes.find((n) => n.nodeName === "body");
  for (const child of body.childNodes) {
    if (child.nodeName === "#text" || child.nodeName === "#comment") continue;
    const tokens = []; serialize(child, tokens);
    const fp = crypto.createHash("md5").update(tokens.join("\n")).digest("hex").slice(0, 10);
    const cls = (child.attrs || []).find((a) => a.name === "class")?.value.trim().split(/\s+/).slice(0, 2).join(".") || "";
    const id = (child.attrs || []).find((a) => a.name === "id")?.value;
    const label = `${child.nodeName}${id ? "#" + id : ""}${cls ? "." + cls : ""}`;
    if (!blocks.has(fp)) blocks.set(fp, { label, pages: [], size: tokens.join("").length, tokens });
    blocks.get(fp).pages.push(f);
    if (!byLabel.has(label)) byLabel.set(label, new Set());
    byLabel.get(label).add(fp);
  }
}
console.log(`${files.length} pages\n\nIdentical blocks on 2+ pages (pages × size):`);
for (const [fp, b] of [...blocks].sort((a, b) => b[1].pages.length - a[1].pages.length)) {
  if (b.pages.length >= 2) console.log(`  ${String(b.pages.length).padStart(3)} × ${String(b.size).padStart(6)}  ${b.label}  [${fp}]`);
}
console.log(`\nSame-looking blocks with variants:`);
for (const [label, fps] of byLabel) {
  if (fps.size < 2) continue;
  const vs = [...fps].map((fp) => blocks.get(fp));
  const total = vs.reduce((n, v) => n + v.pages.length, 0);
  if (total < 3) continue;
  console.log(`  ${label}: ${fps.size} variants over ${total} pages`);
  // token-level diff of the two most common variants
  const [a, b] = vs.sort((x, y) => y.pages.length - x.pages.length);
  if (!b) continue;
  const A = a.tokens, B = b.tokens;
  let i = 0, j = 0, shown = 0;
  while ((i < A.length || j < B.length) && shown < 6) {
    if (A[i] === B[j]) { i++; j++; continue; }
    // resync on the next common token
    let k = 1; while (k < 6 && A[i + k] !== B[j] && A[i] !== B[j + k] && A[i + k] !== B[j + k]) k++;
    console.log(`     ${a.pages.length}p: ${(A[i] || "").slice(0, 90)}\n     ${b.pages.length}p: ${(B[j] || "").slice(0, 90)}`);
    shown++;
    if (A[i + k] === B[j]) i += k; else if (A[i] === B[j + k]) j += k; else { i += k; j += k; }
  }
}
