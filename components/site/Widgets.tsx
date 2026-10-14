import { contact } from "@/lib/site-nav";

/* The floating WhatsApp button (bottom right on every page). The theme reveals it on
   scroll; `show` keeps it visible from the start (the contact page). */
export function WhatsAppWidget({ show }: { show?: boolean }) {
  return (
    <a href={contact.whatsapp} className={show ? "whatsapp-widget show" : "whatsapp-widget"} target="_blank" aria-label="Chat on WhatsApp">
      <img src="/images/two-lives/whatsapp-icon.svg" alt="WhatsApp" width="56" height="56" />
    </a>
  );
}

/* The "Scroll" progress indicator with the back-to-top link (wide screens only). */
export function ScrollTop() {
  return (
    <div className="scroll-progress d-none d-xxl-block">
      <a href="#" className="scroll-top" aria-label="scroll">
        <span className="scroll-text">Scroll</span>
        <span className="scroll-line">
          <span className="scroll-point"></span>
        </span>
      </a>
    </div>
  );
}

/* The two rings of the theme's custom cursor; main.js moves them. */
export function CursorPageInner() {
  return (
    <div className="cursor-page-inner">
      <div className="circle-cursor circle-cursor-inner"></div>
      <div className="circle-cursor circle-cursor-outer"></div>
    </div>
  );
}
