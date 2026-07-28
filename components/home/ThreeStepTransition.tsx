import Image from "next/image";

const phases = [
  {
    number: "01",
    phase: "Phase One",
    label: "Awareness",
    title: "Awareness Before Change",
    image: "/images/awareness.png",
    paragraphs: [
      "Before anything changes externally, clarity is built internally.",
      "This phase is about understanding the patterns, emotional responses, and internal pressures shaping your current life. Not to fix them, but to see them clearly. Awareness creates stability and allows the next phase to be entered consciously, not reactively.",
    ],
  },
  {
    number: "02",
    phase: "Phase Two",
    label: "Integration and Release",
    title: "Integration & Release",
    image: "/images/intergration.png",
    paragraphs: [
      "“Growth does not come from pushing forward. It comes from integration.”",
      "This phase requires patience and respect for your pace.",
      "Nothing is rushed. The work unfolds around your life, not against it. What needs to be acknowledged, processed, or released is handled with intention, so it no longer controls the present. What serves you is strengthened. What doesn’t is let go.",
    ],
  },
  {
    number: "03",
    phase: "Phase Three",
    label: "Alignment",
    title: "Alignment Into Your Next Life",
    image: "/images/alignment.png",
    paragraphs: [
      "When clarity and internal stability are established, direction no longer needs to be forced. It becomes obvious.",
      "This is where your inner world and outer life begin to align. Decisions are made with confidence, not doubt. Energy becomes consistent, not reactive. You move through work, relationships, and life with greater ease, clarity, and self-trust.",
      "“Your next life isn’t forced. It’s built from clarity.”",
    ],
  },
];

export default function ThreeStepTransition() {
  return (
    <section className="bg-off-white py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="mb-2 font-heading text-lg font-semibold text-sea-green">
          The 3-Step Transition
        </h2>
        <h2 className="mb-6 font-heading text-3xl font-semibold text-carbon md:text-4xl">
          The Transition From Your Old Life to Your Next Life
        </h2>
        <p className="mx-auto max-w-2xl text-slate">
          This transition isn&apos;t about force, reinvention, or walking away
          from what you&apos;ve built. It&apos;s a process of strengthening
          and realignment that unfolds in clear phases, allowing growth
          without disruption.
        </p>
      </div>

      <div className="mt-14 flex flex-col gap-16">
        {phases.map((p, i) => (
          <div
            key={p.number}
            className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-8 px-5 lg:grid-cols-2 lg:px-10"
          >
            <div className={`relative aspect-[4/3] ${i % 2 === 1 ? "lg:order-2" : ""}`}>
              <Image src={p.image} alt={p.label} fill className="rounded-lg object-cover" />
              <span className="absolute -right-4 -top-6 font-heading text-8xl font-bold text-sea-green/10 md:text-9xl">
                {p.number}
              </span>
            </div>
            <div className={i % 2 === 1 ? "lg:order-1" : ""}>
              <span className="mb-2 block text-sm font-semibold uppercase tracking-wide text-sea-green">
                {p.phase}
              </span>
              <h2 className="mb-4 font-heading text-3xl font-semibold text-carbon">
                {p.title}
              </h2>
              {p.paragraphs.map((para, idx) => (
                <p key={idx} className="mb-3 text-slate last:mb-0">
                  {para}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
