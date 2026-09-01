"use client";

import { useEffect, useState } from "react";

export default function RotatingWords({ words, className = "" }: { words: string[]; className?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % words.length), 2500);
    return () => window.clearInterval(timer);
  }, [words.length]);

  return <span className={`rotating-words ${className}`} aria-live="polite"><span key={words[index]}>{words[index]}</span></span>;
}
