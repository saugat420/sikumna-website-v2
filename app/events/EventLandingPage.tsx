"use client";

import Image from "next/image";
import { ArrowRight, BadgeCheck, BookOpenCheck, Bot, BriefcaseBusiness, CalendarDays, Check, CheckCircle2, CircleDollarSign, ClipboardCheck, Clock3, GraduationCap, Home, Laptop, Lightbulb, Megaphone, MessageCircleQuestion, MessagesSquare, Mic2, Route, ShieldCheck, Sparkles, Store, Target, UsersRound, Video } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FormEvent, useState } from "react";
import type { ReactNode } from "react";
import Accordion from "../components/Accordion";
import { Badge, Button, Card, Container, PageTitle, Section, SectionDescription, SectionTitle } from "../components/DesignSystem";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import ReviewerIdentity from "../components/ReviewerIdentity";
import type { EventLandingData } from "./eventData";

const iconMap: Record<string, LucideIcon> = {
  bot: Bot, sparkles: Sparkles, briefcase: BriefcaseBusiness, route: Route, chart: BookOpenCheck, megaphone: Megaphone, wallet: CircleDollarSign,
  messages: MessagesSquare, student: GraduationCap, professional: BriefcaseBusiness, target: Target, laptop: Laptop, store: Store, clipboard: ClipboardCheck,
  users: UsersRound, shield: ShieldCheck, help: MessageCircleQuestion, lightbulb: Lightbulb, book: BookOpenCheck, mic: Mic2, home: Home,
};

function TopicIcon({ name, size = 22 }: { name: string; size?: number }) {
  const Icon = iconMap[name] ?? CheckCircle2;
  return <Icon size={size} strokeWidth={1.8} aria-hidden="true" />;
}

function EventSectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description?: ReactNode }) {
  return <div className="event-section-heading"><Badge>{eyebrow}</Badge><SectionTitle>{title}</SectionTitle>{description && <SectionDescription>{description}</SectionDescription>}</div>;
}

