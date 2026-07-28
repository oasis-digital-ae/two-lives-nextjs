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
        basimRef.current.style.transform = `translate(-50%, ${y * 0.35}px)`;
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
      <section className="relative hidden h-screen overflow-hidden bg-carbon md:block">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/basim-hero-1.png')", opacity: 0.15 }}
        />
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(0deg, rgba(14,20,18,1) 31%, rgba(0,0,0,0.19) 100%)",
          }}
        />

        <div
          ref={nameRef}
          className="absolute left-1/2 top-[55%] z-[2] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[12vw] font-black tracking-wide text-white opacity-50"
        >
          Basim Yafai
        </div>

        <div className="absolute left-1/2 top-[60%] z-[1] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center opacity-50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={iconRef}
            src="/img/bg-icon.svg"
            alt=""
            className="w-[50vw] brightness-0"
          />
        </div>

        <div
          ref={basimRef}
          className="absolute bottom-0 left-1/2 z-[3] -translate-x-1/2"
        >
          <Image
            src="/images/basim-hero-1.png"
            alt="Basim Yafai"
            width={500}
            height={720}
            priority
            className="max-h-[92vh] w-auto drop-shadow-[0_35px_45px_rgba(0,0,0,0.45)]"
            style={{ filter: "saturate(0.95)" }}
          />
        </div>

        <div className="absolute left-1/2 top-[12%] z-[4] w-full -translate-x-1/2 text-center">
          <h1 className="mb-4 font-heading text-4xl font-semibold text-white md:text-5xl">
            Step Into Your Next Life
          </h1>
          <p className="text-xl italic text-white/90 md:text-2xl">
            With Clarity, Strength, and Inner Alignment.
          </p>
        </div>

        <div className="absolute inset-0 z-[5] flex items-end pb-16">
          <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-6 px-10">
            <h4 className="hidden max-w-md text-lg font-medium text-white lg:block">
              Private Mentorship led by <b>Basim Yafai</b>, Mindset & Growth
              Mentor. Two Lives Theory is trusted by high performing leaders,
              entrepreneurs &amp; elite athletes.
            </h4>
            <Link
              href="/request-mentorship"
              className="mx-auto rounded-full bg-emerald px-8 py-4 font-heading text-sm font-semibold text-carbon transition-transform hover:scale-105 lg:mx-0"
            >
              Request Mentorship
            </Link>
          </div>
        </div>
      </section>

      {/* Mobile hero */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center bg-carbon px-6 py-24 text-center md:hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/images/basim-hero-1.png')" }}
        />
        <div className="relative z-10">
          <h1 className="mb-3 font-heading text-4xl font-semibold text-white">
            Step Into Your Next Life
          </h1>
          <p className="mb-4 font-medium italic text-white">
            With Clarity, Strength, and Inner Alignment.
          </p>
          <p className="mb-6 text-sm text-white/70">
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
