"use client";
/* eslint-disable @next/next/no-html-link-for-pages */

import Image from "next/image";
import { Menu, UserRound, X } from "lucide-react";
import { useState } from "react";
import { Button, Container } from "./DesignSystem";
import ThemeToggle from "./ThemeToggle";

export default function SiteHeader({ variant = "default", ctaHref = "/#events", ctaLabel = "Join a Live Masterclass" }: { variant?: "default" | "landing"; ctaHref?: string; ctaLabel?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isLanding = variant === "landing";
  const prefix = isLanding ? "/" : "";

  const links = [
    ["Programs", `${prefix}#programs`],
    ["Free Learning", `${prefix}#masterclasses`],
    ["Experts", `${prefix}#experts`],
    ["Stories", `${prefix}#stories`],
    ["About", `${prefix}#about`],
  ];

  return <header className="site-header">
    <Container className="site-nav">
      <a className="brand" href={isLanding ? "/" : "#top"} aria-label="Sikumna Nepal home"><Image src="/sikumna-logo.png" alt="Sikumna Nepal" width={190} height={64} priority /></a>
      {isLanding ? <nav className="landing-nav" aria-label="Landing page navigation"><a href="/">Home</a></nav> : <nav className="desktop-nav" aria-label="Primary navigation">{links.map(([label, href]) => <a href={href} key={label}>{label}</a>)}</nav>}
      <div className="nav-actions"><Button href={ctaHref} size="sm" className="nav-cta">{ctaLabel}</Button><ThemeToggle />{!isLanding && <button className="profile-button" type="button" aria-label="Open account menu"><UserRound size={18} /></button>}<button className="menu-button" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={24} /> : <Menu size={24} />}</button></div>
    </Container>
    {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation">{isLanding ? <a href="/" onClick={() => setMenuOpen(false)}>Home</a> : links.map(([label, href]) => <a href={href} key={label} onClick={() => setMenuOpen(false)}>{label}</a>)}<Button href={ctaHref} onClick={() => setMenuOpen(false)}>{ctaLabel}</Button></nav>}
  </header>;
}
