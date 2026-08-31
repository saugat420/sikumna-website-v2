"use client";

import { ArrowRight, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../DesignSystem";

const phrases = ["career", "business", "confidence", "future"];

export default function HomeHero() {
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    if (!media.matches) {
      const timer = window.setInterval(() => setIndex((current) => (current + 1) % phrases.length), 2600);
      return () => {
        media.removeEventListener("change", sync);
        window.clearInterval(timer);
      };
    }
    return () => media.removeEventListener("change", sync);
  }, []);

  const phrase = reduceMotion ? phrases.at(-1) : phrases[index];

  return <section className="home-hero" aria-labelledby="hero-title">
    <div className="hero-grid" aria-hidden="true" />
    <div className="home-hero-content ds-container">
      <span className="ds-badge hero-eyebrow">Practical education for real life</span>
      <h1 id="hero-title">Learn skills that actually matter for your <span className="hero-rotating" aria-live="polite">{phrase}<i aria-hidden="true" /></span></h1>
      <p>Practical live mentorship, expert-led programs and free masterclasses designed to help you build skills you can use in your career, business and everyday life.</p>
      <div className="hero-actions">
        <Button href="#programs" size="lg">Explore Programs <ArrowRight size={19} /></Button>
        <Button href="#masterclasses" variant="secondary" size="lg"><Play size={17} fill="currentColor" /> Watch Free Masterclasses</Button>
      </div>
      <div className="hero-topics" aria-label="Popular learning topics"><span>Popular now</span><a href="#events">AI Marketing</a><a href="#events">English Fluency</a><a href="#masterclasses">Freelancing</a><a href="#masterclasses">SEO</a></div>
    </div>
  </section>;
}
