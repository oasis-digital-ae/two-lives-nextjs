import { Fragment, type CSSProperties } from "react";

/*
 * The full-width call-to-action band ("Step Into Your Next Life", "Ready to step into
 * your next life?"...). The static site has it in a few layouts (a mobile/desktop pair
 * on some pages, a single parallax section on others), so the wrapper classes travel
 * as props and only the content is modelled: a title, an optional subtitle and the
 * buttons. Text props are exact text nodes; see tools/site-components.mjs.
 */
export type CtaButton = {
  href: string;
  className: string;
  /** inline handler from the static page, run by the theme bundle */
  onclick?: string;
  iconBefore?: string;
  text: string;
  iconAfter?: { span: string; icon: string };
};

export type CtaProps = {
  className: string;
  style: CSSProperties;
  parallax?: string;
  overlayClass: string;
  shadowClass: string;
  containerClass: string;
  rowClass: string;
  leftClass: string;
  h3Class: string;
  title: string;
  subtitle?: { tag: "p" | "h4"; className: string; iconClass?: string; text: string };
  rightClass: string;
  buttons: CtaButton[];
};

export function Cta(p: CtaProps) {
  const Sub = p.subtitle?.tag;
  return (
    <section data-parallax-background-ratio={p.parallax} className={p.className} style={p.style}>
      <div className={p.overlayClass}></div>
      <div className={p.shadowClass}></div>
      <div className={p.containerClass}>
        <div className={p.rowClass}>
          <div className={p.leftClass}>
            <h3 className={p.h3Class}>{p.title}</h3>
            {Sub && p.subtitle && (
              <Sub className={p.subtitle.className}>
                {p.subtitle.iconClass && <i className={p.subtitle.iconClass}></i>}
                {p.subtitle.text}
              </Sub>
            )}
          </div>
          <div className={p.rightClass}>
            {p.buttons.map((b, i) => (
              <Fragment key={i}>
                {i > 0 && " "}
                <a href={b.href} data-onclick={b.onclick} className={b.className}>
                  {b.iconBefore && <i className={b.iconBefore}></i>}
                  {b.text}
                  {b.iconAfter && (
                    <span className={b.iconAfter.span}>
                      <i className={b.iconAfter.icon}></i>
                    </span>
                  )}
                </a>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
