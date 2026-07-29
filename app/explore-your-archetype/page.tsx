import { buildMetadata } from "@/lib/seo";
import ArchetypeHero from "@/components/archetype/ArchetypeHero";
import ArchetypeQuiz from "@/components/archetype/ArchetypeQuiz";
import FinalCta from "@/components/home/FinalCta";

export const metadata = buildMetadata({
  title: "Explore Your Archetype - Take the Test | Two Lives Theory",
  description:
    "Take the Two Lives Theory archetype test and uncover how you think, act, and perform under pressure. Gain clarity on your patterns and step into your next level.",
  path: "/explore-your-archetype",
});

export default function ExploreYourArchetypePage() {
  return (
    <>
      <ArchetypeHero />
      <ArchetypeQuiz />
      <FinalCta
        heading="Ready to step into your next life?"
        subheading={null}
        showArchetypeButton={false}
        height={500}
      />
    </>
  );
}
