const steps = [
  "Understand Where You Are",
  "Do the Work",
  "Step Into Your Next Life",
];

export default function TransitionRail() {
  return (
    <>
      {/* Desktop floating rail — overlaps the hero/next-section seam */}
      <div className="relative z-30 hidden w-full -mt-[50px] -mb-[60px] justify-center overflow-visible lg:flex">
        <div
          className="absolute left-0 top-0 h-[240px] w-full translate-y-[20px] pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, #0e1412 0%, rgba(14,20,18,0.95) 15%, rgba(14,20,18,0.75) 25%, rgba(14,20,18,0.45) 45%, rgba(14,20,18,0.2) 65%, rgba(14,20,18,0.08) 80%, rgba(14,20,18,0) 100%)",
          }}
        />

        <div
          className="relative mb-[100px] w-4/5 max-w-[1100px] overflow-hidden rounded-[20px] bg-black"
          style={{
            boxShadow:
              "0 18px 40px rgba(0,0,0,0.35), 0 40px 80px rgba(0,0,0,0.25)",
          }}
        >
          <div
            className="animate-floating-glow pointer-events-none absolute left-[-60%] top-0 h-full w-3/5 blur-[20px]"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(0,255,160,0.05), rgba(0,255,160,0.15), rgba(0,255,160,0.25), rgba(0,255,160,0.15), rgba(0,255,160,0.05), transparent)",
            }}
          />
          <div className="relative z-[2] flex items-center justify-between gap-4 px-11 py-7">
            {steps.map((step, i) => (
              <div key={step} className="contents">
                <span className="flex-1 text-center font-heading text-lg font-semibold text-white">
                  {step}
                </span>
                {i < steps.length - 1 && (
                  <span className="flex w-[60px] justify-center text-emerald opacity-90">
                    &rarr;
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile marquee */}
      <div className="relative overflow-hidden bg-black py-[18px] lg:hidden">
        <div
          className="animate-mobile-glow pointer-events-none absolute left-[-60%] top-0 z-[1] h-full w-3/5 blur-[10px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(0,255,160,0.08), rgba(0,255,160,0.22), rgba(0,255,160,0.32), rgba(0,255,160,0.22), rgba(0,255,160,0.08), transparent)",
          }}
        />
        <div className="animate-marquee-fast flex w-max">
          {[0, 1].map((setIdx) => (
            <div key={setIdx} className="flex shrink-0 items-center gap-[72px] pr-[72px]">
              {steps.map((step, i) => (
                <div key={i} className="flex shrink-0 items-center gap-8 whitespace-nowrap">
                  <span className="text-sm font-black text-white">
                    <span className="mr-[7px]">{i + 1}</span>
                    {step}
                  </span>
                  <span className="text-emerald">&rarr;</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
