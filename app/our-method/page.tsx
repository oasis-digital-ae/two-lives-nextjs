import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import MethodIntro from "@/components/method/MethodIntro";
import FoundationSplit from "@/components/method/FoundationSplit";
import StatsCounters from "@/components/home/StatsCounters";
import BeliefQuote from "@/components/shared/BeliefQuote";
import TransitionMattersList from "@/components/method/TransitionMattersList";
import MethodCards from "@/components/method/MethodCards";
import Marquee from "@/components/home/Marquee";
import PathSteps from "@/components/home/PathSteps";
import WordMarquee from "@/components/shared/WordMarquee";
import FinalCta from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "Our Method | Two Lives Theory",
  description:
    "Two Lives Theory is an inner framework integrating subconscious rewiring, deep inner work, and real-world performance for lasting change.",
};

export default function OurMethodPage() {
  return (
    <>
      <PageHero
        image="/images/hero-bg-11.png"
        eyebrow="Our"
        title="Method"
        description="Two Lives Theory is an inner framework integrating subconscious rewiring, deep inner work, and real-world performance for lasting change."
      />
      <MethodIntro />
      <FoundationSplit />
      <StatsCounters />
      <BeliefQuote
        image="/images/two-lives/method-banner.png"
        preline={null}
        quote="You can look successful and still feel misaligned. Two Lives Theory helps you step into your full potential and stay there."
      />
      <TransitionMattersList />
      <MethodCards />
      <Marquee />
      <PathSteps
        steps={[
          {
            title: "Pause and Take Stock",
            paragraphs: [
              "You don't begin by fixing anything.",
              "You begin by understanding where you are, what feels heavy, and what no longer fits.",
            ],
          },
          {
            title: "Do the Inner Work",
            paragraphs: [
              "Through guided reflection and mentoring, you release old patterns and recalibrate how you relate to pressure, identity, and self-trust.",
            ],
          },
          {
            title: "Step Forward With Stability",
            paragraphs: [
              "You begin operating from your next life naturally. Decisions feel cleaner. Energy is steadier. Confidence becomes quieter and grounded.",
            ],
          },
        ]}
        cta={false}
      />
      <WordMarquee />
      <FinalCta
        heading="This is not about becoming someone new…"
        subheading={
          <p className="mb-2 inline-block align-middle font-heading text-base font-medium text-white">
            It is about stepping into who you already are, with clarity,
            strength, and stability. If you are between lives and ready to
            step forward, you are invited to explore this work.
          </p>
        }
      />
    </>
  );
}
