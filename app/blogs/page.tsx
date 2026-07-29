import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/layout/PageHero";
import BlogCard from "@/components/blog/BlogCard";
import WordMarquee from "@/components/shared/WordMarquee";
import FinalCta from "@/components/home/FinalCta";
import { blogPosts } from "@/data/blogs";

export const metadata = buildMetadata({
  title: "Mindset & Performance Blog | Two Lives Theory",
  description:
    "Explore insights on mindset, performance, clarity, and personal growth. The Two Lives Theory blog helps high performers break limiting patterns and step into their next level.",
  path: "/blogs",
});

export default function BlogsPage() {
  const posts = [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <>
      <PageHero
        image="/images/hero-bg-11.png"
        eyebrow="Insights"
        title="for Growth & Alignment"
        description="A curated collection of reflections on mindset, self awareness, and conscious growth."
      />

      <section className="bg-pattern-section bg-off-white py-16 md:py-20">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <div className="grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <WordMarquee />
      <FinalCta />
    </>
  );
}
