/* The homepage hero from before the scroll film: the fallback ScrollHero swaps back to.
   Markup kept exactly as it was on the live site. */
export function LegacyHomeHero() {
  return (
    <section className="basim-hero position-relative overflow-hidden d-none d-md-block">
      <div className="hero-background"></div>
      <div className="hero-gradient"></div>
      <div className="hero-name custom-font-mb">{" Basim Yafai "}</div>
      <div className="hero-icon-layer">
        <img src="/img/bg-icon.svg" className="hero-bg-icon" id="heroIcon" alt="" />
      </div>
      <div className="hero-basim-layer">
        <img src="/.netlify/images?url=/images/basim-hero-1.webp&w=1200&fm=webp&q=90" srcSet="/.netlify/images?url=/images/basim-hero-1.webp&w=600&fm=webp&q=90 600w, /.netlify/images?url=/images/basim-hero-1.webp&w=1200&fm=webp&q=90 1200w, /.netlify/images?url=/images/basim-hero-1.webp&w=1600&fm=webp&q=90 1600w" sizes="500px" alt="Basim" className="hero-basim" width="500" height="535" fetchPriority="high" style={{ filter: "saturate(0.95)" }} />
      </div>
      <div className="hero-headline text-center fs-28 fw-600 alt-font text-white">
        <div className="h1 hero-slogan mb-15px md-fs-55">Step Into Your Next Life</div>
        <p className="text-center fs-24 md-fs-22 sm-fs-20 fw-500 alt-font font-style-italic text-white pt-0">With Clarity, Strength and Inner Alignment.</p>
      </div>
      <div className="container hero-content pt-0 pb-0 mt-0 mb-0">
        <div className="row w-100 pb-11 align-items-center justify-content-between gap-4 gap-lg-0">
          <div className="col-lg-5 hero-left-content text-white d-flex align-items-center mobile-only">
            <div className="hero-lede text-white alt-font lh-16 w-80 fs-18 fw-500 mb-0">
              <h1>Private Mentorship for High Performers.</h1>
              {" Led by "}
              <b>Basim Yafai</b>
              {", Mindset & Growth Mentor. Trusted by leaders, entrepreneurs & elite athletes. "}
            </div>
          </div>
          <div className="col-lg-5 hero-right-content text-white text-center d-flex align-items-center justify-content-center">
            <a href="/request-mentorship" className="btn-primary active btn-box-shadow fw-600 hero-btn">{" Request Mentorship "}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
