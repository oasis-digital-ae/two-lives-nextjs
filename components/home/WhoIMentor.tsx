"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRightIcon } from "@/components/ui/Icons";

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
    <section className="bg-pattern-section bg-off-white">
      {/* Desktop tabs */}
      <div className="hidden lg:block">
        <div className="bg-carbon shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
          <div className="mx-auto flex max-w-[1400px]">
            {archetypes.map((a, i) => (
              <button
                key={a.key}
                onClick={() => setActive(i)}
                className={`relative flex-1 py-[30px] text-center font-heading text-[19px] font-semibold transition-colors ${
                  active === i ? "bg-emerald text-carbon" : "text-white"
                }`}
              >
                {a.label}
                <span
                  className={`absolute inset-x-0 bottom-0 h-[3px] origin-left bg-emerald transition-transform duration-500 ${
                    active === i ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-[1400px] px-10 py-16">
          <div className="grid grid-cols-2 items-center gap-16">
            <div className="relative">
              <div className="box-shad relative aspect-[4/3] overflow-hidden rounded-[6px]">
                <Image src={current.image} alt={current.label} fill className="object-cover" />
              </div>
              <div className="absolute bottom-[30px] left-[30px] flex items-center rounded-[4px] bg-[rgba(14,20,18,0.7)] px-[25px] py-[10px]">
                <span className="text-[16px] text-white">{current.tag}</span>
              </div>
              <div className="animate-float absolute -right-8 bottom-[90px] flex h-[125px] w-[125px] items-center justify-center rounded-full bg-[rgba(14,20,18,0.7)] p-3 shadow-lg">
                <Image src="/images/twoliveslogo.svg" alt="" width={90} height={90} />
              </div>
            </div>
            <div className="text-center lg:text-left">
              <span className="mb-5 block font-heading text-[24px] font-black text-carbon">
                {current.label}
              </span>
              <p className="mb-5 font-medium text-carbon">{current.desc}</p>
              <Link href={current.href} className="btn-three">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile stacked cards */}
      <div className="flex flex-col gap-5 px-5 py-16 lg:hidden">
        {archetypes.map((a, i) => (
          <Link
            key={a.key}
            href={a.href}
            className="box-shad relative block h-[250px] overflow-hidden rounded-[6px]"
          >
            <Image src={a.image} alt={a.label} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
              <span className="text-shadow-soft font-heading text-[26px] text-white">
                {a.label}
              </span>
              <RotatingLearnMore id={i} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function RotatingLearnMore({ id }: { id: number }) {
  const pathId = `mentor-circle-path-${id}`;
  return (
    <span className="relative inline-flex h-[72px] w-[72px] shrink-0 items-center justify-center">
      <svg
        className="absolute inset-0 h-full w-full animate-[spin_12s_linear_infinite]"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <defs>
          <path id={pathId} d="M50,50 m-34,0 a34,34 0 1,1 68,0 a34,34 0 1,1 -68,0" />
        </defs>
        <text fill="#fff" fontSize="11" fontWeight="700" letterSpacing="1.2" className="uppercase">
          <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
            Learn More
          </textPath>
        </text>
      </svg>
      <ArrowRightIcon className="relative z-[2] h-4 w-4 text-white" />
    </span>
  );
}
