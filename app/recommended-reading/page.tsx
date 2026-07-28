import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import BookGrid from "@/components/reading/BookGrid";
import WordMarquee from "@/components/shared/WordMarquee";
import FinalCta from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "Recommended Reading | Two Lives Theory",
  description:
    "A small selection of work echoing themes explored within the Two Lives Theory. These are not required reading, but offer perspective on growth, inner alignment, and conscious transition.",
};

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
