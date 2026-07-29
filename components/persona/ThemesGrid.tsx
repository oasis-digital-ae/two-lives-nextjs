import type { ComponentType } from "react";

type IconProps = { className?: string };

export default function ThemesGrid({
  heading,
  paragraph,
  items,
}: {
  heading: string;
  paragraph: string;
  items: { Icon: ComponentType<IconProps>; label: string; desc: string }[];
}) {
  return (
    <section className="bg-radial">
      <div className="mx-auto max-w-3xl px-5 pt-16 pb-10 text-center lg:px-10">
        <h2 className="text-shadow-soft mb-3 font-heading text-[28px] font-bold tracking-[-2px] text-white sm:text-[40px]">
          {heading}
        </h2>
        <p className="text-white/70">{paragraph}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-6">
        {items.map(({ Icon, label, desc }) => (
          <div
            key={label}
            className="group relative overflow-hidden border-t border-b border-white/10 p-8 text-center transition-colors last:border-r-0 sm:border-r sm:last:border-r-0 lg:border-r"
          >
            <div className="absolute inset-0 origin-bottom scale-y-0 bg-emerald transition-transform duration-500 group-hover:scale-y-100" />
            <div className="relative">
              <Icon className="mx-auto mb-5 h-11 w-11 text-emerald group-hover:text-carbon" />
              <span className="mb-1 block font-heading text-lg font-medium text-white group-hover:text-carbon">
                {label}
              </span>
              <p className="text-sm text-white/70 group-hover:text-carbon/80">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
