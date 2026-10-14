// Writes the copy of the committed post pages back into Supabase.
//
//   node tools/sync-posts.mjs ../two-lives            # dry run: shows every field that would change
//   node tools/sync-posts.mjs ../two-lives --apply    # needs SUPABASE_SERVICE_ROLE_KEY in the environment
//
// Why: the static site's post pages were hand-edited after publishing (brand "®",
// hyphenation, rewritten titles and descriptions) and those edits never reached the
// blog_posts / odai_blogs rows. The Next.js site renders posts from those rows, so
// without this the live copy would revert. The committed page is treated as the newer
// version of: seo_title (its <title>), seo_description, main_heading (its <h1>) and
// html_content (its <article>, with the first <h2> restored to the <h1> the row keeps).
//
// Nothing is written without --apply, and --apply needs a service-role key; the
// publishable key cannot update rows.
import fs from "node:fs";
import path from "node:path";
import * as parse5 from "parse5";

const STATIC = process.argv[2];
const apply = process.argv.includes("--apply");
if (!STATIC) { console.error("usage: node tools/sync-posts.mjs <static site checkout> [--apply]"); process.exit(1); }
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://iceaceywsecnlmkcqopu.supabase.co";
const READ_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "sb_publishable_HC5p_ycaiSfyqVevN0tiiQ_bAiC7H9r";
const WRITE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (apply && !WRITE_KEY) { console.error("--apply needs SUPABASE_SERVICE_ROLE_KEY"); process.exit(1); }

const SECTIONS = { journal: "blog_posts", blog: "odai_blogs" };
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, " ");
const norm = (s) => (s || "").replace(/\s+/g, " ").trim();

async function rest(p, init = {}) {
  const key = init.method ? WRITE_KEY : READ_KEY;
  const res = await fetch(`${URL}/rest/v1/${p}`, { ...init, headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=minimal", ...(init.headers || {}) } });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  return init.method ? null : res.json();
}

/** The page's title, description, h1 text and article inner HTML, from the committed file. */
function readPage(file) {
  const html = fs.readFileSync(file, "utf8").replace(/^﻿/, "");
  const title = decode(norm(html.match(/<title>([\s\S]*?)<\/title>/)[1]));
  const description = decode(html.match(/name="description" content="([^"]*)"/)[1]);
  const doc = parse5.parse(html);
  const text = (n) => (n.nodeName === "#text" ? n.value : (n.childNodes || []).map(text).join(""));
  let h1 = "", article = "";
  const walk = (n) => {
    if (n.nodeName === "h1" && !h1) h1 = norm(text(n));
    if (n.nodeName === "article" && n.attrs.some((a) => a.name === "class" && a.value.includes("auto-content"))) article = parse5.serialize(n);
    for (const c of n.childNodes || []) walk(c);
  };
  walk(doc);
  return { title, description, h1, article: article.trim() };
}

let changes = 0;
for (const [section, table] of Object.entries(SECTIONS)) {
  const rows = await rest(`${table}?select=slug,title,main_heading,seo_title,seo_description,html_content`);
  for (const row of rows) {
    const file = path.join(STATIC, section, `${row.slug}.html`);
    if (!fs.existsSync(file)) { console.log(`${section}/${row.slug}: no committed page, skipped`); continue; }
    const page = readPage(file);
    const patch = {};
    if (page.title !== norm(row.seo_title || row.title)) patch.seo_title = page.title;
    if (page.description !== norm(row.seo_description)) patch.seo_description = page.description;
    if (page.h1 !== norm(row.main_heading || row.title)) patch.main_heading = page.h1;
    // the page demoted the row's leading <h1> to <h2>; put it back so the row stays an article with its own title
    let body = page.article;
    if (/^\s*<h1[\s>]/i.test(row.html_content || "")) body = body.replace(/<h2(\s|>)/i, "<h1$1").replace(/<\/h2>/i, "</h1>");
    const same = (a, b) => norm(a).replace(/>\s+</g, "><") === norm(b).replace(/>\s+</g, "><");
    if (!same(body, row.html_content)) patch.html_content = body;
    if (!Object.keys(patch).length) continue;
    changes++;
    console.log(`${section}/${row.slug}: ${Object.keys(patch).join(", ")}`);
    for (const k of ["seo_title", "seo_description", "main_heading"]) if (patch[k]) console.log(`    ${k}: "${row[k] ?? ""}" -> "${patch[k]}"`);
    if (apply) await rest(`${table}?slug=eq.${encodeURIComponent(row.slug)}`, { method: "PATCH", body: JSON.stringify(patch) });
  }
}
console.log(`${changes} post(s) ${apply ? "updated" : "would change (dry run; add --apply)"}`);
