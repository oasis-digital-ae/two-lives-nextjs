import Image from "next/image";
import Script from "next/script";

export default function CalendlySection() {
  return (
    <section className="bg-pattern-section relative bg-off-white py-12 max-md:pt-[20%] max-md:pb-[120px]">
      <link rel="stylesheet" href="https://assets.calendly.com/assets/external/widget.css" />
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />

      <div
        className="calendly-inline-widget mx-auto w-full"
        data-url="https://calendly.com/twolivestheory/mentorship?hide_gdpr_banner=1"
        style={{ minWidth: "320px", height: "100vh" }}
      />

      <div className="pointer-events-none !absolute inset-x-0 bottom-0 !z-[2] h-[240px] bg-gradient-to-b from-[rgba(21,25,22,0)] from-70% via-[rgba(21,25,22,0.55)] via-90% to-[#151916]" />

      <div className="pointer-events-none !absolute top-[-45px] right-[10%] !z-[5] md:top-[-65px]">
        <Image
          src="/images/tl-circle.svg"
          alt=""
          width={130}
          height={130}
          className="w-[80px] animate-[rotateCircle_18s_linear_infinite] md:w-[130px]"
        />
      </div>
    </section>
  );
}
