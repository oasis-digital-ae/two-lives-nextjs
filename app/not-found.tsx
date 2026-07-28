import Link from "next/link";
import FinalCta from "@/components/home/FinalCta";

export default function NotFound() {
  return (
    <>
      <section className="bg-pattern-section flex min-h-[70vh] items-center bg-mist pt-32 pb-16 text-carbon sm:pt-40">
        <div className="mx-auto max-w-2xl px-5 text-center">
          <h6 className="mb-1 text-sm font-semibold tracking-wide text-carbon uppercase">Sorry!</h6>
          <h1 className="font-heading text-[120px] leading-none font-bold tracking-[-6px] text-carbon sm:text-[200px]">
            404
          </h1>
          <h4 className="mb-2.5 font-heading text-xl font-semibold text-carbon sm:text-2xl">Page not found!</h4>
          <p className="mx-auto mb-8 max-w-md text-carbon/80">
            The page you are looking for doesn&apos;t exist or might have been removed.
          </p>
          <Link href="/" className="btn-cta">
            &larr; Back to homepage
          </Link>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
