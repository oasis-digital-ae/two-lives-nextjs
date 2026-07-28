"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Hero() {
  const nameRef = useRef<HTMLDivElement>(null);
  const basimRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (nameRef.current) {
        nameRef.current.style.transform = `translate(-50%, calc(-50% + ${y * 0.18}px))`;
      }
      if (basimRef.current) {
        basimRef.current.style.transform = `translateY(${y * 0.35}px)`;
      }
      if (iconRef.current) {
        iconRef.current.style.transform = `scale(${1 + y * 0.0004})`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Desktop hero */}
      <section
        className="relative hidden h-screen overflow-hidden bg-carbon lg:block"
        style={{
          boxShadow:
            "0 12px 18px rgba(0,0,0,0.35), 0 24px 36px rgba(0,0,0,0.22), 0 36px 60px rgba(0,0,0,0.12)",
        }}
      >
        {/* base background image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-bg-11.png')" }}
        />

        {/* gradient overlay */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(0deg, rgba(14,20,18,1) 31%, rgba(0,0,0,0.19) 100%)",
          }}
        />

        {/* big name background */}
        <div
          ref={nameRef}
          className="hero-name-gradient animate-hero-name absolute left-1/2 top-[55%] z-[2] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[12vw]"
        >
          Basim Yafai
        </div>

        {/* center icon */}
        <div className="absolute left-1/2 top-[60%] z-[1] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center opacity-50 pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={iconRef}
            src="/img/bg-icon.svg"
            alt=""
            className="w-[50vw] opacity-70 brightness-0 will-change-transform"
          />
        </div>

        {/* basim image layer — outer wrapper centers via flex (avoids
            percentage-transform conflicts between the entrance animation
            and a translate-x-1/2 utility on a shrink-to-fit element) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] flex justify-center">
          <div ref={basimRef} className="animate-hero-basim relative">
            {/* glow behind portrait */}
            <div
              className="absolute bottom-[10px] left-1/2 -z-10 h-[700px] w-[700px] -translate-x-1/2 rounded-full blur-[40px]"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) 30%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 70%)",
              }}
            />
            <Image
              src="/images/basim-hero-1.png"
              alt="Basim Yafai"
              width={500}
              height={536}
              priority
              className="relative z-[2] block h-auto w-[500px] max-h-[720px]"
              style={{
                filter:
                  "saturate(0.95) drop-shadow(0 35px 45px rgba(0,0,0,0.45)) drop-shadow(0 80px 90px rgba(0,0,0,0.25))",
              }}
            />
          </div>
        </div>

        {/* headline */}
        <div className="pointer-events-none absolute left-1/2 top-[12%] z-[4] w-full -translate-x-1/2 text-center">
          <h1 className="mb-4 font-heading text-[4.375rem] font-semibold leading-[1.1] text-white">
            Step Into Your Next Life
          </h1>
          <p className="font-heading text-2xl font-medium italic text-white">
            With Clarity, Strength, and Inner Alignment.
          </p>
        </div>

        {/* content row, pinned to bottom */}
        <div className="animate-hero-content absolute inset-0 z-[5] flex items-end pb-16">
          <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-6 px-10">
            <div className="lg:w-5/12">
              <h4 className="w-[80%] font-heading text-[18px] font-medium leading-[1.6] text-white">
                Private Mentorship led by <b>Basim Yafai</b>, Mindset & Growth
                Mentor. Two Lives Theory is trusted by high performing
                leaders, entrepreneurs &amp; elite athletes.
              </h4>
            </div>
            <div className="flex justify-center lg:w-5/12">
              <Link href="/request-mentorship" className="btn-cta pointer-events-auto">
                Request Mentorship
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile hero */}
      <section className="relative flex min-h-screen flex-col overflow-hidden bg-carbon lg:hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/mb-hero-t3.png')" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(14,20,18,0.1) 0%, rgba(14,20,18,0.7) 60%, rgba(14,20,18,1) 100%)",
          }}
        />

        <div className="relative z-10 mt-auto flex flex-col items-center px-6 pb-10 pt-24 text-center">
          <h1 className="mb-3 font-heading text-3xl font-semibold text-white">
            Step Into Your Next Life
          </h1>
          <p className="mb-4 font-semibold italic text-white">
            With Clarity, Strength, and Inner Alignment.
          </p>
          <p className="mb-6 text-[15px] leading-relaxed text-white/90">
            Two Lives Theory is trusted by high performing leaders,
            entrepreneurs &amp; elite athletes.
          </p>
          <Link
            href="/request-mentorship"
            className="inline-block rounded-full bg-emerald px-8 py-4 font-heading text-sm font-semibold text-carbon"
          >
            Request Mentorship
          </Link>
        </div>
      </section>
    </>
  );
}
