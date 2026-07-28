const steps = [
  {
    title: "Awareness, Resilience & Clarity",
    desc: "Strengthening emotional awareness to remain stable, clear, and composed under pressure and change.",
  },
  {
    title: "Burnout Reduction",
    desc: "Reducing internal overload, mental fatigue, and hidden strain on performance.",
  },
  {
    title: "Self-Leadership",
    desc: "Developing ownership, accountability, and conscious leadership.",
  },
  {
    title: "Sustainable Performance",
    desc: "Maintaining high standards without sacrificing wellbeing or long term performance.",
  },
];

export default function OrganisationGains() {
  return (
    <section className="bg-pattern-section bg-off-white py-16 md:py-20">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="mb-12 grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
          <div className="text-center lg:col-span-7 lg:text-left">
            <h2 className="text-shadow-soft font-heading text-[32px] font-semibold tracking-[-1px] text-carbon sm:text-[40px]">
              What Organisations and Events Gain.
            </h2>
          </div>
          <div className="text-center lg:col-span-5 lg:text-left">
            <p className="text-shadow-soft font-medium text-carbon">
              Strengthening performance without sacrificing wellbeing.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.title} className="text-center">
              <span className="font-heading text-2xl font-bold text-carbon">{i + 1}</span>
              <div className="relative my-4">
                <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-carbon/20" />
                <span className="relative mx-auto flex h-[30px] w-[30px] items-center justify-center rounded-full bg-mist">
                  <span className="h-2 w-2 rounded-full bg-emerald" />
                </span>
              </div>
              <span className="mb-1.5 block font-heading text-lg font-semibold text-carbon">{s.title}</span>
              <p className="mx-auto w-4/5 text-slate">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
