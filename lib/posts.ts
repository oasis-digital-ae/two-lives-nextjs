/*
 * Journal and blog posts rendered from Supabase.
 *
 * The static site generated one HTML file per post with
 * netlify/functions/lib/render-journal-post.js (journal) and the ODAI webhook
 * (blog). The rules here are those renderers' rules, so a post comes out the
 * same whether it was committed as a file or rendered from the row:
 *   - page title: seo_title, else title; description: seo_description
 *   - canonical: seo_canonical only when it already equals the post's real URL
 *   - the hero highlights the first word of main_heading (else title)
 *   - the article body's <h1> becomes <h2> (the hero already holds the page's H1)
 *   - the date shown is the first 10 characters of publish_date
 *   - BlogPosting schema with the author as a Person and the site as publisher
 * The static SEO pass (tools/seo-enhance.py in the static repo) also added a
 * BreadcrumbList and a "Keep reading" block of three related posts; both are
 * produced here with the same logic.
 */
import type { Metadata } from "next";
import { rest, type Section } from "./supabase";

export const SITE = "https://twolivestheory.com";
const TITLE_SUFFIX = /\s*[|–—-]\s*Two Lives Theory\s*$/i;

export type PostRow = {
  slug: string;
  title: string | null;
  main_heading: string | null;
  summary: string | null;
  html_content: string | null;
  thumbnail: string | null;
  author_name: string | null;
  publish_date: string | null;
  updated_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_canonical: string | null;
};

const TABLE: Record<Section, { table: string; filter: string }> = {
  journal: { table: "blog_posts", filter: "" },
  blog: { table: "odai_blogs", filter: "&status=eq.published" },
};
const COLS = "slug,title,main_heading,summary,html_content,thumbnail,author_name,publish_date,updated_at,seo_title,seo_description,seo_canonical";

export async function getPost(section: Section, slug: string): Promise<PostRow | null> {
  const { table, filter } = TABLE[section];
  const { data } = await rest<PostRow[]>(`${table}?select=${COLS}${filter}&slug=eq.${encodeURIComponent(slug)}&limit=1`);
  return data[0] ?? null;
}

export async function getPostSlugs(section: Section): Promise<string[]> {
  const { table, filter } = TABLE[section];
  const { data } = await rest<{ slug: string }[]>(`${table}?select=slug${filter}`);
  return data.map((r) => r.slug);
}

export const postUrl = (section: Section, slug: string) => `${SITE}/${section}/${slug}`;

/** seo_canonical is typed by hand in the editor; trust it only when it is already this post's URL. */
export function canonicalFor(post: PostRow, section: Section) {
  const expected = postUrl(section, post.slug);
  return (post.seo_canonical || "").trim() === expected ? post.seo_canonical!.trim() : expected;
}

export const pageTitle = (post: PostRow) => post.seo_title || post.title || "";

/** The hero's highlighted first word and the rest of the heading (with its leading space). */
export function headingParts(post: PostRow) {
  const parts = (post.main_heading || post.title || "").trim().replace(/\s+/g, " ").split(" ");
  const first = parts.shift() || "";
  return { first, rest: parts.length ? ` ${parts.join(" ")}` : "" };
}

/** The article body: the row's HTML with its <h1> demoted, the hero already being the page's H1. */
export const articleHtml = (post: PostRow) => (post.html_content || "").replace(/<h1(\s|>)/gi, "<h2$1").replace(/<\/h1>/gi, "</h2>");

export const shownDate = (post: PostRow) => String(post.publish_date || "").substring(0, 10);

