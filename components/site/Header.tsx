import { headerCta, mainNav, type MegaCard } from "@/lib/site-nav";

/*
 * Site header: logo, the main menu (two mega menus, a link, a dropdown) and the
 * Request Mentorship button. Content comes from lib/site-nav.ts.
 *
 * The markup is the theme's, byte-for-byte: Bootstrap's collapse/dropdown data API
 * and the theme's CSS drive the behaviour, so element order, classes and even the
 * whitespace text nodes between inline elements are kept as the static site had them.
 *
 * variant="home": the homepage hides the menu until the header sticks and shows a
 * desktop toggler instead (".index-page .desktop-toggler" in the theme CSS); its menu
 * triggers are spans and it uses the short "About" label.
 * ctaOnclick: the contact page's button opens Calendly rather than linking to itself.
 */
export type HeaderProps = { variant?: "home"; ctaOnclick?: string };

const cdn = (file: string, w: number) => `/.netlify/images?url=/images/${file}&w=${w}&fm=webp&q=70`;

function MegaCardLink({ card }: { card: MegaCard }) {
  return (
    <div className="col">
      <a href={card.href} className="mega-card">
        <img
          src={cdn(card.image, 800)}
          srcSet={`${cdn(card.image, 400)} 400w, ${cdn(card.image, 800)} 800w, ${cdn(card.image, 1200)} 1200w`}
          sizes="(max-width:768px) 100vw, 800px"
          alt={card.alt}
          loading="lazy"
        />
        <div className={card.overlayClass ?? "mega-card-overlay"}>
          <h5>{card.title}</h5>
          <p className="fs-12">{card.text}</p>
          <span className="mega-arrow">
            <i className="fa-solid fa-arrow-right"></i>
          </span>
        </div>
      </a>
    </div>
  );
}

/** The clickable label of a menu with a submenu: a span on the homepage, a link elsewhere. */
function Trigger({ home, label }: { home: boolean; label: string }) {
  const inner = (
    <>
      {`${label} `}
      <i className="fa-solid fa-angle-down"></i>
    </>
  );
  return home ? <span className="nav-link">{inner}</span> : <a href="#" className="nav-link">{inner}</a>;
}

export function Header({ variant, ctaOnclick }: HeaderProps) {
  const home = variant === "home";
  return (
    <header className="">
      <nav className="navbar navbar-expand-lg header-light header-reverse" data-header-hover="light">
        <div className="container-fluid">
          <div className="col-auto">
            <a className="navbar-brand" href="/">
              <img src="/images/two-lives/logo-wht.svg" data-at2x="/images/two-lives/logo-wht.svg" alt="Two Lives Theory" className="default-logo" width="200" height="42" />
            </a>
          </div>
          <div className="col-auto menu-order left-nav">
            <button className="navbar-toggler float-start collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-label="Toggle navigation" aria-expanded="false">
              <span className="navbar-toggler-line"></span>
              {" "}
              <span className="navbar-toggler-line"></span>
              {" "}
              <span className="navbar-toggler-line"></span>
              {" "}
              <span className="navbar-toggler-line"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
              <ul className="navbar-nav">
                {mainNav.map((item) => {
                  if ("href" in item) {
                    return (
                      <li key={item.label} className="nav-item">
                        <a href={item.href} className="nav-link">{item.label}</a>
                      </li>
                    );
                  }
                  if ("mega" in item) {
                    return (
                      <li key={item.label} className="nav-item dropdown mega-menu">
                        <Trigger home={home} label={home && item.homeLabel ? item.homeLabel : item.label} />
                        {" "}
                        <i className="fa-solid fa-angle-down dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false"></i>
                        <ul className="dropdown-menu mega-menu-dropdown">
                          <li>
                            <div className="mega-menu-wrapper">
                              <div className={`row g-4 row-cols-1 row-cols-md-2 ${item.mega.columns}`}>
                                {item.mega.cards.map((card) => (
                                  <MegaCardLink key={card.href} card={card} />
                                ))}
                              </div>
                            </div>
                          </li>
                        </ul>
                      </li>
                    );
                  }
                  return (
                    <li key={item.label} className="nav-item dropdown dropdown-with-icon-style02">
                      <Trigger home={home} label={item.label} />
                      {" "}
                      <i className="fa-solid fa-angle-down dropdown-toggle" id={item.dropdown.toggleId} role="button" data-bs-toggle="dropdown" aria-expanded="false"></i>
                      <ul className="dropdown-menu" aria-labelledby={item.dropdown.labelledBy}>
                        {item.dropdown.items.map((link) => (
                          <li key={link.href}>
                            <a href={link.href}>{link.label}</a>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className={home ? "col-auto ps-lg-0 d-none d-sm-flex align-items-center" : "col-auto ps-lg-0 d-none d-sm-flex"}>
            <div className="header-icon">
              <div className="header-button d-flex justify-content-center align-items-center">
                {ctaOnclick ? (
                  <a href="" data-onclick={ctaOnclick} className="btn-primary active btn-box-shadow fw-600">{` ${headerCta.label} `}</a>
                ) : (
                  <a href={headerCta.href} className="btn-primary active btn-box-shadow fw-600">{` ${headerCta.label} `}</a>
                )}
              </div>
            </div>
            {home && (
              <button className="navbar-toggler desktop-toggler d-none d-lg-inline-block ms-15px collapsed" type="button" aria-label="Toggle navigation" aria-expanded="false">
                <span className="navbar-toggler-line"></span>
                {" "}
                <span className="navbar-toggler-line"></span>
                {" "}
                <span className="navbar-toggler-line"></span>
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
