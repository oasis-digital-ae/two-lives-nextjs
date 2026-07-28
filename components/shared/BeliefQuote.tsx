"use client";

import { useEffect, useRef } from "react";

export default function BeliefQuote({
  image = "/images/keynote-hero.png",
  preline = "My work is grounded in one core belief:",
  quote = "Real change happens when mind, body and emotions are strengthened together, not treated as separate parts.",
  eyebrow = "About Two lives",
}: {
  image?: string;
  preline?: string | null;
  quote?: string;
  eyebrow?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      const bg = bgRef.current;
      if (!section || !bg) return;

      const rect = section.getBoundingClientRect();
      const centerRelY = rect.top + rect.height / 2;
      const progress = Math.min(Math.max(-centerRelY / (rect.height / 2), 0), 1);
      bg.style.width = `${100 - progress * 80}%`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-carbon py-[150px]">
      <div
        ref={bgRef}
        className="absolute inset-y-0 left-0 h-full"
        style={{
          width: "100%",
          backgroundImage: `linear-gradient(to right, rgba(14,20,18,1), rgba(14,20,18,0.75)), url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center 35%",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        {preline && (
          <p className="mb-5 font-heading text-base font-semibold text-emerald italic sm:text-lg">
            {preline}
          </p>
        )}
        <h2 className="font-heading text-[24px] leading-[1.4] font-semibold text-white italic sm:text-[40px] sm:leading-tight">
          &ldquo;{quote}&rdquo;
        </h2>
      </div>

      <div className="absolute top-0 left-0 hidden h-full w-32 items-center justify-center xl:flex">
        <span className="-rotate-90 text-sm font-medium whitespace-nowrap text-white">
          {eyebrow}
        </span>
      </div>
    </section>
  );
}
