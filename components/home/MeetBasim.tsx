"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  ArrowRightIcon,
  AwardIcon,
  DumbbellIcon,
  EyeIcon,
  GraduationCapIcon,
  LightbulbIcon,
  LightningIcon,
} from "@/components/ui/Icons";

const qualifications = [
  { Icon: LightbulbIcon, label: "Master NLP Practitioner & Life Coach" },
  { Icon: GraduationCapIcon, label: "BSc Honours Sports Coaching Science" },
  { Icon: EyeIcon, label: "Hypnosis Practitioner" },
  { Icon: LightningIcon, label: "Former Professional Rugby Player" },
  { Icon: AwardIcon, label: "ICF PCC Accredited Training" },
  { Icon: DumbbellIcon, label: "Strength & Conditioning Coach" },
];

// Mirrors the original's skrollr keyframes: data-top-bottom is the value
// applied when the element first enters from below (its top touches the
// viewport bottom); data-bottom-top is the value once it has fully
// scrolled out above (its bottom touches the viewport top). Progress is
// interpolated between those two points as the element travels through.
function skrollrProgress(rect: DOMRect, viewportHeight: number) {
  return Math.min(Math.max((viewportHeight - rect.top) / (viewportHeight + rect.height), 0), 1);
}

function lerp(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

export default function MeetBasim() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight;

      const banner = bannerRef.current;
      if (banner) {
        const progress = skrollrProgress(banner.getBoundingClientRect(), vh);
        const y = lerp(50, -50, progress);
        banner.style.transform = `translate(-50%, ${y}px)`;
      }

      const watermark = watermarkRef.current;
      if (watermark) {
        const progress = skrollrProgress(watermark.getBoundingClientRect(), vh);
        const x = lerp(150, 50, progress);
        watermark.style.transform = `translate3d(${x}px, 0, 0)`;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="basim-preview-section relative overflow-hidden bg-pattern-section bg-off-white pt-12 pb-16 md:pt-16">
      <div className="corner-svg">
        <Image src="/img/bg-icon.svg" alt="" width={500} height={500} />
      </div>

      <div className="relative z-[1] mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative mx-auto max-w-md pb-10 lg:mx-0 lg:ml-auto">
            <Image
              src="/images/about-basim-tpt.png"
              alt="Basim"
              width={911}
              height={1024}
              className="basim-portrait h-auto w-full pe-3"
            />

            <div ref={bannerRef} className="founder-banner">
              <div className="founder-icon">
                <Image src="/images/twoliveslogo.svg" alt="Two Lives Theory" width={64} height={64} />
              </div>
              <div className="founder-text">
                <span className="founder-name">Basim Yafai</span>
                <span className="founder-title">Founder of Two Lives Theory&reg;</span>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-[25px] w-[95%] text-slate">
              I guide high performers through expansion and transition. My
              clients include elite athletes, entrepreneurs, and business
              leaders operating at the next level.
            </p>
            <p className="mb-[25px] w-[95%] text-slate">
              Backed by <b>12 years of experience</b> and{" "}
              <b>ICF PCC accreditation training</b>, this work is built on
              the Two Lives Theory &mdash; strengthening what you&apos;ve
              built while aligning you for what comes next.
            </p>
            <p className="mb-[25px] w-[95%] text-slate">
              Having navigated major life transitions myself, I bring lived
              understanding alongside over twelve years of experience
              mentoring high performers. My focus is depth and integration,
              not motivation or quick fixes.
            </p>

            <div className="mt-4 mb-8 grid grid-cols-2 gap-6 text-center sm:grid-cols-3">
              {qualifications.map(({ Icon, label }) => (
                <div key={label} className="icon-card group">
                  <Icon className="mx-auto mb-3 h-10 w-10 text-[#002918] transition-transform duration-[250ms] group-hover:-translate-y-[3px] group-hover:scale-105 group-hover:text-[#04e184]" />
                  <h6 className="mb-0 text-[14px] leading-4 font-semibold text-carbon">
                    {label}
                  </h6>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/about" className="btn-three">
                More About Basim
                <span className="pl-[10px] text-carbon">
                  <ArrowRightIcon className="inline-block h-4 w-4" />
                </span>
              </Link>
              <Link href="/request-mentorship" className="btn-secondary">
                Request Mentorship
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={watermarkRef}
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-4 hidden -tracking-[5px] font-heading text-[160px] font-bold text-carbon/30 uppercase select-none md:block lg:text-[180px] xl:text-[120px]"
      >
        Two lives theory
      </div>
    </section>
  );
}
