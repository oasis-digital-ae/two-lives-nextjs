import Link from "next/link";

const steps = [
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

export default function PathSteps() {
  return (
    <section className="bg-off-white py-16 md:py-20">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <h2 className="mb-12 text-center font-heading text-3xl font-semibold text-carbon md:text-4xl">
          The Path Into Your Next Life
        </h2>

        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="text-center">
              <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-emerald">
                <span className="font-heading text-2xl font-bold text-carbon">{i + 1}</span>
              </div>
              <span className="mb-4 block font-heading text-xl font-bold text-carbon">
                {s.title}
              </span>
              {s.paragraphs.map((p) => (
                <p key={p} className="mb-2 text-slate">
                  {p}
                </p>
              ))}
              <p className="font-bold text-carbon">{s.highlight}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/our-method"
            className="inline-block rounded-full bg-carbon px-6 py-3 font-heading text-sm font-semibold text-white"
          >
            Explore The Method
          </Link>
        </div>
      </div>
    </section>
  );
}
