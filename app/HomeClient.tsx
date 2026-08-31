"use client";

import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import { useEffect } from "react";
import { ResponsiveImage } from "./components/DesignSystem";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";

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
  return <article className="program-card card"><div className="program-art"><ResponsiveImage src={program.image} alt="" sizes="(max-width: 620px) 100vw, 320px" /></div><div className="program-content"><h3>{program.title}</h3><p>{program.description}</p><a href="#top">Learn more <ArrowRight size={15} /></a></div></article>;
}

function EventCard({ event }: { event: (typeof events)[number] }) {
  return <article className="event-card card"><div className="event-copy"><div className="badges"><span className="live-badge"><i /> Live</span><span>Online</span><span>Free</span></div><h3>{event.title}</h3><p>{event.description}</p><time>{event.date}</time><a className="event-link" href={event.href}>Reserve Seat <ArrowRight size={14} /></a></div><div className="event-art"><ResponsiveImage src={event.image} alt="" sizes="130px" /></div></article>;
}

function MasterclassCard({ item }: { item: (typeof masterclasses)[number] }) {
  return <article className="masterclass-card card"><div className="course-art"><ResponsiveImage src={item.image} alt="" sizes="(max-width: 620px) 76vw, 230px" /></div><div className="course-content"><h3>{item.title}</h3><p>{item.description}</p><span className={`pill pill-${item.accent}`}>{item.category}</span><div className="course-bottom"><span>{item.meta}</span><a href="#top" aria-label={`Play ${item.title}`}><Play size={13} fill="currentColor" /></a></div></div></article>;
}

function ExpertCard({ expert, index }: { expert: (typeof experts)[number]; index: number }) {
  return <article className="expert-card card"><div className={`expert-avatar avatar-${index + 1}`}><ResponsiveImage src={expert.image} alt={`${expert.name} profile`} fit="cover" sizes="100px" /></div><h3>{expert.name}</h3><span className={`pill pill-${expert.accent}`}>{expert.expertise}</span><a className="linkedin-mark" href="#top" aria-label={`${expert.name} on LinkedIn`}>in</a></article>;
}

function ProcessStep({ step, index }: { step: (typeof processSteps)[number]; index: number }) {
  return <article className={`process-card card accent-${step.accent}`}><span className="step-number">{index + 1}</span><div className="step-icon"><ResponsiveImage src={step.image} alt="" sizes="64px" /></div><h3>{step.title}</h3><p>{step.description}</p>{index < processSteps.length - 1 && <span className="step-arrow" aria-hidden="true">→</span>}</article>;
}

export default function HomeClient() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: .12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return <>
    <SiteHeader />

    <main id="top">
      <section className="hero section-shell" aria-labelledby="hero-title">
        <div className="hero-copy"><span className="eyebrow">Learn. Practice. Grow.</span><h1 id="hero-title">Learn skills that<br />matter in real life.</h1><p>Practical live mentorship, workshops, and expert-led programs to help you grow in your career, business, and personal life.</p><div className="hero-actions"><a className="button button-primary" href="#programs">Explore Programs</a><a className="button button-secondary" href="#masterclasses"><Play size={18} fill="currentColor" /> Watch Free Masterclasses</a></div></div>
        <div className="hero-visual"><ResponsiveImage src="/generated/sikumna-hero-v3.png" alt="A Nepali mentor teaching a learner at a laptop" priority sizes="(max-width: 820px) 100vw, 56vw" /></div>
      </section>

      <section className="benefits section-shell" aria-label="Why learn with Sikumna" data-reveal>{benefits.map((benefit) => <article className="benefit" key={benefit.title}><span className={`benefit-icon accent-${benefit.accent}`}><Image src={benefit.image} alt="" width={64} height={64} /></span><div><h2>{benefit.title}</h2><p>{benefit.description}</p></div></article>)}</section>

      <section className="program-event-section section-shell" id="programs" data-reveal><div className="program-column"><SectionHeading title="Featured Programs" link="View all programs" /><div className="program-grid">{programs.map((program) => <ProgramCard key={program.title} program={program} />)}</div></div><div className="event-column" id="events"><SectionHeading title="Upcoming Live Events" link="View all events" /><div className="event-list">{events.map((event) => <EventCard key={event.title} event={event} />)}</div></div></section>

      <section className="content-section masterclass-section" id="masterclasses" data-reveal><div className="section-shell"><SectionHeading title="Free Masterclass Library" link="View all masterclasses" /><div className="masterclass-grid">{masterclasses.map((item) => <MasterclassCard key={item.title} item={item} />)}</div></div></section>

      <section className="content-section section-shell" id="experts" data-reveal><SectionHeading title="Meet Our Experts" link="View all experts" /><div className="expert-grid">{experts.map((expert, index) => <ExpertCard key={expert.name} expert={expert} index={index} />)}</div></section>

      <section className="content-section process-section" id="stories" data-reveal><div className="section-shell"><div className="centered-heading"><span>Simple by design</span><h2>How Sikumna Works</h2></div><div className="process-grid">{processSteps.map((step, index) => <ProcessStep key={step.title} step={step} index={index} />)}</div></div></section>

      <section className="cta-section section-shell" data-reveal><div className="target-art" aria-hidden="true"><ResponsiveImage src="/generated/icons/target-cta.png" alt="" sizes="140px" /></div><div className="cta-copy"><h2>Ready to level up your skills?</h2><p>Join thousands of learners growing with live,<br />practical and relevant education.</p></div><a className="button button-primary" href="#events">Join a Live Masterclass</a></section>
    </main>

    <SiteFooter />
  </>;
}
