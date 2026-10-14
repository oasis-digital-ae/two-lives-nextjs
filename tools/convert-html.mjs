// HTML -> JSX converter for the Two Lives Theory Next.js port.
// Usage: node convert.mjs <input.html> <out.tsx> <report.json> [ComponentName]
//
// Parses with parse5 (the same algorithm browsers use) so the emitted JSX
// reproduces the DOM the browser would have built from the static page. That
// is what makes React's server HTML hydrate without mismatches.
import * as parse5 from "parse5";
import fs from "node:fs";

const [, , input, outTsx, outReport, componentName = "Page"] = process.argv;
// Strip a leading BOM: browsers drop it while decoding bytes, but handed to the
// parser as a character it is treated as body text and the whole <head> is lost.
const html = fs.readFileSync(input, "utf8").replace(/^﻿/, "");
const doc = parse5.parse(html);

const report = { title: null, metas: [], links: [], ldjson: [], inlineScripts: [], externalScripts: [], inlineStyles: [], important: [], htmlAttrs: {}, bodyAttrs: {}, warnings: [] };

const VOID = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"]);
const INLINE = new Set(["a", "abbr", "b", "bdi", "bdo", "br", "button", "cite", "code", "data", "dfn", "em", "i", "img", "input", "kbd", "label", "mark", "q", "s", "samp", "select", "small", "span", "strong", "sub", "sup", "svg", "textarea", "time", "u", "var", "wbr", "video", "iframe", "picture", "source"]);
const BOOL = new Set(["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "defer", "disabled", "hidden", "inert", "ismap", "itemscope", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "selected"]);
const HTML_ATTR = {
  class: "className", for: "htmlFor", tabindex: "tabIndex", readonly: "readOnly", maxlength: "maxLength", minlength: "minLength",
  cellpadding: "cellPadding", cellspacing: "cellSpacing", colspan: "colSpan", rowspan: "rowSpan", usemap: "useMap", frameborder: "frameBorder",
  allowfullscreen: "allowFullScreen", autocomplete: "autoComplete", autofocus: "autoFocus", autoplay: "autoPlay", playsinline: "playsInline",
  crossorigin: "crossOrigin", srcset: "srcSet", srclang: "srcLang", datetime: "dateTime", enctype: "encType", formaction: "formAction",
  novalidate: "noValidate", accesskey: "accessKey", contenteditable: "contentEditable", spellcheck: "spellCheck", hreflang: "hrefLang",
  referrerpolicy: "referrerPolicy", "http-equiv": "httpEquiv", "accept-charset": "acceptCharset", inputmode: "inputMode", enterkeyhint: "enterKeyHint",
  fetchpriority: "fetchPriority", itemprop: "itemProp", itemscope: "itemScope", itemtype: "itemType", nomodule: "noModule", tabindex_: "tabIndex",
  "xlink:href": "xlinkHref", "xmlns:xlink": "xmlnsXlink", "xml:space": "xmlSpace", "xml:lang": "xmlLang",
};
// React's TypeScript types want these as numbers.
const NUMERIC = new Set(["tabIndex", "colSpan", "rowSpan", "maxLength", "minLength", "size", "span", "start", "rows", "cols"]);
const URL_ATTRS = new Set(["src", "href", "poster", "data-src", "data-bg", "data-background", "data-poster"]);
const SITE = "https://twolivestheory.com";

function camel(name) {
  return name.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}
function attrName(name, inSvg) {
  if (HTML_ATTR[name]) return HTML_ATTR[name];
  if (name.startsWith("data-") || name.startsWith("aria-")) return name;
  if (inSvg && name.includes("-")) return camel(name);
  if (inSvg && name.includes(":")) return camel(name.replace(":", "-"));
  return name;
}
function rewriteUrl(v) {
  if (/^(images|img|css|js|fonts|subtitles)\//.test(v)) return "/" + v;
  if (v.startsWith(SITE + "/") || v === SITE) return v.slice(SITE.length) || "/";
  if (v === "index.html") return "/";
  const m = v.match(/^([a-z0-9-]+(?:\/[a-z0-9-]+)?)\.html(#.*)?$/);
  if (m) return "/" + m[1] + (m[2] || "");
  return v;
}
function rewriteSrcset(v) {
  return v.split(",").map((part) => {
    const t = part.trim().split(/\s+/);
    t[0] = rewriteUrl(t[0]);
    return t.join(" ");
  }).join(", ");
}
function splitDecls(style) {
  const out = []; let cur = ""; let depth = 0; let q = null;
  for (const ch of style) {
    if (q) { cur += ch; if (ch === q) q = null; continue; }
    if (ch === '"' || ch === "'") { q = ch; cur += ch; continue; }
    if (ch === "(") depth++; if (ch === ")") depth--;
    if (ch === ";" && depth === 0) { out.push(cur); cur = ""; continue; }
    cur += ch;
  }
  if (cur.trim()) out.push(cur);
  return out;
}
function styleObject(style, where) {
  const props = new Map(); // the last declaration of a property wins, as in CSS
  let custom = false;
  for (const decl of splitDecls(style)) {
    const i = decl.indexOf(":"); if (i < 0) continue;
    let prop = decl.slice(0, i).trim(); let val = decl.slice(i + 1).trim();
    if (!prop) continue;
    if (/!important/i.test(val)) { report.important.push({ where, prop, val }); val = val.replace(/\s*!important/i, ""); }
    val = val.replace(/url\((["']?)(images|img|fonts)\//g, (m, qq, p) => `url(${qq}/${p}/`);
    let key;
    if (prop.startsWith("--")) { key = JSON.stringify(prop); custom = true; }
    else if (prop.startsWith("-ms-")) key = "ms" + camel(prop.slice(4)).replace(/^[a-z]/, (c) => c.toUpperCase());
    else if (prop.startsWith("-")) key = camel(prop.slice(1)).replace(/^[a-z]/, (c) => c.toUpperCase());
    else key = camel(prop);
    props.delete(key);
    props.set(key, JSON.stringify(val));
  }
  const body = [...props].map(([k, v]) => `${k}: ${v}`).join(", ");
  // React's CSSProperties type has no index signature for custom properties
  return custom ? `{{ ${body} } as CSSProperties}` : `{{ ${body} }}`;
}
function jsxString(v) {
  if (!/["\n\r\\]/.test(v)) return `"${v}"`;
  return `{${JSON.stringify(v)}}`;
}
function attrs(node, inSvg, where) {
  let s = "";
  for (const a of node.attrs) {
    const raw = a.prefix ? `${a.prefix}:${a.name}` : a.name;
    let v = a.value;
    if (raw === "style") { if (v.trim()) s += ` style=${styleObject(v, where)}`; continue; }
    // Inline handlers cannot be strings in React, and these pages are server components.
    // The theme bundle delegates clicks on [data-onclick] and runs the code (tools/theme-shim.js).
    if (raw === "onclick") { s += ` data-onclick=${jsxString(v)}`; continue; }
    if (/^on[a-z]+$/.test(raw)) { report.warnings.push(`${raw} handler dropped at ${where}`); continue; }
    const name = attrName(raw, inSvg);
    if (BOOL.has(raw) && v === "") { s += ` ${name}`; continue; }
    if (URL_ATTRS.has(raw)) v = rewriteUrl(v);
    if (raw === "srcset" || raw === "data-srcset") v = rewriteSrcset(v);
    if (v === "" ) { s += ` ${name}=""`; continue; }
    if (NUMERIC.has(name) && /^-?\d+$/.test(v)) { s += ` ${name}={${v}}`; continue; }
    s += ` ${name}=${jsxString(v)}`;
  }
  return s;
}
function textJsx(t) {
  if (!/[{}<>&"'\\ ]/.test(t) && !/^\s|\s$/.test(t)) return t;
  return `{${JSON.stringify(t)}}`;
}
function isInlineish(n) {
  if (!n) return false;
  if (n.nodeName === "#text") return n.value.trim() !== "";
  return INLINE.has(n.nodeName);
}
function walk(node, inSvg, depth, where) {
  const pad = "  ".repeat(depth);
  const name = node.nodeName;
  if (name === "#comment") return "";
  if (name === "#text") {
    const parentPre = where.endsWith("pre") || where.endsWith("textarea");
    // Only ASCII whitespace collapses. A non-breaking space (&nbsp;) is content: the
    // editor's "<p>&nbsp;</p>" spacer paragraphs rely on it to keep their line height.
    let t = parentPre ? node.value : node.value.replace(/[ \t\n\r\f]+/g, " ");
    if (t.replace(/[ \t\n\r\f]/g, "") === "") {
      const sib = node.parentNode.childNodes; const i = sib.indexOf(node);
      const prev = sib.slice(0, i).reverse().find((x) => x.nodeName !== "#comment");
      const next = sib.slice(i + 1).find((x) => x.nodeName !== "#comment");
      return isInlineish(prev) && isInlineish(next) ? `{" "}` : "";
    }
    return textJsx(t);
  }
  if (name === "script") {
    const src = node.attrs.find((a) => a.name === "src");
    const type = node.attrs.find((a) => a.name === "type")?.value || "";
    const body = node.childNodes.map((c) => c.value || "").join("");
    if (type === "application/ld+json") { report.ldjson.push(body.trim()); return `${pad}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ${JSON.stringify(body.trim())} }} />\n`; }
    if (src) { report.externalScripts.push(src.value); return ""; }
    report.inlineScripts.push(body.trim()); return "";
  }
  if (name === "style") { const body = node.childNodes.map((c) => c.value || "").join(""); report.inlineStyles.push(body); return `${pad}<style dangerouslySetInnerHTML={{ __html: ${JSON.stringify(body)} }} />\n`; }
  if (name === "template") { report.warnings.push("template element skipped"); return ""; }
  const svg = inSvg || name === "svg";
  const here = `${where}>${name}`;
  let a = attrs(node, svg, here);
  // React wants the initial choice on the <select> (defaultValue), not `selected` on an <option>.
  if (name === "select") {
    const opt = node.childNodes.find((c) => c.nodeName === "option" && c.attrs.some((x) => x.name === "selected"));
    if (opt) {
      const val = opt.attrs.find((x) => x.name === "value")?.value ?? opt.childNodes.map((c) => c.value || "").join("").trim();
      a += ` defaultValue=${jsxString(val)}`;
      for (const o of node.childNodes) if (o.attrs) o.attrs = o.attrs.filter((x) => x.name !== "selected");
    }
  }
  if (VOID.has(name)) return `${pad}<${name}${a} />\n`;
  const kids = node.childNodes.map((c) => walk(c, svg, depth + 1, here)).filter(Boolean);
  const inlineOnly = kids.every((k) => !k.includes("\n"));
  if (kids.length === 0) return `${pad}<${name}${a}></${name}>\n`;
  if (inlineOnly) return `${pad}<${name}${a}>${kids.join("")}</${name}>\n`;
  return `${pad}<${name}${a}>\n${kids.map((k) => (k.includes("\n") ? k : pad + "  " + k + "\n")).join("")}${pad}</${name}>\n`;
}

const htmlEl = doc.childNodes.find((n) => n.nodeName === "html");
for (const a of htmlEl.attrs) report.htmlAttrs[a.name] = a.value;
const head = htmlEl.childNodes.find((n) => n.nodeName === "head");
const body = htmlEl.childNodes.find((n) => n.nodeName === "body");
for (const a of body.attrs) report.bodyAttrs[a.name] = a.value;
for (const n of head.childNodes) {
  if (n.nodeName === "title") report.title = n.childNodes.map((c) => c.value).join("").trim();
  if (n.nodeName === "meta") report.metas.push(Object.fromEntries(n.attrs.map((a) => [a.name, a.value])));
  if (n.nodeName === "link") report.links.push(Object.fromEntries(n.attrs.map((a) => [a.name, a.value])));
  if (n.nodeName === "script") walk(n, false, 0, "head");
}
// A <style> in the head is page CSS; emit it at the top of the body fragment (still global).
const headStyles = head.childNodes.filter((n) => n.nodeName === "style").map((n) => walk(n, false, 3, "head")).join("");
const bodyJsx = body.childNodes.map((c) => walk(c, false, 3, "body")).filter(Boolean).join("");

// Next metadata from the page <head>. Absolute site URLs become paths so the
// metadataBase in the root layout resolves them for previews and production alike.
const meta = (k) => report.metas.find((m) => m.name === k || m.property === k)?.content;
const rel = (u) => (u && u.startsWith(SITE) ? u.slice(SITE.length) || "/" : u);
const canonical = report.links.find((l) => l.rel === "canonical")?.href;
const ogImage = meta("og:image");
const metadata = {
  title: report.title,
  description: meta("description"),
  alternates: canonical ? { canonical: rel(canonical) } : undefined,
  openGraph: {
    type: meta("og:type") || "website",
    title: meta("og:title") || report.title,
    description: meta("og:description") || meta("description"),
    url: rel(meta("og:url") || canonical),
    siteName: meta("og:site_name") || "Two Lives Theory",
    images: ogImage ? [{ url: rel(ogImage), width: Number(meta("og:image:width")) || undefined, height: Number(meta("og:image:height")) || undefined, alt: meta("twitter:image:alt") || undefined }] : undefined,
  },
  twitter: { card: meta("twitter:card") || "summary_large_image", title: meta("twitter:title") || report.title, description: meta("twitter:description") || meta("description"), images: ogImage ? [rel(ogImage)] : undefined },
};
const ldjson = report.ldjson.length ? report.ldjson.map((j) => `      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ${JSON.stringify(j)} }} />\n`).join("") : "";
const tsx = `// GENERATED from the static site by convert.mjs. The markup is kept identical to the
// HTML page on purpose: the theme's compiled CSS and jQuery scripts drive the design.
import type { Metadata } from "next";
${/as CSSProperties/.test(ldjson + headStyles + bodyJsx) ? 'import type { CSSProperties } from "react";\n' : ""}
export const metadata: Metadata = ${JSON.stringify(metadata, null, 2).replace(/\n/g, "\n")};

export default function ${componentName}() {
  return (
    <>
${ldjson}${headStyles}${bodyJsx}    </>
  );
}
`;
fs.writeFileSync(outTsx, tsx);
fs.writeFileSync(outReport, JSON.stringify(report, null, 2));
console.log(`wrote ${outTsx} (${(tsx.length / 1024) | 0} KB); inline scripts ${report.inlineScripts.length}, external ${report.externalScripts.length}, ld+json ${report.ldjson.length}, !important ${report.important.length}, warnings ${report.warnings.length}`);
