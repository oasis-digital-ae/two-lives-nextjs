"use client";

import { useState } from "react";
import type { PostSummary, Section } from "@/lib/supabase";

const PER_PAGE = 9;

/** First `max` words, with "..." if cut (the static site's limitWords). */
function limitWords(text: string, max: number) {
  const words = text.trim().split(/\s+/);
  return words.length <= max ? text : words.slice(0, max).join(" ") + "...";
}

/*
 * Cards for one page of posts plus the pagination. Server-rendered with the first
 * page; paging and the whole-card click are the only client behaviour, exactly as
 * the static site's script had them (including its scroll to 200px on page change).
 */
export function PostGrid({ section, posts }: { section: Section; posts: PostSummary[] }) {
  const [page, setPage] = useState(1);
  const pages = Math.ceil(posts.length / PER_PAGE);
  const shown = posts.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const fallback = section === "journal" ? "https://via.placeholder.com/800x600" : "/images/blog/placeholder.webp";

  const go = (n: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    setPage(n);
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  return (
    <>
      <div className="row g-4" id="custom-blog-grid">
        {shown.map((post) => {
          const href = `/${section}/${post.slug}`;
          const badge = post.tag && post.tag.trim() !== "" ? post.tag : "Blog";
          return (
            <div key={post.slug} className="col-12 col-md-6 col-xl-6 col-xxxl-4">
              <div
                className="custom-blog-card horizontal"
                data-slug={post.slug}
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest("a, button, input, select, textarea")) return;
                  window.location.href = href;
                }}
              >
                <div className="custom-blog-img">
                  <img src={post.thumbnail || fallback} alt={post.title || ""} />
                </div>
                <div className="custom-blog-body">
                  <div className="content-top">
                    <span className="custom-blog-badge">{badge}</span>
                    <a href={href} className="custom-blog-title text-carbon">
                      {limitWords(post.main_heading || post.title || "", 6)}
                    </a>
                    <div className="custom-blog-excerpt sm-pb-5 mb-5">{limitWords(post.summary || "", 12)}</div>
                  </div>
                  <div className="custom-blog-meta">
                    <div className="meta-container">
                      <span className="separator-mainline"></span>
                      <div className="author-line">{post.author_name || "Basim Yafai"}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="d-flex justify-content-center mt-5">
        <ul id="custom-blog-pagination" className="pagination">
          {page > 1 && (
            <li className="page-item">
              <a className="page-link" href="#" onClick={go(page - 1)}>«</a>
            </li>
          )}
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
            <li key={n} className={n === page ? "page-item active" : "page-item "}>
              <a className="page-link" href="#" onClick={go(n)}>{n}</a>
            </li>
          ))}
          {page < pages && (
            <li className="page-item">
              <a className="page-link" href="#" onClick={go(page + 1)}>»</a>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}
