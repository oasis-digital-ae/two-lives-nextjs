// Matchers that turn repeated blocks of the static pages into shared components.
//
// Each matcher looks at one top-level <body> child. It returns the component's props
// when the block has exactly the structure the component reproduces, otherwise null
// and the markup stays inline. Text is passed exactly as the browser would collapse it
// (surrounding spaces included) so the rendered text nodes are identical.
import { attr, kids, classes, text } from "./dom.mjs";

const FROM = "@/components/site";
// normalised class list for comparisons; the raw attribute (spacing and all) for props
const cls = (n) => classes(n).join(" ");
const rawCls = (n) => attr(n, "class") ?? "";
const has = (n, c) => classes(n).includes(c);
const is = (n, tag) => n && n.nodeName === tag;

/** style="a:b; c:d" -> React style object, the same way the converter does it. */
function styleObject(style) {
  const out = {};
  let depth = 0, cur = "", decls = [];
  for (const ch of style) { if (ch === "(") depth++; if (ch === ")") depth--; if (ch === ";" && depth === 0) { decls.push(cur); cur = ""; } else cur += ch; }
  if (cur.trim()) decls.push(cur);
  for (const d of decls) {
    const i = d.indexOf(":"); if (i < 0) continue;
    const prop = d.slice(0, i).trim(); const val = d.slice(i + 1).trim().replace(/\s*!important/i, "");
    if (!prop) continue;
    const key = prop.startsWith("--") ? prop : prop.replace(/^-ms-/, "ms-").replace(/^-/, "").replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    delete out[key]; out[key] = val;
  }
  return out;
}
/** The exact text of an element whose only child is one text node (spaces kept). */
function soleText(n) {
  const c = (n.childNodes || []).filter((x) => x.nodeName !== "#comment");
  if (c.length === 0) return "";
  if (c.length === 1 && c[0].nodeName === "#text") {
    const t = text(c[0]);
    return t.replace(/[ \t\n\r\f]/g, "") === "" ? "" : t; // whitespace-only is nothing, as in the converter
  }
  return null;
}

const simple = (name, test) => ({ name, from: FROM, match: (n) => (test(n) ? {} : null) });

const sectionOf = (path) => (path.startsWith("/journal") ? "journal" : path.startsWith("/blog") ? "blog" : null);

/* Matchers with `deep: true` are tried on every element, not only the top-level body
   children. They get the page's path as context. */
