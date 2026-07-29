import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/layout/PageHero";
import CaseStudies from "@/components/home/CaseStudies";
import WordMarquee from "@/components/shared/WordMarquee";
import FinalCta from "@/components/home/FinalCta";

export const metadata = buildMetadata({
  title: "Case Studies | Real Client Transformations | Two Lives Theory",
  description:
    "Explore real case studies from Two Lives Theory. See how clients achieved greater clarity, performance, and transformation through structured mindset and mentorship work.",
  path: "/case-studies",
});

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
