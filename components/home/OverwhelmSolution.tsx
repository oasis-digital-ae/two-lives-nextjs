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
    <section className="bg-off-white pt-16 pb-8 md:pt-24">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="mb-10 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
          <div className="text-center lg:text-left">
            <h2 className="mb-5 font-heading text-3xl font-semibold text-carbon md:text-4xl">
              Operating at a High Level Can Feel{" "}
              <span className="text-emerald">Overwhelming</span>
            </h2>
            <p className="mx-auto max-w-md text-slate lg:mx-0">
              Especially when the internal framework that got you here no
              longer supports where you&apos;re going.
            </p>
          </div>
          <div className="text-center lg:text-left">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate">
              12 Years Experience
            </span>
            <p className="text-slate">
              Two Lives Theory supports high performers in strengthening
              what they&apos;ve built and stepping into what&apos;s next.
            </p>
          </div>
        </div>

        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {mindsetItems.map((item) => (
            <div key={item.text} className="flex flex-col items-center text-center">
              <Image
                src={item.image}
                alt=""
                width={120}
                height={120}
                className="mb-4 h-24 w-24 object-contain"
              />
              <p className="font-heading font-semibold text-carbon">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div className="text-center lg:text-left">
            <span className="mb-6 inline-block rounded-full bg-carbon px-5 py-1.5 text-sm text-white">
              The Solution
            </span>
            <h3 className="mb-4 font-heading text-3xl font-semibold text-carbon">
              How Two Lives Theory Helps
            </h3>
            <p className="mb-6 text-slate">
              Two Lives Theory is private mentorship for high performers in
              transition. Not to fix you, but to realign you. So your focus
              sharpens, your decisions become clean, and you step into your
              next life without burning out or losing yourself.
            </p>
            <Link
              href="/request-mentorship"
              className="hidden rounded-full bg-carbon px-6 py-3 font-heading text-sm font-semibold text-white md:inline-block"
            >
              Request Mentorship
            </Link>
          </div>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {solutionSlides.map((text, i) => (
                <div
                  key={text}
                  className="min-w-0 flex-[0_0_85%] rounded-lg bg-white p-8 shadow-sm sm:flex-[0_0_45%]"
                >
                  <div className="mb-4 text-4xl font-bold text-emerald opacity-40">
                    {i + 1}
                  </div>
                  <p className="text-carbon">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center md:hidden">
            <Link
              href="/request-mentorship"
              className="inline-block rounded-full bg-carbon px-6 py-3 font-heading text-sm font-semibold text-white"
            >
              Request Mentorship
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
