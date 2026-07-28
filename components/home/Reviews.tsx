"use client";

import Image from "next/image";
import { ArrowNav } from "@/components/ui/Carousel";
import { useCarousel } from "@/components/ui/Carousel";

const reviews = [
  {
    name: "Grant Gardner",
    role: "Professional Poker Player & Entrepreneur",
    ig: "@fitnessfarang",
    igHref: "https://www.instagram.com/fitnessfarang/",
    avatar: "/images/grant.png",
    quotes: [
      "\"Working with Basim has truly been life changing.",
      "Before I started, I struggled with severe anxiety, anger issues, and over a year of depression. I felt lost and without direction, which led me to reach out to Basim for support.",
      "Through his expert NLP techniques, Basim helped me break free from a stuck mindset and completely shift my perspective. In just one session, I made more progress than I had in years.",
      "Today, I feel more positive than ever and in full control of my emotions. If you are feeling stuck and ready for change, Basim is the person to work with. I couldn't recommend him more.\"",
    ],
  },
  {
    name: "Cattaleeya Schulze",
    role: "Mother, Wife & Entrepreneur",
    ig: "@cattaleeya_schulze",
    igHref: "https://www.instagram.com/cattaleeya_schulze",
    avatar: "/images/Cattaleeya.jpg",
    quotes: [
      "\"Working with Basim wasn't just coaching, it felt like being handed a life manual, finally.",
      "He helped me see things from a completely new angle. Basim didn't just help me think differently, he helped me live differently. I'm more present, more grounded, and genuinely proud of how far I've come.",
      "Who knew that a small shift in mindset could make life feel less chaotic and much clearer.\"",
    ],
  },
  {
    name: "Punnat Punsri",
    role: "2025 GPI World #1 Player of the Year / Entrepreneur / Philanthropist",
    ig: "@punnatpunsri",
    igHref: "https://www.instagram.com/punnatpunsri/",
    avatar: "/images/punnat.png",
    quotes: [
      "\"Working with Basim throughout 2025 helped me strengthen my mindset, emotional balance, and clarity during one of the most demanding years of my career.",
      "His mentoring supported me not just in performance, but in how I managed pressure, focus, and life alongside poker.",
      "Achieving GPI World Player of the Year and becoming the first Asian player to do so was the result of alignment, consistency, and inner stability built over time.”",
    ],
  },
  {
    name: "Dan Moores",
    role: "Musician / Entrepreneur",
    ig: "@dmooresmusic",
    igHref: "https://www.instagram.com/dmooresmusic/",
    avatar: "/images/dan-moores.png",
    quotes: [
      "“I came to Basim during a period of change, feeling lost, unmotivated, and disconnected from my passion as a musician.",
      "Through his structured and professional mentoring, I was able to reframe my mindset, reconnect with my work, and regain my energy and love for the stage.",
      "He helped me become more aware of the thought patterns holding me back, allowing me to respond to life with clarity and intention.”",
    ],
  },
  {
    name: "Lauri Enn",
    role: "Poker Player / Marathon Runner / Father",
    ig: "@laurienn",
    igHref: "https://www.instagram.com/laurienn/",
    avatar: "/images/lauri-enn.png",
    quotes: [
      "“I came to Basim wanting to refine my focus in all areas of my life. My Mindset, Business, Poker and Personal life.",
      "I am now thriving in all areas. A life filled with purpose, discipline and balance. I live a life that is truly on my terms.”",
    ],
  },
  {
    name: "Ellie Jackson",
    role: "Ex Ski Racer for Great Britain",
    ig: "@ell_iejackson",
    igHref: "https://www.instagram.com/ell_iejackson/",
    avatar: "/images/ellie-jackson.png",
    quotes: [
      "“As a former Great Britain ski racer, Basim helped me strengthen my mindset, sharpen my focus, and rebuild my confidence.",
      "His support came at a crucial point in my career, and the tools he gave me still serve me today.",
      "Working with him was one of the best decisions I've ever made.”",
    ],
  },
  {
    name: "Brayden Clarke",
    role: "Arsenal & Wales Footballer",
    ig: "@braydenclarke5",
    igHref: "https://www.instagram.com/braydenclarke5/",
    avatar: "/images/brayden-clarke.png",
    quotes: [
      "“As a professional footballer for Arsenal and Wales, working with Basim took my mental game to the next level.",
      "His coaching sharpened my focus, strengthened my mindset and gave me the tools to perform at my best on and off the field.",
      "Looking back, it was a key part in becoming the best athlete I can.”",
    ],
  },
  {
    name: "Tom Russell",
    role: "Head of Strategy & Development - Close Protection",
    ig: "@tomerussell204",
    igHref: "https://www.instagram.com/tomerussell204/",
    avatar: "/images/tom-russell.png",
    quotes: [
      "“I struggled with self-doubt, overthinking and feeling the need to constantly prove myself.",
      "But working with Basim was a game-changer for my mindset and personal growth. I now trust my instincts, set boundaries and focus on what truly matters.”",
    ],
  },
];

