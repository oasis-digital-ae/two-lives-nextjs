import Image from "next/image";
import Link from "next/link";
import type { MegaCard } from "@/lib/nav";

export default function MegaMenu({ cards }: { cards: MegaCard[] }) {
  return (
    <div
      className={`grid gap-4 p-6 ${
        cards.length > 2 ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-1 md:grid-cols-2"
      }`}
    >
      {cards.map((card) => (
        <Link
          key={card.href}
          href={card.href}
          className="group relative block overflow-hidden rounded-lg"
        >
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={card.image}
              alt={card.title}
              fill
              sizes="(max-width: 768px) 50vw, 300px"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-carbon/90 via-carbon/20 to-transparent" />
          </div>
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
            <div>
              <h5 className="font-heading text-sm font-semibold text-white">{card.title}</h5>
              <p className="text-xs text-white/70">{card.description}</p>
            </div>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald text-carbon opacity-0 transition-opacity group-hover:opacity-100">
              &rarr;
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
