import Link from "next/link";

export type PathStep = { title: string; paragraphs: string[]; highlight?: string };

const defaultSteps: PathStep[] = [
  {
    title: "Pause and Take Stock",
    paragraphs: [
      "You don't start by fixing anything. You start by seeing clearly.",
      "Understand where you are, what's driving you, and what no longer fits.",
      "This creates the space to respond, not react.",
    ],
    highlight: "Clarity reveals what needs to change.",
  },
  {
    title: "Do the Inner Work",
    paragraphs: [
      "Clarity creates direction.",
      "Release old patterns and ways of operating that no longer support who you're becoming.",
      "Strengthen your mind, emotions, and physical foundation.",
    ],
    highlight: "This is where real change happens.",
  },
  {
    title: "Step Forward With Stability",
    paragraphs: [
      "This is where everything integrates.",
      "You begin operating from your next life, not forcing change but embodying it.",
      "Decisions feel clear. Pressure feels lighter. Confidence becomes grounded.",
    ],
    highlight: "You move forward from alignment.",
  },
];

export default function PathSteps({
  heading = "The Path Into Your Next Life",
  steps = defaultSteps,
  cta = true,
}: {
  heading?: string;
  steps?: PathStep[];
  cta?: boolean;
}) {
  return (
    <section className="bg-pattern-section bg-off-white py-16 md:py-20">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <h2 className="text-shadow-soft mb-12 text-center font-heading text-[32px] font-semibold tracking-[-2px] text-carbon sm:text-[40px]">
          {heading}
        </h2>

        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="group text-center">
              <div className="relative mx-auto mb-6 h-[100px] w-[100px] overflow-hidden rounded-full bg-[#2ebb79]">
                <div className="absolute inset-0 rounded-full bg-[#262b35] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative z-[1] flex h-full w-full items-center justify-center font-heading text-[28px] font-semibold text-white">
                  {i + 1}
                </span>
              </div>
              <span className="mb-5 block font-heading text-[22px] font-bold text-carbon">
                {s.title}
              </span>
              {s.paragraphs.map((p) => (
                <p key={p} className="mb-2.5 text-carbon">
                  {p}
                </p>
              ))}
              {s.highlight && <p className="font-bold text-carbon">{s.highlight}</p>}
            </div>
          ))}
        </div>

        {cta && (
          <div className="text-center">
            <Link href="/our-method" className="btn-three">
              Explore The Method
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