export default function Reviews() {
  const { emblaRef, scrollPrev, scrollNext } = useCarousel();

  return (
    <section className="bg-white py-16 md:py-20">
      <div
        className="mx-auto max-w-[1400px] bg-top bg-no-repeat px-5 lg:px-10"
        style={{ backgroundImage: "url(/images/demo-it-business-testimonial-bg.png)" }}
      >
        <div className="mb-10 text-center">
          <h2 className="text-shadow-soft mb-2 font-heading text-[32px] font-semibold tracking-[-2px] text-carbon sm:text-[40px]">
            Client Reviews
          </h2>
          <a
            href="https://www.trustpilot.com/review/www.twolivestheory.com"
            target="_blank"
            rel="noreferrer"
            className="text-dark-green text-[18px] font-medium underline"
          >
            Find us on <span className="font-black italic">TrustPilot &rarr;</span>
          </a>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {reviews.map((r) => (
              <div key={r.name} className="min-w-0 flex-[0_0_100%]">
                <div className="grid grid-cols-1 items-center gap-8 px-2 md:grid-cols-3">
                  <div className="text-center">
                    <div className="relative mx-auto mb-3 aspect-square w-[70%]">
                      <div className="h-full w-full overflow-hidden rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.12),0_2px_6px_rgba(0,0,0,0.08),0_0_0_2px_rgba(255,255,255,0.6)]">
                        <Image
                          src={r.avatar}
                          alt={r.name}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                      <div className="animate-float absolute top-[-6px] left-[-30px] flex h-[95px] w-[95px] items-center justify-center sm:h-[125px] sm:w-[125px]">
                        <Image src="/images/twoliveslogo.svg" alt="" width={90} height={90} />
                      </div>
                    </div>
                    <p className="mt-3 mb-1 font-heading text-[18px] font-semibold text-carbon">
                      {r.name}
                    </p>
                    <p className="mb-0 text-[16px] text-carbon">{r.role}</p>
                    <p className="mb-0 text-[16px] text-carbon">
                      IG:{" "}
                      <a href={r.igHref} target="_blank" rel="noreferrer" className="text-carbon underline">
                        {r.ig}
                      </a>
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-dark-green mb-2 block text-center font-heading text-[20px] font-semibold tracking-[-2px] sm:text-left">
                      From Struggle to Clarity
                    </span>
                    {r.quotes.map((q, i) => (
                      <p key={i} className="mb-1 text-[18px] font-medium text-carbon last:mb-0">
                        {q}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-3 mb-3 text-center text-[18px] font-bold text-carbon italic sm:text-[16px]">
          &ldquo;Confidential by default. Shared by choice.&rdquo;
        </p>

        <ArrowNav onPrev={scrollPrev} onNext={scrollNext} className="justify-center" />
      </div>
    </section>
  );
}