export default function EventLandingPage({ event }: { event: EventLandingData }) {
  const [submitted, setSubmitted] = useState(false);
  function reserveSeat(formEvent: FormEvent<HTMLFormElement>) { formEvent.preventDefault(); setSubmitted(true); }

  return <div className="event-landing">
    <SiteHeader variant="landing" ctaHref="#reserve" ctaLabel={event.buttonLabel} />
    <main>
      <section className="event-hero" aria-labelledby="event-title"><div className="event-hero-grid" aria-hidden="true" /><Container className="event-hero-content"><Badge>{event.kicker}</Badge><PageTitle id="event-title">{event.title}</PageTitle>{event.supportingLine && <p className="event-supporting-line">{event.supportingLine}</p>}<p className="event-hero-description">{event.subtitle}</p><ul className="event-info-list">{event.bulletPoints.map((point) => <li key={point}><CheckCircle2 size={18} />{point}</li>)}</ul><Button href="#reserve" size="lg">{event.buttonLabel} <ArrowRight size={19} /></Button><p className="event-scarcity"><span aria-hidden="true">●</span>{event.scarcity}</p><p className="event-learner-proof">{event.learnerCount}</p></Container></section>

      <section className="event-highlights"><Container>{event.highlights.map((item) => <article key={item.title}><span><TopicIcon name={item.icon} /></span><div><h2>{item.title}</h2><p>{item.description}</p></div></article>)}</Container></section>

      <Section className="event-learning"><Container><EventSectionHeader eyebrow="What you’ll learn" title={event.title.startsWith("Learn AI") ? "Walk away with a clear AI marketing roadmap" : "Build a clearer path to everyday English confidence"} description={event.lessonIntro} /><div className="learning-blocks">{event.learningBlocks.map((block, index) => <Card key={block.title} className="learning-block"><span className="learning-block-number">0{index + 1}</span><span className="learning-block-icon"><TopicIcon name={block.icon} size={25} /></span><h3>{block.title}</h3><p>{block.description}</p><ul>{block.points.map((point) => <li key={point}><Check size={16} />{point}</li>)}</ul></Card>)}</div></Container></Section>

      <Section className="inside-session"><Container><EventSectionHeader eyebrow="Inside the session" title="A live learning journey" /><div className="session-timeline">{event.sessionSteps.map((step, index) => <article key={step.title}><span>Part 0{index + 1}</span><h3>{step.title}</h3><p>{step.description}</p></article>)}</div></Container></Section>

      <Section className="event-audience"><Container><EventSectionHeader eyebrow="Who it’s for" title="This masterclass is built for you if…" /><div className="audience-list">{event.audiences.map((audience) => <div key={audience.label}><span><TopicIcon name={audience.icon} size={19} /></span>{audience.label}</div>)}</div><p className="audience-note"><BadgeCheck size={21} />{event.audienceNote}</p></Container></Section>

      <Section className="event-instructor-section"><Container><article className="event-instructor"><div className="event-instructor-photo"><Image src={event.instructor.image} alt={`${event.instructor.name}, ${event.instructor.role}`} fill sizes="(max-width: 760px) 100vw, 45vw" /></div><div className="event-instructor-copy"><Badge>Meet your mentor</Badge><h2>Learn from {event.instructor.name}</h2><p className="instructor-role">{event.instructor.role}</p><p>{event.instructor.bio}</p><ul>{event.instructor.bullets.map((bullet) => <li key={bullet}><BadgeCheck size={18} />{bullet}</li>)}</ul></div></article></Container></Section>

      <Section className="event-testimonials-section"><Container><EventSectionHeader eyebrow="Learner proof" title="What learners say" description={<><span className="event-stars">★★★★★</span> {event.reviewSummary}</>} /><div className="event-testimonial-layout"><blockquote className="event-testimonial-featured">“{event.testimonials[0].quote}”<footer><ReviewerIdentity name={event.testimonials[0].name} role={event.testimonials[0].role} /></footer></blockquote><div>{event.testimonials.slice(1).map((testimonial) => <Card key={testimonial.name} className="event-testimonial-small"><blockquote>“{testimonial.quote}”</blockquote><footer><ReviewerIdentity name={testimonial.name} role={testimonial.role} /></footer></Card>)}</div></div></Container></Section>

      <Section className="event-reserve-section" id="reserve"><Container><div className="event-reservation"><div className="reservation-copy"><Badge>Save your seat</Badge><h2>{event.reserveTitle}</h2><p>{event.reserveDescription}</p><div className="reservation-facts"><article><CalendarDays size={21} /><div><span>Date</span><strong>{event.date}</strong></div></article><article><Clock3 size={21} /><div><span>Time</span><strong>{event.time}</strong></div></article></div><div className="reservation-meta"><span><Video size={18} />Live on {event.platform}</span><span><Clock3 size={18} />{event.duration}</span><span><MessagesSquare size={18} />{event.language}</span></div></div><form className="reservation-form" onSubmit={reserveSeat}><h2>Reserve your free seat</h2><label><span>First Name</span><input required name="firstName" autoComplete="given-name" placeholder="Enter your first name" /></label><label><span>Email Address</span><input required name="email" type="email" autoComplete="email" placeholder="you@example.com" /></label><label><span>WhatsApp Number</span><input required name="whatsapp" type="tel" autoComplete="tel" placeholder="98XXXXXXXX" /></label><Button type="submit" size="lg">Reserve my seat now <ArrowRight size={18} /></Button><p>We respect your privacy. No spam ever.</p>{submitted && <p className="reservation-success" role="status">Your seat is reserved. Please check your email for the next steps.</p>}</form></div></Container></Section>

      <Section className="event-faq"><Container><EventSectionHeader eyebrow="FAQs" title="Frequently asked questions" /><Accordion items={event.faqs} /></Container></Section>
    </main><SiteFooter variant="landing" />
  </div>;
}
