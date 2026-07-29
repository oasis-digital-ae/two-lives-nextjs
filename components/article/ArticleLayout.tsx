import Image from "next/image";
import Link from "next/link";

export type RelatedItem = { href: string; image: string; title: string };

export default function ArticleLayout({
  highlight,
  sidebarTitle,
  related,
  children,
}: {
  highlight?: string;
  sidebarTitle: string;
  related: RelatedItem[];
  children: React.ReactNode;
}) {
  return (
    <section className="bg-pattern-section relative bg-off-white py-16 md:py-24">
      <div className="pointer-events-none !absolute top-[-45px] right-[10%] !z-[5] md:top-[-65px]">
        <Image
          src="/images/tl-circle.svg"
          alt=""
          width={130}
          height={130}
          className="w-[80px] animate-[rotateCircle_18s_linear_infinite] md:w-[130px]"
        />
      </div>

      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        {highlight && (
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-shadow-soft font-heading text-[50px] font-semibold tracking-[-2px] text-carbon">
              {highlight}
            </h2>
          </div>
        )}

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <article className="lg:col-span-8">{children}</article>

          <aside className="lg:col-span-4">
            <h6 className="text-shadow-soft mb-5 font-heading text-lg font-semibold text-carbon">
              {sidebarTitle}
            </h6>
            <div className="flex flex-col gap-4">
              {related.map((r) => (
                <Link key={r.href} href={r.href} className="group flex items-center gap-3.5">
                  <div className="relative h-[70px] w-[70px] flex-none overflow-hidden rounded-[5px]">
                    <Image
                      src={r.image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <span className="font-heading text-[15px] leading-[21px] font-semibold text-carbon transition-colors group-hover:text-emerald">
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
