"use client";

import { useState } from "react";

export type AccordionItem = { question: string; answer: string };

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="divide-y divide-carbon/10">
      {items.map((item, i) => (
        <div key={item.question}>
          <button
            onClick={() => setOpen(open === i ? -1 : i)}
            className="flex w-full items-center gap-3 py-5 text-left"
          >
            <span className="text-xl text-emerald">{open === i ? "−" : "+"}</span>
            <span className="font-heading text-lg font-bold text-carbon">{item.question}</span>
          </button>
          {open === i && (
            <div className="pb-5 pl-8">
              <p className="font-medium text-slate">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
