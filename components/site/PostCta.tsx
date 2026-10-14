/* The call-to-action band under every journal and blog post. */
export function PostCta() {
  return (
    <section data-parallax-background-ratio="0.5" className="h-400px d-flex align-items-center justify-content-center cta-page" style={{ backgroundImage: "url('/.netlify/images?url=/images/cta-image.webp&w=800&fm=webp&q=70')" }}>
      <div className="opacity-medium bg-black"></div>
      <div className="hero-bottom-shadow  mb-shadow-top"></div>
      <div className="container position-relative">
        <div className="row align-items-center justify-content-center">
          <div className="col-xl-8 text-center text-xl-start lg-mb-30px">
            <h3 className="alt-font d-inline-block align-middle fs-40 text-white mb-15px mb-md-0 me-md-35px position-relative">Ready to step into your next life?</h3>
          </div>
          <div className="col-xl-4 text-center text-xl-end">
            <a href="/request-mentorship" className="btn-primary spacing-below-desktop  active btn-box-shadow fw-600 text-carbon">{" Request Mentorship "}</a>
            {" "}
            <a href="/explore-your-archetype" className="btn-archetype active btn-box-shadow fw-600 text-carbon sm-mt-15px">{" Explore Your Archetype "}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
