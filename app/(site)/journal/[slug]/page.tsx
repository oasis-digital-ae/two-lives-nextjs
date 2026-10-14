import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { posts } from "@/content/journal";

/* One static page per journal post. The markup for each post lives in content/journal/<slug>.tsx,
   generated from the static site's HTML; this route only picks the module by slug. */
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const load = posts[slug];
  return load ? (await load()).metadata : {};
}

export default async function JournalPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const load = posts[slug];
  if (!load) notFound();
  const { default: Post } = await load();
  return <Post />;
}
