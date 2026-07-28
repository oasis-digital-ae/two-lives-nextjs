const steps = [
  "Understand Where You Are",
  "Do the Work",
  "Step Into Your Next Life",
];

export default function TransitionRail() {
  return (
    <div className="relative z-10 bg-carbon">
      {/* Desktop rail */}
      <div className="mx-auto hidden max-w-4xl items-center justify-center gap-4 py-6 md:flex">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center gap-4">
            <span className="font-heading text-sm font-bold text-white">{step}</span>
            {i < steps.length - 1 && <span className="text-emerald">&rarr;</span>}
          </div>
        ))}
      </div>

      {/* Mobile marquee */}
      <div className="overflow-hidden py-4 md:hidden">
        <div className="flex w-max animate-marquee gap-8">
          {[...steps, ...steps].map((step, i) => (
            <div key={i} className="flex shrink-0 items-center gap-3 px-2">
              <span className="text-sm font-bold text-white">
                <span className="mr-2 text-emerald">{(i % 3) + 1}</span>
                {step}
              </span>
              <span className="text-emerald">&rarr;</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
