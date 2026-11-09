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
 * The static SEO pass also added a BreadcrumbList; it is produced here with the same logic.
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
