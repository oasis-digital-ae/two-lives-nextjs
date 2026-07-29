import { CalendarIcon } from "@/components/ui/Icons";

export default function ArticleHero({
  image,
  eyebrow,
  title,
  date,
}: {
  image: string;
  eyebrow: string;
  title: string;
  date: string;
}) {
  return (
    <section
      className="relative bg-carbon bg-cover bg-center pt-32 pb-16 text-white sm:pt-40"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 to-black/75" />
      <div className="relative z-10 mx-auto max-w-[1400px] px-5 lg:px-10">
        <h1 className="max-w-4xl font-heading text-[26px] leading-tight font-semibold tracking-[-2px] text-white sm:text-[52px]">
          <span className="highlighter-below animate">{eyebrow}</span> {title}
        </h1>
        <div className="mt-4 flex items-center gap-3 text-sm text-white/80">
          <CalendarIcon className="h-4 w-4" />
          <span>{date}</span>
          <span className="opacity-60">&bull;</span>
          <span>
            By <strong className="font-semibold">Basim Yafai</strong>
          </span>
        </div>
      </div>
    </section>
  );
}
