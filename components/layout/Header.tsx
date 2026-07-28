"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { aboutCards, exploreLinks, mentorCards } from "@/lib/nav";
import MegaMenu from "./MegaMenu";

type MenuKey = "about" | "mentor" | "explore" | null;

// Thresholds mirror the original theme's headerHeight (~header's own
// height, roughly 100px) and headerHeight+150 checkpoints.
const STICKY_THRESHOLD = 100;
const STICKY_ACTIVE_THRESHOLD = 250;

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [sticky, setSticky] = useState(false);
  const [stickyActive, setStickyActive] = useState(false);
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<MenuKey>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setSticky(y >= STICKY_THRESHOLD);
      setStickyActive(y >= STICKY_ACTIVE_THRESHOLD);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth < 1024) setDesktopMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // On the home page, once the header becomes "sticky-active" (scrolled
  // well past the hero), the persistent nav takes over regardless of any
  // manually opened desktop toggle — matching the original's
  // MutationObserver-driven reset, derived rather than synced back into
  // state.
  const desktopMenuEffectivelyOpen = desktopMenuOpen && !stickyActive;

  // Home page: nav links + CTA stay hidden over the hero until the user
  // scrolls past it or manually reveals them via the desktop toggler.
  // Every other page: nav is always visible.
  const showFullNav = !isHome || stickyActive || desktopMenuEffectivelyOpen;
  const showDesktopToggler = isHome && !stickyActive;

  const solid =
    sticky || openMenu !== null || mobileOpen || desktopMenuEffectivelyOpen;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        className={`transition-colors duration-300 ${
          solid ? "bg-carbon" : "bg-transparent"
        }`}
        onMouseLeave={() => setOpenMenu(null)}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 lg:px-10">
          <Link href="/" className="shrink-0">
            <Image
              src="/images/two-lives/logo-wht.svg"
              alt="Two Lives Theory"
              width={160}
              height={40}
              className="h-8 w-auto lg:h-10"
              priority
            />
          </Link>

          <ul
            className={`hidden items-center gap-8 transition-opacity duration-150 lg:flex ${
              showFullNav ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <li className="relative" onMouseEnter={() => setOpenMenu("about")}>
              <button className="flex items-center gap-1 font-heading text-sm font-medium text-white">
                About <span className="text-xs">&#9662;</span>
              </button>
            </li>
            <li className="relative" onMouseEnter={() => setOpenMenu("mentor")}>
              <button className="flex items-center gap-1 font-heading text-sm font-medium text-white">
                Who I Mentor <span className="text-xs">&#9662;</span>
              </button>
            </li>
            <li onMouseEnter={() => setOpenMenu(null)}>
              <Link href="/keynote-talks" className="font-heading text-sm font-medium text-white">
                Keynote Talks
              </Link>
            </li>
            <li className="relative" onMouseEnter={() => setOpenMenu("explore")}>
              <button className="flex items-center gap-1 font-heading text-sm font-medium text-white">
                Explore <span className="text-xs">&#9662;</span>
              </button>
            </li>
          </ul>

          <div className="hidden items-center lg:flex">
            <div
              className={`transition-opacity duration-150 ${
                showFullNav ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <Link href="/request-mentorship" className="btn-cta">
                Request Mentorship
              </Link>
            </div>

            {showDesktopToggler && (
              <DesktopToggler
                active={desktopMenuOpen}
                onClick={() => setDesktopMenuOpen((v) => !v)}
              />
            )}
          </div>

          <button
            aria-label="Toggle navigation"
            className="flex flex-col gap-1.5 lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span
              className={`h-0.5 w-7 bg-white transition-transform ${
                mobileOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span className={`h-0.5 w-7 bg-white transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
            <span
              className={`h-0.5 w-7 bg-white transition-transform ${
                mobileOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>

        {/* Desktop mega menu panel */}
        {openMenu && showFullNav && (
          <div className="hidden border-t border-white/10 bg-carbon lg:block">
            <div className="mx-auto max-w-[1400px] px-10">
              {openMenu === "about" && <MegaMenu cards={aboutCards} />}
              {openMenu === "mentor" && <MegaMenu cards={mentorCards} />}
              {openMenu === "explore" && (
                <ul className="grid grid-cols-2 gap-2 py-6 lg:grid-cols-5">
                  {exploreLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="block rounded-md px-4 py-3 font-heading text-sm text-white transition-colors hover:bg-white/10"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="max-h-[calc(100vh-72px)] overflow-y-auto bg-carbon px-5 pb-8 lg:hidden">
          <MobileSection
            label="About"
            open={mobileSubmenu === "about"}
            onToggle={() => setMobileSubmenu((v) => (v === "about" ? null : "about"))}
          >
            {aboutCards.map((c) => (
              <Link key={c.href} href={c.href} className="block py-2 text-white/80">
                {c.title}
              </Link>
            ))}
          </MobileSection>

          <MobileSection
            label="Who I Mentor"
            open={mobileSubmenu === "mentor"}
            onToggle={() => setMobileSubmenu((v) => (v === "mentor" ? null : "mentor"))}
          >
            {mentorCards.map((c) => (
              <Link key={c.href} href={c.href} className="block py-2 text-white/80">
                {c.title}
              </Link>
            ))}
          </MobileSection>

          <Link href="/keynote-talks" className="block border-b border-white/10 py-4 font-heading text-white">
            Keynote Talks
          </Link>

          <MobileSection
            label="Explore"
            open={mobileSubmenu === "explore"}
            onToggle={() => setMobileSubmenu((v) => (v === "explore" ? null : "explore"))}
          >
            {exploreLinks.map((l) => (
              <Link key={l.href} href={l.href} className="block py-2 text-white/80">
                {l.label}
              </Link>
            ))}
          </MobileSection>

          <Link href="/request-mentorship" className="btn-cta mt-6 block text-center">
            Request Mentorship
          </Link>
        </div>
      )}
    </header>
  );
}

function DesktopToggler({ active, onClick }: { active: boolean; onClick: () => void }) {
  return (
    <button
      aria-label="Toggle navigation"
      onClick={onClick}
      className="relative ml-4 h-5 w-[30px] shrink-0"
    >
      <span
        className="absolute right-0 h-0.5 rounded-full bg-white transition-all duration-300"
        style={{
          top: active ? "8px" : "0px",
          width: active ? "100%" : "60%",
          transform: active ? "rotate(45deg)" : "none",
        }}
      />
      <span
        className="absolute left-0 top-[8px] h-0.5 w-full rounded-full bg-white transition-opacity duration-300"
        style={{ opacity: active ? 0 : 1 }}
      />
      <span
        className="absolute left-0 h-0.5 rounded-full bg-white transition-all duration-300"
        style={{
          top: active ? "8px" : "16px",
          width: active ? "100%" : "60%",
          transform: active ? "rotate(-45deg)" : "none",
        }}
      />
    </button>
  );
}

function MobileSection({
  label,
  open,
  onToggle,
  children,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-white/10">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 font-heading text-white"
      >
        {label} <span>{open ? "−" : "+"}</span>
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  );
}
