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
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(32,35,41,0.8)] to-transparent" />
              <div className="absolute inset-0 flex items-end justify-between p-8">
                <div>
                  <span className="block text-[19px] font-medium text-white">{s.name}</span>
                  <span className="block text-base leading-[26px] text-white">Follow Me</span>
                </div>
                <span className="flex h-[55px] w-[55px] shrink-0 items-center justify-center text-emerald">
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
