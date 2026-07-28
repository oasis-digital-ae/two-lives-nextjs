export default function KeynoteCta() {
  return (
    <section
      className="relative flex h-[600px] items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/cta-image.webp')" }}
    >
      <div className="absolute inset-0 bg-black opacity-75" />
      <div className="relative z-10 mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-8 px-5 text-center lg:flex-row lg:text-left">
        <div>
          <h3 className="mb-2 inline-block align-middle font-heading text-[32px] font-semibold text-white sm:text-[40px]">
            Enquire about keynote availability.
          </h3>
          <p className="max-w-lg font-medium text-white">
            For organisations and events seeking depth, clarity, and real connection without theatrics, Basim
            delivers keynote talks that resonate across every level.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <a
            href="mailto:basim@twolivestheory.com"
            className="text-white underline decoration-emerald underline-offset-4"
          >
            basim@twolivestheory.com
          </a>
          <a
            href="https://wa.me/447988720640"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta"
          >
            WhatsApp &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
