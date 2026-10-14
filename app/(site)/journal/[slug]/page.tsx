import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostPage } from "@/components/site/PostPage";
import { getPost, getPostSlugs, postMetadata } from "@/lib/posts";

/* One page per journal post, rendered from its Supabase row (see lib/posts.ts). All
   current slugs are prerendered; a slug published later renders on first request
   and is cached, with the layout's revalidate window keeping it fresh. */
export async function generateStaticParams() {
  return (await getPostSlugs("journal")).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost("journal", slug);
  return post ? postMetadata(post, "journal") : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!(await getPost("journal", slug))) notFound();
  return <PostPage section="journal" slug={slug} />;
}
