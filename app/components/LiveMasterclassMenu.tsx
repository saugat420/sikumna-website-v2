import { ChevronDown } from "lucide-react";

const liveOptions = [
  { title: "AI Marketing Masterclass", href: "https://ai.sikumna.com/" },
  { title: "English Fluency Workshop", href: "https://sen.sikumna.com/" },
];

export default function LiveMasterclassMenu() {
  return <details className="live-masterclass-menu">
    <summary>Join Free Masterclass <ChevronDown size={16} aria-hidden="true" /></summary>
    <div className="live-masterclass-popover"><span>Choose your free live session</span>{liveOptions.map((option) => <a href={option.href} key={option.href}><strong>{option.title}</strong><small>Reserve your seat →</small></a>)}</div>
  </details>;
}
