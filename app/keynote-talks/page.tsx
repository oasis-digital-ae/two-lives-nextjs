import { buildMetadata } from "@/lib/seo";
import PersonaHero from "@/components/persona/PersonaHero";
import KeynoteIntro from "@/components/keynote/KeynoteIntro";
import CredibilitySplit from "@/components/keynote/CredibilitySplit";
import LogoMarquee from "@/components/keynote/LogoMarquee";
import OrganisationGains from "@/components/keynote/OrganisationGains";
import WordMarquee from "@/components/shared/WordMarquee";
import KeynoteThemesCarousel from "@/components/keynote/KeynoteThemesCarousel";
import KeynoteCta from "@/components/keynote/KeynoteCta";

export const metadata = buildMetadata({
  title: "Keynote Speaker Basim Yafai | Mindset & Performance Talks | Two Lives Theory",
  description:
    "Book Basim Yafai for keynote talks on mindset, performance, and leadership. Inspiring high-performing teams to break limiting patterns, gain clarity, and operate at their next level.",
  path: "/keynote-talks",
});

export default function KeynoteTalksPage() {
  return (
    <>
      <PersonaHero
        image="/images/keynote-hero-1.png"
        eyebrow="Keynotes for High Performers"
        title="Helping individuals and organisations lead with clarity in moments that matter."
      />

      <section className="bg-pattern-section bg-off-white pt-16 pb-4 md:pt-20">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h2 className="text-shadow-soft font-heading text-[28px] font-semibold tracking-[-1px] text-carbon sm:text-[40px]">
            Not motivation. Real shift.
          </h2>
        </div>
      </section>

      <KeynoteIntro />
      <CredibilitySplit />
      <LogoMarquee />
      <OrganisationGains />
      <WordMarquee />
      <KeynoteThemesCarousel />
      <KeynoteCta />
    </>
  );
}
