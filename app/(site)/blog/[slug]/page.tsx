import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { posts } from "@/content/blog";

/* One static page per ODAI blog post; markup in content/blog/<slug>.tsx. */
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const load = posts[slug];
  return load ? (await load()).metadata : {};
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const load = posts[slug];
  if (!load) notFound();
  const { default: Post } = await load();
  return <Post />;
}
