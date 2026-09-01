"use client";

import { ArrowRight, Play } from "lucide-react";
import { Button } from "../DesignSystem";
import RotatingWords from "../RotatingWords";
import Link from "next/link";

export default function HomeHero() {
  return <section className="home-hero" aria-labelledby="hero-title">
    <div className="hero-grid" aria-hidden="true" />
    <div className="home-hero-content ds-container">
      <span className="ds-badge hero-eyebrow">Practical education for real life</span>
      <h1 id="hero-title">Learn skills that actually matter for your <RotatingWords words={["career", "business", "confidence", "future"]} /></h1>
      <p>Practical live mentorship, expert-led programs and free masterclasses designed to help you build skills you can use in your career, business and everyday life.</p>
      <div className="hero-actions">
        <Button href="/programs" size="lg">Explore Programs <ArrowRight size={19} /></Button>
        <Button href="/free-masterclasses" variant="secondary" size="lg"><Play size={17} fill="currentColor" /> Watch Free Masterclasses</Button>
      </div>
      <div className="hero-topics" aria-label="Popular learning topics"><span>Popular now</span><Link href="/events/ai-marketing-masterclass">AI Marketing</Link><Link href="/events/english-fluency-workshop">English Fluency</Link><Link href="/free-masterclasses/freelancing-101">Freelancing</Link><Link href="/free-masterclasses/seo-masterclass">SEO</Link></div>
    </div>
  </section>;
}
