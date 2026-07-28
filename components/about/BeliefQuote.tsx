"use client";

import { useEffect, useRef } from "react";

export default function BeliefQuote() {
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
          backgroundImage:
            "linear-gradient(to right, rgba(14,20,18,1), rgba(14,20,18,0.75)), url(/images/keynote-hero.png)",
          backgroundSize: "cover",
          backgroundPosition: "center 35%",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <p className="mb-5 font-heading text-base font-semibold text-emerald italic sm:text-lg">
          My work is grounded in one core belief:
        </p>
        <h2 className="font-heading text-[24px] leading-[1.4] font-semibold text-white italic sm:text-[40px] sm:leading-tight">
          &ldquo;Real change happens when mind, body and emotions are
          strengthened together, not treated as separate parts.&rdquo;
        </h2>
      </div>

      <div className="absolute top-0 left-0 hidden h-full w-32 items-center justify-center xl:flex">
        <span className="-rotate-90 text-sm font-medium whitespace-nowrap text-white">
          About Two lives
        </span>
      </div>
    </section>
  );
}
