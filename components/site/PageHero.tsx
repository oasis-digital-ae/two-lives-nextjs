import type { CSSProperties } from "react";

/*
 * The dark hero band at the top of every inner page: a highlighted lead word, the
 * title, a subtitle on the right and, on journal/blog posts, the date and author.
 *
 * Text props are the exact text nodes of the static markup (surrounding spaces
 * included) so the rendered HTML is identical; tools/site-components.mjs fills them.
 */
export type PageHeroProps = {
  className: string;
  style: CSSProperties;
  leftClass: string;
  h1Class: string;
  /** the word inside the highlighted span */
  lead: string;
  /** the rest of the heading */
  title: string;
  /** whether the highlighted word comes before the rest of the heading */
  leadFirst: boolean;
  rightClass: string;
  pClass: string;
  subtitle: string;
  dateRowClass?: string;
  meta?: { date: string; author: string };
  trailingP?: boolean;
};

export function PageHero(p: PageHeroProps) {
  const lead = (
    <span className="highlighter-below animate mb-0 pb-0" data-shadow-animation="true" data-animation-delay="500">
      {p.lead}
    </span>
  );
  return (
    <section className={p.className} style={p.style}>
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-75"></div>
      <div className="container position-relative z-1">
        <div className="row min-vh-50 align-items-center gy-3">
          <div className={p.leftClass}>
            <h1 className={p.h1Class}>
              {p.leadFirst ? lead : p.title}
              {p.leadFirst ? p.title : lead}
            </h1>
          </div>
          <div className={p.rightClass}>
            <p className={p.pClass}>{p.subtitle}</p>
            {p.meta && (
              <div className={p.dateRowClass}>
                <i className="feather icon-feather-calendar me-5px ms-4px"></i>
                {" "}
                <span className="me-10px">{p.meta.date}</span>
                {" "}
                <span className="opacity-6">•</span>
                {" "}
                <span className="ms-10px">
                  {" By "}
                  <strong>{p.meta.author}</strong>
                </span>
              </div>
            )}
            {p.trailingP && <p></p>}
          </div>
        </div>
      </div>
    </section>
  );
}
