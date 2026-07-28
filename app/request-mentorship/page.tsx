import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import CalendlySection from "@/components/mentorship/CalendlySection";
import FinalCta from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "Request Mentorship | Two Lives Theory",
  description:
    "Request private mentorship with Basim Yafai. Book a confidential call to gain clarity, sharpen decision-making, and step into your next level of performance and leadership.",
};

export default function RequestMentorshipPage() {
  return (
    <>
      <PageHero
        image="/images/hero-bg-11.png"
        eyebrow="Mentorship"
        title="Request"
        titleFirst
        description="This is not a sales call or a commitment. It's a short conversation to understand where you are professionally and personally, and whether mentoring support at this stage makes sense."
      />
      <CalendlySection />
      <FinalCta
        heading="Ready to step into your next life?"
        subheading={null}
        showMentorshipButton={false}
      />
    </>
  );
}
