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
  title: "Entrepreneur Coaching | Mindset & Performance for Founders | Two Lives Theory",
  description:
    "Entrepreneur coaching designed for founders and high performers. Break limiting patterns, gain clarity, and make better decisions under pressure with the Two Lives Method.",
};

export default function EntrepreneurPage() {
  return (
    <>
      <PersonaHero
        image="/images/two-lives/mentor-h1b.png"
        eyebrow="For Entrepreneurs"
        title="Build success without losing yourself in the process."
      />

      <GrowthSplit
        heading="Growth can pull you away from clarity."
        image="/images/enterpreneur-success.png"
        imageAlt="success"
        sideHeading="Build success without losing yourself."
        sideParagraph="Entrepreneurship demands clarity, resilience, and self-leadership. But for many high performers, success begins to carry an internal cost."
        steps={[
          {
            title: "Internal Pressure Builds",
            desc: "You may be building, scaling, or leading outwardly while internally experiencing pressure, mental fatigue, and emotional noise.",
          },
          {
            title: "Something Starts to Feel Unsustainable",
            desc: "There can be a growing sense that the way you are operating no longer feels aligned or sustainable.",
          },
          {
            title: "This Is Where Change Begins",
            desc: "Two Lives Theory becomes relevant when your internal system needs to evolve for your next chapter to work.",
          },
        ]}
        closing="My mentoring supports entrepreneurs who are not broken, but ready to evolve how they operate from within."
      />

      <ThemesGrid
        heading="Common themes I support entrepreneurs with:"
        paragraph="This work is not about slowing you down. It's about helping you lead, build, and decide from clarity rather than strain."
        items={[
          { Icon: ArrowUpDownIcon, label: "Internal pressure", desc: "Persistent mental pressure behind outward success." },
          { Icon: HourglassIcon, label: "Decision fatigue", desc: "Decision fatigue and overthinking under responsibility." },
          { Icon: ActivityIcon, label: "Emotional reactivity", desc: "Emotional reactivity affecting leadership or relationships." },
          { Icon: SlashCircleIcon, label: "Misalignment", desc: "Sense of misalignment despite achievement." },
          { Icon: SpeedometerIcon, label: "Slowing down", desc: "Difficulty slowing down without losing momentum." },
          { Icon: SlidersIcon, label: "Control", desc: "A constant need to stay in control." },
        ]}
      />

      <StrengthenGrid
        heading="How this work strengthens you"
        paragraph="Entrepreneurs often attempt to solve internal challenges with external strategies. More structure. More discipline. More pushing. But inner friction does not resolve through force."
        intro="The work supports entrepreneurs in:"
        items={[
          { image: "/images/clarity.png", Icon: TargetIcon, label: "Clarity Under Pressure", desc: "Staying steady and thinking clearly without suppression or overwhelm." },
          { image: "/images/ambition.png", Icon: TrendingUpIcon, label: "Ambition & Wellbeing", desc: "Driving forward without sacrificing yourself in the process." },
          { image: "/images/trust.png", Icon: ShieldCheckIcon, label: "Self-Trust", desc: "Leading and deciding from internal steadiness rather than doubt." },
          { image: "/images/leadership-1.png", Icon: TreeIcon, label: "Sustainable Leadership", desc: "Building success without long-term internal strain." },
        ]}
      />

      <PillQuote text="This work strengthens how you operate, without dismantling what you've built." />

      <WordMarquee />

      <EnablesCarousel
        heading="What this enables over time"
        intro="Over time, this is how things begin to feel:"
        lines={[
          "This is not a reinvention.",
          "It is a shift in how you operate.",
          "You do not step away from ambition.",
          "You move through it with clarity, stability, and control.",
        ]}
        cards={[
          "Clearer decision making with less emotional load.",
          "Increased capacity without burnout.",
          "Leadership that feels grounded rather than reactive.",
          "The ability to scale life and business together, not in conflict.",
          "A renewed sense of direction and internal stability.",
        ]}
      />

      <Marquee />

      <PersonaReview
        name="Cattaleeya Schulze"
        role="Mother, Wife & Entrepreneur"
        ig="@cattaleeya_schulze"
        igHref="https://www.instagram.com/cattaleeya_schulze"
        avatar="/images/Cattaleeya.jpg"
        quotes={[
          "\"Working with Basim wasn't just coaching, it felt like being handed a life manual, finally.",
          "He helped me see things from a completely new angle. Basim didn't just help me think differently, he helped me live differently. I'm more present, more grounded, and genuinely proud of how far I've come.",
          "Who knew that a small shift in mindset could make life feel less chaotic and much clearer.\"",
        ]}
      />

      <FinalCta />
    </>
  );
}
