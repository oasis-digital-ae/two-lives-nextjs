"use client";

import Image from "next/image";
import Link from "next/link";
import { useCarousel } from "@/components/ui/Carousel";

const mindsetItems = [
  {
    image: "/images/compass.png",
    text: "You're performing, but something feels off.",
  },
  {
    image: "/images/weight.png",
    text: "You carry constant pressure to stay sharp, stay strong, and keep moving forward.",
  },
  {
    image: "/images/path.png",
    text: "You can feel the next chapter, but haven't found the path into it yet.",
  },
];

const solutionSlides = [
  "Build a clear path through transition, with decisive next moves.",
  "Regain clarity across mind, body and emotions so performance becomes clean again.",
  "Move forward without burning out, losing yourself, or forcing change.",
];

export default function OverwhelmSolution() {
  const { emblaRef } = useCarousel({ align: "start" });

  return (
    <section className="bg-pattern-section overflow-hidden bg-off-white pt-12 pb-8 text-carbon md:pt-20">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="mb-8 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div className="text-center sm:text-left">
            <h2
              className="mb-5 text-shadow-soft font-heading text-[28px] font-semibold leading-tight tracking-[-2px] text-carbon sm:text-[40px]"
            >
              Operating at a High Level Can Feel{" "}
              <span className="highlighter-below">Overwhelming</span>
            </h2>
            <p className="mx-auto w-4/5 sm:mx-0 md:w-full">
              Especially when the internal framework that got you here no
              longer supports where you&apos;re going.
            </p>
          </div>

          <div className="flex items-center gap-6">
            {/* Atropos badge: dark radial circle with a bouncing down-arrow */}
            <div className="shrink-0">
              <span className="relative flex h-[150px] w-[150px] items-center justify-center rounded-full bg-radial sm:h-[170px] sm:w-[170px] lg:h-[210px] lg:w-[210px]">
                <span className="animate-arrow-bounce text-[60px] leading-none text-white sm:text-[70px] lg:text-[90px]">
                  &darr;
                </span>
              </span>
            </div>

            <div className="hidden md:block">
              <span className="mb-1 block text-[14px] font-semibold uppercase tracking-[1px] text-carbon">
                12 Years Experience
              </span>
              <p className="w-full lg:w-full">
                Two Lives Theory supports high performers in strengthening
                what they&apos;ve built and stepping into what&apos;s next.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          {mindsetItems.map((item) => (
            <div key={item.text} className="mindset-row flex flex-col items-center gap-4 text-center">
              <Image
                src={item.image}
                alt=""
                width={200}
                height={200}
                className="h-[200px] w-[200px] object-cover"
              />
              <p className="w-4/5 text-center text-[20px] font-semibold text-carbon">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-10 pt-3 lg:grid-cols-12 lg:items-center">
          <div className="text-center lg:col-span-5 lg:text-left">
            <span className="mb-[30px] inline-block rounded-full bg-radial px-5 py-1.5 font-heading text-base text-white shadow-sm">
              The Solution
            </span>
            <h3 className="mb-[10px] w-4/5 text-shadow-soft font-heading text-[40px] font-semibold tracking-[-2px] text-carbon mx-auto lg:mx-0">
              How Two Lives Theory Helps
            </h3>
            <p className="mb-5">
              Two Lives Theory is private mentorship for high performers in
              transition. Not to fix you, but to realign you. So your focus
              sharpens, your decisions become clean, and you step into your
              next life without burning out or losing yourself.
            </p>
            <Link href="/request-mentorship" className="btn-three hidden md:inline-block">
              Request Mentorship
            </Link>
          </div>

          <div className="lg:col-span-7">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-6 py-2">
                {solutionSlides.map((text, i) => (
                  <div
                    key={text}
                    className="relative flex h-[300px] min-w-0 flex-[0_0_85%] items-end justify-end overflow-hidden rounded-[20px] bg-[#F9F9F7] p-[30px] shadow-[0_20px_40px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)] sm:flex-[0_0_45%]"
                  >
                    <span className="simple-card-icon" aria-hidden="true" />
                    <span className="absolute left-5 top-[5px] font-heading text-[75px] font-semibold tracking-[2px] text-black/80">
                      {i + 1}
                    </span>
                    <div className="relative z-[1] max-w-[300px] text-right">
                      <p className="m-0 text-lg font-semibold text-carbon">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 text-center md:hidden">
              <Link href="/request-mentorship" className="btn-three inline-block">
                Request Mentorship
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
