import Image from "next/image";

export default function PersonaReview({
  name,
  role,
  ig,
  igHref,
  avatar,
  quotes,
}: {
  name: string;
  role: string;
  ig: string;
  igHref: string;
  avatar: string;
  quotes: string[];
}) {
  return (
    <section className="bg-white py-16 md:py-20">
      <div
        className="mx-auto max-w-[1400px] bg-top bg-no-repeat px-5 lg:px-10"
        style={{ backgroundImage: "url(/images/demo-it-business-testimonial-bg.png)" }}
      >
        <div className="mb-10 text-center">
          <h2 className="text-shadow-soft mb-2 font-heading text-[32px] font-semibold tracking-[-2px] text-carbon sm:text-[40px]">
            Client Reviews
          </h2>
          <a
            href="https://www.trustpilot.com/review/www.twolivestheory.com"
            target="_blank"
            rel="noreferrer"
            className="text-dark-green text-[18px] font-medium underline"
          >
            Find us on <span className="font-black italic">TrustPilot &rarr;</span>
          </a>
        </div>

        <div className="grid grid-cols-1 items-center gap-8 px-2 md:grid-cols-3">
          <div className="text-center">
            <div className="relative mx-auto mb-3 aspect-square w-[70%]">
              <div className="h-full w-full overflow-hidden rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.12),0_2px_6px_rgba(0,0,0,0.08),0_0_0_2px_rgba(255,255,255,0.6)]">
                <Image src={avatar} alt={name} fill className="rounded-full object-cover" />
              </div>
              <div className="animate-float absolute top-[-6px] left-[-30px] flex h-[95px] w-[95px] items-center justify-center sm:h-[125px] sm:w-[125px]">
                <Image src="/images/twoliveslogo.svg" alt="" width={90} height={90} />
              </div>
            </div>
            <p className="mt-3 mb-1 font-heading text-[18px] font-semibold text-carbon">{name}</p>
            <p className="mb-0 text-[16px] text-carbon">{role}</p>
            <p className="mb-0 text-[16px] text-carbon">
              IG:{" "}
              <a href={igHref} target="_blank" rel="noreferrer" className="text-carbon underline">
                {ig}
              </a>
            </p>
          </div>
          <div className="md:col-span-2">
            <span className="text-dark-green mb-2 block text-center font-heading text-[20px] font-semibold tracking-[-2px] sm:text-left">
              From Struggle to Clarity
            </span>
            {quotes.map((q, i) => (
              <p key={i} className="mb-1 text-[18px] font-medium text-carbon last:mb-0">
                {q}
              </p>
            ))}
          </div>
        </div>

        <p className="mt-8 text-center text-[18px] font-bold text-carbon italic">
          &ldquo;Confidential by default. Shared by choice.&rdquo;
        </p>
      </div>
    </section>
  );
}
