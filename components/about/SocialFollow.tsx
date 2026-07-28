import Image from "next/image";
import { FacebookIcon, InstagramIcon, LinkedInIcon } from "@/components/ui/SocialIcons";

const socials = [
  {
    image: "/images/about-2.png",
    name: "Instagram",
    href: "https://www.instagram.com/basim.yafai/",
    Icon: InstagramIcon,
  },
  {
    image: "/images/about-1.png",
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/basimyafai/",
    Icon: LinkedInIcon,
  },
  {
    image: "/images/about-3.png",
    name: "Facebook",
    href: "https://www.facebook.com/",
    Icon: FacebookIcon,
  },
];

export default function SocialFollow() {
  return (
    <section className="bg-pattern-section bg-off-white py-16 md:py-20">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="group relative block aspect-[4/5] overflow-hidden rounded-[10px]"
            >
              <Image
                src={s.image}
                alt=""
                fill
                className="object-cover grayscale transition-transform duration-500 group-hover:-translate-y-2"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex items-end justify-between p-8">
                <div className="translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="block text-lg font-medium text-white">{s.name}</span>
                  <span className="block text-white/60">Follow Me</span>
                </div>
                <span className="flex h-[55px] w-[55px] shrink-0 translate-y-4 items-center justify-center rounded-full bg-emerald text-carbon opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <s.Icon className="h-5 w-5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
