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

export default function CaseStudies() {
  return (
    <section className="bg-off-white py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="mb-10 max-w-2xl">
          <h2 className="mb-3 font-heading text-3xl font-semibold text-carbon md:text-4xl">
            Real Client Transformations
          </h2>
          <p className="text-slate">
            A closer look at how Two Lives Theory unfolds over time. These
            are real transitions, showing how clarity, alignment, and
            self-leadership create sustainable success.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {cases.map((c) => (
            <Link key={c.href} href={c.href} className="group block">
              <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-sea-green">
                {c.role}
              </p>
              <h3 className="mb-2 font-heading text-xl font-bold text-carbon">{c.title}</h3>
              <p className="mb-3 text-slate">{c.desc}</p>
              <span className="font-heading text-sm font-semibold text-carbon group-hover:underline">
                View Case Study &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
