"use client";

import Image from "next/image";
import {
  ArrowRight, BadgeCheck, BookOpenCheck, Bot, BriefcaseBusiness, CalendarDays,
  ChartNoAxesCombined, CheckCircle2, CircleDollarSign, ClipboardCheck, Clock3,
  GraduationCap, Home, Laptop, Lightbulb, Megaphone, MessageCircleQuestion,
  MessagesSquare, Mic2, Route, ShieldCheck, Sparkles, Store, Target, UsersRound,
  Video,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FormEvent, useState } from "react";
import Accordion from "../components/Accordion";
import { Badge, Button, PageTitle, ResponsiveImage, SectionDescription, SectionTitle } from "../components/DesignSystem";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import type { EventLandingData } from "./eventData";

const iconMap: Record<string, LucideIcon> = {
  bot: Bot, sparkles: Sparkles, briefcase: BriefcaseBusiness, route: Route,
  chart: ChartNoAxesCombined, megaphone: Megaphone, wallet: CircleDollarSign,
  messages: MessagesSquare, student: GraduationCap, professional: BriefcaseBusiness,
  target: Target, laptop: Laptop, store: Store, clipboard: ClipboardCheck,
  users: UsersRound, shield: ShieldCheck, help: MessageCircleQuestion,
  lightbulb: Lightbulb, book: BookOpenCheck, mic: Mic2, home: Home,
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
  return <Icon size={size} strokeWidth={1.8} aria-hidden="true" />;
}

export default function EventLandingPage({ event }: { event: EventLandingData }) {
  const [submitted, setSubmitted] = useState(false);

  function reserveSeat(formEvent: FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    setSubmitted(true);
  }

  return <div className="event-landing">
    <SiteHeader variant="landing" ctaHref="#reserve" ctaLabel={event.buttonLabel} />

    <main>
      <section className="event-hero ds-container" aria-labelledby="event-title">
        <div className="event-hero-copy">
          <Badge>{event.kicker}</Badge>
          <PageTitle id="event-title">{event.title}</PageTitle>
          {event.supportingLine && <p className="event-supporting-line">{event.supportingLine}</p>}
          <p className="event-hero-description">{event.subtitle}</p>
          <ul className="event-info-list">{event.bulletPoints.map((point) => <li key={point}><CheckCircle2 size={18} aria-hidden="true" /> {point}</li>)}</ul>
          <Button href="#reserve" size="lg">{event.buttonLabel} <ArrowRight size={19} /></Button>
          <p className="event-scarcity"><span aria-hidden="true">●</span> {event.scarcity}</p>
          <div className="event-learners"><div>{learnerAvatars.map((avatar) => <span key={avatar}><Image src={avatar} alt="" fill sizes="34px" /></span>)}</div><strong>{event.learnerCount}</strong></div>
        </div>
      </section>

      <section className="event-highlights ds-container" aria-label="Workshop highlights">
        {event.highlights.map((item) => <article key={item.title}><span><TopicIcon name={item.icon} /></span><div><h2>{item.title}</h2><p>{item.description}</p></div></article>)}
      </section>

      <section className="event-content-section ds-container">
        <div className="event-section-heading"><SectionTitle>What You’ll Learn</SectionTitle><SectionDescription>{event.lessonIntro}</SectionDescription></div>
        <div className="event-lessons">{event.lessons.map((lesson) => <article className="ds-card" key={lesson.title}><span><TopicIcon name={lesson.icon} /></span><h3>{lesson.title}</h3><p>{lesson.description}</p></article>)}</div>
      </section>

      <section className="event-content-section ds-container">
        <div className="event-section-heading"><SectionTitle>Who Is This For?</SectionTitle></div>
        <div className="event-audiences">{event.audiences.map((audience) => <article key={audience.label}><span><TopicIcon name={audience.icon} /></span><p>{audience.label}</p></article>)}</div>
      </section>

      <section className="event-instructor ds-container ds-card">
        <div className="event-instructor-photo"><ResponsiveImage src={event.instructor.image} alt={`${event.instructor.name}, workshop instructor`} sizes="260px" /></div>
        <div><Badge>Meet Your Mentor</Badge><SectionTitle>{event.instructor.name}</SectionTitle><ul>{event.instructor.bullets.map((bullet) => <li key={bullet}><BadgeCheck size={18} aria-hidden="true" /> {bullet}</li>)}</ul></div>
      </section>

      <section className="event-content-section ds-container">
        <div className="event-section-heading"><SectionTitle>Loved by Thousands of Learners</SectionTitle><SectionDescription><span className="event-stars">★★★★★</span> {event.reviewSummary}</SectionDescription></div>
        <div className="event-testimonials">{event.testimonials.map((testimonial) => <article className="ds-card" key={testimonial.name}><div className="testimonial-avatar">{testimonial.name.charAt(0)}</div><blockquote>“{testimonial.quote}”</blockquote><strong>{testimonial.name}</strong><span>{testimonial.role}</span></article>)}</div>
      </section>

      <section className="event-reservation ds-container" id="reserve">
        <div className="reservation-copy"><SectionTitle>{event.reserveTitle}</SectionTitle><p>{event.reserveDescription}</p><div className="reservation-facts"><article><CalendarDays size={21} aria-hidden="true" /><div><span>Date</span><strong>{event.date}</strong></div></article><article><Clock3 size={21} aria-hidden="true" /><div><span>Time</span><strong>{event.time}</strong></div></article></div><div className="reservation-meta"><span><Video size={18} aria-hidden="true" /> Live on Zoom</span><span><Clock3 size={18} aria-hidden="true" /> Duration: {event.duration}</span></div></div>
        <form className="reservation-form" onSubmit={reserveSeat}><h2>Reserve Your Free Seat</h2><label><span>First Name</span><input required name="firstName" autoComplete="given-name" placeholder="Enter your first name" /></label><label><span>Email Address</span><input required name="email" type="email" autoComplete="email" placeholder="you@example.com" /></label><label><span>WhatsApp Number</span><input required name="whatsapp" type="tel" autoComplete="tel" placeholder="98XXXXXXXX" /></label><Button type="submit" size="lg">Reserve My Seat Now <ArrowRight size={18} /></Button><p className="reservation-privacy">We respect your privacy. No spam ever.</p>{submitted && <p className="reservation-success" role="status">Your seat is reserved. Please check your email for the next steps.</p>}</form>
      </section>

      <section className="event-content-section event-faq ds-container"><div className="event-section-heading"><SectionTitle>Frequently Asked Questions</SectionTitle></div><Accordion items={event.faqs} /></section>
    </main>

    <SiteFooter variant="landing" />
  </div>;
}
