import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import ArticleHero from "@/components/article/ArticleHero";
import ArticleLayout from "@/components/article/ArticleLayout";
import ArticleRichContent from "@/components/article/ArticleRichContent";
import WordMarquee from "@/components/shared/WordMarquee";
import FinalCta from "@/components/home/FinalCta";
import { blogPosts } from "@/data/blogs";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blogs/${post.slug}`,
    image: post.image,
    type: "article",
  });
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2)
    .map((p) => ({ href: `/blogs/${p.slug}`, image: p.image, title: p.title }));

  return (
    <>
      <ArticleHero
        image="/images/hero-bg-11.png"
        eyebrow={post.eyebrow}
        title={post.titleFull}
        date={formatDate(post.date)}
      />
      <ArticleLayout sidebarTitle="Recent Posts" related={related}>
        <div className="relative mb-10 aspect-video overflow-hidden rounded-[10px]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-cover"
          />
        </div>
        <ArticleRichContent html={post.content} />
      </ArticleLayout>
      <WordMarquee />
      <FinalCta />
    </>
  );
}
