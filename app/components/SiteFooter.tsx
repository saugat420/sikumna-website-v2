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
      <div className="site-footer-links"><h2>Company</h2><Link href="/about">About Us</Link><Link href="/experts">Our Experts</Link><span className="footer-pending">Careers <small>Coming soon</small></span><span className="footer-pending">Contact Us <small>Coming soon</small></span></div>
      <div className="site-footer-links"><h2>Support</h2><span className="footer-pending">Help Center <small>Coming soon</small></span><span className="footer-pending">FAQ <small>Coming soon</small></span><span className="footer-pending">Terms of Use <small>Coming soon</small></span><span className="footer-pending">Privacy Policy <small>Coming soon</small></span></div>
      <div className="site-newsletter"><h2>Stay Updated</h2><p>Get the latest programs, events and free resources straight to your inbox.</p><form onSubmit={subscribe}><label className="sr-only" htmlFor={`newsletter-${variant}`}>Email address</label><input id={`newsletter-${variant}`} required type="email" placeholder="Email address" /><button type="submit">Subscribe</button></form><span className="form-status" aria-live="polite">{subscribed ? "Thanks! You’re on the list." : ""}</span></div>
    </Container>
    <p className="site-copyright">© 2026 Sikumna Nepal. All rights reserved.</p>
  </footer>;
}
