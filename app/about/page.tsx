import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/layout/PageHero";
import MeetFounder from "@/components/about/MeetFounder";
import StatsCounters from "@/components/home/StatsCounters";
import BeliefQuote from "@/components/shared/BeliefQuote";
import MyApproach from "@/components/about/MyApproach";
import SocialFollow from "@/components/about/SocialFollow";
import ExperienceQualifications from "@/components/about/ExperienceQualifications";
import DegreeBadges from "@/components/about/DegreeBadges";
import WordMarquee from "@/components/shared/WordMarquee";
import FinalCta from "@/components/home/FinalCta";

export const metadata = buildMetadata({
  title: "About Basim Yafai | Mindset & Performance Coach | Two Lives Theory",
  description:
    "Discover Basim Yafai’s approach to mindset and performance coaching. Helping high performers break limiting patterns, gain clarity, and step into their next level of life with purpose and confidence.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        image="/images/hero-bg-11.png"
        eyebrow="About"
        title="Basim Yafai"
        description="Real change happens when mind, body and emotions are strengthened together, not treated as separate parts."
      />
      <MeetFounder />
      <StatsCounters />
      <BeliefQuote />
      <MyApproach />
      <SocialFollow />
      <ExperienceQualifications />
      <DegreeBadges />
      <WordMarquee />
      <FinalCta
        heading="Step Into Your Next Life"
        subheading={
          <h4 className="mb-2 inline-block align-middle font-heading text-[20px] leading-tight font-semibold text-white">
            Not becoming someone new. It&apos;s about returning to yourself
            with clarity, strength, and freedom.
          </h4>
        }
      />
    </>
  );
}
