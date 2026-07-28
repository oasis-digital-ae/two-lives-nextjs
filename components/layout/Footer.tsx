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
    <footer className="bg-carbon pt-10">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="border-t border-white/10" />

        <div className="grid grid-cols-1 gap-10 py-12 text-center lg:grid-cols-3 lg:text-left">
          <div>
            <Link href="/" className="inline-block">
              <Image
                src="/images/two-lives/logo.svg"
                alt="Two Lives Theory"
                width={300}
                height={70}
                className="mx-auto h-auto w-48 lg:mx-0"
              />
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
            {badges.map((b) => (
              <div
                key={b}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5"
              >
                <Image src={`/images/${b}`} alt="" width={48} height={48} />
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
            <ul className="mt-3 flex justify-center gap-4 text-white lg:justify-start">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noreferrer" aria-label={label}>
                    <Icon className="h-5 w-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10" />

        <div className="flex flex-col items-center justify-between gap-4 py-6 text-sm text-white/60 lg:flex-row">
          <ul className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white">
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
