import type { Metadata } from "next";
import ArticleHero from "@/components/article/ArticleHero";
import ArticleLayout from "@/components/article/ArticleLayout";
import { ArticleH2, ArticleP } from "@/components/article/ArticleContent";
import WordMarquee from "@/components/shared/WordMarquee";
import FinalCta from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "Case Study: Business Owner & CEO – Grounded Leadership | Two Lives Theory",
  description:
    "Successful CEO shifts from constant urgency and pressure to grounded decision-making, inner steadiness, clarity, and balanced leadership.",
};

export default function BusinessCeoCaseStudyPage() {
  return (
    <>
      <ArticleHero
        image="/images/exec-cs-hero.png"
        eyebrow="Business"
        title="Owner & CEO – Grounded Leadership"
        date="29 January 2026"
      />
      <ArticleLayout
        highlight="How he was leading no longer matched who he was becoming."
        sidebarTitle="Recent Case Studies"
        related={[
          {
            href: "/case-study/entrepreneur",
            image: "/images/grant-case-study.png",
            title: "Entrepreneur – Grant Gardner",
          },
          {
            href: "/case-study/elite-athlete",
            image: "/images/two-lives/athlete-case-study.png",
            title: "Elite Athlete – World Champion Journey",
          },
        ]}
      >
        <ArticleH2>Context</ArticleH2>
        <ArticleP>
          This client entered the work as a successful business owner leading a growing organisation. Externally,
          they were respected, decisive, and highly capable. Internally, they were carrying long-term pressure,
          responsibility, and a constant sense of needing to stay ahead.
        </ArticleP>
        <ArticleP>
          While the business was progressing, there was little space to slow down or reflect. Life felt structured
          around performance and problem-solving, with limited room for internal clarity or balance.
        </ArticleP>

        <ArticleH2>The Inner Tension</ArticleH2>
        <ArticleP>
          The challenge was not burnout, but a quieter realisation that the way they were leading themselves no
          longer matched the phase of life and leadership they were entering. Decisions were being made
          efficiently, but often from urgency rather than clarity.
        </ArticleP>
        <ArticleP>
          There was a growing disconnect between external success and internal experience. Pushing harder was no
          longer creating relief, only more pressure.
        </ArticleP>

        <ArticleH2>The Mentoring Relationship</ArticleH2>
        <ArticleP>
          The mentoring focused on helping them step out of constant urgency and into grounded self-leadership.
          Rather than working on business strategy, the work centred on clarity, emotional regulation, identity,
          and how decisions were being made under pressure.
        </ArticleP>
        <ArticleP>
          The process was consistent and adaptive, working around the demands of leadership rather than competing
          with them. Attention was given to boundaries, inner dialogue, and restoring space for perspective without
          sacrificing ambition.
        </ArticleP>

        <ArticleH2>The Shift</ArticleH2>
        <ArticleP>
          Over time, they experienced a noticeable shift in how they related to responsibility and pressure.
          Decision-making became calmer and more intentional. Emotional reactivity reduced, and leadership felt
          steadier rather than effortful.
        </ArticleP>
        <ArticleP>
          They began leading from clarity rather than momentum, with greater trust in themselves and their
          judgment.
        </ArticleP>

        <ArticleH2>Life Now</ArticleH2>
        <ArticleP>
          Today, they lead their business with presence and confidence, able to hold responsibility without
          internal strain. Success is no longer driven by pressure alone, but by alignment, perspective, and
          self-trust. Their personal life now has more meaning.
        </ArticleP>
        <ArticleP>
          This journey was not about changing who they are. It was about strengthening how they relate to
          themselves, their role, and their life.
        </ArticleP>
      </ArticleLayout>
      <WordMarquee />
      <FinalCta />
    </>
  );
}