export const matchers = [
  {
    name: "RecentPosts", from: FROM, deep: true,
    match: (n, ctx) => {
      if (!is(n, "div") || attr(n, "id") !== "recent-posts") return null;
      const section = sectionOf(ctx.path); const slug = ctx.path.split("/").pop();
      return section && slug ? { section, currentSlug: slug } : null;
    },
  },
  {
    name: "PostListing", from: FROM, deep: true,
    match: (n, ctx) => {
      if (!is(n, "div") || cls(n) !== "container-fluid") return null;
      const [grid, pager, ...rest] = kids(n);
      if (rest.length || !is(grid, "div") || attr(grid, "id") !== "custom-blog-grid" || !is(pager, "div")) return null;
      const [ul] = kids(pager);
      if (!is(ul, "ul") || attr(ul, "id") !== "custom-blog-pagination") return null;
      const section = sectionOf(ctx.path);
      return section ? { section } : null;
    },
  },
  {
    name: "Header", from: FROM,
    match: (n) => {
      if (!is(n, "header")) return null;
      const props = {};
      const all = (node, out = []) => { for (const c of node.childNodes || []) { if (c.attrs) out.push(c); all(c, out); } return out; };
      const els = all(n);
      // the homepage header has the desktop toggler and span menu triggers
      if (els.some((e) => is(e, "button") && has(e, "desktop-toggler"))) props.variant = "home";
      // the contact page's header button opens Calendly instead of linking to the page it is on
      const cta = els.find((e) => is(e, "a") && has(e, "btn-primary"));
      const onclick = cta && attr(cta, "onclick");
      if (onclick) props.ctaOnclick = onclick;
      return props;
    },
  },
  simple("Footer", (n) => is(n, "footer") && has(n, "footer-dark")),
  { name: "WhatsAppWidget", from: FROM, match: (n) => (is(n, "a") && has(n, "whatsapp-widget") ? (has(n, "show") ? { show: true } : {}) : null) },
  simple("ScrollTop", (n) => is(n, "div") && has(n, "scroll-progress")),
  simple("CursorPageInner", (n) => is(n, "div") && has(n, "cursor-page-inner")),
  simple("PostCta", (n) => is(n, "section") && has(n, "h-400px")),
  {
    name: "LogoMarquee", from: FROM,
    match: (n) => {
      if (!is(n, "section") || !has(n, "half-section") || !has(n, "pb-0")) return null;
      const c = cls(n);
      if (c === "half-section pb-0 bg-pattern-section") return {};
      if (c === "half-section pb-0 bg-pattern-section sm-pt-65px sm-pb-30px") return { variant: "persona" };
      return null;
    },
  },
  {
    name: "PageHero", from: FROM,
    match: (n) => {
      if (!is(n, "section") || !has(n, "page-title-separate-breadcrumbs")) return null;
      const [overlay, container, ...rest] = kids(n);
      if (rest.length || !is(overlay, "div") || kids(overlay).length || cls(overlay) !== "position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-75") return null;
      if (!is(container, "div") || cls(container) !== "container position-relative z-1") return null;
      const [row, ...r2] = kids(container);
      if (r2.length || !is(row, "div") || cls(row) !== "row min-vh-50 align-items-center gy-3") return null;
      const [left, right, ...r3] = kids(row);
      if (r3.length || !is(left, "div") || !is(right, "div")) return null;
      const [h1, ...r4] = kids(left);
      if (r4.length || !is(h1, "h1")) return null;
      const parts = (h1.childNodes || []).filter((c) => c.nodeName !== "#comment" && !(c.nodeName === "#text" && !c.value.trim()));
      if (parts.length !== 2) return null;
      const spanFirst = is(parts[0], "span");
      const span = spanFirst ? parts[0] : parts[1], textNode = spanFirst ? parts[1] : parts[0];
      if (!is(span, "span") || textNode.nodeName !== "#text") return null;
      if (cls(span) !== "highlighter-below animate mb-0 pb-0" || attr(span, "data-shadow-animation") !== "true" || attr(span, "data-animation-delay") !== "500") return null;
      const lead = soleText(span); if (lead === null) return null;
      const rk = kids(right);
      const p = rk[0];
      if (!is(p, "p") || !cls(p)) return null;
      const subtitle = soleText(p); if (subtitle === null) return null;
      const props = { style: styleObject(attr(n, "style") || ""), className: rawCls(n), leftClass: rawCls(left), h1Class: rawCls(h1), lead, title: text(textNode), leadFirst: spanFirst, rightClass: rawCls(right), pClass: rawCls(p), subtitle };
      if (rk.length === 1) return props;
      // journal/blog posts: date row and an empty trailing paragraph
      const [, dateRow, trailing, ...r5] = rk;
      if (r5.length || !is(dateRow, "div") || !has(dateRow, "date-con")) return null;
      if (trailing && !(is(trailing, "p") && !trailing.attrs.length && kids(trailing).length === 0)) return null;
      const [icon, dateSpan, dot, bySpan, ...r6] = kids(dateRow);
      if (r6.length || !is(icon, "i") || cls(icon) !== "feather icon-feather-calendar me-5px ms-4px" || !is(dateSpan, "span") || cls(dateSpan) !== "me-10px" || !is(dot, "span") || cls(dot) !== "opacity-6" || soleText(dot) !== "•" || !is(bySpan, "span") || cls(bySpan) !== "ms-10px") return null;
      const byParts = (bySpan.childNodes || []).filter((c) => c.nodeName !== "#comment" && !(c.nodeName === "#text" && !c.value.trim()));
      if (byParts.length !== 2 || byParts[0].nodeName !== "#text" || text(byParts[0]) !== " By " || !is(byParts[1], "strong")) return null;
      const author = soleText(byParts[1]); const date = soleText(dateSpan);
      if (author === null || date === null) return null;
      return { ...props, dateRowClass: rawCls(dateRow), meta: { date, author }, trailingP: !!trailing };
    },
  },
  {
    name: "Cta", from: FROM,
    match: (n) => {
      if (!is(n, "section") || !has(n, "h-600px")) return null;
      const [overlay, shadow, container, ...rest] = kids(n);
      if (rest.length || !is(overlay, "div") || kids(overlay).length || !is(shadow, "div") || kids(shadow).length || !is(container, "div")) return null;
      const [row, ...r2] = kids(container);
      if (r2.length || !is(row, "div")) return null;
      const [left, right, ...r3] = kids(row);
      if (r3.length || !is(left, "div") || !is(right, "div")) return null;
      const [h3, sub, ...r4] = kids(left);
      if (r4.length || !is(h3, "h3")) return null;
      const title = soleText(h3); if (title === null) return null;
      let subtitle;
      if (sub) {
        if (!is(sub, "p") && !is(sub, "h4")) return null;
        const sk = (sub.childNodes || []).filter((c) => c.nodeName !== "#comment" && !(c.nodeName === "#text" && !c.value.trim()));
        if (sk.length === 1 && sk[0].nodeName === "#text") subtitle = { tag: sub.nodeName, className: rawCls(sub), text: text(sk[0]) };
        else if (sk.length === 2 && is(sk[0], "i") && kids(sk[0]).length === 0 && sk[1].nodeName === "#text") subtitle = { tag: sub.nodeName, className: rawCls(sub), iconClass: rawCls(sk[0]), text: text(sk[1]) };
        else return null;
      }
      const buttons = [];
      for (const a of kids(right)) {
        if (!is(a, "a")) return null;
        const ak = (a.childNodes || []).filter((c) => c.nodeName !== "#comment" && !(c.nodeName === "#text" && !c.value.trim()));
        const b = { href: attr(a, "href") ?? "", className: rawCls(a) };
        const onclick = attr(a, "onclick"); if (onclick) b.onclick = onclick;
        let i = 0;
        if (is(ak[i], "i") && kids(ak[i]).length === 0) { b.iconBefore = rawCls(ak[i]); i++; }
        if (!ak[i] || ak[i].nodeName !== "#text") return null;
        b.text = text(ak[i]); i++;
        if (ak[i]) {
          const s = ak[i]; const si = kids(s);
          if (!is(s, "span") || si.length !== 1 || !is(si[0], "i") || kids(si[0]).length) return null;
          b.iconAfter = { span: rawCls(s), icon: rawCls(si[0]) }; i++;
        }
        if (ak[i]) return null;
        for (const x of a.attrs) if (!["href", "class", "onclick"].includes(x.name)) return null;
        buttons.push(b);
      }
      const parallax = attr(n, "data-parallax-background-ratio");
      for (const x of n.attrs) if (!["class", "style", "data-parallax-background-ratio"].includes(x.name)) return null;
      const props = { className: rawCls(n), style: styleObject(attr(n, "style") || ""), overlayClass: rawCls(overlay), shadowClass: rawCls(shadow), containerClass: rawCls(container), rowClass: rawCls(row), leftClass: rawCls(left), h3Class: rawCls(h3), title, rightClass: rawCls(right), buttons };
      if (parallax) props.parallax = parallax;
      if (subtitle) props.subtitle = subtitle;
      return props;
    },
  },
];
