const rows = [
  {
    title: "Integrated, not fragmented.",
    desc: "I guide you across the mental, emotional, spiritual, and physical through a deeply considered process.",
  },
  {
    title: "The work beneath the surface.",
    desc: "This can involve reflection, emotional processing, and releasing old patterns or grounding into clarity and aligned action.",
  },
  {
    title: "No formula. No rush.",
    desc: "Growth happens with your life, not at the expense of it.",
  },
];

export default function MyApproach() {
  return (
    <section className="bg-pattern-section bg-off-white py-16 md:py-20">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="text-center lg:col-span-5 lg:text-left">
            <h2 className="text-shadow-soft mb-3 font-heading text-[32px] font-semibold tracking-[-2px] text-carbon sm:text-[40px]">
              My <span className="highlighter-below animate">Approach</span>
            </h2>
            <h3 className="text-shadow-soft mx-auto w-4/5 font-heading text-xl font-medium text-carbon lg:mx-0 lg:w-full">
              This is mentoring, not motivation and not quick fixes.
            </h3>
          </div>

          <div className="lg:col-span-7">
            {rows.map((row, i) => (
              <div key={row.title}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
                  <div className="font-heading text-[22px] font-semibold text-carbon md:col-span-5">
                    {row.title}
                  </div>
                  <div className="text-slate md:col-span-7">
                    <p>{row.desc}</p>
                  </div>
                </div>
                {i < rows.length - 1 && (
                  <div className="my-10 border-b border-carbon/10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
