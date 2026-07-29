"use client";

import Image from "next/image";
import { ArrowNav, useCarousel } from "@/components/ui/Carousel";

export default function EnablesCarousel({
  heading,
  intro,
  lines,
  cards,
}: {
  heading: string;
  intro: string;
  lines: string[];
  cards: string[];
}) {
  const { emblaRef, scrollPrev, scrollNext } = useCarousel();

  return (
    <section className="bg-pattern-section bg-off-white py-16 md:py-20">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="mb-10 grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <div className="text-center lg:col-span-6 lg:text-left">
            <h2 className="text-shadow-soft mb-2 font-heading text-[32px] font-semibold tracking-[-2px] text-carbon sm:text-[40px]">
              {heading}
            </h2>
            <p className="hidden text-slate lg:block">{intro}</p>
          </div>
          <div className="text-center font-heading text-lg font-semibold text-carbon lg:col-span-5 lg:col-start-8 lg:text-left">
            {lines.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </div>
          <p className="text-center text-slate lg:hidden">{intro}</p>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {cards.map((card, i) => (
              <div
                key={i}
                className="relative min-w-0 flex-[0_0_85%] overflow-hidden rounded-[6px] bg-white p-[30px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] sm:flex-[0_0_45%] sm:p-[50px] lg:flex-[0_0_31%]"
              >
                <div className="animate-zoom-icon pointer-events-none absolute right-0 bottom-0 z-0 h-[110px] w-[110px] translate-x-[30%] translate-y-[30%] opacity-50">
                  <Image src="/img/bg-icon.svg" alt="" fill />
                </div>
                <span className="relative z-[1] block font-heading text-[24px] font-semibold tracking-[-1px] text-carbon">
                  {card}
                </span>
              </div>
            ))}
          </div>
        </div>

        <ArrowNav onPrev={scrollPrev} onNext={scrollNext} className="mt-8 justify-center" />
      </div>
    </section>
  );
}
