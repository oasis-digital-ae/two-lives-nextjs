"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

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
    <section className="relative overflow-hidden bg-carbon py-16 md:py-20">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-3">
            <Image
              src="/images/two-lives/logo-wht.svg"
              alt="Two Lives Theory"
              width={160}
              height={40}
              className="mx-auto mb-6 h-10 w-auto animate-float lg:mx-0"
            />
            <h2 className="mb-6 text-center font-heading text-2xl font-semibold text-white lg:text-left">
              The Transition to your Next Life Starts Here
            </h2>

            <div className="mb-6 grid grid-cols-2 gap-4 text-center lg:text-left">
              <div>
                <span className="block font-heading text-3xl font-bold text-white">12+</span>
                <p className="text-sm text-white/70">Years Experience</p>
              </div>
              <div>
                <span className="block font-heading text-3xl font-bold text-white">50+</span>
                <p className="text-sm text-white/70">Global Client Base</p>
              </div>
            </div>

            <p className="mb-6 text-center text-white/70 lg:text-left">
              Create lasting change across every area of your life. This is
              precise, personal mentorship with real accountability, direct
              support, and honest conversations that move you forward.
            </p>

            <div className="text-center lg:text-left">
              <Link
                href="/request-mentorship"
                className="inline-block rounded-full bg-emerald px-6 py-3 font-heading text-sm font-semibold text-carbon"
              >
                Request Mentorship
              </Link>
            </div>
          </div>

          <div className="lg:col-span-9">
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

              <div className="absolute right-4 top-4 z-10">
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
