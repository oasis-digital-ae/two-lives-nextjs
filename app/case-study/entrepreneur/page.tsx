import { buildMetadata } from "@/lib/seo";
import ArticleHero from "@/components/article/ArticleHero";
import ArticleLayout from "@/components/article/ArticleLayout";
import { ArticleH2, ArticleP } from "@/components/article/ArticleContent";
import WordMarquee from "@/components/shared/WordMarquee";
import FinalCta from "@/components/home/FinalCta";

export const metadata = buildMetadata({
  title: "Case Study: Entrepreneur – Grant Gardner | Two Lives Theory",
  description:
    "Discover how Grant Gardner overcame internal anxiety, emotional volatility, and feeling stuck through deep mentoring, achieving lasting clarity, emotional stability, and grounded performance.",
  path: "/case-study/entrepreneur",
  image: "/images/grant-cs-hero.png",
  type: "article",
});

export default function EntrepreneurCaseStudyPage() {
  return (
    <>
      <ArticleHero
        image="/images/grant-cs-hero.png"
        eyebrow="Entrepreneur"
        title="– Grant Gardner"
        date="8 June 2025"
      />
      <ArticleLayout
        highlight="Externally performing. Internally under pressure."
        sidebarTitle="Recent Case Studies"
        related={[
          {
            href: "/case-study/business-ceo",
            image: "/images/CEO-case-study.png",
            title: "Business Owner & CEO – Grounded Leadership",
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
          Grant came into the work during a period of significant internal strain. Externally, he was functioning
          and continuing to perform, but internally he was experiencing high levels of anxiety, emotional
          volatility, and a deep sense of being stuck. Anger, low mood, and persistent mental pressure had been
          present for over a year, quietly impacting his quality of life and decision making.
        </ArticleP>
        <ArticleP>
          Despite being highly self aware, Grant felt unable to shift the internal patterns that were keeping him
          locked in this state.
        </ArticleP>

        <ArticleH2>The Inner Tension</ArticleH2>
        <ArticleP>
          What made this phase particularly challenging was the contrast between external capability and internal
          instability. Grant did not feel broken, but he felt trapped in his own mind. The effort required to
          simply maintain balance was becoming exhausting, and it was clear that pushing harder was no longer the
          answer.
        </ArticleP>
        <ArticleP>
          This marked the point where support was no longer about performance, but about inner stability and
          perspective.
        </ArticleP>

        <ArticleH2>The Mentoring Relationship</ArticleH2>
        <ArticleP>
          The work focused on creating clarity and safety in Grant&rsquo;s inner world. Rather than forcing change,
          we worked through awareness, reframing, and integration, allowing old mental and emotional patterns to
          loosen without pressure.
        </ArticleP>
        <ArticleP>
          The mentoring was consistent and adaptive, responding to what was present rather than following a rigid
          structure. The emphasis was on understanding the root of his internal experience and building self
          regulation and emotional control from within.
        </ArticleP>

        <ArticleH2>The Shift</ArticleH2>
        <ArticleP>
          Grant experienced a rapid increase in clarity early in the process, followed by deeper emotional
          stability over time. Anxiety reduced, emotional reactions softened, and his relationship with his
          thoughts changed significantly.
        </ArticleP>
        <ArticleP>
          Rather than being controlled by internal states, he developed the ability to observe, regulate, and
          respond with intention.
        </ArticleP>

        <ArticleH2>Life Now</ArticleH2>
        <ArticleP>
          Today, Grant describes feeling grounded, positive, and in control of his emotional world. The pressure
          that once dominated his inner experience no longer defines him. He continues to perform professionally,
          but now from a place of clarity and balance rather than internal struggle.
        </ArticleP>
        <ArticleP>
          This work did not change who Grant is.
          <br />
          It strengthened his relationship with himself.
        </ArticleP>
      </ArticleLayout>
      <WordMarquee />
      <FinalCta />
    </>
  );
}
