"use client";

import Image from "next/image";
import { ArrowRight, Menu, Play, UserRound, X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

type Accent = "orange" | "blue" | "green" | "purple";

const benefits = [
  { image: "/generated/icons/live-interactive.png", title: "Live & Interactive", description: "Real-time learning with mentors and peers", accent: "orange" as Accent },
  { image: "/generated/icons/expert-led.png", title: "Expert-Led", description: "Learn from industry professionals", accent: "blue" as Accent },
  { image: "/generated/icons/practical-relevant.png", title: "Practical & Relevant", description: "Apply skills to real projects and challenges", accent: "green" as Accent },
  { image: "/generated/icons/learning-community.png", title: "Learning Community", description: "Join a supportive community of learners", accent: "purple" as Accent },
];

const programs = [
  { title: "AI Marketing Launchpad", description: "A practical program to help you master AI marketing tools and strategies.", image: "/generated/icons/ai-marketing-launchpad.png" },
  { title: "60 Day English Fluency Launchpad", description: "Speak English confidently in 60 days with live practice and feedback.", image: "/generated/icons/english-fluency.png" },
];

const events = [
  { title: "AI Marketing Masterclass", description: "Discover how AI can 10x your marketing results and save hours of work.", date: "Sat, 24 May 2025 · 7:00 PM NPT", image: "/generated/icons/ai-masterclass.png", href: "/events/ai-marketing-masterclass" },
  { title: "English Fluency Workshop", description: "Learn practical speaking techniques and improve fluency in real conversations.", date: "Sun, 25 May 2025 · 7:00 PM NPT", image: "/generated/icons/english-workshop.png", href: "/events/english-fluency-workshop" },
];

const masterclasses: { title: string; description: string; category: string; meta: string; accent: Accent; image: string }[] = [
  { title: "Freelancing 101", description: "Find clients, price your work, and build a confident freelance career.", category: "Career", meta: "60 mins · Beginner", accent: "orange", image: "/generated/icons/freelancing.png" },
  { title: "SEO Masterclass", description: "Improve search visibility with practical keyword and optimization techniques.", category: "Marketing", meta: "45 mins · Intermediate", accent: "green", image: "/generated/icons/seo.png" },
  { title: "Ecommerce Masterclass", description: "Learn the essentials of launching and growing a successful online store.", category: "Business", meta: "50 mins · Beginner", accent: "purple", image: "/generated/icons/ecommerce.png" },
  { title: "Personal Branding Masterclass", description: "Build a trusted professional identity that attracts new opportunities.", category: "Personal Growth", meta: "40 mins · All Levels", accent: "blue", image: "/generated/icons/personal-branding.png" },
  { title: "Social Media Marketing", description: "Plan engaging content and turn social platforms into growth channels.", category: "Marketing", meta: "55 mins · Beginner", accent: "orange", image: "/generated/icons/social-media.png" },
];

const experts: { name: string; expertise: string; accent: Accent; image: string }[] = [
  { name: "Saurav Shrestha", expertise: "AI & Growth Marketing", accent: "orange", image: "/generated/mentors/saurav-shrestha.png" },
  { name: "Anita Karki", expertise: "English Communication", accent: "blue", image: "/generated/mentors/anita-karki.png" },
  { name: "Rajan Adhikari", expertise: "SEO & Digital Marketing", accent: "green", image: "/generated/mentors/rajan-adhikari.png" },
  { name: "Prakriti Tamang", expertise: "Ecommerce & Business", accent: "purple", image: "/generated/mentors/prakriti-tamang.png" },
  { name: "Bikash Kc", expertise: "Business Strategy", accent: "orange", image: "/generated/mentors/bikash-kc.png" },
];

const processSteps: { title: string; description: string; accent: Accent; image: string }[] = [
  { title: "Explore", description: "Browse programs, events and free resources.", accent: "orange", image: "/generated/icons/explore.png" },
  { title: "Enroll", description: "Join programs or reserve your seat for live events.", accent: "blue", image: "/generated/icons/enroll.png" },
  { title: "Learn Live", description: "Attend live sessions, practice, and collaborate with peers.", accent: "green", image: "/generated/icons/learn-live.png" },
  { title: "Grow", description: "Apply your skills and achieve your personal and professional goals.", accent: "purple", image: "/generated/icons/grow.png" },
];

function SectionHeading({ title, link }: { title: string; link: string }) {
  return <div className="section-heading"><h2>{title}</h2><a href="#top">{link} <ArrowRight size={16} /></a></div>;
}

function ProgramCard({ program }: { program: (typeof programs)[number] }) {
  return <article className="program-card card"><div className="program-art"><Image src={program.image} alt="" fill sizes="(max-width: 620px) 100vw, 320px" /></div><div className="program-content"><h3>{program.title}</h3><p>{program.description}</p><a href="#top">Learn more <ArrowRight size={15} /></a></div></article>;
}

function EventCard({ event }: { event: (typeof events)[number] }) {
  return <article className="event-card card"><div className="event-copy"><div className="badges"><span className="live-badge"><i /> Live</span><span>Online</span><span>Free</span></div><h3>{event.title}</h3><p>{event.description}</p><time>{event.date}</time><a className="event-link" href={event.href}>Reserve Seat <ArrowRight size={14} /></a></div><div className="event-art"><Image src={event.image} alt="" fill sizes="130px" /></div></article>;
}

function MasterclassCard({ item }: { item: (typeof masterclasses)[number] }) {
  return <article className="masterclass-card card"><div className="course-art"><Image src={item.image} alt="" fill sizes="(max-width: 620px) 76vw, 230px" /></div><div className="course-content"><h3>{item.title}</h3><p>{item.description}</p><span className={`pill pill-${item.accent}`}>{item.category}</span><div className="course-bottom"><span>{item.meta}</span><a href="#top" aria-label={`Play ${item.title}`}><Play size={13} fill="currentColor" /></a></div></div></article>;
}

function ExpertCard({ expert, index }: { expert: (typeof experts)[number]; index: number }) {
  return <article className="expert-card card"><div className={`expert-avatar avatar-${index + 1}`}><Image src={expert.image} alt={`${expert.name} profile`} fill sizes="100px" /></div><h3>{expert.name}</h3><span className={`pill pill-${expert.accent}`}>{expert.expertise}</span><a className="linkedin-mark" href="#top" aria-label={`${expert.name} on LinkedIn`}>in</a></article>;
}

function ProcessStep({ step, index }: { step: (typeof processSteps)[number]; index: number }) {
  return <article className={`process-card card accent-${step.accent}`}><span className="step-number">{index + 1}</span><div className="step-icon"><Image src={step.image} alt="" fill sizes="64px" /></div><h3>{step.title}</h3><p>{step.description}</p>{index < processSteps.length - 1 && <span className="step-arrow" aria-hidden="true">→</span>}</article>;
}

export default function HomeClient() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: .12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  function subscribe(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSubscribed(true); }

  return <>
    <header className="site-header">
      <div className="nav-shell">
        <a className="brand" href="#top" aria-label="Sikumna Nepal home"><Image src="/sikumna-logo.png" alt="Sikumna" width={190} height={64} priority /></a>
        <nav className="desktop-nav" aria-label="Primary navigation"><a href="#programs">Programs</a><a href="#masterclasses">Free Learning</a><a href="#experts">Experts</a><a href="#stories">Stories</a><a href="#about">About</a></nav>
        <div className="nav-actions"><a className="button button-primary nav-cta" href="#events">Join a Live Masterclass</a><button className="profile-button" type="button" aria-label="Open account menu"><UserRound size={18} /></button><button className="menu-button" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={24} /> : <Menu size={24} />}</button></div>
      </div>
      {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation"><a href="#programs" onClick={() => setMenuOpen(false)}>Programs</a><a href="#masterclasses" onClick={() => setMenuOpen(false)}>Free Learning</a><a href="#experts" onClick={() => setMenuOpen(false)}>Experts</a><a href="#stories" onClick={() => setMenuOpen(false)}>Stories</a><a href="#about" onClick={() => setMenuOpen(false)}>About</a><a className="button button-primary" href="#events" onClick={() => setMenuOpen(false)}>Join a Live Masterclass</a></nav>}
    </header>

    <main id="top">
      <section className="hero section-shell" aria-labelledby="hero-title">
        <div className="hero-copy"><span className="eyebrow">Learn. Practice. Grow.</span><h1 id="hero-title">Learn skills that<br />matter in real life.</h1><p>Practical live mentorship, workshops, and expert-led programs to help you grow in your career, business, and personal life.</p><div className="hero-actions"><a className="button button-primary" href="#programs">Explore Programs</a><a className="button button-secondary" href="#masterclasses"><Play size={18} fill="currentColor" /> Watch Free Masterclasses</a></div></div>
        <div className="hero-visual"><Image src="/generated/sikumna-hero-v3.png" alt="A Nepali mentor teaching a learner at a laptop" fill priority sizes="(max-width: 820px) 100vw, 56vw" /></div>
      </section>

      <section className="benefits section-shell" aria-label="Why learn with Sikumna" data-reveal>{benefits.map((benefit) => <article className="benefit" key={benefit.title}><span className={`benefit-icon accent-${benefit.accent}`}><Image src={benefit.image} alt="" width={64} height={64} /></span><div><h2>{benefit.title}</h2><p>{benefit.description}</p></div></article>)}</section>

      <section className="program-event-section section-shell" id="programs" data-reveal><div className="program-column"><SectionHeading title="Featured Programs" link="View all programs" /><div className="program-grid">{programs.map((program) => <ProgramCard key={program.title} program={program} />)}</div></div><div className="event-column" id="events"><SectionHeading title="Upcoming Live Events" link="View all events" /><div className="event-list">{events.map((event) => <EventCard key={event.title} event={event} />)}</div></div></section>

      <section className="content-section masterclass-section" id="masterclasses" data-reveal><div className="section-shell"><SectionHeading title="Free Masterclass Library" link="View all masterclasses" /><div className="masterclass-grid">{masterclasses.map((item) => <MasterclassCard key={item.title} item={item} />)}</div></div></section>

      <section className="content-section section-shell" id="experts" data-reveal><SectionHeading title="Meet Our Experts" link="View all experts" /><div className="expert-grid">{experts.map((expert, index) => <ExpertCard key={expert.name} expert={expert} index={index} />)}</div></section>

      <section className="content-section process-section" id="stories" data-reveal><div className="section-shell"><div className="centered-heading"><span>Simple by design</span><h2>How Sikumna Works</h2></div><div className="process-grid">{processSteps.map((step, index) => <ProcessStep key={step.title} step={step} index={index} />)}</div></div></section>

      <section className="cta-section section-shell" data-reveal><div className="target-art" aria-hidden="true"><Image src="/generated/icons/target-cta.png" alt="" fill sizes="140px" /></div><div className="cta-copy"><h2>Ready to level up your skills?</h2><p>Join thousands of learners growing with live,<br />practical and relevant education.</p></div><a className="button button-primary" href="#events">Join a Live Masterclass</a></section>
    </main>

    <footer className="footer" id="about"><div className="footer-shell section-shell"><div className="footer-brand"><Image src="/sikumna-logo.png" alt="Sikumna" width={185} height={54} /><p>Live mentorship, workshops and expert-led programs to help you grow in your career, business and personal life.</p><div className="socials"><a href="#top" aria-label="Facebook">f</a><a href="#top" aria-label="Instagram">◎</a><a href="#top" aria-label="YouTube">▶</a><a href="#top" aria-label="LinkedIn">in</a></div></div><div className="footer-links"><h2>Explore</h2><a href="#programs">Programs</a><a href="#masterclasses">Free Learning</a><a href="#events">Events</a><a href="#stories">Stories</a></div><div className="footer-links"><h2>Company</h2><a href="#about">About Us</a><a href="#experts">Our Experts</a><a href="#top">Careers</a><a href="#top">Contact Us</a></div><div className="footer-links"><h2>Support</h2><a href="#top">Help Center</a><a href="#top">FAQ</a><a href="#top">Terms of Use</a><a href="#top">Privacy Policy</a></div><div className="newsletter"><h2>Stay Updated</h2><p>Get the latest programs, events and free resources straight to your inbox.</p><form onSubmit={subscribe}><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" required type="email" placeholder="Email address" /><button type="submit">Subscribe</button></form><span className="form-status" aria-live="polite">{subscribed ? "Thanks! You’re on the list." : ""}</span></div></div><p className="copyright">© 2026 Sikumna Nepal. All rights reserved.</p></footer>
  </>;
}
