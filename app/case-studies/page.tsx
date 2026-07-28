import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import CaseStudies from "@/components/home/CaseStudies";
import WordMarquee from "@/components/shared/WordMarquee";
import FinalCta from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "Case Studies | Two Lives Theory",
  description:
    "Inner transitions take time. These case studies show how clarity, balance, and self-leadership create sustainable success.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        image="/images/hero-bg-11.png"
        eyebrow="Case"
        title="Studies"
        description="Inner transitions take time. These case studies show how clarity, balance, and self-leadership create sustainable success."
      />
      <CaseStudies heading="Every result began with an internal shift." description={null} />
      <WordMarquee />
      <FinalCta />
    </>
  );
}
