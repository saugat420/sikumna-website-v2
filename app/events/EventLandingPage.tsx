"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, BadgeCheck, BookOpenCheck, Bot, BriefcaseBusiness, CalendarDays,
  ChartNoAxesCombined, CheckCircle2, CircleDollarSign, ClipboardCheck, Clock3,
  GraduationCap, Home, Laptop, Lightbulb, Megaphone, MessageCircleQuestion,
  MessagesSquare, Mic2, Minus, Plus, Route, ShieldCheck, Sparkles, Store,
  Target, UsersRound, Video,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FormEvent, useState } from "react";
import type { EventLandingData } from "./eventData";

const iconMap: Record<string, LucideIcon> = {
  bot: Bot,
  sparkles: Sparkles,
  briefcase: BriefcaseBusiness,
  route: Route,
  chart: ChartNoAxesCombined,
  megaphone: Megaphone,
  wallet: CircleDollarSign,
  messages: MessagesSquare,
  student: GraduationCap,
  professional: BriefcaseBusiness,
  target: Target,
  laptop: Laptop,
  store: Store,
  clipboard: ClipboardCheck,
  users: UsersRound,
  shield: ShieldCheck,
  help: MessageCircleQuestion,
  lightbulb: Lightbulb,
  book: BookOpenCheck,
  mic: Mic2,
  home: Home,
};

const learnerAvatars = [
  "/generated/mentors/saurav-shrestha.png",
  "/generated/mentors/anita-karki.png",
  "/generated/mentors/rajan-adhikari.png",
  "/generated/mentors/prakriti-tamang.png",
  "/generated/mentors/bikash-kc.png",
];

function TopicIcon({ name, size = 22 }: { name: string; size?: number }) {
  const Icon = iconMap[name] ?? CheckCircle2;
  return <Icon size={size} strokeWidth={1.8} />;
}

