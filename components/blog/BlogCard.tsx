import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/data/blogs";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-[10px] border border-white/30 bg-white/20 shadow-[0_18px_45px_rgba(14,20,18,0.12)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/25 hover:shadow-[0_24px_60px_rgba(14,20,18,0.16)]"
    >
      <div className="relative h-[220px] overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="mb-2 text-xs font-semibold text-carbon/60">{formatDate(post.date)}</p>
        <h3 className="mb-3 font-heading text-lg font-bold text-carbon">{post.title}</h3>
        <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-carbon/85">{post.description}</p>
        <span className="mt-auto text-xs font-semibold tracking-wide text-carbon uppercase underline underline-offset-4">
          Read More
        </span>
      </div>
    </Link>
  );
}
