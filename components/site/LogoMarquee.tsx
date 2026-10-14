import type { CSSProperties } from "react";

/*
 * The scrolling word band ("Clarity. Stability. Alignment. ..."): a Swiper marquee the
 * theme initialises from data-slider-options. The six words run twice so the loop has
 * enough slides; odd slides use the outlined style.
 *
 * `persona` is the layout the four "Who I mentor" pages use (no soft shadow, tighter
 * spacing on phones).
 */
export const marqueeWords = ["Clarity.", "Stability.", "Alignment.", "Control.", "Growth.", "Presence."];

const SLIDER_OPTIONS = '{ "slidesPerView":"auto","spaceBetween":40,"speed":12000,"loop":true,"loopedSlides":6,"loopAdditionalSlides":6,"allowTouchMove":false,"autoplay":{"delay":0,"disableOnInteraction":false,"waitForTransition":true},"freeMode":false,"freeModeMomentum":false }';
const FILLED = "fs-140 lg-fs-130 md-fs-110 sm-fs-90 text-carbon opacity-8 fw-600 ls-minus-6px alt-font";
const OUTLINED = "fs-140 lg-fs-130 md-fs-110 sm-fs-90 fw-600 text-outline text-outline-color-black ls-minus-6px alt-font";

export function LogoMarquee({ variant }: { variant?: "persona" }) {
  const persona = variant === "persona";
  const slides = [...marqueeWords, ...marqueeWords];
  return (
    <section className={persona ? "half-section pb-0 bg-pattern-section sm-pt-65px sm-pb-30px" : "half-section pb-0 bg-pattern-section"}>
      <div className="container-fluid">
        {!persona && <div className="bottom-shadow-soft"></div>}
        <div className="row position-relative pb-5">
          <div className={persona ? "col swiper swiper-width-auto text-center pb-20px md-pb-20px" : "col swiper swiper-width-auto text-center pb-20px md-pb-20px sm-pb-60px"} style={{ "--swiper-wrapper-transition-timing-function": "linear" } as CSSProperties} data-slider-options={SLIDER_OPTIONS}>
            <div className="swiper-wrapper marquee-slide">
              {slides.map((word, i) => (
                <div key={i} className="swiper-slide">
                  <div className={i % 2 ? OUTLINED : FILLED}>{word}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
