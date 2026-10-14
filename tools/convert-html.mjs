// HTML -> JSX converter for the Two Lives Theory Next.js port.
//
//   node tools/convert-html.mjs <input.html> <out.tsx> <report.json> [ComponentName] [--no-components]
//
// Parses with parse5 (the same algorithm browsers use) so the emitted JSX reproduces
// the DOM the browser would have built from the static page. That is what makes
// React's server HTML hydrate without mismatches.
//
// Repeated blocks (header, footer, CTA bands, page hero...) are replaced by shared
// components from tools/site-components.mjs: each matcher inspects a top-level body
// child and either returns the props for its component or null, in which case the
// markup stays inline. Nothing is replaced on a guess.
import * as parse5 from "parse5";
import fs from "node:fs";
import { attr } from "./dom.mjs";
import { matchers as siteMatchers } from "./site-components.mjs";
export { text, attr, kids, classes } from "./dom.mjs";

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
  fetchpriority: "fetchPriority", itemprop: "itemProp", itemscope: "itemScope", itemtype: "itemType", nomodule: "noModule",
  "xlink:href": "xlinkHref", "xmlns:xlink": "xmlnsXlink", "xml:space": "xmlSpace", "xml:lang": "xmlLang",
};
// React's TypeScript types want these as numbers.
const NUMERIC = new Set(["tabIndex", "colSpan", "rowSpan", "maxLength", "minLength", "size", "span", "start", "rows", "cols"]);
const URL_ATTRS = new Set(["src", "href", "poster", "data-src", "data-bg", "data-background", "data-poster"]);
export const SITE = "https://twolivestheory.com";

