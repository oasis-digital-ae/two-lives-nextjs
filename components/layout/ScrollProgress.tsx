"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const max = scrollHeight - clientHeight;
      setProgress(max > 0 ? scrollTop / max : 0);
      setVisible(scrollTop > 400);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className={`fixed bottom-6 left-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-carbon text-emerald shadow-lg transition-opacity xl:flex ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      style={{
        background: `conic-gradient(var(--color-emerald) ${progress * 360}deg, rgba(255,255,255,0.15) 0deg)`,
      }}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-carbon text-lg">
        &uarr;
      </span>
    </button>
  );
}
