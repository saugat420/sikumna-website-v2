import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart3, CheckCircle2, Compass, MessageCircleMore, Play, Sparkles, UsersRound, Video } from "lucide-react";
import { programs } from "../data/programs";
import { masterclasses } from "../data/masterclasses";
import { experts } from "../data/experts";
import { Badge, Button, Card, Container, Section, SectionDescription, SectionTitle } from "./components/DesignSystem";
import HomeHero from "./components/home/HomeHero";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";

const events = [
  { title: "AI Marketing Masterclass", description: "Understand how AI can support practical marketing work and a freelance career—even as a beginner.", date: "Sat, 24 May 2025", time: "7:00 PM NPT", image: "/generated/icons/ai-masterclass.png", href: "/events/ai-marketing-masterclass" },
  { title: "English Fluency Workshop", description: "Learn approachable speaking techniques for real conversations, work and everyday confidence.", date: "Sun, 25 May 2025", time: "7:00 PM NPT", image: "/generated/icons/english-workshop.png", href: "/events/english-fluency-workshop" },
];

const testimonials = [
  { quote: "The session felt practical from the first minute. I left knowing what to work on next.", name: "Rajan Shrestha", role: "Freelancer" },
  { quote: "The teaching style was simple, supportive and easy to apply in real life.", name: "Prakriti Tamang", role: "Student" },
  { quote: "I liked that there was space to ask questions instead of only watching a recording.", name: "Sushil Adhikari", role: "Working professional" },
];

function SectionIntro({ eyebrow, title, description, align = "left" }: { eyebrow: string; title: string; description?: string; align?: "left" | "center" }) {
  return <div className={`section-intro section-intro-${align}`}><Badge>{eyebrow}</Badge><SectionTitle>{title}</SectionTitle>{description && <SectionDescription>{description}</SectionDescription>}</div>;
}

function ProgramFeature({ program, reverse }: { program: (typeof programs)[number]; reverse?: boolean }) {
  return <article className={`program-feature ${reverse ? "program-feature-reverse" : ""}`}>
    <div className="program-feature-art"><Image src={program.image} alt={`${program.title} illustration`} fill sizes="(max-width: 760px) 100vw, 50vw" /></div>
    <div className="program-feature-copy"><Badge>{program.category}</Badge><h3>{program.title}</h3><p>{program.description}</p><ul>{program.outcomes.map((outcome) => <li key={outcome}><CheckCircle2 size={19} />{outcome}</li>)}</ul><Link href={`/programs/${program.slug}`} className="text-link">Explore {program.title} <ArrowRight size={17} /></Link></div>
  </article>;
}

function EventCard({ event }: { event: (typeof events)[number] }) {
  return <Card className="live-event-card"><div className="live-event-copy"><div className="event-tags"><span><i /> Live</span><span>Online</span><span>Free</span></div><h3>{event.title}</h3><p>{event.description}</p><div className="event-date"><span>{event.date}</span><span>{event.time}</span></div><Button href={event.href} size="md">Reserve your seat <ArrowRight size={17} /></Button></div><div className="live-event-art"><Image src={event.image} alt="" fill sizes="(max-width: 760px) 90vw, 35vw" /></div></Card>;
}

function LearningCard({ item }: { item: (typeof masterclasses)[number] }) {
  const trainer = experts.find((expert) => expert.slug === item.trainerId);
  return <Card className="learning-card"><div className="learning-card-art"><Image src={item.thumbnail} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" /></div><div className="learning-card-copy"><span>{item.category}</span><h3>{item.title}</h3><p>{item.description}</p><div><span>{item.duration}</span><span>{trainer?.name}</span></div><Link href={`/free-masterclasses/${item.slug}`} aria-label={`Watch ${item.title}`}><Play size={16} fill="currentColor" /></Link></div></Card>;
}

