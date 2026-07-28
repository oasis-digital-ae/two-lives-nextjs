import Hero from "@/components/home/Hero";
import TransitionRail from "@/components/home/TransitionRail";
import OverwhelmSolution from "@/components/home/OverwhelmSolution";
import QuoteBanner from "@/components/home/QuoteBanner";
import MeetBasim from "@/components/home/MeetBasim";
import ThreeStepTransition from "@/components/home/ThreeStepTransition";
import AlignmentAreas from "@/components/home/AlignmentAreas";
import WhoIMentor from "@/components/home/WhoIMentor";
import CoachingVideo from "@/components/home/CoachingVideo";
import QuizTeaser from "@/components/home/QuizTeaser";
import Reviews from "@/components/home/Reviews";
import StatsCounters from "@/components/home/StatsCounters";
import PathSteps from "@/components/home/PathSteps";
import Marquee from "@/components/home/Marquee";
import MethodResearch from "@/components/home/MethodResearch";
import Faq from "@/components/home/Faq";
import CaseStudies from "@/components/home/CaseStudies";
import FinalCta from "@/components/home/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <TransitionRail />
      <OverwhelmSolution />
      <QuoteBanner
        eyebrow="About Two Lives"
        title="Guided by Basim Yafai"
        quote="Real change happens when mind, body and emotions are strengthened together, not treated as separate parts."
        image="/images/keynote-hero.png"
      />
      <MeetBasim />
      <ThreeStepTransition />
      <AlignmentAreas />
      <QuoteBanner
        eyebrow="Who I Mentor"
        title="Who I Mentor"
        quote="Different arenas. The same Inner Work."
        image="/images/two-lives/mentor-hero.png"
      />
      <WhoIMentor />
      <CoachingVideo />
      <QuizTeaser />
      <Reviews />
      <StatsCounters />
      <PathSteps />
      <Marquee />
      <MethodResearch />
      <Faq />
      <CaseStudies />
      <FinalCta />
    </>
  );
}
