export type MegaCard = {
  href: string;
  title: string;
  description: string;
  image: string;
};

export const aboutCards: MegaCard[] = [
  {
    href: "/about",
    title: "Meet Basim",
    description: "The journey, the philosophy, the work.",
    image: "/images/two-lives/meet-basim.png",
  },
  {
    href: "/our-method",
    title: "Our Method",
    description: "The system behind sustainable transformation.",
    image: "/images/method.png",
  },
];

export const mentorCards: MegaCard[] = [
  {
    href: "/entrepreneur",
    title: "Entrepreneurs",
    description: "Sharper focus. Stronger mindset.",
    image: "/images/two-lives/entreprenuer.png",
  },
  {
    href: "/athlete",
    title: "Athletes",
    description: "Break limits training can't reach.",
    image: "/images/two-lives/athlete.png",
  },
  {
    href: "/elite-competitors",
    title: "Elite Competitors",
    description: "Execute consistently without burnout.",
    image: "/images/two-lives/poker-h1.png",
  },
  {
    href: "/executive-leaders",
    title: "Executives & Leaders",
    description: "Align mindset with ambition.",
    image: "/images/two-lives/exec-h1.png",
  },
];

export const exploreLinks = [
  { href: "/faq", label: "FAQ" },
  { href: "/blogs", label: "Blogs" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/recommended-reading", label: "Recommended Reading" },
  { href: "/explore-your-archetype", label: "Explore Your Archetype" },
];

export const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Basim" },
  { href: "/keynote-talks", label: "Keynote Talks" },
  { href: "/blogs", label: "Blogs" },
];
