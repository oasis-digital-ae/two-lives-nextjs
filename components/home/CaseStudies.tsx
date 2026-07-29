import Image from "next/image";
import Link from "next/link";

const cases = [
  {
    href: "/case-study/elite-athlete",
    role: "Elite Sports Person",
    title: "Private Client",
    image: "/images/two-lives/athlete-case-study.png",
    desc: "Already performing at the highest level, this journey focused on strengthening mindset, focus, and balance while navigating sustained pressure and visibility.",
  },
  {
    href: "/case-study/entrepreneur",
    role: "Entrepreneur",
    title: "Grant Gardner",
    image: "/images/grant-case-study.png",
    desc: "A period of external success paired with growing internal pressure led Grant to explore a different way of relating to himself.",
  },
  {
    href: "/case-study/business-ceo",
    role: "Business Owner & CEO",
    title: "Private Client",
    image: "/images/CEO-case-study.png",
    desc: "A period of sustained responsibility and growth led this client to seek a different way of relating to pressure, leadership, and life.",
  },
];

export default function CaseStudies({
  heading = "Real Client Transformations",
  description = (
    <p className="text-carbon">
      A closer look at how Two Lives Theory unfolds over time. These are real
      transitions, showing how clarity, alignment, and self-leadership create
      sustainable success.
    </p>
  ),
  headingSize = "default",
}: {
  heading?: React.ReactNode;
  description?: React.ReactNode | null;
  headingSize?: "default" | "large";
}) {
  return (
    <section className="bg-pattern-section bg-off-white py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2
            className={`text-shadow-soft mb-2.5 font-heading font-semibold tracking-[-2px] text-carbon ${
              headingSize === "large" ? "text-[50px]" : "text-[30px] sm:text-[40px]"
            }`}
          >
            {heading}
          </h2>
          {description}
        </div>

        <div className="grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group flex h-full flex-col overflow-hidden rounded-[10px] border border-white/30 bg-white/20 shadow-[0_18px_45px_rgba(14,20,18,0.12)] backdrop-blur-[18px] transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/25 hover:shadow-[0_24px_60px_rgba(14,20,18,0.16)]"
            >
              <div className="h-[240px] shrink-0 overflow-hidden">
                <Image
                  src={c.image}
                  alt={c.title}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col bg-gradient-to-b from-white/8 to-white/2 p-7">
                <p className="mb-1 text-sm font-medium text-carbon">{c.role}</p>
                <h3 className="mb-3 font-heading text-[22px] font-bold text-carbon">{c.title}</h3>
                <p className="mb-auto text-sm leading-[1.7] text-carbon/85">{c.desc}</p>

                <div className="mt-5 inline-block h-4 w-fit overflow-hidden">
                  <span className="block text-xs font-semibold tracking-wide whitespace-nowrap text-carbon uppercase transition-transform duration-300 group-hover:-translate-y-full">
                    View Case Study
                  </span>
                  <span className="block text-xs font-semibold tracking-wide whitespace-nowrap text-carbon uppercase underline transition-transform duration-300 group-hover:-translate-y-full">
                    Read the full case study
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
