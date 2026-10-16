"use client";
import { Menu, X } from "lucide-react";
import Link from "./SafeLink";
import { useState } from "react";
import BrandLogo from "./BrandLogo";
import { Button, Container } from "./DesignSystem";
import ThemeToggle from "./ThemeToggle";
import AccountMenu from "./AccountMenu";
import LiveMasterclassMenu from "./LiveMasterclassMenu";

export default function SiteHeader({ variant = "default", ctaHref = "/events/ai-marketing-masterclass", ctaLabel = "Join a Live Masterclass" }: { variant?: "default" | "landing"; ctaHref?: string; ctaLabel?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isLanding = variant === "landing";
  const links = [
    ["Programs", "/programs"],
    ["Free Learning", "/free-masterclasses"],
    ["Stories", "/stories"],
    ["About", "/about"],
  ];

  return <header className="site-header">
    <Container className="site-nav">
      <Link className="brand" href="/" aria-label="Sikumna Nepal home"><BrandLogo /></Link>
      {isLanding ? <nav className="landing-nav" aria-label="Landing page navigation"><Link href="/">Home</Link></nav> : <nav className="desktop-nav" aria-label="Primary navigation">{links.map(([label, href]) => <Link href={href} key={label}>{label}</Link>)}</nav>}
      <div className="nav-actions">{isLanding ? <Button href={ctaHref} size="sm" className="nav-cta">{ctaLabel}</Button> : <LiveMasterclassMenu />}<ThemeToggle />{!isLanding && <AccountMenu />}<button className="menu-button" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={24} /> : <Menu size={24} />}</button></div>
    </Container>
    {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation">{isLanding ? <><Link href="/" onClick={() => setMenuOpen(false)}>Home</Link><Button href={ctaHref} onClick={() => setMenuOpen(false)}>{ctaLabel}</Button></> : <>{links.map(([label, href]) => <Link href={href} key={label} onClick={() => setMenuOpen(false)}>{label}</Link>)}<span className="mobile-live-label">Free live sessions</span><a className="mobile-live-link" href="https://ai.sikumna.com/" onClick={() => setMenuOpen(false)}>AI Marketing Masterclass <small>Reserve seat →</small></a><a className="mobile-live-link" href="https://sen.sikumna.com/" onClick={() => setMenuOpen(false)}>English Fluency Workshop <small>Reserve seat →</small></a></>}</nav>}
  </header>;
}
