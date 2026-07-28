import Image from "next/image";
import Link from "next/link";

export default function QuizTeaser() {
  return (
    <section className="bg-off-white py-16 md:py-24">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 px-5 lg:grid-cols-3 lg:px-10">
        <div className="order-2 lg:order-1 lg:col-span-2">
          <div className="flex min-h-[60vh] flex-col justify-center rounded-[20px] bg-[rgba(14,20,18,0.75)] p-6 backdrop-blur-xl md:p-12">
            <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
              <span className="h-2 w-2 rounded-full bg-emerald shadow-[0_0_0_6px_rgba(0,225,132,0.18)]" />
              Free Assessment
            </span>
            <h2 className="mb-4 font-heading text-3xl font-semibold text-white">
              Explore Your Archetype
            </h2>
            <p className="mb-6 text-white/70">
              Take a short assessment to understand where you are today, and
              which patterns are shaping how you perform, lead, and grow.
            </p>
            <Link href="/explore-your-archetype" className="btn-cta w-fit">
              Take the Assessment
            </Link>
          </div>
        </div>
        <div className="order-1 mx-auto max-w-[220px] lg:order-2 lg:col-span-1 lg:max-w-sm">
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
