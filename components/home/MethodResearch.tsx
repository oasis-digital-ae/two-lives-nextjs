"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowNav, useCarousel } from "@/components/ui/Carousel";

const researchSlides = [
  {
    title: "Enhanced Goal Progress",
    body: "Meta-analytic research shows that mentoring is associated with meaningful improvements in goal-directed progress, self-regulation, and clarity.",
    source: "Theeboom, Beersma & van Vianen (2014), International Journal of Evidence-Based Coaching and Mentoring",
    href: "https://www.researchgate.net/publication/277481265_Does_coaching_work_A_meta-analysis_on_the_effects_of_coaching_on_individual_level_outcomes_in_an_organizational_context",
  },
  {
    title: "Improved Wellbeing & Coping",
    body: "Research consistently links mentoring with improvements in wellbeing, emotional regulation, and coping under pressure.",
    source: "Grant (2014), Coaching Psychology Review",
    href: "https://www.researchgate.net/profile/Anthony-Grant-4/publication/263286487_The_Efficacy_of_Executive_Coaching_in_Times_of_Organisational_Change/links/54e5bfb40cf277664ff1a787/The-Efficacy-of-Executive-Coaching-in-Times-of-Organisational-Change.pdf",
  },
  {
    title: "Positive Performance Outcomes",
    body: "Meta-analytic studies indicate mentoring is associated with positive effects on performance and work-related outcomes.",
    source: "Jones, Woods & Guillaume (2016), European Journal of Work and Organizational Psychology",
    href: "https://publications.aston.ac.uk/id/eprint/25642/",
  },
];

export default function MethodResearch() {
  const { emblaRef, scrollPrev, scrollNext } = useCarousel();

  return (
    <section className="bg-pattern-section overflow-hidden bg-off-white py-16 md:py-20">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="flex flex-col justify-center rounded-[10px] bg-off-white p-8 shadow-[0_0_25px_rgba(0,0,0,0.08)] lg:col-span-4">
            <span className="mb-3 w-fit border-b-2 border-carbon font-heading text-[20px] font-bold text-carbon italic">
              Two Lives Theory Method
            </span>
            <h2 className="text-shadow-soft mb-6 font-heading text-[40px] font-semibold tracking-[-2px] text-carbon">
              Grounded in Evidence. Built for Real Change
            </h2>
            <Link href="/request-mentorship" className="btn-three hidden w-fit lg:inline-flex">
              Request Mentorship
            </Link>
          </div>

          <div className="relative rounded-[10px] bg-off-white p-8 shadow-[0_0_25px_rgba(0,0,0,0.08)] lg:col-span-8 lg:p-12">
            <span className="mb-8 flex items-center gap-3 font-heading text-[18px] font-semibold tracking-[-0.5px] text-carbon sm:text-[20px]">
              <span className="flex h-[35px] w-[35px] shrink-0 items-center justify-center rounded-full bg-radial text-[18px] text-white sm:h-[45px] sm:w-[45px] sm:text-[24px] lg:h-[60px] lg:w-[60px] lg:text-[30px]">
                &darr;
              </span>
              Methods Supported by Research
            </span>

            <Image
              src="/images/tl-circle.svg"
              alt=""
              width={125}
              height={125}
              className="absolute top-8 right-8 h-[80px] w-[80px] animate-[rotateCircle_18s_linear_infinite] lg:h-[125px] lg:w-[125px] lg:rotate-[5.5deg] lg:animate-none"
            />

            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {researchSlides.map((slide) => (
                  <div key={slide.title} className="min-w-0 flex-[0_0_100%]">
                    <h3 className="mb-5 font-heading text-[40px] font-bold tracking-[-2px] text-carbon">
                      {slide.title}
                    </h3>
                    <p className="mb-3 w-[90%] font-normal text-carbon">{slide.body}</p>
                    <p className="w-[80%] text-sm text-carbon italic">
                      <b>Source:</b>{" "}
                      <a href={slide.href} target="_blank" rel="noreferrer" className="underline">
                        {slide.source}
                      </a>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <ArrowNav onPrev={scrollPrev} onNext={scrollNext} className="mt-6" />
          </div>
        </div>
      </div>
    </section>
  );
}
