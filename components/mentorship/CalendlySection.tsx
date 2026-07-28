import Image from "next/image";
import Script from "next/script";

export default function CalendlySection() {
  return (
    <section className="bg-pattern-section relative overflow-hidden bg-off-white py-10 sm:pt-20 sm:pb-[120px]">
      <link rel="stylesheet" href="https://assets.calendly.com/assets/external/widget.css" />
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />

      <div
        className="calendly-inline-widget mx-auto w-full"
        data-url="https://calendly.com/twolivestheory/mentorship?hide_gdpr_banner=1"
        style={{ minWidth: "320px", height: "100vh" }}
      />

      <div className="absolute right-8 bottom-8 hidden opacity-40 lg:block">
        <Image
          src="/images/tl-circle.svg"
          alt=""
          width={80}
          height={80}
          className="animate-[rotateCircle_20s_linear_infinite]"
        />
      </div>
    </section>
  );
}
