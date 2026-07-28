"use client";

import Image from "next/image";
import Link from "next/link";
import { useCarousel } from "@/components/ui/Carousel";

export default function GrowthSplit({
  heading,
  image,
  imageAlt,
  sideHeading,
  sideParagraph,
  steps,
  closing,
}: {
  heading: string;
  image: string;
  imageAlt: string;
  sideHeading: string;
  sideParagraph: string;
  steps: { title: string; desc: string }[];
  closing: string;
}) {
  const { emblaRef } = useCarousel({ align: "start" });

  return (
    <section className="bg-pattern-section relative overflow-hidden bg-off-white pt-16 pb-8 md:pt-20">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="mb-10 text-center">
          <h2 className="text-shadow-soft mx-auto max-w-4xl font-heading text-[32px] font-semibold tracking-[-2px] text-carbon sm:text-[50px]">
            {heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="relative mx-auto max-w-md lg:col-span-6 lg:ml-auto">
            <Image src={image} alt={imageAlt} width={800} height={900} className="w-full rounded-lg" />
            <div className="animate-float absolute bottom-6 left-[-24px] w-[200px] rounded-[5px] bg-carbon pt-5 text-center shadow-2xl">
              <Image
                src="/images/twoliveslogo.svg"
                alt=""
                width={90}
                height={90}
                className="mx-auto mb-4 h-[90px] w-[90px]"
              />
              <Link
                href="/request-mentorship"
                className="block bg-emerald px-4 py-3 text-xs font-bold tracking-wide text-carbon uppercase"
              >
                Request Mentorship
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <h3 className="text-shadow-soft mb-4 text-center font-heading text-[28px] font-semibold tracking-[-2px] text-carbon sm:text-[40px] lg:text-left">
              {sideHeading}
            </h3>
            <p className="mb-8 text-center text-slate lg:text-left">{sideParagraph}</p>

            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-6">
                {steps.map((step, i) => (
                  <div
                    key={step.title}
                    className="min-w-0 flex-[0_0_100%] rounded-[10px] bg-[#F9F9F7] p-8 pl-[100px] sm:flex-[0_0_85%]"
                    style={{ position: "relative" }}
                  >
                    <span className="text-dark-green absolute top-5 left-[30px] font-heading text-[60px] font-semibold opacity-30">
                      {i + 1}
                    </span>
                    <p className="mb-3 font-heading text-lg font-semibold text-carbon">
                      {step.title}
                    </p>
                    <p className="text-sm text-slate">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-12 w-4/5 text-center font-heading text-lg font-semibold text-carbon sm:w-3/5 sm:text-2xl">
          {closing}
        </p>
      </div>
    </section>
  );
}
