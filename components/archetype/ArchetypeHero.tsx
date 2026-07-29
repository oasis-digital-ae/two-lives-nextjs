import Image from "next/image";

export default function ArchetypeHero() {
  return (
    <section className="bg-carbon pt-32 pb-0 text-white sm:pt-40">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 px-5 lg:grid-cols-12 lg:px-10">
        <div className="text-center lg:col-span-7 lg:text-left">
          <h1 className="font-heading text-[26px] leading-tight font-semibold tracking-[-2px] text-white sm:text-[52px]">
            <span className="highlighter-below animate">Discover</span> Your Archetype
          </h1>
          <p className="mt-3 font-heading text-[20px] font-semibold tracking-[-1px] text-white md:text-[28px] lg:text-[40px]">
            A Clearer View of Where You Are.
          </p>
        </div>

        <div className="mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <Image
            src="/images/quiz-laptop.png"
            alt=""
            width={2708}
            height={2467}
            className="h-auto w-full"
            priority
          />
        </div>
      </div>
    </section>
  );
}
