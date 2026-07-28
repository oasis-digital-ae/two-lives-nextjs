import Image from "next/image";

const badges = ["/images/badge-1.png", "/images/badge-4.png", "/images/badge-2.png", "/images/badge-3.png"];

export default function DegreeBadges() {
  return (
    <section className="bg-pattern-section bg-off-white pb-16 md:pb-20">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="mx-auto grid w-full max-w-4xl grid-cols-2 items-center justify-items-center gap-8 sm:grid-cols-4">
          {badges.map((src, i) => (
            <div key={i} className="group">
              <div className="mx-auto flex h-[120px] w-[120px] items-center justify-center">
                <Image
                  src={src}
                  alt=""
                  width={120}
                  height={120}
                  className="h-full w-full object-contain drop-shadow-[0_12px_30px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:scale-[1.06]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