const camel = (name) => name.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
function attrName(name, inSvg) {
  if (HTML_ATTR[name]) return HTML_ATTR[name];
  if (name.startsWith("data-") || name.startsWith("aria-")) return name;
  if (inSvg && name.includes("-")) return camel(name);
  if (inSvg && name.includes(":")) return camel(name.replace(":", "-"));
  return name;
}
export function rewriteUrl(v) {
  if (/^(images|img|css|js|fonts|subtitles)\//.test(v)) return "/" + v;
  if (v.startsWith(SITE + "/") || v === SITE) return v.slice(SITE.length) || "/";
  if (v === "index.html") return "/";
  const m = v.match(/^([a-z0-9-]+(?:\/[a-z0-9-]+)?)\.html(#.*)?$/);
  if (m) return "/" + m[1] + (m[2] || "");
  return v;
}
const rewriteSrcset = (v) => v.split(",").map((part) => { const t = part.trim().split(/\s+/); t[0] = rewriteUrl(t[0]); return t.join(" "); }).join(", ");
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
export const jsxString = (v) => (!/["\n\r\\]/.test(v) ? `"${v}"` : `{${JSON.stringify(v)}}`);
const textJsx = (t) => (!/[{}<>&"'\\ ]/.test(t) && !/^\s|\s$/.test(t) ? t : `{${JSON.stringify(t)}}`);
const isInlineish = (n) => !!n && (n.nodeName === "#text" ? n.value.trim() !== "" : INLINE.has(n.nodeName));

export function createConverter({ matchers = [], ctx = {} } = {}) {
  const report = { title: null, metas: [], links: [], ldjson: [], inlineScripts: [], externalScripts: [], inlineStyles: [], important: [], htmlAttrs: {}, bodyAttrs: {}, warnings: [], components: [] };
  const imports = new Map(); // import path -> Set of component names
  const deep = matchers.filter((m) => m.deep);
  function useComponent(m, props, pad) {
    if (!imports.has(m.from)) imports.set(m.from, new Set());
    imports.get(m.from).add(m.name);
    report.components.push(m.name);
    return `${pad}<${m.name}${propsToJsx(props)} />\n`;
  }
  function styleObject(style, where) {
    const props = new Map(); let custom = false;
    for (const decl of splitDecls(style)) {
      const i = decl.indexOf(":"); if (i < 0) continue;
      const prop = decl.slice(0, i).trim(); let val = decl.slice(i + 1).trim();
      if (!prop) continue;
      if (/!important/i.test(val)) { report.important.push({ where, prop, val }); val = val.replace(/\s*!important/i, ""); }
      val = val.replace(/url\((["']?)(images|img|fonts)\//g, (m, qq, p) => `url(${qq}/${p}/`);
      let key;
      if (prop.startsWith("--")) { key = JSON.stringify(prop); custom = true; }
      else if (prop.startsWith("-ms-")) key = "ms" + camel(prop.slice(4)).replace(/^[a-z]/, (c) => c.toUpperCase());
      else if (prop.startsWith("-")) key = camel(prop.slice(1)).replace(/^[a-z]/, (c) => c.toUpperCase());
      else key = camel(prop);
      props.delete(key); props.set(key, JSON.stringify(val));
    }
    const body = [...props].map(([k, v]) => `${k}: ${v}`).join(", ");
    return custom ? `{{ ${body} } as CSSProperties}` : `{{ ${body} }}`;
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
      if (v === "") { s += ` ${name}=""`; continue; }
      if (NUMERIC.has(name) && /^-?\d+$/.test(v)) { s += ` ${name}={${v}}`; continue; }
      s += ` ${name}=${jsxString(v)}`;
    }
    return s;
  }
  function walk(node, inSvg, depth, where) {
    const pad = "  ".repeat(depth);
    const name = node.nodeName;
    if (name === "#comment") return "";
    if (name === "#text") {
      const parentPre = where.endsWith("pre") || where.endsWith("textarea");
      // Only ASCII whitespace collapses. A non-breaking space (&nbsp;) is content: the
      // editor's "<p>&nbsp;</p>" spacer paragraphs rely on it to keep their line height.
      const t = parentPre ? node.value : node.value.replace(/[ \t\n\r\f]+/g, " ");
      if (t.replace(/[ \t\n\r\f]/g, "") === "") {
        const sib = node.parentNode.childNodes; const i = sib.indexOf(node);
        const prev = sib.slice(0, i).reverse().find((x) => x.nodeName !== "#comment");
        const next = sib.slice(i + 1).find((x) => x.nodeName !== "#comment");
        return isInlineish(prev) && isInlineish(next) ? `{" "}` : "";
      }
      return textJsx(t);
    }
    if (name === "script") {
      const src = attr(node, "src"); const type = attr(node, "type") || "";
      const body = node.childNodes.map((c) => c.value || "").join("");
      if (type === "application/ld+json") { report.ldjson.push(body.trim()); return `${pad}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ${JSON.stringify(body.trim())} }} />\n`; }
      if (src) { report.externalScripts.push(src); return ""; }
      report.inlineScripts.push(body.trim()); return "";
    }
    if (name === "style") { const body = node.childNodes.map((c) => c.value || "").join(""); report.inlineStyles.push(body); return `${pad}<style dangerouslySetInnerHTML={{ __html: ${JSON.stringify(body)} }} />\n`; }
    if (name === "template") { report.warnings.push("template element skipped"); return ""; }
    for (const m of deep) { const props = m.match(node, ctx); if (props) return useComponent(m, props, pad); }
    const svg = inSvg || name === "svg";
    const here = `${where}>${name}`;
    let a = attrs(node, svg, here);
    // React wants the initial choice on the <select> (defaultValue), not `selected` on an <option>.
    if (name === "select") {
      const opt = node.childNodes.find((c) => c.nodeName === "option" && c.attrs.some((x) => x.name === "selected"));
      if (opt) {
        const val = attr(opt, "value") ?? opt.childNodes.map((c) => c.value || "").join("").trim();
        a += ` defaultValue=${jsxString(val)}`;
        for (const o of node.childNodes) if (o.attrs) o.attrs = o.attrs.filter((x) => x.name !== "selected");
      }
    }
    if (VOID.has(name)) return `${pad}<${name}${a} />\n`;
    const out = node.childNodes.map((c) => walk(c, svg, depth + 1, here)).filter(Boolean);
    const inlineOnly = out.every((k) => !k.includes("\n"));
    if (out.length === 0) return `${pad}<${name}${a}></${name}>\n`;
    if (inlineOnly) return `${pad}<${name}${a}>${out.join("")}</${name}>\n`;
    return `${pad}<${name}${a}>\n${out.map((k) => (k.includes("\n") ? k : pad + "  " + k + "\n")).join("")}${pad}</${name}>\n`;
  }
  return { report, walk, imports, useComponent };
}

/** JSX for one DOM node (used to seed shared components from a canonical page). */
export function nodeToJsx(node, depth = 0) {
  const { walk } = createConverter();
  return walk(node, false, depth, "body");
}

export function parseHtml(html) {
  // Strip a leading BOM: browsers drop it while decoding bytes, but handed to the
  // parser as a character it is treated as body text and the whole <head> is lost.
  const doc = parse5.parse(html.replace(/^﻿/, ""));
  const htmlEl = doc.childNodes.find((n) => n.nodeName === "html");
  return { htmlEl, head: htmlEl.childNodes.find((n) => n.nodeName === "head"), body: htmlEl.childNodes.find((n) => n.nodeName === "body") };
}

/** Props object -> JSX attribute list. Strings, numbers, booleans and plain objects/arrays. */
export function propsToJsx(props) {
  return Object.entries(props).filter(([, v]) => v !== undefined).map(([k, v]) => {
    if (typeof v === "string") return ` ${k}=${jsxString(v)}`;
    if (v === true) return ` ${k}`;
    return ` ${k}={${JSON.stringify(v)}}`;
  }).join("");
}

export function convertPage({ html, componentName = "Page", matchers = [] }) {
  const { htmlEl, head, body } = parseHtml(html);
  const canonicalHref = head.childNodes.find((n) => n.nodeName === "link" && attr(n, "rel") === "canonical");
  const ctx = { path: canonicalHref ? rewriteUrl(attr(canonicalHref, "href")) : "/" };
  const { report, walk, imports, useComponent } = createConverter({ matchers, ctx });
  for (const a of htmlEl.attrs) report.htmlAttrs[a.name] = a.value;
  for (const a of body.attrs) report.bodyAttrs[a.name] = a.value;
  for (const n of head.childNodes) {
    if (n.nodeName === "title") report.title = n.childNodes.map((c) => c.value).join("").trim();
    if (n.nodeName === "meta") report.metas.push(Object.fromEntries(n.attrs.map((a) => [a.name, a.value])));
    if (n.nodeName === "link") report.links.push(Object.fromEntries(n.attrs.map((a) => [a.name, a.value])));
    if (n.nodeName === "script") walk(n, false, 0, "head");
  }
  // A <style> in the head is page CSS; emit it at the top of the body fragment (still global).
  const headStyles = head.childNodes.filter((n) => n.nodeName === "style").map((n) => walk(n, false, 3, "head")).join("");

  const bodyJsx = body.childNodes.map((c) => {
    if (c.nodeName !== "#text" && c.nodeName !== "#comment") {
      for (const m of matchers) {
        if (m.deep) continue; // tried inside walk()
        const props = m.match(c, ctx);
        if (props) return useComponent(m, props, "      ");
      }
    }
    return walk(c, false, 3, "body");
  }).filter(Boolean).join("");

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
  const ldjson = report.ldjson.map((j) => `      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ${JSON.stringify(j)} }} />\n`).join("");
  const all = ldjson + headStyles + bodyJsx;
  const importLines = [...imports].map(([from, names]) => `import { ${[...names].sort().join(", ")} } from ${JSON.stringify(from)};`).join("\n");
  const tsx = `// GENERATED from the static site by tools/convert-html.mjs. The markup is kept identical to the
// HTML page on purpose: the theme's compiled CSS and jQuery scripts drive the design.
import type { Metadata } from "next";
${/as CSSProperties/.test(all) ? 'import type { CSSProperties } from "react";\n' : ""}${importLines ? importLines + "\n" : ""}
export const metadata: Metadata = ${JSON.stringify(metadata, null, 2)};

export default function ${componentName}() {
  return (
    <>
${all}    </>
  );
}
`;
  return { tsx, report };
}

// ---- CLI ---------------------------------------------------------------------------
if (process.argv[1] && process.argv[1].endsWith("convert-html.mjs")) {
  const [, , input, outTsx, outReport, componentName = "Page"] = process.argv;
  const matchers = process.argv.includes("--no-components") ? [] : siteMatchers;
  const { tsx, report } = convertPage({ html: fs.readFileSync(input, "utf8"), componentName, matchers });
  fs.writeFileSync(outTsx, tsx);
  if (outReport) fs.writeFileSync(outReport, JSON.stringify(report, null, 2));
  console.log(`wrote ${outTsx} (${(tsx.length / 1024) | 0} KB); components ${report.components.join(",") || "-"}; inline scripts ${report.inlineScripts.length}, external ${report.externalScripts.length}, !important ${report.important.length}, warnings ${report.warnings.length}`);
}
