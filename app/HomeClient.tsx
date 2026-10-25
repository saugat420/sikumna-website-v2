import Image from "next/image";
import Link from "./components/SafeLink";
import { ArrowRight, BookOpenCheck, BriefcaseBusiness, MessagesSquare, Play, PlaySquare, Presentation, Radio, Rocket, Search, Star, Target } from "lucide-react";
import { masterclasses } from "../data/masterclasses";
import { digitalMarketingCourse } from "../data/courses";
import { learnerReviews } from "../data/reviews";
import { Badge, Button, Card, Container, Section, SectionDescription, SectionTitle } from "./components/DesignSystem";
import HomeHero from "./components/home/HomeHero";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import ProgramDirectory from "./components/ProgramDirectory";

const events = [
  { title: "AI Marketing Masterclass", description: "Understand how AI can support practical marketing work and a freelance career—even as a beginner.", date: "Free live masterclass", time: "Online", image: "/content/live-events/ai-marketing-masterclass.webp", href: "https://ai.sikumna.com/" },
  { title: "English Fluency Workshop", description: "Learn approachable speaking techniques for real conversations, work and everyday confidence.", date: "Free live workshop", time: "Online", image: "/content/live-events/english-fluency-workshop.webp", href: "https://sen.sikumna.com/" },
];

function SectionIntro({ eyebrow, title, description, align = "left" }: { eyebrow: string; title: string; description?: string; align?: "left" | "center" }) {
  return <div className={`section-intro section-intro-${align}`}><Badge>{eyebrow}</Badge><SectionTitle>{title}</SectionTitle>{description && <SectionDescription>{description}</SectionDescription>}</div>;
}

function EventCard({ event }: { event: (typeof events)[number] }) {
  return <Card className="live-event-card"><div className="live-event-copy"><div className="event-tags"><span><i /> Live</span><span>Online</span><span>Free</span></div><h3>{event.title}</h3><p>{event.description}</p><div className="event-date"><span>{event.date}</span><span>{event.time}</span></div><Button href={event.href} size="md">Reserve your seat <ArrowRight size={17} /></Button></div><div className="live-event-art"><Image src={event.image} alt="" fill sizes="(max-width: 760px) 90vw, 35vw" /></div></Card>;
}

function LearningCard({ item }: { item: (typeof masterclasses)[number] }) {
  return <Card className="learning-card"><div className="learning-card-art"><Image src={item.thumbnail} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" /></div><div className="learning-card-copy"><span>{item.category}</span><h3>{item.title}</h3><p>{item.summary}</p><div><span>{item.duration}</span></div><Link href={`/free-masterclasses/${item.slug}`} aria-label={`Watch ${item.title}`}><Play size={16} fill="currentColor" /></Link></div></Card>;
}

export default function HomeClient() {
  return <><SiteHeader />
    <main id="top">
      <HomeHero />
      <section className="trust-strip"><Container><span><i><Radio size={19} /></i> Live, practical learning</span><span><i><MessagesSquare size={19} /></i> Interactive sessions</span><span><i><BriefcaseBusiness size={19} /></i> Guided by real experience</span><span><i><Target size={19} /></i> Skills for real life</span></Container></section>
      <Section className="how-section"><Container><SectionIntro eyebrow="How it works" title="From curiosity to real-world skill" description="A clear, supportive learning path made for progress you can actually use." align="center" /><div className="how-steps">{[{ icon: Search, title: "Discover", copy: "Browse programs, masterclasses and learning resources around your next goal." }, { icon: Presentation, title: "Learn live", copy: "Learn directly through live sessions, guided practice and mentorship." }, { icon: Rocket, title: "Apply & grow", copy: "Use what you learn in your career, business or everyday life." }].map(({ icon: Icon, title, copy }) => <article key={title}><Icon size={31} /><h3>{title}</h3><p>{copy}</p></article>)}</div></Container></Section>
      <Section id="programs" className="programs-section"><Container><ProgramDirectory /></Container></Section>
      <Section id="events" className="events-section"><Container><SectionIntro eyebrow="Live Masterclass / Workshop" title="Learn with us live" description="Small, focused sessions designed to help you start with clarity." /><div className="live-events-grid">{events.map((event) => <EventCard key={event.title} event={event} />)}</div></Container></Section>
      <Section id="masterclasses" className="learning-section"><Container><SectionIntro eyebrow="Free videos" title="Start learning for free" description="Build complete skills with a free course, then explore practical masterclasses across marketing, freelancing, SEO, ecommerce, personal branding and more. Watch without signing up." /><Card className="featured-learning featured-free-course"><div className="featured-learning-art"><Image src={digitalMarketingCourse.thumbnail} alt="Digital marketing course illustration" fill sizes="(max-width: 760px) 100vw, 55vw" /></div><div className="featured-learning-copy"><Badge><PlaySquare size={15} /> Must Watch</Badge><h3>{digitalMarketingCourse.title}</h3><p>{digitalMarketingCourse.description}</p><div className="learning-meta"><span><BookOpenCheck size={14} /> {digitalMarketingCourse.lessons.length} lessons</span></div><Button href="/free-dm-course" variant="secondary">Start free course <Play size={16} fill="currentColor" /></Button></div></Card><div className="learning-grid">{masterclasses.slice(0,3).map((item) => <LearningCard key={item.title} item={item} />)}</div><div className="section-more"><Button href="/free-masterclasses" variant="secondary">Explore More Free Learning <ArrowRight size={17} /></Button></div></Container></Section>
      <Section className="why-section"><Container><div className="why-layout"><SectionIntro eyebrow="Why Sikumna" title="Education designed to be used, not just watched" /><div className="why-reasons">{[{ title: "Practical by design", copy: "Lessons focus on skills you can immediately implement." }, { title: "Built from experience", copy: "Programs connect useful knowledge with the realities of work in Nepal." }, { title: "Live & interactive", copy: "Ask questions, practice and receive feedback instead of passively watching." }].map((reason, index) => <article key={reason.title}><span>0{index + 1}</span><div><h3>{reason.title}</h3><p>{reason.copy}</p></div></article>)}</div></div></Container></Section>
      <Section id="stories" className="testimonials-section"><Container><SectionIntro eyebrow="Verified Google reviews" title="Loved by learners across Nepal" align="center" /><div className="review-grid">{learnerReviews.map((review) => <Card className="review-card" key={review.name}><div className="review-stars" aria-label="5 out of 5 stars">{Array.from({ length: review.rating }, (_, index) => <Star key={index} size={16} fill="currentColor" />)}</div><blockquote>“{review.quote}”</blockquote><footer className="review-author"><Image src={review.image} width={44} height={44} alt={`${review.name}'s Google profile`} /><div><a href={review.profileUrl} target="_blank" rel="noreferrer"><strong>{review.name}</strong></a><small>Google review</small></div></footer></Card>)}</div></Container></Section>
      <Section className="final-cta"><Container><div><Badge>Your next skill starts here</Badge><h2>What do you want to learn next?</h2><p>Explore practical programs or join an upcoming live masterclass.</p></div><div><Button href="/programs" variant="secondary" size="lg">Explore programs</Button><Button href="/#events" size="lg">Choose a free masterclass <ArrowRight size={19} /></Button></div></Container></Section>
    </main><SiteFooter />
  </>;
}
