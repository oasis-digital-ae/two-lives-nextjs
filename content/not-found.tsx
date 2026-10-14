// GENERATED from the static site by tools/convert-html.mjs. The markup is kept identical to the
// HTML page on purpose: the theme's compiled CSS and jQuery scripts drive the design.
import type { Metadata } from "next";
import { Cta, CursorPageInner, Footer, Header, ScrollTop } from "@/components/site";

export const metadata: Metadata = {
  "title": "Page Not Found | Two Lives Theory",
  "description": "That page has moved or no longer exists. Head back to the homepage, or browse the journal to find what you were looking for.",
  "openGraph": {
    "type": "website",
    "title": "Page Not Found | Two Lives Theory",
    "description": "That page has moved or no longer exists. Head back to the homepage, or browse the journal to find what you were looking for.",
    "url": "/",
    "siteName": "Two Lives Theory",
    "images": [
      {
        "url": "/img/og-img.jpg",
        "width": 1200,
        "height": 630,
        "alt": "Page Not Found | Two Lives Theory"
      }
    ]
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "Page Not Found | Two Lives Theory",
    "description": "That page has moved or no longer exists. Head back to the homepage, or browse the journal to find what you were looking for.",
    "images": [
      "/img/og-img.jpg"
    ]
  }
};

export default function NotFoundBody() {
  return (
    <>
      <CursorPageInner />
      <Header />
      <section className="cover-background bg-pattern-section full-screen bg-dust-gray text-carbon ipad-top-space-margin md-h-550px">
        <div className="container h-100">
          <div className="row align-items-center justify-content-center h-100">
            <div className="col-12 col-xl-6 col-lg-7 col-md-9 text-center" data-anime={"{ \"el\": \"childs\", \"translateY\": [50, 0], \"opacity\": [0,1], \"duration\": 600, \"delay\": 0, \"staggervalue\": 300, \"easing\": \"easeOutQuad\" }"}>
              <h6 className="text-carbon fw-600 mb-5px text-uppercase">Sorry!</h6>
              <h1 className="fs-200 sm-fs-170 text-carbon fw-700 ls-minus-8px">404</h1>
              <h4 className="text-carbon fw-600 sm-fs-22 mb-10px ls-minus-1px">Page not found!</h4>
              <p className="mb-30px lh-28 sm-mb-30px w-55 md-w-80 sm-w-95 mx-auto">The page you are looking for doesn’t exist or might have been removed.</p>
              <a href="/" className="btn-primary active btn-box-shadow fw-600 text-carbon">
                <i className="fa-solid fa-arrow-left"></i>
                {" Back to homepage"}
              </a>
            </div>
          </div>
        </div>
      </section>
      <Cta className="h-600px d-flex align-items-center justify-content-center footer-bg mobile-cta position-relative" style={{"backgroundImage":"url('/.netlify/images?url=/images/cta-image.webp&w=800&fm=webp&q=70')","backgroundSize":"cover","backgroundPosition":"center","backgroundRepeat":"no-repeat"}} overlayClass="opacity-medium bg-black position-absolute top-0 start-0 w-100 h-100" shadowClass="hero-bottom-shadow position-absolute bottom-0 start-0 w-100" containerClass="container position-relative z-index-1" rowClass="row align-items-center justify-content-center" leftClass="col-xl-8 text-center text-xl-start lg-mb-30px" h3Class="alt-font d-inline-block align-middle fs-40 text-white mb-15px mb-md-0 me-md-35px" title=" You’ve Reached a Level Few Ever Do " rightClass="col-xl-4 text-center text-xl-end" buttons={[{"href":"","className":"btn-primary active btn-box-shadow fw-600 text-carbon","onclick":"Calendly.initPopupWidget({url: 'https://calendly.com/twolivestheory/mentorship'});return false;","text":" Request Mentorship "},{"href":"#quiz","className":"btn-primary active btn-box-shadow fw-600 text-carbon","text":" Take the quiz "}]} subtitle={{"tag":"h4","className":"alt-font text-base-color d-inline-block align-middle fs-30 mb-15px mb-md-0 me-md-35px position-relative","iconClass":"feather fs-30 icon-feather-arrow-right","text":" Now Outgrow It"}} />
      <Cta className="h-600px d-flex align-items-center justify-content-center footer-bg desktop-only-footer" style={{"backgroundImage":"url('/.netlify/images?url=/images/cta-image.webp&w=800&fm=webp&q=70')"}} overlayClass="opacity-medium bg-black" shadowClass="hero-bottom-shadow" containerClass="container position-relative" rowClass="row align-items-center justify-content-center" leftClass="col-xl-8 text-center text-xl-start lg-mb-30px" h3Class="alt-font d-inline-block align-middle fs-40 text-white mb-15px mb-md-0 me-md-35px position-relative" title="You’ve Reached a Level Few Ever Do " rightClass="col-xl-4 text-center text-xl-end" buttons={[{"href":"","className":"btn-primary active btn-box-shadow fw-600 text-carbon","onclick":"Calendly.initPopupWidget({url: 'https://calendly.com/twolivestheory/mentorship'});return false;","text":" Request Mentorship "},{"href":"#quiz","className":"btn-primary active btn-box-shadow fw-600 text-carbon","text":" Take the quiz "}]} parallax="0.5" subtitle={{"tag":"h4","className":"alt-font text-base-color d-inline-block align-middle fs-30 mb-15px mb-md-0 me-md-35px position-relative","iconClass":"feather fs-30 icon-feather-arrow-right","text":" Now Outgrow It"}} />
      <Footer />
      <ScrollTop />
    </>
  );
}
