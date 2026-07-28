import Image from "next/image";

const logos = ["/images/logo-1.png", "/images/logo-2.png", "/images/logo-3.png"];

export default function LogoMarquee() {
  return (
    <section className="overflow-hidden bg-off-white py-8">
      <div className="flex w-max animate-marquee items-center gap-16">
        {Array.from({ length: 4 }).map((_, setIndex) =>
          logos.map((logo, i) => (
            <div
              key={`${setIndex}-${i}`}
              className="flex h-[100px] w-[100px] flex-none items-center justify-center overflow-hidden rounded-full"
            >
              <Image src={logo} alt="" width={100} height={100} className="h-full w-full object-cover" />
            </div>
          ))
        )}
      </div>
    </section>
  );
}
