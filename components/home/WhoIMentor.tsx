"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const archetypes = [
  {
    key: "entrepreneurs",
    label: "Entrepreneurs",
    tag: "Founders, Builders, Investors.",
    href: "/entrepreneur",
    image: "/images/two-lives/entreprenuer.png",
    desc: "Builders who have achieved success but know there's another level. Strengthen your mindset, steady your emotions, and align your work with your life so growth feels powerful, not heavy.",
  },
  {
    key: "athletes",
    label: "Athletes",
    tag: "Professionals, Endurance, Aspiring Athletes.",
    href: "/athlete",
    image: "/images/two-lives/athlete.png",
    desc: "Competitors who understand performance starts within. Build mental strength, emotional control, and self-belief so you evolve not just in sport, but in who you become beyond it.",
  },
  {
    key: "elite",
    label: "Elite Competitors",
    tag: "Poker Players, Traders, Strategic Competitors.",
    href: "/elite-competitors",
    image: "/images/two-lives/poker-player.jpg",
    desc: "High-level performers operating under relentless pressure. Sharpen focus, master emotional control, and evolve your identity so success becomes sustainable and your next chapter intentional.",
  },
  {
    key: "executives",
    label: "Executives & Leaders",
    tag: "C-Suite, Corporate Leaders, Decision Makers.",
    href: "/executive-leaders",
    image: "/images/two-lives/exec-leader.png",
    desc: "Operating under constant pressure, responsibility, and decisions. Think clearly, stay composed, and build a strong inner foundation so your leadership and life feels calm, decisive, and aligned across work and life.",
  },
];

export default function WhoIMentor() {
  const [active, setActive] = useState(0);
  const current = archetypes[active];

  return (
    <section className="bg-carbon py-16 md:py-20">
      {/* Desktop tabs */}
      <div className="hidden lg:block">
        <div className="mx-auto mb-10 flex max-w-[1400px] justify-center gap-10 border-b border-white/10 px-10">
          {archetypes.map((a, i) => (
            <button
              key={a.key}
              onClick={() => setActive(i)}
              className={`relative pb-4 font-heading text-lg font-medium transition-colors ${
                active === i ? "text-emerald" : "text-white/60 hover:text-white"
              }`}
            >
              {a.label}
              {active === i && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 bg-emerald" />
              )}
            </button>
          ))}
        </div>

        <div className="mx-auto grid max-w-[1400px] grid-cols-2 items-center gap-16 px-10">
          <div className="relative aspect-[4/3]">
            <Image
              src={current.image}
              alt={current.label}
              fill
              className="rounded-lg object-cover shadow-2xl"
            />
            <div className="absolute bottom-6 left-6 rounded-md bg-carbon/80 px-5 py-2 backdrop-blur">
              <span className="text-sm text-white">{current.tag}</span>
            </div>
          </div>
          <div>
            <span className="mb-4 block font-heading text-2xl font-black text-white">
              {current.label}
            </span>
            <p className="mb-6 text-white/70">{current.desc}</p>
            <Link
              href={current.href}
              className="inline-block rounded-full bg-emerald px-6 py-3 font-heading text-sm font-semibold text-carbon"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile stacked cards */}
      <div className="flex flex-col gap-5 px-5 lg:hidden">
        {archetypes.map((a) => (
          <Link
            key={a.key}
            href={a.href}
            className="group relative block overflow-hidden rounded-lg"
          >
            <div className="relative aspect-[16/10]">
              <Image src={a.image} alt={a.label} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-carbon/90 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-5 py-4">
              <span className="font-heading text-xl font-semibold text-white">{a.label}</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald text-carbon">
                &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
