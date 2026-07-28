const rows = [
  "High performers don't fail. They outgrow the life they built.",
  "Success continues on the outside, while something internally no longer fits. Pressure builds. Clarity fades. The next chapter is felt, but not yet defined.",
  "Without inner alignment, external success starts to cost you.",
];

export default function TransitionMattersList() {
  return (
    <section className="bg-pattern-section bg-off-white py-16 md:py-20">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="text-center lg:col-span-5 lg:text-left">
            <h2 className="text-shadow-soft font-heading text-[32px] font-semibold tracking-[-2px] text-carbon sm:text-[40px]">
              Why Transition Work{" "}
              <span className="border-b-2 border-carbon">Matters:</span>
            </h2>
          </div>

          <div className="lg:col-span-7">
            {rows.map((text, i) => (
              <div key={i} className={`flex gap-6 ${i < rows.length - 1 ? "mb-10" : ""}`}>
                <span className="font-heading text-[32px] font-semibold text-carbon">
                  {i + 1}
                </span>
                <p className="text-lg font-medium text-carbon">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
