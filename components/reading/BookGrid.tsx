import Image from "next/image";

const books = [
  {
    image: "/images/two-lives/man-search.jpg",
    title: "Man's Search for Meaning",
    author: "Viktor E. Frankl",
    desc: "A timeless exploration of meaning, responsibility, and inner freedom. Frankl's work speaks powerfully to how our inner relationship with life shapes how we endure pressure, challenge, and transition.",
  },
  {
    image: "/images/two-lives/unearthed.png",
    title: "The Untethered Soul",
    author: "Michael A. Singer",
    desc: "An insightful look at awareness, inner dialogue, and emotional release. This book explores how loosening identification with thoughts and patterns can create greater clarity and inner freedom.",
  },
  {
    image: "/images/two-lives/atomic.png",
    title: "Atomic Habits",
    author: "James Clear",
    desc: "A grounded examination of how identity, behaviour, and consistency shape long term change. It reinforces the idea that sustainable growth comes from alignment rather than force.",
  },
];

export default function BookGrid() {
  return (
    <section className="bg-pattern-section relative bg-off-white py-16 md:py-20">
      <div className="pointer-events-none !absolute top-[-45px] right-[10%] !z-[5] md:top-[-65px]">
        <Image
          src="/images/tl-circle.svg"
          alt=""
          width={130}
          height={130}
          className="w-[80px] animate-[rotateCircle_18s_linear_infinite] md:w-[130px]"
        />
      </div>

      <div className="mx-auto max-w-3xl px-5 text-center">
        <h2 className="text-shadow-soft mb-12 font-heading text-[50px] font-semibold tracking-[-2px] text-carbon">
          Growth isn&rsquo;t only in doing. It&rsquo;s in understanding.
        </h2>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {books.map((b) => (
            <div
              key={b.title}
              className="flex flex-col overflow-hidden rounded-[10px] bg-white shadow-[0_18px_45px_rgba(14,20,18,0.12)] transition-transform duration-300 hover:-translate-y-1.5"
            >
              <div className="relative aspect-[4/5]">
                <Image src={b.image} alt={b.title} fill className="object-cover" />
              </div>
              <div className="flex flex-col px-6 py-6 text-left">
                <span className="font-heading font-semibold tracking-[-1px] text-carbon">{b.title}</span>
                <span className="mb-4 text-sm font-bold text-slate">{b.author}</span>
                <p className="mb-5 text-sm leading-relaxed text-carbon/85">{b.desc}</p>
                <small className="text-xs text-slate italic">Available via Audible &amp; Paperback</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
