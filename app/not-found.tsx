import type { Metadata } from "next";
import Link from "next/link";
import FinalCta from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "Page Not Found | Two Lives Theory",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <section className="bg-pattern-section flex min-h-[550px] items-center bg-mist pt-32 pb-16 text-carbon sm:pt-40 lg:min-h-screen">
        <div className="mx-auto max-w-2xl px-5 text-center">
          <h6 className="mb-[5px] font-heading text-[28px] leading-[1.2] font-semibold text-carbon uppercase">
            Sorry!
          </h6>
          <h1 className="font-heading text-[170px] leading-none font-bold tracking-[-8px] text-carbon sm:text-[200px]">
            404
          </h1>
          <h4 className="mb-[10px] font-heading text-[22px] font-semibold tracking-[-1px] text-carbon sm:text-[38px]">
            Page not found!
          </h4>
          <p className="mx-auto mb-[30px] max-w-md leading-[28px] text-carbon">
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
