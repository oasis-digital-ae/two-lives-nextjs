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
  title: "Elite Competitor Mentorship | High Performance & Mental Mastery | Two Lives Theory",
  description:
    "Mentorship for elite competitors operating under pressure. Two Lives Theory helps you build mental clarity, emotional control, and consistent high-level performance when it matters most.",
  path: "/elite-competitors",
});

export default function EliteCompetitorsPage() {
  return (
    <>
      <PersonaHero
        image="/images/two-lives/mentor-h1b.png"
        eyebrow="For Elite Competitors"
        title="Perform under pressure without losing clarity or control."
      />

      <GrowthSplit
        heading="Every decision carries weight. There's no room to switch off."
        image="/images/elite-success.png"
        imageAlt="success"
        sideHeading="Perform under pressure without losing control."
        sideParagraph="Elite competition demands sustained focus and composure. But for many high-stakes competitors, that intensity begins to carry an internal cost."
        steps={[
          {
            title: "Pressure Is Constant",
            desc: "Whether in poker or high-stakes performance, the challenge is rarely skill alone but how you experience pressure.",
          },
          {
            title: "Internal Experience Defines Longevity",
            desc: "Decision-making, identity, and emotional control shape how long you can sustain performance.",
          },
          {
            title: "This Is Where Change Begins",
            desc: "Two Lives Theory becomes relevant when balance becomes harder to maintain under competition.",
          },
        ]}
        closing="My mentoring supports elite competitors in strengthening inner stability so performance, focus, and life remain aligned under pressure."
      />

      <ThemesGrid
        heading="Common themes I support elite competitors with:"
        paragraph="This work is not about mindset hacks or performance tricks. It is about building internal steadiness where it matters most."
        items={[
          { Icon: ArrowUpDownIcon, label: "High-stakes decisions", desc: "Decision-making under constant pressure." },
          { Icon: HourglassIcon, label: "Emotional swings", desc: "Emotional swings linked to outcomes, variance, or form." },
          { Icon: ActivityIcon, label: "Switching off", desc: "Difficulty switching off from competitive mode." },
          { Icon: SlashCircleIcon, label: "Identity pressure", desc: "Identity tied closely to results and performance." },
          { Icon: SpeedometerIcon, label: "Balance", desc: "The challenge of balancing competition with life beyond it." },
          { Icon: SlidersIcon, label: "Variance stress", desc: "Struggling with uncertainty, variance, and outcomes outside of control despite strong performance." },
        ]}
      />

      <StrengthenGrid
        heading="How this work strengthens you"
        paragraph="Elite competitive environments place unique demands on the nervous system, attention, and emotional regulation. Over time, even highly disciplined individuals can experience internal friction, decision fatigue, or loss of perspective."
        intro="The work supports elite competitors in:"
        items={[
          { image: "/images/clarity.png", Icon: TargetIcon, label: "Composure Under Pressure", desc: "Control and clarity in high-stakes moments without losing your edge." },
          { image: "/images/narrative.png", Icon: TrendingUpIcon, label: "Narrative Control", desc: "Detaching from outcome-driven thinking and unhelpful internal stories." },
          { image: "/images/trust.png", Icon: ShieldCheckIcon, label: "Self-Trust", desc: "Confidence that remains stable, independent of results or variance." },
          { image: "/images/balance.png", Icon: TreeIcon, label: "Balance", desc: "Aligning competition with life beyond it, without losing intensity." },
        ]}
      />

      <PillQuote text="This work strengthens how you operate, without dismantling what you've built." />

      <WordMarquee />

      <EnablesCarousel
        heading="What this enables over time"
        intro="This is what changes when pressure no longer controls you:"
        lines={[
          "This is not about reducing intensity.",
          "It is about stabilising it.",
          "You do not compete less.",
          "You compete without internal conflict.",
        ]}
        cards={[
          "Clearer decision making under high pressure.",
          "Reduced emotional volatility around outcomes.",
          "Stronger focus without internal tension.",
          "Greater balance between competition and life.",
          "Sustainable performance across long timeframes.",
        ]}
      />

      <Marquee />

      <PersonaReview
        name="Punnat Punsri"
        role="2025 GPI World #1 Player of the Year / Entrepreneur / Philanthropist"
        ig="@punnatpunsri"
        igHref="https://www.instagram.com/punnatpunsri/"
        avatar="/images/punnat.png"
        quotes={[
          "\"Working with Basim throughout 2025 helped me strengthen my mindset, emotional balance, and clarity during one of the most demanding years of my career.",
          "His mentoring supported me not just in performance, but in how I managed pressure, focus, and life alongside poker. Achieving GPI World Player of the Year and becoming the first Asian player to do so was the result of alignment, consistency, and inner stability built over time.\"",
        ]}
      />

      <FinalCta />
    </>
  );
}
