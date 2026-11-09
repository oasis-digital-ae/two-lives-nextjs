import type { MetadataRoute } from "next";
import { getPostSitemap } from "@/lib/posts";

/* Regenerated with the journal and blog, so a newly published post is listed without a deploy. */
export const revalidate = 600;

const SITE = "https://twolivestheory.com";
const PAGES = [
  "/", "/about", "/our-method", "/journal", "/blog", "/case-studies", "/athlete", "/elite-competitors",
  "/entrepreneur", "/executive-leaders", "/explore-your-archetype", "/faq", "/keynote-talks",
  "/recommended-reading", "/request-mentorship", "/privacy-policy", "/cookie-policy",
  "/case-study/business-ceo", "/case-study/elite-athlete", "/case-study/entrepreneur",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [journal, blog] = await Promise.all([getPostSitemap("journal"), getPostSitemap("blog")]);
  const posts = (section: string, rows: typeof journal) =>
    rows.map((r) => ({ url: `${SITE}/${section}/${r.slug}`, lastModified: r.lastModified }));
  return [...PAGES.map((p) => ({ url: `${SITE}${p}` })), ...posts("journal", journal), ...posts("blog", blog)];
}
