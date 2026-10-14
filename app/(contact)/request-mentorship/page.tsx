// GENERATED from the static site by tools/convert-html.mjs. The markup is kept identical to the
// HTML page on purpose: the theme's compiled CSS and jQuery scripts drive the design.
import type { Metadata } from "next";
import { Cta, CursorPageInner, Footer, Header, PageHero, ScrollTop, WhatsAppWidget } from "@/components/site";

export const metadata: Metadata = {
  "title": "Request Private Mentorship | Two Lives Theory",
  "description": "Start with a confidential call. Share where you are, hear how the mentoring runs, and decide together whether it is the right fit for you.",
  "alternates": {
    "canonical": "/request-mentorship"
  },
  "openGraph": {
    "type": "website",
    "title": "Request Private Mentorship | Two Lives Theory",
    "description": "Start with a confidential call. Share where you are, hear how the mentoring runs, and decide together whether it is the right fit for you.",
    "url": "/request-mentorship",
    "siteName": "Two Lives Theory",
    "images": [
      {
        "url": "/images/og-home-1.webp",
        "width": 1200,
        "height": 630,
        "alt": "Request Private Mentorship | Two Lives Theory"
      }
    ]
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "Request Private Mentorship | Two Lives Theory",
    "description": "Start with a confidential call. Share where you are, hear how the mentoring runs, and decide together whether it is the right fit for you.",
    "images": [
      "/images/og-home-1.webp"
    ]
  }
};

export default function RequestMentorshipPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\n  \"@context\": \"https://schema.org\",\n  \"@graph\": [\n    {\n      \"@type\": \"BreadcrumbList\",\n      \"itemListElement\": [\n        {\n          \"@type\": \"ListItem\",\n          \"position\": 1,\n          \"name\": \"Home\",\n          \"item\": \"https://twolivestheory.com/\"\n        },\n        {\n          \"@type\": \"ListItem\",\n          \"position\": 2,\n          \"name\": \"Request Private Mentorship\",\n          \"item\": \"https://twolivestheory.com/request-mentorship\"\n        }\n      ]\n    }\n  ]\n}" }} />
      <CursorPageInner />
      <Header ctaOnclick="Calendly.initPopupWidget({url: 'https://calendly.com/twolivestheory/mentorship'});return false;" />
      <PageHero style={{"backgroundImage":"url('/.netlify/images?url=/images/hero-bg-11.webp&w=1920&fm=webp&q=70')","backgroundSize":"cover","backgroundRepeat":"no-repeat","backgroundPosition":"center"}} className="page-title-separate-breadcrumbs bg-carbon position-relative text-white pt-18 md-pt-20 sm-pt-30 pb-4 sm-pb-20" leftClass="col-lg-6 position-relative page-title-extra-large md-mb-30px sm-mb-10px z-index-9" h1Class="text-white fw-600 ls-minus-2px mb-0 alt-font highlight-separator-small" lead=" Mentorship " title=" Request " leadFirst={false} rightClass="col-lg-6 text-white z-index-9" pClass="fs-20 md-fs-18 sm-fs-16 lh-32 text-white force-white w-90 lg-w-100 md-w-80 mb-0" subtitle=" This is not a sales call or a commitment. It’s a short conversation to understand where you are professionally and personally, and whether mentoring support at this stage makes sense. " />
      <section className="calendly-section bg-pattern-section py-5 sm-pt-20 sm-pb-120px">
        <div className="container">
          <div className="row g-0">
            <div className="col-12">
              <div className="calendly-inline-widget" data-url="https://calendly.com/twolivestheory/mentorship?hide_gdpr_banner=1"></div>
            </div>
          </div>
        </div>
        <div className="bottom-shadow-soft"></div>
        <div className="icon-rotator">
          <img src="/images/tl-circle.svg" alt="rotator" />
        </div>
      </section>
      <style dangerouslySetInnerHTML={{ __html: "\n.calendly-section {\n  margin: 0;\n  padding-left: 0;\n  padding-right: 0;\n}\n\n\n/* Calendly full width + height */\n.calendly-inline-widget {\n  width: 100% !important;\n  height: 100vh;\n}\n\n\n\n/* iframe full fit */\n.calendly-inline-widget iframe {\n  width: 100% !important;\n  height: 100% !important;\n  border: 0 !important;\n  display: block;\n}\n\n" }} />
      <Cta className="h-600px d-flex align-items-center justify-content-center cta-page" style={{"backgroundImage":"url('/.netlify/images?url=/images/cta-image.webp&w=800&fm=webp&q=70')"}} overlayClass="opacity-medium bg-black" shadowClass="hero-bottom-shadow mb-shadow-top" containerClass="container position-relative" rowClass="row align-items-center justify-content-center" leftClass="col-xl-8 text-center text-xl-start lg-mb-30px" h3Class="alt-font d-inline-block align-middle fs-40 text-white mb-15px mb-md-0 me-md-35px position-relative" title="Ready to step into your next life?" rightClass="col-xl-4 text-center text-xl-end" buttons={[{"href":"/explore-your-archetype","className":"btn-archetype active btn-box-shadow fw-600 text-carbon sm-mt-15px","text":" Explore Your Archetype "}]} parallax="0.5" />
      <Footer />
      <WhatsAppWidget show />
      <ScrollTop />
      <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
    </>
  );
}
