"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export default function Accordion({ items }: { items: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return <div className="ds-accordion">{items.map((item, index) => {
    const isOpen = openIndex === index;
    const panelId = `faq-panel-${index}-${item.question.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
    return <article className={isOpen ? "is-open" : ""} key={item.question}>
      <button type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpenIndex(isOpen ? null : index)}><span>{item.question}</span>{isOpen ? <Minus size={20} /> : <Plus size={20} />}</button>
      <div className="accordion-panel" id={panelId} aria-hidden={!isOpen}><div><p>{item.answer}</p></div></div>
    </article>;
  })}</div>;
}
