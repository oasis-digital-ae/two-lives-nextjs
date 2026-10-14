import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostPage } from "@/components/site/PostPage";
import { getPost, getPostSlugs, postMetadata } from "@/lib/posts";

/* One page per blog post, rendered from its Supabase row (see lib/posts.ts). All
   current slugs are prerendered; a slug published later renders on first request
   and is cached, with the layout's revalidate window keeping it fresh. */
export async function generateStaticParams() {
  return (await getPostSlugs("blog")).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost("blog", slug);
  return post ? postMetadata(post, "blog") : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!(await getPost("blog", slug))) notFound();
  return <PostPage section="blog" slug={slug} />;
}
