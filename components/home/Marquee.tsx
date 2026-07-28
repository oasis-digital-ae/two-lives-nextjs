export default function Marquee() {
  return (
    <section className="overflow-hidden bg-off-white py-8">
      <div className="flex w-max animate-marquee gap-20">
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className="font-heading text-6xl font-bold uppercase tracking-tight text-carbon md:text-8xl"
          >
            Two Lives Theory
          </span>
        ))}
      </div>
    </section>
  );
}
