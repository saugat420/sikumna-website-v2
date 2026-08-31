"use client";
import { FormEvent, useState } from "react";
import BrandLogo from "./BrandLogo";
import { Container } from "./DesignSystem";

export default function SiteFooter({ variant = "default" }: { variant?: "default" | "landing" }) {
  const [subscribed, setSubscribed] = useState(false);
  const prefix = variant === "landing" ? "/" : "";

  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubscribed(true);
  }

  return <footer className={`site-footer footer-variant-${variant}`} id="about">
    <Container className="site-footer-grid">
      <div className="site-footer-brand"><a href={`${prefix}#top`} aria-label="Sikumna Nepal home"><BrandLogo /></a><p>Live mentorship, workshops and expert-led programs to help you grow in your career, business and personal life.</p><div className="site-socials"><a href={`${prefix}#top`} aria-label="Facebook">f</a><a href={`${prefix}#top`} aria-label="Instagram">◎</a><a href={`${prefix}#top`} aria-label="YouTube">▶</a><a href={`${prefix}#top`} aria-label="LinkedIn">in</a></div></div>
      <div className="site-footer-links"><h2>Explore</h2><a href={`${prefix}#programs`}>Programs</a><a href={`${prefix}#masterclasses`}>Free Learning</a><a href={`${prefix}#events`}>Events</a><a href={`${prefix}#stories`}>Stories</a></div>
      <div className="site-footer-links"><h2>Company</h2><a href={`${prefix}#about`}>About Us</a><a href={`${prefix}#experts`}>Our Experts</a><a href={`${prefix}#top`}>Careers</a><a href={`${prefix}#top`}>Contact Us</a></div>
      <div className="site-footer-links"><h2>Support</h2><a href={`${prefix}#top`}>Help Center</a><a href={`${prefix}#top`}>FAQ</a><a href={`${prefix}#top`}>Terms of Use</a><a href={`${prefix}#top`}>Privacy Policy</a></div>
      <div className="site-newsletter"><h2>Stay Updated</h2><p>Get the latest programs, events and free resources straight to your inbox.</p><form onSubmit={subscribe}><label className="sr-only" htmlFor={`newsletter-${variant}`}>Email address</label><input id={`newsletter-${variant}`} required type="email" placeholder="Email address" /><button type="submit">Subscribe</button></form><span className="form-status" aria-live="polite">{subscribed ? "Thanks! You’re on the list." : ""}</span></div>
    </Container>
    <p className="site-copyright">© 2026 Sikumna Nepal. All rights reserved.</p>
  </footer>;
}
