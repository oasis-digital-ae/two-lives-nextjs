import { buildMetadata } from "@/lib/seo";
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

export const metadata = buildMetadata({
  title: "Executive Leadership Mentorship | Clarity, Decision-Making & Performance | Two Lives Theory",
  description:
    "Mentorship for executive leaders navigating pressure, responsibility, and complexity. Two Lives Theory helps you gain clarity, make better decisions, and lead with confidence and control.",
  path: "/executive-leaders",
});

export default function ExecutiveLeadersPage() {
  return (
    <>
      <PersonaHero
        image="/images/two-lives/mentor-h1b.png"
        eyebrow="For  Executives & Leaders"
        title="Lead with clarity without carrying internal strain."
      />

      <GrowthSplit
        heading="Responsibility doesn't switch off. Neither does the pressure."
        image="/images/exec-success.png"
        imageAlt="success"
        sideHeading="Lead with clarity, not internal strain."
        sideParagraph="Leadership demands composure, judgement, and presence. But for many executives, the weight of responsibility begins to carry a hidden cost."
        steps={[
          {
            title: "The Role Expands, The Pressure Builds",
            desc: "As responsibility grows, the internal experience can become increasingly heavy and demanding.",
          },
          {
            title: "Outward Success, Internal Load",
            desc: "You may be effective, respected, and capable, while privately carrying mental load, emotional fatigue, or strain.",
          },
          {
            title: "This Is Where Change Begins",
            desc: "Two Lives Theory becomes relevant when leadership requires a deeper internal shift, not just external performance.",
          },
        ]}
        closing="My mentoring supports leaders through transition, strengthening self-leadership so decisions and direction are held with clarity rather than tension."
      />

      <ThemesGrid
        heading="Common themes I support leaders with:"
        paragraph="This work is not about performance optimisation. It's about creating the internal conditions for calm, grounded leadership."
        items={[
          { Icon: ArrowUpDownIcon, label: "Constant responsibility", desc: "Mental load that never fully switches off." },
          { Icon: HourglassIcon, label: "Decision fatigue", desc: "Decision fatigue under sustained pressure." },
          { Icon: ActivityIcon, label: "Emotional containment", desc: "Emotional containment affecting wellbeing or relationships." },
          { Icon: SlashCircleIcon, label: "Identity pressure", desc: "Identity tied to role, status, or outcomes." },
          { Icon: SpeedometerIcon, label: "Misalignment", desc: "A growing sense of misalignment despite professional success." },
          { Icon: SlidersIcon, label: "Isolation", desc: "Feeling isolated in decision-making, with limited space to think openly or be supported." },
        ]}
      />

      <StrengthenGrid
        heading="How this work strengthens you"
        paragraph="Leadership roles often require emotional restraint, strategic thinking, and consistency. Over time, this can lead to internal suppression, reduced self-connection, or reactive decision making under pressure."
        intro="The work supports leaders in:"
        items={[
          { image: "/images/clarity.png", Icon: TargetIcon, label: "Clarity Under Pressure", desc: "Leading and making decisions with emotional stability rather than urgency or shutdown." },
          { image: "/images/narrative.png", Icon: TrendingUpIcon, label: "Narrative Awareness", desc: "Recognising and releasing unhelpful leadership patterns and internal narratives." },
          { image: "/images/authority.png", Icon: ShieldCheckIcon, label: "Inner Authority", desc: "Trusting your own direction without over-reliance on external validation." },
          { image: "/images/intergrated.png", Icon: TreeIcon, label: "Integrated Leadership", desc: "Leading beyond the role, with alignment across work, identity, and life." },
        ]}
      />

      <PillQuote text="This work strengthens how you operate, without dismantling what you've built." />

      <WordMarquee />

      <EnablesCarousel
        heading="What this enables over time"
        intro="This is how leadership begins to shift:"
        lines={[
          "This is not about doing more.",
          "It is about leading differently.",
          "From pressure to presence.",
          "From control to clarity.",
        ]}
        cards={[
          "Clearer, calmer decision making under pressure.",
          "Reduced internal pressure under responsibility.",
          "Leadership presence that feels steady rather than effortful.",
          "Improved balance between role and personal life.",
          "A renewed sense of direction and internal alignment.",
        ]}
      />

      <Marquee />

      <PersonaReview
        name="Tom Russell"
        role="Head of Strategy & Development - Close Protection"
        ig="@tomerussell204"
        igHref="https://www.instagram.com/tomerussell204/"
        avatar="/images/tom-russell.png"
        quotes={[
          "“I struggled with self-doubt, overthinking and feeling the need to constantly prove myself.",
          "But working with Basim was a game-changer for my mindset and personal growth. I now trust my instincts, set boundaries and focus on what truly matters.”",
        ]}
      />

      <FinalCta />
    </>
  );
}
