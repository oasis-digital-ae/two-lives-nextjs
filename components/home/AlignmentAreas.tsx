"use client";

import Image from "next/image";
import Link from "next/link";
import { useCarousel } from "@/components/ui/Carousel";

const areas = [
  {
    icon: "/images/tl-icon-01.svg",
    image: "/images/mental-clarity.png",
    title: "Mental and Emotional Clarity",
    desc: "Build emotional control and inner steadiness so decisions come from clarity, not reaction.",
  },
  {
    icon: "/images/tl-icon-02.svg",
    image: "/images/physical.png",
    title: "Physical Foundation",
    desc: "Build physical strength, energy, and structure as the foundation for sustainable performance.",
  },
  {
    icon: "/images/tl-icon-03.svg",
    image: "/images/relationships.png",
    title: "Relational Alignment",
    desc: "Strengthen how you relate to others and yourself through self-awareness, clear communication, and emotional presence.",
  },
  {
    icon: "/images/tl-icon-04.svg",
    image: "/images/leadership.png",
    title: "Direction & Leadership",
    desc: "Clarify direction and lead yourself so your life reflects who you're becoming.",
  },
];

export default function AlignmentAreas() {
  const { emblaRef } = useCarousel();

  return (
    <section className="bg-off-white py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="mb-10 max-w-2xl">
          <h2 className="mb-3 font-heading text-3xl font-semibold text-carbon md:text-4xl">
            The Four Areas of Alignment
          </h2>
          <p className="text-lg text-slate">
            No area works in isolation. Strength in one strengthens them all.
          </p>
        </div>

        {/* Desktop grid */}
        <div className="hidden grid-cols-4 gap-4 lg:grid">
          {areas.map((a) => (
            <AreaCard key={a.title} area={a} />
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="lg:hidden">
          <p className="mb-3 text-center text-sm italic text-slate">
            Swipe to explore
          </p>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {areas.map((a) => (
                <div key={a.title} className="min-w-0 flex-[0_0_85%] sm:flex-[0_0_60%]">
                  <AreaCard area={a} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/request-mentorship"
            className="inline-block rounded-full bg-carbon px-6 py-3 font-heading text-sm font-semibold text-white"
          >
            Request Mentorship
          </Link>
        </div>
      </div>
    </section>
  );
}

function AreaCard({ area }: { area: (typeof areas)[number] }) {
  return (
    <div className="group relative overflow-hidden rounded-lg">
      <div className="relative aspect-[3/4]">
        <Image
          src={area.image}
          alt={area.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-carbon/95 via-carbon/30 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5">
        <div className="mb-2 flex items-center gap-2">
          <Image src={area.icon} alt="" width={32} height={32} />
          <span className="font-heading font-semibold text-white">{area.title}</span>
        </div>
        <p className="text-sm text-white/80">{area.desc}</p>
      </div>
    </div>
  );
}
