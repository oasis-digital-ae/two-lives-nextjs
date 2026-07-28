import type { Metadata } from "next";
import ArticleHero from "@/components/article/ArticleHero";
import ArticleLayout from "@/components/article/ArticleLayout";
import { ArticleH2, ArticleP } from "@/components/article/ArticleContent";
import WordMarquee from "@/components/shared/WordMarquee";
import FinalCta from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "Case Study: Elite Athlete – World Champion Journey | Two Lives Theory",
  description:
    "Elite athlete achieves World Championship through mindset integration, emotional resilience, focus, and life balance under extreme pressure and visibility.",
};

export default function EliteAthleteCaseStudyPage() {
  return (
    <>
      <ArticleHero
        image="/images/athlete-cs-hero.png"
        eyebrow="Elite Athlete"
        title="– World Champion Journey"
        date="15 December 2024"
      />
      <ArticleLayout
        highlight="At the highest level, holding it is the challenge."
        sidebarTitle="Recent Case Studies"
        related={[
          {
            href: "/case-study/business-ceo",
            image: "/images/CEO-case-study.png",
            title: "Business Owner & CEO – Grounded Leadership",
          },
          {
            href: "/case-study/entrepreneur",
            image: "/images/grant-case-study.png",
            title: "Entrepreneur – Grant Gardner",
          },
        ]}
      >
        <ArticleH2>Context</ArticleH2>
        <ArticleP>
          This client entered the mentoring relationship as an elite sports person already operating at the top of
          their field. The challenge was not skill, talent, or ambition. It was the internal demands that came with
          sustained high performance and the weight of pursuing the highest recognition in the game.
        </ArticleP>
        <ArticleP>
          As the year progressed, the pressure of expectation, visibility, and responsibility increased
          significantly.
        </ArticleP>

        <ArticleH2>The Inner Tension</ArticleH2>
        <ArticleP>
          While externally focused on results, rankings, and consistency, there was a growing need for internal
          balance, emotional regulation, and clarity. The pursuit of World Champion required not just performance,
          but mental steadiness, focus, and the ability to navigate variance without losing alignment.
        </ArticleP>
        <ArticleP>
          This phase represented a transition, not from failure to success, but from high performance to
          sustainable excellence.
        </ArticleP>

        <ArticleH2>The Mentoring Relationship</ArticleH2>
        <ArticleP>
          Throughout 2025, the mentoring focused on strengthening mindset, emotional resilience in their
          professional and personal life, and self leadership alongside performance demands. The work supported
          focus, clarity, and presence, while also ensuring space for rest, reflection, and life balance.
        </ArticleP>
        <ArticleP>
          Rather than isolating their sport from life, the approach integrated both. Decisions, routines, emotional
          responses, and identity were explored in a way that supported consistency without burnout.
        </ArticleP>
        <ArticleP>This was not about chasing results. It was about becoming the person capable of holding them.</ArticleP>

        <ArticleH2>The Shift</ArticleH2>
        <ArticleP>
          As the year unfolded, the client demonstrated increased calm under pressure, clearer decision making, and
          a more balanced relationship with competition and life. Focus improved without rigidity. Motivation
          remained high without becoming consuming.
        </ArticleP>
        <ArticleP>
          Crucially, the internal experience of the journey changed. The pursuit became grounded rather than
          anxious.
        </ArticleP>

        <ArticleH2>Life Now</ArticleH2>
        <ArticleP>
          The year culminated in the client being recognised as World Champion, a milestone achieved not through
          force, but through alignment.
        </ArticleP>
        <ArticleP>
          Beyond the title, the most meaningful shift was internal. They now lead themself with clarity, balance,
          and confidence, able to sustain performance while maintaining perspective, wellbeing, and fulfilment
          beyond the game.
        </ArticleP>
        <ArticleP>This case reflects the essence of Two Lives Theory. Not reinvention, but integration at the highest level.</ArticleP>
      </ArticleLayout>
      <WordMarquee />
      <FinalCta />
    </>
  );
}
