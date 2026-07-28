import Image from "next/image";

export default function MeetFounder() {
  return (
    <section className="bg-pattern-section relative overflow-hidden bg-off-white py-16 md:py-20">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <Image
              src="/images/basim-bg.png"
              alt="Basim"
              width={1144}
              height={1434}
              className="w-full rounded-[10px]"
            />
            <div className="absolute bottom-0 left-0 bg-white px-5 py-[35px] text-center">
              <span className="font-heading text-[30px] leading-tight font-bold tracking-[-2px] text-carbon sm:text-[40px]">
                Two Lives
                <br />
                Theory
                <sup className="ml-1 text-[24px] font-normal">&reg;</sup>
              </span>
            </div>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-shadow-soft mb-5 font-heading text-[32px] font-semibold tracking-[-2px] text-carbon sm:text-[40px]">
              Meet the Founder
            </h2>
            <p className="mb-4 text-slate">
              I&apos;m Basim, Mindset and Growth Mentor with over twelve years
              experience guiding Leaders, Athletes, Entrepreneurs and High
              Competitors through periods of transition, inner realignment,
              and personal evolution.
            </p>
            <p className="mb-4 text-slate">
              I mentor individuals who are outwardly capable and have
              success, yet feel an internal pull toward greater clarity,
              freedom, and alignment. This work is not about fixing what is
              broken. It is about strengthening what already exists so the
              next phase of life is built consciously, not reactively.
            </p>
            <p className="mb-4 text-slate">
              The result is greater focus, cleaner decisions, and
              performance that feels grounded rather than forced.
            </p>
            <p className="font-bold text-carbon">
              This is the foundation of the Two Lives Theory.
            </p>
          </div>
        </div>
      </div>

      <div className="absolute top-[-65px] right-[10%] z-[1] hidden lg:block">
        <Image
          src="/images/tl-circle.svg"
          alt=""
          width={130}
          height={130}
          className="animate-[rotateCircle_18s_linear_infinite]"
        />
      </div>
    </section>
  );
}
