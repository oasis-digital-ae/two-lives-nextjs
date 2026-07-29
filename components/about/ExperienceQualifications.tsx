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

export default function ExperienceQualifications() {
  return (
    <section className="basim-preview-section relative overflow-hidden bg-pattern-section bg-off-white pt-12 pb-16 md:pt-16">
      <div className="corner-svg">
        <Image src="/img/bg-icon.svg" alt="" width={500} height={500} />
      </div>

      <div className="relative z-[1] mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative mx-auto max-w-md text-center lg:mx-0">
            <div className="pointer-events-none absolute top-1/2 left-1/2 z-[2] -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="block font-heading text-[75px] leading-none font-extrabold tracking-[-10px] text-carbon/80 sm:text-[130px] lg:text-[160px]">
                12<sub className="text-[45px] font-extrabold sm:text-[75px]">+</sub>
              </span>
              <span className="mx-auto block w-4/5 text-[20px] font-medium text-carbon/80">
                Years of Guidance
              </span>
            </div>
            <Image src="/images/as-1.png" alt="" width={800} height={900} className="w-full" />
            <Image
              src="/images/as-3.png"
              alt=""
              width={300}
              height={300}
              className="absolute top-1/2 left-[-10%] hidden w-1/3 -translate-y-1/2 lg:block"
            />
            <Image
              src="/images/tl-circle.svg"
              alt=""
              width={170}
              height={170}
              className="absolute top-0 right-5 hidden brightness-0 md:block"
            />
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-shadow-soft mb-5 font-heading text-[32px] font-semibold tracking-[-2px] text-carbon sm:text-[40px]">
              Experience & Foundation
            </h2>
            <p className="mb-4 text-slate">
              My mentoring is shaped by over a decade of professional
              training and lived experience.
            </p>
            <p className="mb-4 font-semibold text-carbon italic">
              Working with elite performers from UFC and Premiership football
              athletes to professional poker players and business leaders.
            </p>
            <p className="mb-4 text-slate">
              I am accredited with the International Coaching Federation
              (ICF) at PCC Level 2, with qualifications spanning mindset
              work, counselling skills, life coaching, neuro linguistic
              programming, hypnosis, and performance coaching.
            </p>
            <p className="mb-4 text-slate">
              This foundation allows me to work with discernment, depth, and
              integrity &mdash; not theory alone.
            </p>

            <div className="hidden justify-center lg:flex">
              <Link href="/request-mentorship" className="btn-three">
                Request Mentorship
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-center lg:hidden">
          <Link href="/request-mentorship" className="btn-three">
            Request Mentorship
          </Link>
        </div>

        <h2 className="text-shadow-soft mt-16 mb-8 text-center font-heading text-[32px] font-semibold tracking-[-2px] text-carbon sm:text-[40px] lg:text-left">
          Qualifications
        </h2>
        <div className="grid grid-cols-2 gap-6 text-center sm:grid-cols-3 lg:grid-cols-6">
          {qualifications.map(({ Icon, label }) => (
            <div key={label} className="icon-card group">
              <Icon className="mx-auto mb-3 h-10 w-10 text-[#002918] transition-transform duration-[250ms] group-hover:-translate-y-[3px] group-hover:scale-105 group-hover:text-[#04e184]" />
              <h6 className="mb-0 text-[14px] leading-4 font-semibold text-carbon">
                {label}
              </h6>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
