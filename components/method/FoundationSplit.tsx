import Image from "next/image";

export default function FoundationSplit() {
  return (
    <section className="bg-pattern-section bg-off-white py-16 md:py-20">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="relative">
            <Image
              src="/images/method-intro.png"
              alt=""
              width={800}
              height={900}
              className="w-full rounded-[10px]"
            />
            <div className="absolute bottom-0 left-0 bg-white px-5 py-[35px] text-center">
              <span className="block font-heading text-[60px] leading-none font-bold tracking-[-2px] text-carbon sm:text-[90px]">
                12<sub className="text-[30px] font-normal">+</sub>
              </span>
              <span className="mx-auto block w-[200px] text-center text-[14px] font-semibold text-carbon uppercase">
                Years of Guidance
              </span>
            </div>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-shadow-soft mb-5 font-heading text-[32px] font-semibold tracking-[-2px] text-carbon sm:text-[40px]">
              The Foundation of Two Lives Theory
            </h2>
            <p className="mb-4 font-bold text-carbon">
              Two Lives Theory is built on one principle:
            </p>
            <p className="mb-4 text-slate">
              You don&apos;t create your next life by forcing change. You
              create it by stabilising your inner world first.
            </p>
            <p className="mb-4 text-slate">
              When the mind, body, emotions, and identity are aligned,
              decisions become clean, pressure softens, and change unfolds
              without collapse.
            </p>
            <p className="mb-4 text-slate">
              This is not self-improvement. It is conscious transition.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
