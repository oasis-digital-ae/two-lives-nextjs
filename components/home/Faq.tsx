"use client";

import Link from "next/link";
import { useState } from "react";
import Accordion, { type AccordionItem } from "@/components/ui/Accordion";

const categories: { label: string; items: AccordionItem[] }[] = [
  {
    label: "The Philosophy & Framework",
    items: [
      {
        question: "What is Two Lives Theory, really about?",
        answer:
          "Two Lives Theory is about strengthening the life you have built while consciously stepping into the next phase of who you are becoming. Rather than dismantling your identity or success, the work focuses on integration, alignment, and evolution so growth feels grounded rather than disruptive.",
      },
      {
        question: "How is this different from coaching or therapy?",
        answer:
          "This is not therapy and it is not traditional coaching. Coaching often focuses on goals and performance. Therapy often focuses on healing the past. This mentoring integrates both where needed, offering depth, perspective, and long term guidance without placing you in a patient role.",
      },
    ],
  },
  {
    label: "Who This Is For",
    items: [
      {
        question: "Who is this mentoring for?",
        answer:
          "This work is for high performers who are outwardly capable and successful but feel an internal pull toward deeper clarity, fulfilment, or alignment. It is especially relevant during periods of transition, questioning, or quiet internal tension.",
      },
      {
        question: "How do I know if this is right for me?",
        answer:
          "If you feel successful yet sense there is more depth, alignment, or inner stability available to you, this work will likely resonate. An initial conversation offers clarity without pressure or obligation.",
      },
    ],
  },
  {
    label: "The Mentoring Relationship",
    items: [
      {
        question: "What is your role in this journey?",
        answer:
          "My role is that of a mentor who walks alongside you consistently. I do not offer one off advice or motivational strategies. I provide ongoing guidance across mental, emotional, spiritual, and physical layers as you navigate growth over time, within a proven, integrated framework that is tailored to each individual.",
      },
      {
        question: "How long have you been doing this work?",
        answer:
          "I bring over twelve years of experience guiding individuals through growth, emotional challenges, identity shifts, relationships, and life transitions. This experience allows me to mentor with discernment, calm presence, and perspective. I have guided high performers from around the world.",
      },
    ],
  },
  {
    label: "Outcomes, Depth & Expectations",
    items: [
      {
        question: "What areas do you support people with?",
        answer:
          "I support people mentally, emotionally, spiritually, and physically. Every client is different, and the work responds to what is most present for them. This may include clarity, anxiety, low mood, emotional overwhelm, relationships, self trust, confidence, deeper self understanding, passion, and purpose. The focus is integration rather than fixing or labelling.",
      },
      {
        question: "Do you help with letting go of the past?",
        answer:
          "YES. Part of moving forward is integrating and releasing what no longer serves you. This work supports emotional processing, awareness, and release when needed, but always within a grounded mentoring relationship rather than a clinical framework.",
      },
      {
        question: "Is this a quick fix or transformation programme?",
        answer:
          "NO. This work is intentionally not a quick fix. It is for people who value consistency, depth, and sustainable growth rather than dramatic short term change or motivational highs.",
      },
      {
        question: "Will this change my ambition or performance?",
        answer:
          "It will not take away your ambition. By reducing internal friction and emotional load, many people experience clearer focus, steadier energy, and more intentional leadership rather than pressure driven performance.",
      },
    ],
  },
];

export default function Faq() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-pattern-section bg-off-white py-16 md:py-20">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="mb-10 flex flex-col items-center justify-between gap-4 md:flex-row">
          <h2 className="text-shadow-soft text-center font-heading text-[32px] font-semibold tracking-[-2px] text-carbon sm:text-[40px] md:text-left">
            Frequently Asked{" "}
            <span className="border-b-2 border-carbon italic">Questions</span>
          </h2>
          <Link href="/request-mentorship" className="btn-three hidden shrink-0 md:inline-block">
            Request Mentorship
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-10 rounded-[28px] border border-white/45 bg-white/25 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.12)] backdrop-blur-2xl lg:grid-cols-4 lg:p-10">
          <div className="lg:col-span-1">
            <span className="mb-4 block text-center text-[20px] font-semibold text-carbon italic sm:text-[16px] lg:text-left">
              Find what you need clarity on...
            </span>
            <ul className="flex flex-col divide-y divide-carbon/10">
              {categories.map((cat, i) => (
                <li key={cat.label}>
                  <button
                    onClick={() => setActive(i)}
                    className={`w-full py-4 text-center font-heading text-[20px] font-semibold transition-colors lg:text-left ${
                      active === i ? "font-bold text-emerald" : "text-carbon/70"
                    }`}
                  >
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <Accordion items={categories[active].items} />
          </div>
        </div>

        <div className="mt-10 text-center">
          <span className="mb-2.5 block text-[18px] font-medium text-carbon sm:text-base">
            Still have questions?
          </span>
          <Link
            href="/request-mentorship"
            className="text-shadow-soft mb-6 inline-block font-heading text-[26px] font-semibold text-carbon"
          >
            &rarr; Request mentorship and we&apos;ll walk through everything together.
          </Link>
          <div>
            <Link href="/request-mentorship" className="btn-three">
              Request Mentorship
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
