"use client";

import Image from "next/image";
import { useEffect, useRef, type RefObject } from "react";

type Paragraph = { text: string; bold?: boolean; italic?: boolean; large?: boolean };

const phases: {
  number: string;
  phase: string;
  label: string;
  title: string;
  image: string;
  paragraphs: Paragraph[];
}[] = [
  {
    number: "01",
    phase: "Phase One",
    label: "Awareness",
    title: "Awareness Before Change",
    image: "/images/awareness.png",
    paragraphs: [
      { text: "Before anything changes externally, clarity is built internally.", bold: true },
      {
        text: "This phase is about understanding the patterns, emotional responses, and internal pressures shaping your current life. Not to fix them, but to see them clearly. Awareness creates stability and allows the next phase to be entered consciously, not reactively.",
      },
    ],
  },
  {
    number: "02",
    phase: "Phase Two",
    label: "Integration and Release",
    title: "Integration & Release",
    image: "/images/intergration.png",
    paragraphs: [
      { text: "“Growth does not come from pushing forward. It comes from integration.”", italic: true },
      { text: "This phase requires patience and respect for your pace." },
      {
        text: "Nothing is rushed. The work unfolds around your life, not against it. What needs to be acknowledged, processed, or released is handled with intention, so it no longer controls the present. What serves you is strengthened. What doesn’t is let go.",
      },
    ],
  },
  {
    number: "03",
    phase: "Phase Three",
    label: "Alignment",
    title: "Alignment Into Your Next Life",
    image: "/images/alignment.png",
    paragraphs: [
      {
        text: "When clarity and internal stability are established, direction no longer needs to be forced. It becomes obvious.",
        bold: true,
      },
      {
        text: "This is where your inner world and outer life begin to align. Decisions are made with confidence, not doubt. Energy becomes consistent, not reactive. You move through work, relationships, and life with greater ease, clarity, and self-trust.",
      },
      { text: "“Your next life isn’t forced. It’s built from clarity.”", italic: true, bold: true, large: true },
    ],
  },
];

// Recreates the original's jQuery scroll-driven "stack" wipe: each panel is
// pinned full-viewport while its own 1/N slice of the scroll-through range
// passes. Panel i+1 slides up (top 100% -> 0%) over its slice to fully
// cover whatever is beneath, with z-index increasing per panel so later
// panels stack on top. Sliding a fully-intact panel (rather than shrinking
// the outgoing one's height to "reveal" the next) avoids any partial
// overlap between two panels' text during the transition — each panel is
// always shown as a clean, uncropped rectangle of its own content.
// Animates the `top` offset rather than `transform`: a `transform` on an
// absolutely-positioned child of a `position: sticky` ancestor hits a real
// cross-browser layout quirk where the child's painted position drifts a
// full panel-height from where getBoundingClientRect (and the eye) says it
// should be, once the sticky ancestor is actually stuck. Plain `top` is a
// normal layout property and isn't affected.
// Desktop only (>1199px) — the original falls back to a plain stacked
// layout below that width.
function useStackAnimation(boxRef: RefObject<HTMLDivElement | null>, count: number) {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => {
      const box = boxRef.current;
      if (!box) return;

      if (window.innerWidth < 1280) {
        itemRefs.current.forEach((el) => {
          if (el) el.style.top = "";
        });
        return;
      }

      const scrollTop = window.scrollY;
      const boxTop = box.getBoundingClientRect().top + scrollTop;
      const boxHeight = box.offsetHeight;
      const slot = boxHeight / count;

      for (let i = 1; i < count; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;
        const slotStart = slot * (i - 1);
        const progress = Math.min(Math.max((scrollTop - boxTop - slotStart) / slot, 0), 1);
        el.style.top = `${(1 - progress) * 100}%`;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [boxRef, count]);

  return itemRefs;
}

export default function ThreeStepTransition() {
  const boxRef = useRef<HTMLDivElement>(null);
  const itemRefs = useStackAnimation(boxRef, phases.length);

  return (
    <section className="bg-pattern-section bg-off-white pt-12 pb-0 md:pt-16">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-dark-green mb-[15px] text-[30px] font-semibold tracking-[-2px]">
          The 3-Step Transition
        </h2>
        <h2 className="text-shadow-soft mb-[25px] font-heading text-[40px] font-semibold tracking-[-2px] text-carbon">
          The Transition From Your Old Life to Your Next Life
        </h2>
        <p className="mx-auto w-4/5 text-carbon md:w-full">
          This transition isn&apos;t about force, reinvention, or walking away
          from what you&apos;ve built. It&apos;s a process of strengthening
          and realignment that unfolds in clear phases, allowing growth
          without disruption.
        </p>
      </div>

      <div ref={boxRef} className="relative mt-10 xl:h-[300vh]">
        <div className="xl:sticky xl:top-0 xl:h-screen xl:overflow-hidden">
          {phases.map((p, i) => (
            <div
              key={p.number}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              style={{ zIndex: i + 1 }}
              className={`static py-12 xl:absolute xl:inset-x-0 xl:top-0 xl:flex xl:h-screen xl:overflow-hidden xl:bg-off-white xl:py-0 ${
                i > 0 ? "xl:top-full" : ""
              }`}
            >
              <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-8 px-5 xl:grid-cols-2 xl:items-stretch xl:px-10">
                <div
                  className={`relative aspect-4/3 overflow-visible xl:order-1 xl:aspect-auto xl:h-full ${i % 2 === 1 ? "order-2" : "order-2 xl:order-1"}`}
                >
                  <Image src={p.image} alt={p.label} fill className="rounded-lg object-cover xl:rounded-none" />
                  <span className="text-dark-green absolute -top-4 -right-4 font-heading text-[120px] font-semibold opacity-30 xl:top-[60px] xl:-right-[130px] xl:text-[170px]">
                    {p.number}
                  </span>
                  <div className="absolute right-0 bottom-0 hidden items-center bg-off-white py-[30px] pr-[10px] pl-[10px] xl:flex">
                    <span className="[writing-mode:vertical-lr] rotate-180 text-[15px] font-bold text-carbon uppercase">
                      {p.label}
                    </span>
                  </div>
                </div>

                <div
                  className={`bg-pattern-section text-center xl:order-2 xl:self-center xl:text-left ${i % 2 === 1 ? "order-1" : "order-1 xl:order-2"}`}
                >
                  <span className="text-dark-green mt-[30px] mb-[10px] block text-[18px] font-semibold uppercase">
                    {p.phase}
                  </span>
                  <h2 className="text-shadow-soft mb-[25px] font-heading text-[40px] font-semibold tracking-[-2px] text-carbon">
                    {p.title}
                  </h2>
                  {p.paragraphs.map((para, idx) => (
                    <p
                      key={idx}
                      className={`mb-[20px] text-carbon last:mb-0 ${para.bold ? "font-semibold" : ""} ${para.italic ? "italic" : ""} ${para.large ? "text-[19px]" : ""}`}
                    >
                      {para.text}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
