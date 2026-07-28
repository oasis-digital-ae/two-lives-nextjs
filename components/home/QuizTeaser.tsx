import Image from "next/image";
import Link from "next/link";

export default function QuizTeaser() {
  return (
    <section className="bg-off-white py-16 md:py-24">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 px-5 lg:grid-cols-2 lg:px-10">
        <div className="order-2 lg:order-1">
          <div className="rounded-2xl bg-white p-8 shadow-lg md:p-12">
            <span className="mb-3 block text-sm font-semibold uppercase tracking-wide text-sea-green">
              Free Assessment
            </span>
            <h2 className="mb-4 font-heading text-3xl font-semibold text-carbon">
              Explore Your Archetype
            </h2>
            <p className="mb-6 text-slate">
              Take a short assessment to understand where you are today, and
              which patterns are shaping how you perform, lead, and grow.
            </p>
            <Link
              href="/explore-your-archetype"
              className="inline-block rounded-full bg-carbon px-6 py-3 font-heading text-sm font-semibold text-white"
            >
              Take the Assessment
            </Link>
          </div>
        </div>
        <div className="order-1 mx-auto max-w-xs lg:order-2 lg:max-w-sm">
          <Image
            src="/images/phone-quiz-2.png"
            alt="Explore Your Archetype"
            width={800}
            height={1200}
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}
