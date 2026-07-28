import Link from "next/link";

export default function FinalCta() {
  return (
    <section
      className="relative flex min-h-[500px] items-center justify-center bg-cover bg-center py-20"
      style={{ backgroundImage: "url('/images/cta-image.webp')" }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-8 px-5 text-center lg:flex-row lg:text-left">
        <div>
          <h3 className="mb-2 font-heading text-3xl font-semibold text-white md:text-4xl">
            You&apos;ve Reached a Level Few Ever Do
          </h3>
          <h4 className="font-heading text-2xl font-semibold text-emerald">
            &rarr; Now Outgrow It
          </h4>
        </div>
        <div className="flex flex-col gap-4">
          <Link
            href="/request-mentorship"
            className="rounded-full bg-emerald px-8 py-4 font-heading text-sm font-semibold text-carbon"
          >
            Request Mentorship
          </Link>
          <Link
            href="/explore-your-archetype"
            className="rounded-full border border-white px-8 py-4 font-heading text-sm font-semibold text-white"
          >
            Explore Your Archetype
          </Link>
        </div>
      </div>
    </section>
  );
}
