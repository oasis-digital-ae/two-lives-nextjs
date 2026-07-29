"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCarousel } from "@/components/ui/Carousel";

const areas = [
  {
    icon: "/images/tl-icon-01.svg",
    image: "/images/mental-clarity.png",
    titleLines: ["Mental and", "Emotional Clarity"],
    desc: "Build emotional control and inner steadiness so decisions come from clarity, not reaction.",
  },
  {
    icon: "/images/tl-icon-02.svg",
    image: "/images/physical.png",
    titleLines: ["Physical", "Foundation"],
    desc: "Build physical strength, energy, and structure as the foundation for sustainable performance.",
  },
  {
    icon: "/images/tl-icon-03.svg",
    image: "/images/relationships.png",
    titleLines: ["Relational", "Alignment"],
    desc: "Strengthen how you relate to others and yourself through self-awareness, clear communication, and emotional presence.",
  },
  {
    icon: "/images/tl-icon-04.svg",
    image: "/images/leadership.png",
    titleLines: ["Direction &", "Leadership"],
    desc: "Clarify direction and lead yourself so your life reflects who you're becoming.",
  },
];

export default function AlignmentAreas() {
  const { emblaRef } = useCarousel();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative bg-off-white py-16 md:py-24">
      <div className="pointer-events-none absolute top-[80px] right-[25px] z-[3] hidden h-[80px] w-[80px] rounded-full bg-carbon/50 p-[5px] sm:top-[80px] sm:right-10 sm:block sm:h-[130px] sm:w-[130px] lg:top-[120px] lg:right-[100px] lg:h-[180px] lg:w-[180px]">
        <div className="floating-circle-img h-full w-full">
          <Image src="/images/tl-circle.svg" alt="" width={180} height={180} className="h-full w-full" />
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-shadow-soft mb-2 font-heading text-[40px] font-semibold tracking-[-2px] text-carbon">
            The Four Areas of Alignment
          </h2>
          <p className="text-[18px] font-medium tracking-[-1px] text-carbon sm:text-[30px]">
            No area works in isolation. Strength in one strengthens them all.
          </p>
        </div>

        {/* Desktop grid */}
        <div className="hidden grid-cols-4 gap-4 lg:grid">
          {areas.map((a) => (
            <AreaCard key={a.titleLines.join(" ")} area={a} />
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="lg:hidden">
          <p className="mb-3 text-center text-sm italic text-slate">
            Tap the image to learn more
          </p>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {areas.map((a, i) => (
                <div key={a.titleLines.join(" ")} className="min-w-0 flex-[0_0_85%] sm:flex-[0_0_60%]">
                  <AreaCard
                    area={a}
                    revealed={openIndex === i}
                    onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link href="/request-mentorship" className="btn-three">
            Request Mentorship
          </Link>
        </div>
      </div>
    </section>
  );
}

function AreaCard({
  area,
  revealed,
  onToggle,
}: {
  area: (typeof areas)[number];
  revealed?: boolean;
  onToggle?: () => void;
}) {
  return (
    <div
      className="box-shad relative overflow-hidden rounded-[6px]"
      onClick={onToggle}
      role={onToggle ? "button" : undefined}
    >
      <div className="relative aspect-[3/4]">
        <Image
          src={area.image}
          alt={area.titleLines.join(" ")}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(32,35,41,0.8)] to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 flex flex-col p-2.5 lg:p-[25px]">
        <div
          className="alignment-title flex items-center gap-2 rounded-[10px] px-4 py-3.5 text-[20px] leading-6 font-bold text-white"
          style={revealed ? { transform: "translateY(0)" } : undefined}
        >
          <Image src={area.icon} alt="" width={60} height={60} className="h-[60px] w-[60px] shrink-0" />
          <span>
            {area.titleLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </span>
        </div>
        <div
          className="alignment-desc mt-2.5 rounded-[10px] p-3.5 text-white"
          style={
            revealed ? { opacity: 1, transform: "translateY(0)", maxHeight: 300 } : undefined
          }
        >
          {area.desc}
        </div>
      </div>
    </div>
  );
}
