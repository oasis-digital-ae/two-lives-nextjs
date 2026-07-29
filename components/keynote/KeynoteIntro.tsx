import { ActivityIcon, TargetIcon, ColumnsIcon, CompassIcon } from "@/components/ui/Icons";

const features = [
  {
    Icon: ActivityIcon,
    title: "Real-World Environments",
    desc: "Designed for spaces where pressure is high, change is constant, and performance is expected.",
  },
  {
    Icon: TargetIcon,
    title: "Inner Alignment & Performance",
    desc: "Helping individuals understand how internal alignment impacts leadership, decisions, and results.",
  },
  {
    Icon: ColumnsIcon,
    title: "Built on Two Lives Theory",
    desc: "Grounded in a proven framework focused on strengthening what already exists, not fixing what is broken.",
  },
  {
    Icon: CompassIcon,
    title: "Beyond Motivation",
    desc: "Not surface-level inspiration. Grounded, human, and deeply relatable.",
  },
];

export default function KeynoteIntro() {
  return (
    <section className="bg-pattern-section bg-off-white py-16 md:py-20">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="mb-12 grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <div className="text-center lg:col-span-7 lg:text-left">
            <span className="bg-radial mb-5 inline-block rounded-full px-5 py-2 text-[11px] font-semibold tracking-wide text-white uppercase">
              Basim Yafai - Keynote Speaker
            </span>
            <h3 className="text-shadow-soft font-heading text-[32px] font-semibold tracking-[-1px] text-carbon sm:text-[40px]">
              About the Keynote Talks
            </h3>
          </div>
          <div className="text-center lg:col-span-5 lg:text-left">
            <p className="text-shadow-soft font-semibold text-carbon">
              I deliver keynote talks for organisations and events operating under pressure, where performance is
              expected and clarity matters.
            </p>
          </div>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ Icon, title, desc }) => (
            <div key={title} className="text-center lg:text-left">
              <Icon className="text-dark-green mx-auto mb-5 h-[42px] w-[42px] lg:mx-0" />
              <span className="mb-1 block font-heading text-[22px] font-black tracking-[-0.5px] text-carbon">
                {title}
              </span>
              <p className="text-slate">{desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-shadow-soft mx-auto mb-8 max-w-2xl font-semibold text-carbon">
            The focus is not just inspiration, but real internal alignment — supporting wellbeing while
            strengthening how people think, decide, and perform.
          </p>
          <div className="inline-flex items-center gap-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7 text-carbon">
              <path d="m5 12 5 5L19 8" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            <span className="font-heading text-[20px] font-medium tracking-[-0.5px] text-carbon">
              Delivered to audiences worldwide.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