export default function HomeClient() {
  return <><SiteHeader />
    <main id="top">
      <HomeHero />
      <section className="trust-strip"><Container><span><Sparkles size={18} /> Live, practical learning</span><span><Video size={18} /> Interactive sessions</span><span><UsersRound size={18} /> Learn with practitioners</span><span><Sparkles size={18} /> Skills for real life</span></Container></section>
      <Section className="how-section"><Container><SectionIntro eyebrow="How it works" title="From curiosity to real-world skill" description="A clear, supportive learning path made for progress you can actually use." align="center" /><div className="how-steps">{[{ icon: Compass, title: "Discover", copy: "Browse programs, masterclasses and learning resources around your next goal." }, { icon: Video, title: "Learn live", copy: "Learn directly from experienced practitioners through live sessions and mentorship." }, { icon: BarChart3, title: "Apply & grow", copy: "Use what you learn in your career, business or everyday life." }].map(({ icon: Icon, title, copy }, index) => <article key={title}><span className="how-number">0{index + 1}</span><Icon size={31} /><h3>{title}</h3><p>{copy}</p></article>)}</div></Container></Section>
      <Section id="programs" className="programs-section"><Container><SectionIntro eyebrow="Programs" title="Programs built around real outcomes" description="Learn practical skills through structured live mentorship and implementation." /><div className="program-features">{programs.map((program, index) => <ProgramFeature key={program.title} program={program} reverse={index === 1} />)}</div></Container></Section>
      <Section id="events" className="events-section"><Container><SectionIntro eyebrow="Live now / upcoming" title="Learn with us live" description="Small, focused sessions designed to help you start with clarity." /><div className="live-events-grid">{events.map((event) => <EventCard key={event.title} event={event} />)}</div></Container></Section>
      <Section id="masterclasses" className="learning-section"><Container><SectionIntro eyebrow="Free learning" title="Start learning for free" description="Watch practical masterclasses from experts across marketing, freelancing, SEO, ecommerce, personal branding and more." /><Card className="featured-learning"><div className="featured-learning-art"><Image src={masterclasses[0].thumbnail} alt="Freelancing 101 masterclass" fill sizes="(max-width: 760px) 100vw, 55vw" /></div><div className="featured-learning-copy"><Badge>Featured masterclass</Badge><h3>{masterclasses[0].title}</h3><p>{masterclasses[0].description}</p><div className="learning-meta"><span>{masterclasses[0].duration}</span><span>{experts.find((expert) => expert.slug === masterclasses[0].trainerId)?.name}</span></div><Button href={`/free-masterclasses/${masterclasses[0].slug}`} variant="secondary">Watch free class <Play size={16} fill="currentColor" /></Button></div></Card><div className="learning-grid">{masterclasses.slice(1,4).map((item) => <LearningCard key={item.title} item={item} />)}</div><div className="section-more"><Button href="/free-masterclasses" variant="secondary">Explore More Free Masterclasses <ArrowRight size={17} /></Button></div></Container></Section>
      <Section id="experts" className="experts-section"><Container><SectionIntro eyebrow="Learn from practitioners" title="Learn from people who actually do the work" description="Guidance from people who understand both the work and the realities of building a career in Nepal." /><div className="experts-grid">{experts.slice(0,3).map((expert) => <Card className="expert-feature" key={expert.name}><div className="expert-image"><Image src={expert.image} alt={`${expert.name}, ${expert.expertise}`} fill sizes="(max-width: 760px) 100vw, 33vw" /></div><div><span>{expert.expertise}</span><h3>{expert.name}</h3><p>{expert.bio}</p><Link href={`/experts/${expert.slug}`} className="text-link">View profile <ArrowRight size={17} /></Link></div></Card>)}</div></Container></Section>
      <Section className="why-section"><Container><div className="why-layout"><SectionIntro eyebrow="Why Sikumna" title="Education designed to be used, not just watched" /><div className="why-reasons">{[{ title: "Practical by design", copy: "Lessons focus on skills you can immediately implement." }, { title: "Learn from practitioners", copy: "Programs are created with people who actively work in the field." }, { title: "Live & interactive", copy: "Ask questions, practice and receive feedback instead of passively watching." }].map((reason, index) => <article key={reason.title}><span>0{index + 1}</span><div><h3>{reason.title}</h3><p>{reason.copy}</p></div></article>)}</div></div></Container></Section>
      <Section id="stories" className="testimonials-section"><Container><SectionIntro eyebrow="Learner outcomes" title="Loved by learners across Nepal" align="center" /><div className="testimonial-layout"><blockquote className="testimonial-featured">“{testimonials[0].quote}”<footer><i className="testimonial-avatar">{testimonials[0].name.slice(0,1)}</i><span><strong>{testimonials[0].name}</strong><small>{testimonials[0].role}</small></span></footer></blockquote><div>{testimonials.slice(1).map((review) => <Card className="testimonial-small" key={review.name}><MessageCircleMore size={24} /><blockquote>“{review.quote}”</blockquote><footer><i className="testimonial-avatar">{review.name.slice(0,1)}</i><span><strong>{review.name}</strong><small>{review.role}</small></span></footer></Card>)}</div></div></Container></Section>
      <Section className="final-cta"><Container><div><Badge>Your next skill starts here</Badge><h2>What do you want to learn next?</h2><p>Explore practical programs or join an upcoming live masterclass.</p></div><div><Button href="/programs" variant="secondary" size="lg">Explore programs</Button><Button href="/events/ai-marketing-masterclass" size="lg">Join a live masterclass <ArrowRight size={19} /></Button></div></Container></Section>
    </main><SiteFooter />
  </>;
}
