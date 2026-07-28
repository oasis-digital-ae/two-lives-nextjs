import type { Metadata } from "next";
import PersonaHero from "@/components/persona/PersonaHero";
import GrowthSplit from "@/components/persona/GrowthSplit";
import ThemesGrid from "@/components/persona/ThemesGrid";
import StrengthenGrid from "@/components/persona/StrengthenGrid";
import PillQuote from "@/components/persona/PillQuote";
import WordMarquee from "@/components/shared/WordMarquee";
import EnablesCarousel from "@/components/persona/EnablesCarousel";
import Marquee from "@/components/home/Marquee";
import PersonaReview from "@/components/persona/PersonaReview";
import FinalCta from "@/components/home/FinalCta";
import {
  ActivityIcon,
  ArrowUpDownIcon,
  HourglassIcon,
  ShieldCheckIcon,
  SlashCircleIcon,
  SlidersIcon,
  SpeedometerIcon,
  TargetIcon,
  TreeIcon,
  TrendingUpIcon,
} from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Athlete Mindset Coaching | Mental Performance | Two Lives Theory",
  description:
    "Mindset coaching for athletes. Break limiting patterns, build emotional control, and perform at your best without losing yourself beyond sport.",
};

export default function AthletePage() {
  return (
    <>
      <PersonaHero
        image="/images/two-lives/mentor-h1b.png"
        eyebrow="For Athletes"
        title="Perform at a high level without losing yourself to it."
      />

      <GrowthSplit
        heading="When performance becomes who you are, everything starts to blur."
        image="/images/athlete-success.png"
        imageAlt="success"
        sideHeading="Strength, performance, and identity must stay aligned."
        sideParagraph="Athletic performance demands total commitment. But for many athletes, the identity built around performance begins to carry a hidden cost."
        steps={[
          {
            title: "Pressure Changes the Experience",
            desc: "As expectations rise, identity can tighten and the body and mind are pushed for long periods of time.",
          },
          {
            title: "Performance Continues, But Something Feels Off",
            desc: "You may still be competing and progressing, yet carrying internal tension, emotional strain, or a disconnect from your performance.",
          },
          {
            title: "This Is Where Change Begins",
            desc: "Two Lives Theory becomes relevant when performance, identity, and life need to come back into alignment.",
          },
        ]}
        closing="My mentoring supports athletes through transition, strengthening their inner foundation so performance and life remain aligned."
      />

      <ThemesGrid
        heading="Common themes We support Athletes with:"
        paragraph="This work is not about mindset tricks or pushing harder. It's about creating internal stability so performance becomes sustainable."
        items={[
          { Icon: ArrowUpDownIcon, label: "Performance pressure", desc: "Pressure that follows you beyond training or competition." },
          { Icon: HourglassIcon, label: "Identity attachment", desc: "Identity closely tied to results, form, or physical output." },
          { Icon: ActivityIcon, label: "Emotional swings", desc: "Emotional volatility around success, failure, or expectation." },
          { Icon: SlashCircleIcon, label: "Switching off", desc: "Difficulty being present outside of sport." },
          { Icon: SpeedometerIcon, label: "What's next", desc: "A sense of \"what's next\" beginning to surface." },
          { Icon: SlidersIcon, label: "Confidence fluctuations", desc: "Confidence rising and falling based on performance, results, or external feedback." },
        ]}
      />

      <StrengthenGrid
        heading="How this work strengthens you"
        paragraph="Athletes are often taught to override internal signals in pursuit of results. This can build resilience - but over time, it can also create inner conflict, emotional suppression, or burnout patterns."
        intro="The work supports athletes in:"
        items={[
          { image: "/images/control.png", Icon: TargetIcon, label: "Emotional Control", desc: "Composure under performance pressure." },
          { image: "/images/identity.png", Icon: TrendingUpIcon, label: "Identity & Integration", desc: "Performing at a high level without losing yourself beyond sport." },
          { image: "/images/reset.png", Icon: ShieldCheckIcon, label: "Narrative Reset", desc: "Letting go of unhelpful patterns and internal stories." },
          { image: "/images/trust.png", Icon: TreeIcon, label: "Self-Trust", desc: "Confidence that remains stable beyond results and performance." },
        ]}
      />

      <PillQuote text="This work strengthens how you operate, without dismantling what you've built." />

      <WordMarquee />

      <EnablesCarousel
        heading="What this enables over time"
        intro="This is what performance starts to feel like:"
        lines={[
          "This is not about stepping away from excellence.",
          "It is about sustaining it without internal cost.",
          "You do not lose your edge.",
          "You remove what interferes with it.",
        ]}
        cards={[
          "Greater calm and clarity in competition.",
          "Reduced emotional swings around results.",
          "Stronger focus without internal pressure.",
          "A healthier relationship with identity and performance.",
          "Confidence that extends beyond sport.",
        ]}
      />

      <Marquee />

      <PersonaReview
        name="Andy Yates"
        role="Sports Person & Entrepreneur"
        ig="@andy_yates"
        igHref="https://www.instagram.com/andy_yates"
        avatar="/images/two-lives/andy-yates.png"
        quotes={[
          "\"I came to Basim wanting to grow just 1%.",
          "I left feeling more grounded, grateful, and at peace. Working with him, one big part of it was making me see I was already successful and that changed everything.",
          "I would 100% recommend Basim's mentoring to anyone wanting to see and reach their potential.\"",
        ]}
      />

      <FinalCta />
    </>
  );
}
