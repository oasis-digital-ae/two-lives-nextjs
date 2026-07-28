export default function QuoteBanner({
  eyebrow,
  title,
  quote,
}: {
  eyebrow: string;
  title: string;
  quote: string;
}) {
  return (
    <section className="relative bg-carbon py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="mb-6 font-heading text-5xl font-semibold text-white md:text-7xl">
          {title}
        </h2>
        <p className="mx-auto max-w-2xl text-lg italic text-white/80 md:text-xl">
          &ldquo;{quote}&rdquo;
        </p>
      </div>
      <div className="absolute left-0 top-0 hidden h-full w-32 items-center justify-center xl:flex">
        <span className="-rotate-90 whitespace-nowrap text-sm font-medium text-white">
          {eyebrow}
        </span>
      </div>
    </section>
  );
}
