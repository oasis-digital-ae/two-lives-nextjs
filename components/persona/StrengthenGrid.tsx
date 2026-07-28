import Image from "next/image";
import type { ComponentType } from "react";

type IconProps = { className?: string };

export default function StrengthenGrid({
  heading,
  paragraph,
  intro,
  items,
}: {
  heading: string;
  paragraph: string;
  intro: string;
  items: { image: string; Icon: ComponentType<IconProps>; label: string; desc: string }[];
}) {
  return (
    <section className="bg-carbon py-16 md:py-20">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <h2 className="text-shadow-soft mb-3 font-heading text-2xl font-bold tracking-[-2px] text-white sm:text-[32px]">
            {heading}
          </h2>
          <p className="mb-4 text-white/70">{paragraph}</p>
          <p className="font-heading text-xl font-bold text-white sm:text-2xl">{intro}</p>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ image, Icon, label, desc }) => (
            <div key={label} className="group text-center">
              <div className="relative mx-auto mb-6 h-[140px] w-[140px] overflow-hidden rounded-full transition-transform duration-300 group-hover:scale-110 sm:h-[180px] sm:w-[180px]">
                <Image src={image} alt="" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-br from-emerald/40 to-sea-green/60" />
                <Icon className="absolute top-1/2 left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-white" />
              </div>
              <span className="mb-1 block font-heading text-lg font-semibold text-white">
                {label}
              </span>
              <p className="mx-auto w-4/5 text-sm text-white/60">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
