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
    <section className="bg-off-white py-16 md:py-20">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="flex flex-col justify-center rounded-2xl bg-white p-8 shadow-md lg:col-span-4">
            <span className="mb-3 font-heading font-semibold italic text-carbon underline decoration-emerald underline-offset-4">
              Two Lives Theory Method
            </span>
            <h2 className="mb-6 font-heading text-3xl font-semibold text-carbon">
              Grounded in Evidence. Built for Real Change
            </h2>
            <Link
              href="/request-mentorship"
              className="inline-block w-fit rounded-full bg-carbon px-6 py-3 font-heading text-sm font-semibold text-white"
            >
              Request Mentorship
            </Link>
          </div>

          <div className="relative rounded-2xl bg-white p-8 shadow-md lg:col-span-8 lg:p-12">
            <span className="mb-8 flex items-center gap-3 font-heading text-lg font-semibold text-slate">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald text-carbon">
                &darr;
              </span>
              Methods Supported by Research
            </span>

            <Image
              src="/images/tl-circle.svg"
              alt=""
              width={100}
              height={100}
              className="absolute right-8 top-8 hidden opacity-70 lg:block"
            />

            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {researchSlides.map((slide) => (
                  <div key={slide.title} className="min-w-0 flex-[0_0_100%]">
                    <h3 className="mb-3 font-heading text-2xl font-bold text-carbon">
                      {slide.title}
                    </h3>
                    <p className="mb-3 max-w-xl text-slate">{slide.body}</p>
                    <p className="text-sm italic text-slate">
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
