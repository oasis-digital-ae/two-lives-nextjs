"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { aboutCards, exploreLinks, mentorCards } from "@/lib/nav";
import MegaMenu from "./MegaMenu";

type MenuKey = "about" | "mentor" | "explore" | null;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<MenuKey>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || openMenu !== null || mobileOpen;

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

          <ul className="hidden items-center gap-8 lg:flex">
            <li
              className="relative"
              onMouseEnter={() => setOpenMenu("about")}
            >
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

          <div className="hidden lg:block">
            <Link
              href="/request-mentorship"
              className="inline-block rounded-full bg-emerald px-6 py-3 font-heading text-sm font-semibold text-carbon transition-transform hover:scale-105"
            >
              Request Mentorship
            </Link>
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
        {openMenu && (
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

          <Link
            href="/request-mentorship"
            className="mt-6 block rounded-full bg-emerald px-6 py-3 text-center font-heading text-sm font-semibold text-carbon"
          >
            Request Mentorship
          </Link>
        </div>
      )}
    </header>
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
