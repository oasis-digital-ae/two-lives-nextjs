import Image from "next/image";
import Link from "next/link";
import {
  AwardIcon,
  DumbbellIcon,
  EyeIcon,
  GraduationCapIcon,
  LightbulbIcon,
  LightningIcon,
} from "@/components/ui/Icons";

const qualifications = [
  { Icon: LightbulbIcon, label: "Master NLP Practitioner & Life Coach" },
  { Icon: GraduationCapIcon, label: "BSc Honours Sports Coaching Science" },
  { Icon: EyeIcon, label: "Hypnosis Practitioner" },
  { Icon: LightningIcon, label: "Former Professional Rugby Player" },
  { Icon: AwardIcon, label: "ICF PCC Accredited Training" },
  { Icon: DumbbellIcon, label: "Strength & Conditioning Coach" },
];

export default function MeetBasim() {
  return (
    <section className="relative overflow-hidden bg-off-white py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative mx-auto max-w-md lg:mx-0 lg:ml-auto">
            <Image
              src="/images/about-basim-tpt.png"
              alt="Basim Yafai"
              width={800}
              height={900}
              className="w-full rounded-lg"
            />
            <div className="absolute -bottom-6 left-1/2 flex w-[90%] -translate-x-1/2 items-center gap-3 rounded-xl bg-carbon px-5 py-4 shadow-lg">
              <Image
                src="/images/twoliveslogo.svg"
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 shrink-0"
              />
              <div>
                <span className="block font-heading text-sm font-semibold text-white">
                  Basim Yafai
                </span>
                <span className="block text-xs text-white/70">
                  Founder of Two Lives Theory&reg;
                </span>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-4 text-slate">
              I guide high performers through expansion and transition. My
              clients include elite athletes, entrepreneurs, and business
              leaders operating at the next level.
            </p>
            <p className="mb-4 text-slate">
              Backed by <b>12 years of experience</b> and{" "}
              <b>ICF PCC accreditation training</b>, this work is built on
              the Two Lives Theory &mdash; strengthening what you&apos;ve
              built while aligning you for what comes next.
            </p>
            <p className="mb-8 text-slate">
              Having navigated major life transitions myself, I bring lived
              understanding alongside over twelve years of experience
              mentoring high performers. My focus is depth and integration,
              not motivation or quick fixes.
            </p>

            <div className="mb-8 grid grid-cols-2 gap-6 sm:grid-cols-3">
              {qualifications.map(({ Icon, label }) => (
                <div key={label} className="text-center">
                  <Icon className="mx-auto mb-3 h-9 w-9 text-emerald" />
                  <h6 className="font-heading text-xs font-semibold leading-tight text-carbon">
                    {label}
                  </h6>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/about"
                className="rounded-full bg-carbon px-6 py-3 font-heading text-sm font-semibold text-white"
              >
                More About Basim &rarr;
              </Link>
              <Link
                href="/request-mentorship"
                className="rounded-full bg-emerald px-6 py-3 font-heading text-sm font-semibold text-carbon"
              >
                Request Mentorship
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 select-none font-heading text-[10rem] font-bold uppercase text-carbon/5 md:block"
      >
        Two Lives Theory
      </div>
    </section>
  );
}
