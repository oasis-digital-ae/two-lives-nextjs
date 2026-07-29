export default function PersonaHero({
  image,
  eyebrow,
  title,
}: {
  image: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <section
      className="relative bg-carbon bg-cover bg-center pt-32 pb-16 sm:pt-40"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(14,20,18,1) 0%, rgba(14,20,18,0.95) 40%, rgba(14,20,18,0.6) 60%, rgba(14,20,18,0.2) 70%, rgba(14,20,18,0) 100%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="max-w-2xl">
          <h1 className="mb-[30px] font-heading text-[28px] font-bold tracking-[-0.5px] text-white sm:text-[38px]">
            {eyebrow}
          </h1>
          <h2 className="font-heading text-[32px] leading-tight font-medium tracking-[-0.5px] text-white sm:text-[48px]">
            {title}
          </h2>
        </div>
      </div>
    </section>
  );
}
