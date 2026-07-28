import Image from "next/image";
import Link from "next/link";
import type { MegaCard } from "@/lib/nav";

export default function MegaMenu({ cards }: { cards: MegaCard[] }) {
  return (
    <div
      className={`mx-auto grid w-full max-w-[1400px] gap-4 px-6 py-10 ${
        cards.length > 2 ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-1 md:grid-cols-2"
      }`}
    >
      {cards.map((card) => (
        <Link
          key={card.href}
          href={card.href}
          className="mega-card group relative block h-[220px] overflow-hidden rounded-2xl bg-black shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-shadow duration-300 hover:shadow-[0_24px_55px_rgba(0,0,0,0.3)] lg:h-[260px]"
        >
          <Image
            src={card.image}
            alt={card.title}
            fill
            sizes="(max-width: 768px) 50vw, 350px"
            className="object-cover object-right transition-transform duration-500 ease-out group-hover:scale-110"
          />
          <div
            className={`absolute inset-0 z-[2] flex flex-col justify-end p-[22px] text-white ${
              card.noOverlay
                ? ""
                : "bg-[linear-gradient(to_top,rgba(0,0,0,0.85)_35%,rgba(0,0,0,0.35)_65%,rgba(0,0,0,0)_70%)]"
            }`}
          >
            <h5 className="mb-0 text-xl font-bold leading-relaxed">{card.title}</h5>
            <p className="mb-3.5 text-xs opacity-90">{card.description}</p>
            <span className="mega-arrow flex h-10 w-10 items-center justify-center rounded-full bg-emerald">
              &rarr;
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
