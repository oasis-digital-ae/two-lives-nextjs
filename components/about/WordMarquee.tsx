const words = ["Clarity.", "Stability.", "Alignment.", "Control.", "Growth.", "Presence."];

export default function WordMarquee() {
  return (
    <section className="bg-pattern-section overflow-hidden bg-off-white py-8">
      <div className="flex w-max animate-marquee gap-20">
        {Array.from({ length: 2 }).map((_, setIndex) =>
          words.map((word, i) => (
            <span
              key={`${setIndex}-${i}`}
              className={
                i % 2 === 0
                  ? "font-heading text-[70px] font-semibold tracking-[-6px] text-carbon/80 sm:text-[110px] lg:text-[130px]"
                  : "font-heading text-[70px] font-semibold tracking-[-6px] text-transparent [-webkit-text-stroke:1px_black] sm:text-[110px] lg:text-[130px]"
              }
            >
              {word}
            </span>
          ))
        )}
      </div>
    </section>
  );
}
