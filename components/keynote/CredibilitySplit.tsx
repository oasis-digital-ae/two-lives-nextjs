import Image from "next/image";
import { PeopleIcon } from "@/components/ui/Icons";

export default function CredibilitySplit() {
  return (
    <section className="bg-pattern-section bg-off-white pb-16 md:pb-20">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="relative">
            <Image
              src="/images/keynote-intro.png"
              alt=""
              width={1200}
              height={900}
              className="w-full rounded-[10px]"
            />
            <div className="absolute bottom-6 left-6 rounded-[15px] bg-white px-6 py-4 shadow-[0_20px_45px_rgba(14,20,18,0.18)]">
              <p className="text-carbon">
                <span className="font-heading text-[50px] leading-none font-bold">12</span>{" "}
                <span className="font-medium">Years of Guidance</span>
              </p>
            </div>
          </div>

          <div className="text-center lg:text-left">
            <span className="bg-radial mb-5 inline-block rounded-full px-5 py-2 text-[11px] font-semibold tracking-wide text-white uppercase">
              Experience &amp; Credibility
            </span>
            <h2 className="text-shadow-soft mb-3 font-heading text-[28px] font-semibold tracking-[-1px] text-carbon sm:text-[36px]">
              Trusted in High-Performance Environments
            </h2>
            <p className="mb-6 text-slate">Delivering keynote talks across corporate, wellbeing, and global events.</p>

            <div className="mb-6 flex items-start gap-5 rounded-[6px] bg-white p-6 shadow-[0_20px_45px_rgba(14,20,18,0.1)]">
              <PeopleIcon className="h-8 w-8 flex-none text-carbon" />
              <div>
                <span className="mb-1 block font-semibold text-carbon">Grounded in Real Experience</span>
                <p className="text-sm text-slate">
                  Speaking to the moment where success begins to feel misaligned and a new way of leading is
                  required.
                </p>
              </div>
            </div>

            <p className="text-shadow-soft mb-6 font-heading text-2xl font-semibold text-carbon">
              Calm. Insightful. Impactful.
            </p>

            <a href="mailto:basim@twolivestheory.com" className="btn-three">
              Contact Basim
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
