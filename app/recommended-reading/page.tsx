import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/layout/PageHero";
import BookGrid from "@/components/reading/BookGrid";
import WordMarquee from "@/components/shared/WordMarquee";
import FinalCta from "@/components/home/FinalCta";

export const metadata = buildMetadata({
  title: "Recommended Reading | Mindset, Performance & Personal Growth Books | Two Lives Theory",
  description:
    "Explore a curated list of books on mindset, performance, clarity, and personal growth. Recommended reading to help you think deeper, perform better, and step into your next level.",
  path: "/recommended-reading",
});

export default function RecommendedReadingPage() {
  return (
    <>
      <PageHero
        image="/images/hero-bg-11.png"
        eyebrow="Recommended"
        title="Readings"
        description="A small selection of work I have personally read that echoes themes explored within the Two Lives Theory. These are not required reading, but offer perspective on growth, inner alignment, and conscious transition."
      />
      <BookGrid />
      <WordMarquee />
      <FinalCta />
    </>
  );
}
