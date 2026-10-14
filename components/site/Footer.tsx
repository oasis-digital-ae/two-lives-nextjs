import { badges, contact, copyright, footerCredit, footerNav, socials } from "@/lib/site-nav";

/* Site footer: logo, certification badges, contact and social links, the footer menu
   and the copyright line. Content comes from lib/site-nav.ts; markup is the theme's. */
export function Footer() {
  return (
    <footer className="footer-dark py-0">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="divider-style-03 divider-style-03-01 border-color-transparent-white-light"></div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row pt-50px pb-50px md-pt-35px md-pb-35px">
          <div className="col-lg-4 text-center text-lg-start last-paragraph-no-margin mb-sm-4 mb-0">
            <a href="/" className=" d-inline-block">
              <img className="footer-logo" src="/.netlify/images?url=/images/two-lives/logo.svg" width="300" height="63" alt="Two Lives Theory" />
            </a>
          </div>
          <div className="col-lg-4 col-sm-6 text-center text-lg-start last-paragraph-no-margin xs-mb-30px sm-mt-30px">
            <div className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-0 footer-badges">
              {badges.map((badge) => (
                <div key={badge.image} className="icon-circle">
                  <img src={badge.image} alt={badge.alt} width="80" height="80" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-4 col-sm-6 text-center text-lg-start last-paragraph-no-margin">
            <span className="alt-font d-inline-block text-white mb-5px fs-18">
              <i className="bi bi-envelope me-10px"></i>
              {"Contact: "}
            </span>
            <a href={`mailto:${contact.email}`} className="text-white text-decoration-line-bottom">{` ${contact.email} `}</a>
            <ul className="d-flex justify-content-center justify-content-lg-start gap-2 small-icon text-white list-unstyled mt-10px">
              {socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" aria-label={s.label}>
                    <i className={s.icon}></i>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="divider-style-03 divider-style-03-01 border-color-transparent-white-light"></div>
          </div>
        </div>
      </div>
      <div className="container footer-bottom pt-25px pb-25px">
        <div className="row align-items-center">
          <div className="col-lg-8 text-center text-lg-start sm-pb-10px">
            <ul className="footer-navbar md-lh-normal fs-14">
              {footerNav.map((link) => (
                <li key={link.href} className="nav-item">
                  <a href={link.href} className="nav-link">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-lg-4 text-center text-lg-end last-paragraph-no-margin fs-14">
            <p>{copyright}</p>
            <p className="mt-1">
              {footerCredit.text}
              <a href={footerCredit.href} target="_blank" rel="noopener" className="text-decoration-line-bottom">{footerCredit.label}</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