export function blogPostingSchema(post: PostRow, canonical: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.seo_title || post.title,
    description: post.seo_description || post.summary || "",
    image: post.thumbnail || "",
    datePublished: post.publish_date || "",
    dateModified: post.updated_at || post.publish_date || "",
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    author: { "@type": "Person", name: post.author_name || "Basim Yafai", url: `${SITE}/about` },
    publisher: { "@type": "Organization", name: "Two Lives Theory", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/images/tl-green-logo.svg` } },
  };
}

export function breadcrumbSchema(post: PostRow, section: Section, canonical: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [{
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: section === "journal" ? "Journal" : "Blog", item: `${SITE}/${section}` },
        { "@type": "ListItem", position: 3, name: pageTitle(post).replace(TITLE_SUFFIX, ""), item: canonical },
      ],
    }],
  };
}

export function postMetadata(post: PostRow, section: Section): Metadata {
  const title = pageTitle(post);
  const description = post.seo_description || "";
  const canonical = canonicalFor(post, section).replace(SITE, "") || "/";
  const image = post.thumbnail || "";
  return {
    title,
    description,
    authors: post.author_name ? [{ name: post.author_name }] : undefined,
    alternates: { canonical },
    openGraph: { type: "article", title, description, url: canonical, siteName: "Two Lives Theory", images: image ? [{ url: image, secureUrl: image, type: "image/jpeg" }] : undefined },
    twitter: { card: "summary_large_image", title, description, images: image ? [{ url: image, alt: title }] : undefined },
  };
}

// ---- "Keep reading": three related posts, ported from the static site's SEO pass ----

const STOP = new Set(`a an and are as at be but by for from has have how in into is it its of on or our so than that the
their them then there these they this to us was we what when where which who why will with you your not no more
most can do does did often even just about over after before between because feel feels high performers
performer high-performers`.split(/\s+/));

type RelatedDoc = { section: Section; slug: string; title: string; vec: Map<string, number>; norm: number };

const SERVICES: [RegExp, string, string][] = [
  [/athlet|sport|competit|poker|player|olympic|elite/g, "/athlete", "Mentorship for athletes"],
  [/entrepreneur|founder|business|startup/g, "/entrepreneur", "Mentorship for entrepreneurs"],
  [/leader|executive|ceo|leadership|decision/g, "/executive-leaders", "Mentorship for executive leaders"],
];
const DEFAULT_SERVICE = ["/our-method", "How the Two Lives Method works"] as const;

/** Which service page a post points to, from its title and slug (descriptions name every audience). */
export function serviceFor(title: string, slug: string): { href: string; label: string } {
  const blob = `${title} ${slug.replace(/-/g, " ")}`.toLowerCase();
  let best: (typeof SERVICES)[number] | null = null, bestN = 0;
  for (const s of SERVICES) { const n = (blob.match(s[0]) || []).length; if (n > bestN) { bestN = n; best = s; } }
  return best ? { href: best[1], label: best[2] } : { href: DEFAULT_SERVICE[0], label: DEFAULT_SERVICE[1] };
}

async function relatedCorpus(): Promise<RelatedDoc[]> {
  const rows: { section: Section; slug: string; title: string; desc: string }[] = [];
  for (const section of ["journal", "blog"] as Section[]) {
    const { table, filter } = TABLE[section];
    const { data } = await rest<Pick<PostRow, "slug" | "title" | "seo_title" | "seo_description">[]>(`${table}?select=slug,title,seo_title,seo_description${filter}`);
    for (const r of data) rows.push({ section, slug: r.slug, title: (r.seo_title || r.title || "").replace(TITLE_SUFFIX, ""), desc: r.seo_description || "" });
  }
  const counts = rows.map((r) => {
    const c = new Map<string, number>();
    for (const w of `${r.title} ${r.title} ${r.desc} ${r.slug.replace(/-/g, " ")}`.toLowerCase().match(/[a-z]{3,}/g) || []) if (!STOP.has(w)) c.set(w, (c.get(w) || 0) + 1);
    return c;
  });
  const df = new Map<string, number>();
  for (const c of counts) for (const w of c.keys()) df.set(w, (df.get(w) || 0) + 1);
  const N = rows.length;
  return rows.map((r, i) => {
    const vec = new Map<string, number>();
    for (const [w, n] of counts[i]) vec.set(w, (1 + Math.log(n)) * Math.log(1 + N / df.get(w)!));
    const norm = Math.sqrt([...vec.values()].reduce((s, x) => s + x * x, 0)) || 1;
    return { section: r.section, slug: r.slug, title: r.title, vec, norm };
  });
}

/** The three posts most similar to this one (same section preferred), plus the service link. */
export async function relatedPosts(section: Section, slug: string) {
  const docs = await relatedCorpus();
  const me = docs.find((d) => d.section === section && d.slug === slug);
  if (!me) return { posts: [], service: DEFAULT_SERVICE };
  const sim = (a: RelatedDoc, b: RelatedDoc) => {
    const [small, big] = a.vec.size < b.vec.size ? [a.vec, b.vec] : [b.vec, a.vec];
    let s = 0; for (const [t, w] of small) s += w * (big.get(t) || 0);
    return s / (a.norm * b.norm);
  };
  const ranked = docs.filter((d) => d !== me)
    .map((d) => ({ d, score: sim(me, d) * (d.section === section ? 1.15 : 1), key: `${d.section}/${d.slug}.html` }))
    .sort((x, y) => y.score - x.score || (x.key < y.key ? -1 : 1))
    .slice(0, 3);
  const service = serviceFor(me.title, slug);
  return { posts: ranked.map((r) => ({ href: `/${r.d.section}/${r.d.slug}`, title: r.d.title })), service: [service.href, service.label] as const };
}
