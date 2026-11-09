"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import curves from "./curves.json";

/*
 * The homepage's pinned scroll film, desktop only (phones keep the mobile hero).
 *
 * One canvas draws everything. A held scene pushes in slowly in code. Each move starts
 * at the zoom the held scene ended on and eases back to full frame, so nothing jumps at
 * a join, and clips fade from and to the matching sharp still over their first and last
 * few frames. Visitors who prefer reduced motion get the `fallback` hero instead.
 */

type Point = [number, number];
type Push = { zoom: number; from: Point; to: Point };
type Still = { kind: "still"; src: string; vh: number; zoom: number; from: Point; to: Point };
type Clip = { kind: "clip"; id: keyof typeof curves; vh: number; startStill: string; endStill: string; push?: Push };
type Segment = Still | Clip;

const STILL = (name: string) => `/hero/stills/${name}.webp`;
const frameUrl = (id: string, i: number) => `/hero/frames/${id}/frame_${String(i + 1).padStart(3, "0")}.webp`;

const SEGMENTS: Segment[] = [
  { kind: "clip", id: "room", vh: 1.4, startStill: STILL("room"), endStill: STILL("room"), push: { zoom: 1.07, from: [0.6, 0.55], to: [0.66, 0.5] } },
  { kind: "clip", id: "doors", vh: 1.7, startStill: STILL("room"), endStill: STILL("walkway") },
  { kind: "clip", id: "breath", vh: 1.5, startStill: STILL("walkway"), endStill: STILL("walkway"), push: { zoom: 1.07, from: [0.55, 0.45], to: [0.6, 0.42] } },
  { kind: "clip", id: "walkway", vh: 1.5, startStill: STILL("walkway"), endStill: STILL("pier") },
  { kind: "clip", id: "courtyard", vh: 1.5, startStill: STILL("pier"), endStill: STILL("bench") },
  { kind: "clip", id: "benchin", vh: 1.4, startStill: STILL("bench"), endStill: STILL("bench-close") },
  { kind: "still", src: STILL("bench-close"), vh: 1.7, zoom: 1.06, from: [0.6, 0.5], to: [0.64, 0.52] },
];

/* Three parts, one per scene. The first is the original hero; the other two use the pairings
   and wording from Basim's camera brief and website edits, at the same type sizes. */
const CAPTIONS: { segment: number; appearAt?: { segment: number; share: number }; intro?: boolean; heading?: string; text?: string }[] = [
  { segment: 0, intro: true },
  {
    segment: 2,
    heading: "Identity & Release",
    text: "Let go of the beliefs, habits and emotional weight that no longer support who you’re becoming.",
  },
  {
    segment: 6,
    // Comes in as the pier clears and the man on the bench is first revealed.
    appearAt: { segment: 4, share: 0.6 },
    heading: "Realignment & Integration",
    text: "Turn deeper understanding into everyday living, where growth becomes something you experience, not just something you pursue.",
  },
];

const HEADING_SIZE = "clamp(38px, 4.2vw, 66px)";
const BODY_SIZE = "clamp(15px, 1.15vw, 18px)";

/** Share of a clip spent fading from and to its matching still. */
const FADE = 0.12;
/** How quickly the picture catches up with the scrollbar, per 60th of a second. */
const FOLLOW = 0.1;
/** Images fetched at once while the film loads. */
const CONCURRENT = 6;

const TOTAL_VH = SEGMENTS.reduce((sum, s) => sum + s.vh, 0);
const segmentStart = (index: number) => SEGMENTS.slice(0, index).reduce((sum, s) => sum + s.vh, 0);

const smooth = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (t: number) => Math.min(1, Math.max(0, t));

