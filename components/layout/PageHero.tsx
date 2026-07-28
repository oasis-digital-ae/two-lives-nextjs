export default function PageHero({
  image,
  eyebrow,
  title,
  description,
  titleFirst = false,
}: {
  image: string;
  eyebrow: string;
  title: string;
  description: string;
  titleFirst?: boolean;
}) {
  return (
    <section
      className="relative bg-carbon bg-cover bg-center pt-32 pb-16 text-white sm:pt-40"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-black/75" />
      <div className="relative z-10 mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-6 px-5 lg:grid-cols-2 lg:px-10">
        <h1 className="font-heading text-[32px] leading-tight font-semibold tracking-[-2px] text-white sm:text-[50px]">
          {titleFirst ? (
            <>
              {title} <span className="highlighter-below animate">{eyebrow}</span>
            </>
          ) : (
            <>
              <span className="highlighter-below animate">{eyebrow}</span> {title}
            </>
          )}
        </h1>
        <p className="w-full text-base leading-[1.8] text-white sm:text-lg lg:w-4/5">
          {description}
        </p>
      </div>
    </section>
  );
}
