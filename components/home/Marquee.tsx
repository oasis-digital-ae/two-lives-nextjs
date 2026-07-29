export default function Marquee() {
  return (
    <section className="bg-pattern-section overflow-hidden bg-off-white py-8">
      <div className="flex w-max animate-marquee gap-20">
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className="font-heading text-[100px] font-bold uppercase tracking-[-5px] text-carbon sm:text-[140px] lg:text-[180px]"
          >
            Two Lives Theory
          </span>
        ))}
      </div>
    </section>
  );
}
