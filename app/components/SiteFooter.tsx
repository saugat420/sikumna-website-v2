"use client";
import { FormEvent, useState } from "react";
import Link from "./SafeLink";
import BrandLogo from "./BrandLogo";
import { Container } from "./DesignSystem";

export default function SiteFooter({ variant = "default" }: { variant?: "default" | "landing" }) {
  const [subscribed, setSubscribed] = useState(false);
  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubscribed(true);
  }

  return <footer className={`site-footer footer-variant-${variant}`} id="about">
    <Container className="site-footer-grid">
      <div className="site-footer-brand"><Link href="/" aria-label="Sikumna Nepal home"><BrandLogo /></Link><p>Live mentorship, workshops and expert-led programs to help you grow in your career, business and personal life.</p></div>
      <div className="site-footer-links"><h2>Explore</h2><Link href="/programs">Programs</Link><Link href="/free-masterclasses">Free Learning</Link><Link href="/#events">Events</Link><Link href="/stories">Stories</Link></div>
      <div className="site-footer-links"><h2>Company</h2><Link href="/about">About Us</Link><a href="mailto:support@sikumna.com">Contact Us</a></div>
      <div className="site-footer-links"><h2>Support</h2><Link href="/help-center">Help Center</Link><Link href="/faq">FAQ</Link><Link href="/refund-policy">Refund Policy</Link><Link href="/terms">Terms of Use</Link><Link href="/privacy-policy">Privacy Policy</Link></div>
      <div className="site-newsletter"><h2>Stay Updated</h2><p>Get the latest programs, events and free resources straight to your inbox.</p><form onSubmit={subscribe}><label className="sr-only" htmlFor={`newsletter-${variant}`}>Email address</label><input id={`newsletter-${variant}`} required type="email" placeholder="Email address" /><button type="submit">Subscribe</button></form><span className="form-status" aria-live="polite">{subscribed ? "Thanks! You’re on the list." : ""}</span></div>
    </Container>
    <p className="site-copyright">© 2026 Sikumna Nepal. All rights reserved.</p>
  </footer>;
}
