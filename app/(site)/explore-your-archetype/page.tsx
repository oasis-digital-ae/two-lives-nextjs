// GENERATED from the static site by tools/convert-html.mjs. The markup is kept identical to the
// HTML page on purpose: the theme's compiled CSS and jQuery scripts drive the design.
import type { Metadata } from "next";
import { CursorPageInner, Footer, Header, ScrollTop, WhatsAppWidget } from "@/components/site";

export const metadata: Metadata = {
  "title": "Which Archetype Are You? Free Test | Two Lives Theory",
  "description": "A short test revealing how you think, decide and perform when the pressure is on, and which patterns are quietly holding you in place.",
  "alternates": {
    "canonical": "/explore-your-archetype"
  },
  "openGraph": {
    "type": "website",
    "title": "Which Archetype Are You? Free Test | Two Lives Theory",
    "description": "A short test revealing how you think, decide and perform when the pressure is on, and which patterns are quietly holding you in place.",
    "url": "/explore-your-archetype",
    "siteName": "Two Lives Theory",
    "images": [
      {
        "url": "/images/og-home-1.webp",
        "width": 1200,
        "height": 630,
        "alt": "Which Archetype Are You? Free Test | Two Lives Theory"
      }
    ]
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "Which Archetype Are You? Free Test | Two Lives Theory",
    "description": "A short test revealing how you think, decide and perform when the pressure is on, and which patterns are quietly holding you in place.",
    "images": [
      "/images/og-home-1.webp"
    ]
  }
};

export default function ExploreYourArchetypePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\n  \"@context\": \"https://schema.org\",\n  \"@graph\": [\n    {\n      \"@type\": \"BreadcrumbList\",\n      \"itemListElement\": [\n        {\n          \"@type\": \"ListItem\",\n          \"position\": 1,\n          \"name\": \"Home\",\n          \"item\": \"https://twolivestheory.com/\"\n        },\n        {\n          \"@type\": \"ListItem\",\n          \"position\": 2,\n          \"name\": \"Which Archetype Are You? Free Test\",\n          \"item\": \"https://twolivestheory.com/explore-your-archetype\"\n        }\n      ]\n    }\n  ]\n}" }} />
      <CursorPageInner />
      <Header />
      <section className="page-title-separate-breadcrumbs bg-carbon position-relative text-white pt-8 md-pt-20 sm-pt-30 pb-0 sm-pb-0" style={{ backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}>
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-carbon overflow-visible"></div>
        <div className="container position-relative z-1">
          <div className="row min-vh-30 align-items-center sm-text-center gy-3">
            <div className="col-lg-7 position-relative page-title-extra-large md-mb-30px sm-mb-10px z-index-9">
              <h1 className="text-white fw-600 ls-minus-2px mb-0 alt-font highlight-separator-small">
                <span className="highlighter-below animate mb-0 pb-0" data-shadow-animation="true" data-animation-delay="500">{" Discover "}</span>
                {" Your Archetype "}
              </h1>
              <p className="fw-600 mt-3 fs-40 md-fs-28 sm-fs-20 text-white mb-0 ls-minus-1px sm-ls-minus-1px">A Clearer View of Where You Are.</p>
            </div>
            <div className="col-12 col-lg-5 order-1 order-lg-2 mt-0 position-relative overflow-visible justify-items-center align-items-center mx-auto mx-lg-0">
              <div className="position-relative mx-auto mt-0 quiz-underlay phone-animate overflow-visible">
                <img src="/.netlify/images?url=/images/quiz-laptop.webp&w=800&fm=webp&q=75" srcSet="/.netlify/images?url=/images/quiz-laptop.webp&w=400&fm=webp&q=75 400w, /.netlify/images?url=/images/quiz-laptop.webp&w=800&fm=webp&q=75 800w, /.netlify/images?url=/images/quiz-laptop.webp&w=1200&fm=webp&q=75 1200w" sizes="(max-width:768px) 100vw, 800px" alt="Basim" style={{ width: "100%", height: "100%" }} loading="lazy" data-anime={"{\n                                 \"translateY\": [40, 0],\n                                 \"opacity\": [0, 1],\n                                 \"duration\": 900,\n                                 \"delay\": 200,\n                                 \"easing\": \"easeOutExpo\"\n                             }"} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="quiz" className="sticky-scroll-wrapper pt-0 bg-carbon min-vh-100 d-flex p-0 pb-5">
        <section className="archetype-section archetype-page-quiz sticky-section d-flex flex-fill p-0">
          <div className="container d-flex align-items-center justify-content-center">
            <div className="row">
              <div className="quiz col-12 col-lg-10 mx-auto order-2 order-lg-1 d-flex flex-column">
                <div className="quiz-wrapper flex-fill d-flex align-items-center py-4" data-anime={"{\n\t\t\t\t\t\t\t\t\t\"translateY\": [40, 0],\n\t\t\t\t\t\t\t\t\t\"opacity\": [0, 1],\n\t\t\t\t\t\t\t\t\t\"duration\": 900,\n\t\t\t\t\t\t\t\t\t\"delay\": 0,\n\t\t\t\t\t\t\t\t\t\"easing\": \"easeOutExpo\"\n\t\t\t\t\t\t\t\t}"}>
                  <div id="app" className="card quiz-card w-100"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
      <div id="resultModal" className="result-modal hidden">
        <div className="result-backdrop"></div>
        <div className="result-popup">
          <button className="modal-close" id="closeResultModal">×</button>
          <div id="resultContent"></div>
          <div className="email-capture">
            <h4>Email me my results</h4>
            <input id="resultName" className="mb-2" type="text" placeholder="Enter your name" required />
            {" "}
            <input id="resultEmail" type="email" placeholder="Enter your email" required />
            {" "}
            <label className="gdpr-check d-flex align-items-center mt-3 sm-mt-25px">
              <input type="checkbox" id="gdprConsent" className="me-2" />
              {" "}
              <span className="text-muted-2" style={{ fontSize: "0.875rem", lineHeight: "1.4" }}>
                {" I consent to having my results emailed to me and my data stored in accordance with the "}
                <a href="/privacy-policy" target="_blank" rel="noopener">Privacy Policy</a>
                {". "}
              </span>
            </label>
            {" "}
            <button id="sendResultsBtn" className="btn btn-success w-100 mt-3">{" Send my results "}</button>
            <p id="emailStatus" className="email-status mt-2"></p>
          </div>
        </div>
      </div>
      <section data-parallax-background-ratio="0.5" className="h-500px d-flex align-items-center justify-content-center cta-page" style={{ backgroundImage: "url('/.netlify/images?url=/images/cta-image.webp&w=800&fm=webp&q=70')" }}>
        <div className="bottom-shadow-soft-top"></div>
        <div className="opacity-medium bg-black"></div>
        <div className="hero-bottom-shadow mb-shadow-top"></div>
        <div className="container position-relative">
          <div className="row align-items-center justify-content-center">
            <div className="col-xl-8 text-center text-xl-start lg-mb-30px">
              <h3 className="alt-font d-inline-block align-middle fs-40 text-white mb-15px mb-md-0 me-md-35px position-relative">Ready to step into your next life?</h3>
            </div>
            <div className="col-xl-4 text-center text-xl-end">
              <a href="/request-mentorship" className="btn-primary spacing-below-desktop  active btn-box-shadow fw-600 text-carbon">{" Request Mentorship "}</a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <WhatsAppWidget />
      <ScrollTop />
    </>
  );
}