/** Finds the frame whose share of the clip's motion matches `share`. */
function frameForMotion(curve: number[], share: number) {
  let lo = 0;
  let hi = curve.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (curve[mid] < share) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

export function ScrollHero({ fallback }: { fallback: ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const captionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setReducedMotion(true);
  }, []);

  useEffect(() => {
    if (reducedMotion || !window.matchMedia("(min-width: 768px)").matches) return;
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!section || !canvas || !ctx) return;

    let cancelled = false;
    let needsDraw = true;
    const stills = new Map<string, HTMLImageElement>();
    const frames = new Map<string, (HTMLImageElement | null)[]>();

    const load = (src: string, done: (img: HTMLImageElement) => void) => () => {
      const img = new Image();
      img.decoding = "async";
      img.src = src;
      return img.decode().then(
        () => {
          done(img);
          needsDraw = true;
        },
        () => undefined,
      );
    };

    // Stills first, then every 8th frame of each clip so scrolling works early, then the rest.
    const tasks: (() => Promise<void>)[] = [];
    for (const src of new Set(SEGMENTS.flatMap((s) => (s.kind === "still" ? [s.src] : [s.startStill, s.endStill])))) {
      tasks.push(load(src, (img) => stills.set(src, img)));
    }
    const clips = SEGMENTS.filter((s): s is Clip => s.kind === "clip");
    for (const clip of clips) frames.set(clip.id, new Array(curves[clip.id].count).fill(null));
    const queued = new Set<string>();
    for (const step of [8, 4, 2, 1]) {
      for (const clip of clips) {
        const list = frames.get(clip.id)!;
        for (let i = 0; i < list.length; i += step) {
          const key = `${clip.id}:${i}`;
          if (queued.has(key)) continue;
          queued.add(key);
          tasks.push(load(frameUrl(clip.id, i), (img) => (list[i] = img)));
        }
      }
    }

    // Nothing loads until the page has settled or the visitor scrolls, so the film
    // never competes with the first paint.
    let started = false;
    let next = 0;
    const begin = () => {
      if (started || cancelled) return;
      started = true;
      const worker = async () => {
        while (!cancelled && next < tasks.length) await tasks[next++]();
      };
      for (let k = 0; k < CONCURRENT; k++) void worker();
    };
    const whenIdle = () => {
      if ("requestIdleCallback" in window) window.requestIdleCallback(begin, { timeout: 3000 });
      else setTimeout(begin, 1000);
    };
    window.addEventListener("scroll", begin, { passive: true, once: true });
    if (document.readyState === "complete") whenIdle();
    else window.addEventListener("load", whenIdle, { once: true });

    const draw = (img: HTMLImageElement | null | undefined, zoom: number, focus: Point, alpha = 1) => {
      if (!img || alpha <= 0) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const cover = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const dw = img.naturalWidth * cover;
      const dh = img.naturalHeight * cover;
      const x = (cw - dw) / 2 + focus[0] * dw * (1 - zoom);
      const y = (ch - dh) / 2 + focus[1] * dh * (1 - zoom);
      ctx.globalAlpha = Math.min(1, alpha);
      ctx.drawImage(img, x, y, dw * zoom, dh * zoom);
      ctx.globalAlpha = 1;
    };

    const nearest = (list: (HTMLImageElement | null)[] | undefined, want: number) => {
      if (!list) return null;
      for (let d = 0; d < list.length; d++) {
        const img = list[want - d] ?? list[want + d];
        if (img) return img;
      }
      return null;
    };

    const render = (progress: number) => {
      let position = progress * TOTAL_VH;
      let index = 0;
      while (index < SEGMENTS.length - 1 && position >= SEGMENTS[index].vh) {
        position -= SEGMENTS[index].vh;
        index++;
      }
      const segment = SEGMENTS[index];
      const t = clamp(position / segment.vh);

      if (segment.kind === "still") {
        const eased = smooth(t) * 0.5 + t * 0.5;
        const focus: Point = [lerp(segment.from[0], segment.to[0], eased), lerp(segment.from[1], segment.to[1], eased)];
        draw(stills.get(segment.src), lerp(1, segment.zoom, eased), focus);
      } else {
        const previous = SEGMENTS[index - 1];
        const lastMove = previous?.kind === "still" ? previous : previous?.push;
        const eased = smooth(t) * 0.35 + t * 0.65;
        const { curve, count } = curves[segment.id];
        const zoom = segment.push ? lerp(1, segment.push.zoom, eased) : lerp(lastMove?.zoom ?? 1, 1, eased);
        const focus: Point = segment.push
          ? [lerp(segment.push.from[0], segment.push.to[0], eased), lerp(segment.push.from[1], segment.push.to[1], eased)]
          : lastMove?.to ?? [0.5, 0.5];
        const frame = segment.push ? Math.round(t * (count - 1)) : frameForMotion(curve, eased);
        draw(nearest(frames.get(segment.id), frame), zoom, focus);
        draw(stills.get(segment.startStill), zoom, focus, 1 - t / FADE);
        draw(stills.get(segment.endStill), zoom, focus, (t - (1 - FADE)) / FADE);
      }

      const at = progress * TOTAL_VH;
      CAPTIONS.forEach((caption, i) => {
        const el = captionRefs.current[i];
        if (!el) return;
        const start = caption.appearAt
          ? segmentStart(caption.appearAt.segment) + SEGMENTS[caption.appearAt.segment].vh * caption.appearAt.share
          : segmentStart(caption.segment);
        const end = segmentStart(caption.segment) + SEGMENTS[caption.segment].vh;
        const fadeIn = i === 0 ? 1 : clamp((at - (start - 0.25)) / 0.3);
        const fadeOut = i === CAPTIONS.length - 1 ? 1 : clamp((end + 0.05 - at) / 0.3);
        const opacity = Math.min(fadeIn, fadeOut);
        el.style.opacity = String(opacity);
        el.style.transform = `translateY(calc(-50% + ${(1 - opacity) * 14}px))`;
        el.style.visibility = opacity <= 0.01 ? "hidden" : "visible";
      });
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      needsDraw = true;
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const target = () => {
      const box = section.getBoundingClientRect();
      return clamp(-box.top / (box.height - window.innerHeight));
    };

    let shown = target();
    let last = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const steps = Math.min(4, (now - last) / (1000 / 60));
      last = now;
      const want = target();
      const nextShown = Math.abs(want - shown) < 0.00005 ? want : shown + (want - shown) * (1 - Math.pow(1 - FOLLOW, steps));
      if (nextShown !== shown || needsDraw) {
        shown = nextShown;
        needsDraw = false;
        render(shown);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("scroll", begin);
      window.removeEventListener("load", whenIdle);
    };
  }, [reducedMotion]);

  if (reducedMotion) return <>{fallback}</>;

  return (
    <section ref={sectionRef} data-hold-header className="d-none d-md-block" style={{ position: "relative", height: `${(TOTAL_VH + 1) * 100}vh`, padding: 0, background: "#0e1412" }} aria-label="Step Into Your Next Life">
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        <picture>
          {/* Phones never show this section, so they get a 1px placeholder instead of the photo. */}
          <source media="(max-width: 767.98px)" srcSet="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" />
          <img src={STILL("room")} alt="" aria-hidden="true" fetchPriority="high" decoding="async" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        </picture>
        <canvas ref={canvasRef} aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(to right, rgba(8,18,14,.74) 0%, rgba(8,18,14,.52) 32%, rgba(8,18,14,0) 58%)" }} />
        <div style={{ position: "absolute", inset: "0 0 auto", height: 150, pointerEvents: "none", background: "linear-gradient(to bottom, rgba(8,18,14,.5), rgba(8,18,14,0))" }} />
        {CAPTIONS.map((caption, i) => (
          <div
            key={caption.segment}
            ref={(el) => {
              captionRefs.current[i] = el;
            }}
            style={{ position: "absolute", left: "6vw", top: "53%", transform: "translateY(-50%)", width: "min(36vw, 520px)", opacity: i === 0 ? 1 : 0, visibility: i === 0 ? "visible" : "hidden", pointerEvents: "none", display: "grid", gap: 26 }}
          >
            {caption.intro && (
              <div style={{ display: "grid", gap: 10 }}>
                <div className="alt-font text-white fw-600" style={{ fontSize: HEADING_SIZE, lineHeight: 1.05 }}>Step Into Your Next Life</div>
                <p className="alt-font text-white font-style-italic fw-500" style={{ fontSize: "clamp(18px, 1.6vw, 24px)", lineHeight: 1.3, margin: 0 }}>With Clarity, Strength and Inner Alignment.</p>
                <div className="alt-font text-white fw-500" style={{ fontSize: BODY_SIZE, lineHeight: 1.5, marginTop: 6 }}>
                  <h1 className="alt-font text-white fw-600" style={{ fontSize: "inherit", lineHeight: "inherit", letterSpacing: 0, margin: 0 }}>Private Mentorship for High Performers.</h1>
                  Led by <b>Basim Yafai</b>, Mindset &amp; Growth Mentor. Trusted by leaders, entrepreneurs &amp; elite athletes.
                </div>
                <a href="/request-mentorship" className="btn-primary active btn-box-shadow fw-600 hero-btn" style={{ justifySelf: "start", marginTop: 8, marginLeft: 0, pointerEvents: "auto" }}>Request Mentorship</a>
              </div>
            )}
            {caption.heading && (
              <div style={{ display: "grid", gap: 16 }}>
                <div className="alt-font text-white fw-600" style={{ fontSize: HEADING_SIZE, lineHeight: 1.05 }}>{caption.heading}</div>
                <p className="alt-font text-white fw-500" style={{ fontSize: BODY_SIZE, lineHeight: 1.5, margin: 0 }}>{caption.text}</p>
                <a href="/request-mentorship" className="btn-primary active btn-box-shadow fw-600 hero-btn" style={{ justifySelf: "start", marginTop: 8, marginLeft: 0, pointerEvents: "auto" }}>Request Mentorship</a>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
