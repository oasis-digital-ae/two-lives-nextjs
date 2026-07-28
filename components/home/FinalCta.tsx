import Link from "next/link";

export default function FinalCta() {
  return (
    <section
      className="relative flex h-[600px] items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/cta-image.webp')" }}
    >
      <div className="absolute inset-0 bg-black opacity-75" />
      <div className="relative z-10 mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-8 px-5 text-center lg:flex-row lg:text-left">
        <div>
          <h3 className="mb-2 inline-block align-middle font-heading text-[32px] font-semibold text-white sm:text-[40px]">
            You&apos;ve Reached a Level Few Ever Do
          </h3>
          <h4 className="inline-block align-middle font-heading text-[24px] font-semibold text-emerald sm:text-[30px]">
            &rarr; Now Outgrow It
          </h4>
        </div>
        <div className="flex flex-col gap-4">
          <Link href="/request-mentorship" className="btn-cta">
            Request Mentorship
          </Link>
          <Link href="/explore-your-archetype" className="btn-archetype">
            Explore Your Archetype
          </Link>
        </div>
      </div>
    </section>
  );
}
