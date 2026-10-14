/*
 * Navigation and footer content. Header.tsx and Footer.tsx render these; change a
 * label or link here and every page follows.
 *
 * Labels are rendered exactly as the static site had them (the main menu labels
 * carry a trailing space before the chevron icon, added by the component).
 */

export type MegaCard = {
  href: string;
  /** file under /images; Header builds the Image CDN URLs (400/800/1200) from it */
  image: string;
  alt: string;
  title: string;
  text: string;
  /** the first card on the About menu has a transparent overlay */
  overlayClass?: string;
};

export type NavItem =
  | { label: string; href: string }
  | { label: string; homeLabel?: string; mega: { columns: string; cards: MegaCard[] } }
  | { label: string; dropdown: { toggleId: string; labelledBy: string; items: { href: string; label: string }[] } };

export const mainNav: NavItem[] = [
  {
    label: "About Basim",
    homeLabel: "About", // the homepage menu uses the short label
    mega: {
      columns: "row-cols-lg-2",
      cards: [
        { href: "/about", image: "two-lives/meet-basim.webp", alt: "Meet Basim", title: "Meet Basim", text: "The journey, the philosophy, the work.", overlayClass: "mega-card-overlay bg-none" },
        { href: "/our-method", image: "method.webp", alt: "method", title: "Our Method", text: "The system behind sustainable transformation." },
      ],
    },
  },
  {
    label: "Who I mentor",
    mega: {
      columns: "row-cols-lg-4",
      cards: [
        { href: "/entrepreneur", image: "two-lives/entreprenuer.webp", alt: "Entrepreneurs", title: "Entrepreneurs", text: "Sharper focus. Stronger mindset." },
        { href: "/athlete", image: "two-lives/athlete.webp", alt: "Athletes", title: "Athletes", text: "Break limits training can’t reach." },
        { href: "/elite-competitors", image: "two-lives/poker-h1.webp", alt: "Elite Competitors", title: "Elite Competitors", text: "Execute consistently without burnout." },
        { href: "/executive-leaders", image: "two-lives/exec-h1.webp", alt: "Executives & Leaders", title: "Executives & Leaders", text: "Align mindset with ambition." },
      ],
    },
  },
  { label: "Keynote Talks", href: "/keynote-talks" },
  {
    label: "Explore",
    dropdown: {
      toggleId: "navbarDropdownMenuLink",
      labelledBy: "navbarDropdownMenuLink1",
      items: [
        { href: "/faq", label: "FAQ" },
        { href: "/journal", label: "Personal Journal" },
        { href: "/blog", label: "Blog" },
        { href: "/case-studies", label: "Case Studies" },
        { href: "/recommended-reading", label: "Recommended Reading" },
        { href: "/explore-your-archetype", label: "Explore Your Archetype" },
      ],
    },
  },
];

export const headerCta = { href: "/request-mentorship", label: "Request Mentorship" };

export const contact = {
  email: "basim@twolivestheory.com",
  whatsapp: "https://wa.me/447988720640",
};

export const socials = [
  { href: "https://www.facebook.com/BasimYafai", label: "Facebook", icon: "fab fa-facebook-f text-white" },
  { href: "https://www.instagram.com/basim.yafai/", label: "Instagram", icon: "fab fa-instagram text-white" },
  { href: "https://www.linkedin.com/in/basimyafai/", label: "LinkedIn", icon: "fab fa-linkedin-in text-white" },
  { href: contact.whatsapp, label: "WhatsApp", icon: "fab fa-whatsapp text-white" },
];

export const badges = [
  { image: "/.netlify/images?url=/images/badge-1.webp&w=160&fm=webp&q=70", alt: "Certified Master of Neuro-Linguistic Programming (MNLP) — INLP Center" },
  { image: "/.netlify/images?url=/images/badge-4.webp&w=160&fm=webp&q=70", alt: "Certified Hypnosis Practitioner (CHP) — INLP Center" },
  { image: "/.netlify/images?url=/images/badge-2.webp&w=160&fm=webp&q=70", alt: "Certified Master Life Coach (MLC) — INLP Center" },
];

export const footerNav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Basim" },
  { href: "/keynote-talks", label: "Keynote Talks" },
  { href: "/journal", label: "Personal Journal" },
  { href: "/blog", label: "Blog" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/cookie-policy", label: "Cookie Policy" },
];

export const footerCredit = { text: "Crafted by ", href: "https://oasis-digital.ae/", label: "Oasis Digital" };
export const copyright = "© 2026 Two Lives Theory®. All rights reserved.";
