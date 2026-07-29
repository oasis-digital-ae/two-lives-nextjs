"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import Counter from "@/components/ui/Counter";

const languages = [
  { code: "en", label: "EN", src: "/subtitles/EN.vtt" },
  { code: "es", label: "ES", src: "/subtitles/ES.vtt" },
  { code: "th", label: "TH", src: "/subtitles/TH.vtt" },
  { code: "zh", label: "中文", src: "/subtitles/ZH.vtt" },
];

export default function CoachingVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [lang, setLang] = useState("en");

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="overflow-hidden bg-carbon">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Logo panel - desktop only */}
          <div className="hidden items-center justify-center border-r border-b border-white/10 p-10 lg:col-span-3 lg:flex">
            <Image
              src="/images/two-lives/logo-wht.svg"
              alt="Two Lives Theory"
              width={160}
              height={40}
              className="animate-float-drop h-10 w-auto"
            />
          </div>

          {/* Heading */}
          <div className="order-1 flex items-center justify-center border-b border-white/10 px-5 py-10 lg:order-none lg:col-span-9 lg:justify-start lg:px-10">
            <h2 className="text-shadow-soft text-center font-heading text-[32px] font-semibold tracking-[-2px] text-white sm:text-[40px] lg:text-left">
              The Transition to your Next Life Starts Here
            </h2>
          </div>

          {/* Stats + text + CTA */}
          <div className="order-3 p-5 lg:order-none lg:col-span-3 lg:p-10">
            <div className="mb-10 grid grid-cols-2 gap-4 text-center lg:text-left">
              <div>
                <span className="block font-heading text-[50px] font-semibold text-white lg:text-[28px]">
                  <Counter to={12} suffix="+" />
                </span>
                <p className="text-sm text-white">Years Experience</p>
              </div>
              <div>
                <span className="block font-heading text-[50px] font-semibold text-white lg:text-[28px]">
                  <Counter to={50} suffix="+" />
                </span>
                <p className="text-sm text-white">Global Client Base</p>
              </div>
            </div>

            <p className="mb-10 text-center text-white lg:text-left">
              Create lasting change across every area of your life.
              <br />
              This is precise, personal mentorship with real accountability,
              direct support, and honest conversations that move you forward.
            </p>

            <div className="text-center lg:text-left">
              <Link href="/request-mentorship" className="btn-cta">
                Request Mentorship
              </Link>
            </div>
          </div>

          {/* Video */}
          <div className="order-2 p-5 lg:order-none lg:col-span-9 lg:p-10">
            <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
              {!playing && (
                <Image
                  src="/images/video-thumb.png"
                  alt="Two Lives Theory"
                  fill
                  className="object-cover"
                />
              )}
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                playsInline
                preload="none"
                crossOrigin="anonymous"
                poster="/images/video-thumb.png"
                onEnded={() => setPlaying(false)}
              >
                <source
                  src="https://res.cloudinary.com/djqjbt4uh/video/upload/v1770269313/Sequence_01_auilst.mp4"
                  type="video/mp4"
                />
                {languages.map((l) => (
                  <track
                    key={l.code}
                    kind="subtitles"
                    label={l.label}
                    srcLang={l.code}
                    src={l.src}
                    default={l.code === lang}
                  />
                ))}
              </video>

              <div className="absolute top-4 right-4 z-10">
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  className="rounded-md bg-black/60 px-2 py-1 text-sm text-white"
                  aria-label="Select subtitle language"
                >
                  {languages.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={togglePlay}
                aria-label={playing ? "Pause video" : "Play video"}
                className="absolute inset-0 z-[5] flex items-center justify-center"
              >
                {!playing && (
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald text-2xl text-carbon">
                    &#9654;
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
