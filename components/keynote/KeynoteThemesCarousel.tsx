"use client";

import Image from "next/image";
import { ArrowNav, useCarousel } from "@/components/ui/Carousel";

const themes = [
  { image: "/images/keynote-1.png", title: "Navigating pressure without losing yourself" },
  { image: "/images/keynote-2.png", title: "Emotional resilience in high performance environments" },
  { image: "/images/keynote-3.png", title: "The Two Lives Theory and conscious transition" },
  { image: "/images/keynote-4.png", title: "Mental clarity, self leadership, and sustainable success" },
  { image: "/images/keynote-5.png", title: "Wellbeing as a foundation for performance" },
];

export default function KeynoteThemesCarousel() {
  const { emblaRef, scrollPrev, scrollNext } = useCarousel({ align: "start" });

  return (
    <section className="bg-pattern-section overflow-hidden bg-off-white py-16 md:py-20">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-shadow-soft mb-3 font-heading text-[32px] font-semibold tracking-[-1px] text-carbon sm:text-[40px]">
            Keynote Themes
          </h2>
          <p className="text-carbon">Each talk is tailored to the audience, culture, and context.</p>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6 py-2">
            {themes.map((t) => (
              <div
                key={t.title}
                className="relative min-w-0 flex-[0_0_85%] overflow-hidden rounded-[10px] sm:flex-[0_0_45%] lg:flex-[0_0_31%]"
              >
                <div className="relative aspect-[3/4]">
                  <Image src={t.image} alt="" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6">
                  <span className="mb-4 rounded-full bg-white px-4 py-1.5 text-xs font-bold tracking-wide text-carbon uppercase">
                    Keynote Theme
                  </span>
                  <span className="font-heading text-2xl font-bold text-white">{t.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <ArrowNav onPrev={scrollPrev} onNext={scrollNext} />
        </div>
      </div>
    </section>
  );
}
