"use client";

import { useEffect, useRef } from "react";

export default function QuoteBanner({
  eyebrow,
  title,
  quote,
  image,
}: {
  eyebrow: string;
  title: string;
  quote: string;
  image: string;
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
      // 100% width while the section's center hasn't yet reached the
      // viewport top; narrows down to 20% as the section scrolls out of
      // view above (mirrors the original's skrollr center-top -> bottom-top
      // keyframes).
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

      <div className="relative mx-auto max-w-[1140px] px-6 text-center">
        <h2 className="mb-0 font-heading text-[50px] font-semibold leading-[1.05] text-white sm:text-[70px] lg:text-[90px]">
          {title}
        </h2>
        <div className="mx-auto mt-5 w-[90%] rounded-lg border-l-[5px] border-emerald px-3 py-2.5 text-center lg:w-1/2">
          <p className="m-0 text-base font-semibold italic leading-[1.8] text-white sm:text-lg md:text-xl">
            &ldquo;{quote}&rdquo;
          </p>
        </div>
      </div>

      <div className="absolute left-0 top-0 hidden h-full w-32 items-center justify-center xl:flex">
        <span className="-rotate-90 whitespace-nowrap text-sm font-medium text-white">
          {eyebrow}
        </span>
      </div>
    </section>
  );
}
