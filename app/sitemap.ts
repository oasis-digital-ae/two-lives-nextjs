import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { blogPosts } from "@/data/blogs";

const staticRoutes = [
  "",
  "/about",
  "/our-method",
  "/request-mentorship",
  "/explore-your-archetype",
  "/faq",
  "/case-studies",
  "/keynote-talks",
  "/recommended-reading",
  "/athlete",
  "/entrepreneur",
  "/elite-competitors",
  "/executive-leaders",
  "/blogs",
  "/case-study/elite-athlete",
  "/case-study/entrepreneur",
  "/case-study/business-ceo",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blogs/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [...staticEntries, ...blogEntries];
}
