import Counter from "@/components/ui/Counter";

const stats = [
  { to: 12, suffix: "+", label: "Years Experience" },
  { to: 500, suffix: "+", label: "Clients Mentored" },
  { to: 6000, suffix: "+", label: "Sessions Delivered" },
  { to: 50, suffix: "+", label: "Global Client Base" },
];

export default function StatsCounters() {
  return (
    <section className="bg-pattern-section bg-off-white py-14">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-8 px-5 text-center lg:grid-cols-4 lg:px-10">
        {stats.map((s) => (
          <div key={s.label}>
            <h2 className="relative mb-1 inline-flex font-heading text-4xl font-extrabold tracking-[-1px] text-carbon md:text-5xl">
              <Counter to={s.to} suffix={s.suffix} />
              <span className="absolute bottom-[3px] left-[-3px] -z-10 h-[10px] w-[calc(100%+6px)] bg-emerald opacity-80" />
            </h2>
            <span className="block text-xs font-bold uppercase tracking-wide text-carbon">
              + {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
