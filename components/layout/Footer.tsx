import Image from "next/image";
import Link from "next/link";
import { footerLinks } from "@/lib/nav";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  WhatsAppIcon,
} from "@/components/ui/SocialIcons";

const badges = ["badge-1.png", "badge-4.png", "badge-2.png", "badge-3.png"];

const socials = [
  { href: "https://www.facebook.com/BasimYafai", label: "Facebook", Icon: FacebookIcon },
  { href: "https://www.instagram.com/basim.yafai/", label: "Instagram", Icon: InstagramIcon },
  { href: "https://www.linkedin.com/in/basimyafai/", label: "LinkedIn", Icon: LinkedInIcon },
  { href: "https://wa.me/447988720640", label: "WhatsApp", Icon: WhatsAppIcon },
];

export default function Footer() {
  return (
    <footer className="bg-carbon">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="border-t border-white/10" />

        <div className="grid grid-cols-1 gap-10 py-[35px] text-center lg:grid-cols-3 lg:py-[50px] lg:text-left">
          <div>
            <Link href="/" className="inline-block">
              <Image
                src="/images/two-lives/logo.svg"
                alt="Two Lives Theory"
                width={300}
                height={70}
                className="mx-auto h-9 w-auto lg:mx-0"
              />
            </Link>
          </div>

          <div className="mt-[10px] flex flex-wrap justify-center gap-0 lg:justify-start">
            {badges.map((b) => (
              <div
                key={b}
                className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-white/[0.08]"
              >
                <Image
                  src={`/images/${b}`}
                  alt=""
                  width={50}
                  height={50}
                  className="h-auto max-w-[50px]"
                />
              </div>
            ))}
          </div>

          <div>
            <span className="font-heading text-lg text-white">Contact:</span>{" "}
            <a
              href="mailto:basim@twolivestheory.com"
              className="font-heading text-lg text-white underline decoration-emerald underline-offset-4"
            >
              basim@twolivestheory.com
            </a>
            <ul className="mt-[10px] flex justify-center gap-[10px] text-white lg:justify-start">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10" />

        <div
          className="flex flex-col items-center justify-between gap-4 py-[25px] text-sm lg:flex-row"
          style={{ color: "#768086" }}
        >
          <ul className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-emerald">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p>&copy; 2026 Two Lives Theory. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
