import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/layout/PageHero";
import Faq from "@/components/home/Faq";
import WordMarquee from "@/components/shared/WordMarquee";
import FinalCta from "@/components/home/FinalCta";

export const metadata = buildMetadata({
  title: "FAQ | Two Lives Theory Mentorship & Coaching Questions Answered",
  description:
    "Find answers to common questions about Two Lives Theory, including mentorship, coaching process, who it’s for, and how to get started. Everything you need to know before working together.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <PageHero
        image="/images/hero-bg-11.png"
        eyebrow="Frequently"
        title="Asked Questions"
        description="Your questions matter. Below, find clarity on Two Lives Theory, who this work is for, and what to expect as you consider stepping into your next life."
      />
      <Faq showHeading={false} />
      <WordMarquee />
      <FinalCta />
    </>
  );
}
