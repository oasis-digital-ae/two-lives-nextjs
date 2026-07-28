import Image from "next/image";
import Link from "next/link";

export type RelatedItem = { href: string; image: string; title: string };

export default function ArticleLayout({
  highlight,
  sidebarTitle,
  related,
  children,
}: {
  highlight: string;
  sidebarTitle: string;
  related: RelatedItem[];
  children: React.ReactNode;
}) {
  return (
    <section className="bg-pattern-section bg-off-white py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-shadow-soft font-heading text-[28px] font-semibold tracking-[-2px] text-carbon sm:text-[40px]">
            {highlight}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <article className="lg:col-span-8">{children}</article>

          <aside className="lg:col-span-4">
            <h6 className="text-shadow-soft mb-5 font-heading text-lg font-semibold text-carbon">
              {sidebarTitle}
            </h6>
            <div className="flex flex-col gap-4">
              {related.map((r) => (
                <Link key={r.href} href={r.href} className="group flex items-center gap-4">
                  <div className="relative h-16 w-20 flex-none overflow-hidden rounded-[8px]">
                    <Image
                      src={r.image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <span className="font-heading text-sm font-semibold text-carbon transition-colors group-hover:text-emerald">
                    {r.title}
                  </span>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
