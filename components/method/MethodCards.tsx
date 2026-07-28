"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowNav, useCarousel } from "@/components/ui/Carousel";

const cards = [
  {
    image: "/images/method-1.png",
    title: "Individualised Inner Work",
    desc: "Not everyone needs the same process or reflection. Every mentoring relationship is shaped around your life, your pressure points, and your stage of transition. This is not a fixed system. It evolves with you.",
  },
  {
    image: "/images/method-2.png",
    title: "Integrated Guidance",
    desc: "This work integrates mindset, emotional processing, physical grounding, and identity-level clarity. Not as separate tools, but as one coherent inner system.",
  },
  {
    image: "/images/method-3.png",
    title: "Sustainable Transition",
    desc: "The goal is not a breakthrough followed by burnout. The goal is stability, clarity, and forward movement that lasts. High performers don't care about tools, they care about what holds under pressure.",
  },
];

export default function MethodCards() {
  const { emblaRef, scrollPrev, scrollNext } = useCarousel({ align: "start" });

  return (
    <section className="bg-pattern-section overflow-hidden bg-off-white py-16 md:py-20">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="text-center lg:col-span-4 lg:text-left">
            <h3 className="text-shadow-soft mb-4 font-heading text-2xl font-semibold text-carbon">
              Our Approach
            </h3>
            <h2 className="text-shadow-soft mb-6 font-heading text-[28px] leading-tight font-medium tracking-[-2px] text-carbon sm:text-[40px]">
              What got you here,{" "}
              <span className="border-b-2 border-carbon font-bold">won&apos;t take you further.</span>
            </h2>
            <div className="hidden lg:block">
              <Link href="/request-mentorship" className="btn-three">
                Request Mentorship
              </Link>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-6 py-2">
                {cards.map((c) => (
                  <div
                    key={c.title}
                    className="box-shad relative min-w-0 flex-[0_0_85%] overflow-hidden rounded-[6px] sm:flex-[0_0_45%]"
                  >
                    <div className="relative aspect-[4/3]">
                      <Image src={c.image} alt={c.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 flex flex-col p-5">
                      <div className="alignment-title flex items-center justify-between gap-2 rounded-[10px] px-4 py-3.5 text-lg font-bold text-white">
                        <span>{c.title}</span>
                        <span>&rarr;</span>
                      </div>
                      <div className="alignment-desc mt-2.5 rounded-[10px] p-3.5 text-sm text-white">
                        {c.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-center gap-4 lg:justify-start">
              <ArrowNav onPrev={scrollPrev} onNext={scrollNext} />
            </div>
            <div className="mt-4 flex justify-center lg:hidden">
              <Link href="/request-mentorship" className="btn-three">
                Request Mentorship
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