export default function EventLandingPage({ event }: { event: EventLandingData }) {
  const [submitted, setSubmitted] = useState(false);

  function reserveSeat(formEvent: FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    setSubmitted(true);
  }

  return <div className={`event-landing theme-${event.theme}`}>
    <header className="event-page-header">
      <div className="event-shell event-nav">
        <Link href="/" className="event-brand" aria-label="Sikumna Nepal home"><Image src="/sikumna-logo.png" alt="Sikumna" width={190} height={64} priority /></Link>
        <nav aria-label="Event page navigation"><Link href="/">Home</Link><a className="button button-primary" href="#reserve">Join Free {event.theme === "blue" ? "Masterclass" : "Workshop"}</a></nav>
      </div>
    </header>

    <main>
      <section className="event-hero event-shell">
        <div className="event-hero-copy">
          <span className="event-kicker">{event.kicker}</span>
          <h1>{event.title}</h1>
          <p>{event.subtitle}</p>
          <ul>{event.bulletPoints.map((point) => <li key={point}><CheckCircle2 size={17} /> {point}</li>)}</ul>
          <a className="event-reserve-button" href="#reserve">Reserve Your Free Seat <ArrowRight size={18} /></a>
          <div className="event-learners"><div>{learnerAvatars.map((avatar) => <span key={avatar}><Image src={avatar} alt="" fill sizes="32px" /></span>)}</div><strong>{event.learnerCount}</strong></div>
        </div>
        <div className="event-hero-art"><Image src={event.heroImage} alt={`${event.title} learner illustration`} fill priority sizes="(max-width: 800px) 100vw, 52vw" /></div>
      </section>

      <section className="event-highlights event-shell" aria-label="Workshop highlights">
        {event.highlights.map((item) => <article key={item.title}><span><TopicIcon name={item.icon} /></span><div><h2>{item.title}</h2><p>{item.description}</p></div></article>)}
      </section>

      <section className="event-content-section event-shell">
        <div className="event-section-heading"><h2>What You’ll Learn</h2><p>{event.lessonIntro}</p></div>
        <div className="event-lessons">{event.lessons.map((lesson) => <article key={lesson.title}><span><TopicIcon name={lesson.icon} /></span><h3>{lesson.title}</h3><p>{lesson.description}</p></article>)}</div>
      </section>

      <section className="event-content-section event-shell">
        <div className="event-section-heading"><h2>Who Is This For?</h2></div>
        <div className="event-audiences">{event.audiences.map((audience) => <article key={audience.label}><span><TopicIcon name={audience.icon} /></span><p>{audience.label}</p></article>)}</div>
      </section>

      <section className="event-instructor event-shell">
        <div className="event-instructor-photo"><Image src={event.instructor.image} alt={`${event.instructor.name}, workshop instructor`} fill sizes="260px" /></div>
        <div><span className="event-kicker">Meet Your Mentor</span><h2>{event.instructor.name}</h2><ul>{event.instructor.bullets.map((bullet) => <li key={bullet}><BadgeCheck size={17} /> {bullet}</li>)}</ul></div>
      </section>

      <section className="event-content-section event-shell">
        <div className="event-section-heading"><h2>Loved by Thousands of Learners</h2><p><span className="event-stars">★★★★★</span> {event.reviewSummary}</p></div>
        <div className="event-testimonials">{event.testimonials.map((testimonial) => <article key={testimonial.name}><div className="testimonial-avatar">{testimonial.name.charAt(0)}</div><blockquote>“{testimonial.quote}”</blockquote><strong>{testimonial.name}</strong><span>{testimonial.role}</span></article>)}</div>
      </section>

      <section className="event-reservation event-shell" id="reserve">
        <div className="reservation-copy"><h2>{event.reserveTitle}</h2><p>{event.reserveDescription}</p><div className="reservation-facts"><article><CalendarDays size={20} /><div><span>Date</span><strong>{event.date}</strong></div></article><article><Clock3 size={20} /><div><span>Time</span><strong>{event.time}</strong></div></article></div><div className="reservation-meta"><span><Video size={17} /> Live on Zoom</span><span><Clock3 size={17} /> Duration: {event.duration}</span></div></div>
        <form className="reservation-form" onSubmit={reserveSeat}><h2>Reserve Your Free Seat</h2><label><span>Full Name</span><input required name="name" autoComplete="name" placeholder="Full Name" /></label><label><span>Email Address</span><input required name="email" type="email" autoComplete="email" placeholder="Email Address" /></label><label><span>Phone Number</span><input required name="phone" type="tel" autoComplete="tel" placeholder="Phone Number" /></label><button type="submit">Reserve My Seat Now <ArrowRight size={17} /></button><p className="reservation-privacy">We respect your privacy. No spam ever.</p>{submitted && <p className="reservation-success" role="status">Your seat is reserved. Please check your email for the next steps.</p>}</form>
      </section>

      <section className="event-content-section event-faq event-shell"><div className="event-section-heading"><h2>Frequently Asked Questions</h2></div><div>{event.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<Plus className="faq-plus" size={18} /><Minus className="faq-minus" size={18} /></summary><p>{faq.answer}</p></details>)}</div></section>
    </main>

    <footer className="event-footer">
      <div className="event-shell event-footer-grid">
        <div><Image src="/sikumna-logo.png" alt="Sikumna" width={170} height={52} /><p>Practical education to help you grow in your career, business and personal life.</p><div className="event-socials"><Link href="/" aria-label="Facebook">f</Link><Link href="/" aria-label="Instagram">◎</Link><Link href="/" aria-label="YouTube">▶</Link><Link href="/" aria-label="LinkedIn">in</Link></div></div>
        <div><h2>Explore</h2><Link href="/#programs">Programs</Link><Link href="/#masterclasses">Free Learning</Link><Link href="/#events">Events</Link><Link href="/#stories">Stories</Link></div>
        <div><h2>Company</h2><Link href="/#about">About Us</Link><Link href="/#experts">Our Experts</Link><Link href="/">Careers</Link><Link href="/">Contact Us</Link></div>
        <div><h2>Support</h2><Link href="/">Help Center</Link><Link href="/">FAQ</Link><Link href="/">Terms of Use</Link><Link href="/">Privacy Policy</Link></div>
        <div><h2>Stay Updated</h2><p>Get the latest programs, events and free resources straight to your inbox.</p><form><label className="sr-only" htmlFor={`footer-email-${event.theme}`}>Email address</label><input id={`footer-email-${event.theme}`} type="email" placeholder="Enter your email" /><button type="button">Subscribe</button></form></div>
      </div>
      <p className="event-copyright">© 2026 Sikumna Nepal. All rights reserved.</p>
    </footer>
  </div>;
}
