import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDown, ArrowRight, BookOpenCheck, CircleHelp, Globe2, GraduationCap, MousePointerClick, NotebookPen, Play, TrendingUp, UsersRound } from "lucide-react";
import { Badge, Button, Container } from "../components/DesignSystem";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About Sikumna Nepal | Practical Education for Real Life",
  description: "Learn why Sikumna exists, how we create practical learning programs, and our mission to help one million Nepalese people build useful skills.",
  alternates: { canonical: "/about" },
};

const journey = [
  { icon: BookOpenCheck, title: "Learn", description: "Learn something useful." },
  { icon: MousePointerClick, title: "Apply", description: "Apply it in real life." },
  { icon: TrendingUp, title: "Grow", description: "Grow from it." },
];

const practicalLearning = [
  { icon: GraduationCap, title: "Experienced Trainers & Experts", description: "We work with experienced trainers and experts from Nepal and around the world." },
  { icon: UsersRound, title: "Live & Cohort-Based Programs", description: "Learn together, ask questions, complete real projects, and receive guidance along the way." },
  { icon: NotebookPen, title: "Practical & Implementation-Focused", description: "We focus on skills you can actually use in your career, business, and everyday life." },
  { icon: Globe2, title: "National & International Experts", description: "We collaborate with trainers and experts from Nepal and around the world." },
];

const founders = [
  { name: "Saugat Basnet", role: "Founder", image: "/images/about/saugat-basnet.jpg" },
  { name: "Raina Byanjankar", role: "Co-founder", image: "/images/about/raina-byanjankar.jpg" },
];

export default function AboutPage() {
  return <><SiteHeader /><main className={styles.page}>
    <section className={styles.hero}>
      <div className={styles.gridBackdrop} aria-hidden="true" />
      <Container className={styles.heroLayout}>
        <div className={styles.heroCopy}>
          <Badge>About Sikumna</Badge>
          <h1>Practical education for <em>real life</em></h1>
          <div className={styles.heroStory}>
            <p>The world is changing.</p>
            <p>Today, businesses and employers are not only looking at your degree or certificates.</p>
            <div className={styles.heroQuestion}><span>They want to know:</span><strong>What can you actually do?</strong></div>
            <p>But for many people in Nepal, learning practical skills is still difficult.</p>
            <p>There is a lot of information online, but it can be confusing to know what to learn, who to learn from, and how to actually use that knowledge in real life.</p>
            <p><strong>That is why we built Sikumna.</strong></p>
          </div>
        </div>
        <div className={styles.journey} aria-label="The Sikumna learning journey: learn, apply and grow">
          <div className={styles.journeyHeading}><span>How learning creates change</span><strong>Learn. Apply. Grow.</strong></div>
          <div className={styles.journeySteps}>{journey.map(({ icon: Icon, title, description }, index) => <div className={styles.journeyItem} key={title}>
            <article><span><Icon size={25} /></span><div><h2>{title}</h2><p>{description}</p></div></article>
            {index < journey.length - 1 && <div className={styles.journeyArrow} aria-hidden="true"><ArrowRight size={20} /><ArrowDown size={20} /></div>}
          </div>)}</div>
        </div>
      </Container>
    </section>

    <section className={styles.missionSection}>
      <Container><div className={styles.missionCard}>
        <Badge>Our Mission</Badge>
        <h2>Help <em>1 million Nepalese</em> upskill themselves and build a better quality of life.</h2>
        <div className={styles.missionCopy}>
          <p>We believe the right skill can help someone find a better job, start freelancing, grow a business, increase their income, communicate better, or simply become more confident about their future.</p>
          <p>And we want to make that kind of practical learning easier to access.</p>
        </div>
      </div></Container>
    </section>

    <section className={styles.whatSection}>
      <Container className={styles.whatLayout}>
        <div className={styles.whatCopy}>
          <Badge>What We Do</Badge>
          <h2>Practical learning for real life</h2>
          <p>Sikumna is an education platform where we work with experienced trainers and experts from Nepal and around the world to create practical learning programs.</p>
          <p>Most of our programs are live and cohort-based, so you don&apos;t just watch videos alone.</p>
          <p>You learn together, practice what you learn, ask questions, complete real projects, and get guidance along the way.</p>
          <p>Whether it is digital marketing, AI, communication, freelancing, business, English, or another valuable skill, we want every Sikumna program to help you become better at something that actually matters in your life.</p>
          <div className={styles.simpleGoal}><CircleHelp size={22} /><div><span>Our goal is simple:</span><strong>Learn something useful. Apply it in real life. Grow from it.</strong></div></div>
        </div>
        <div className={styles.learningCards}>{practicalLearning.map(({ icon: Icon, title, description }) => <article key={title}><span><Icon size={25} /></span><div><h3>{title}</h3><p>{description}</p></div></article>)}</div>
      </Container>
    </section>

    <section className={styles.foundersSection}>
      <Container className={styles.foundersLayout}>
        <div className={styles.founderCopy}>
          <Badge>Our Founders</Badge>
          <h2>Our Founders</h2>
          <p>Sikumna was founded in December 2020 by <strong>Saugat Basnet</strong>, Founder, and <strong>Raina Byanjankar</strong>, Co-founder.</p>
          <p>It started with one simple belief:</p>
          <blockquote>Education should not stop at learning. It should help you do something better in the real world.</blockquote>
          <p>That is still the reason Sikumna exists today.</p>
          <p><strong>And we are just getting started.</strong></p>
        </div>
        <div className={styles.founderCards}>{founders.map((founder) => <figure className={styles.founderCard} key={founder.name}>
          <div className={styles.founderPhoto}><Image src={founder.image} alt={`${founder.name}, ${founder.role} of Sikumna Nepal`} fill sizes="(max-width: 620px) 100vw, (max-width: 1100px) 46vw, 290px" /></div>
          <figcaption><strong>{founder.name}</strong><span>{founder.role}</span></figcaption>
        </figure>)}</div>
      </Container>
    </section>

    <section className={styles.ctaSection}>
      <Container><div className={styles.ctaCard}><div className={styles.ctaGrid} aria-hidden="true" /><div><Badge>Let&apos;s Learn and Grow Together</Badge><h2>Be a part of our mission</h2><p>Explore our programs and start learning skills that can help you build a better future.</p></div><div className={styles.ctaActions}><Button href="/programs" size="lg">Explore Programs <ArrowRight size={18} /></Button><Button href="/free-masterclasses" variant="secondary" size="lg"><Play size={17} fill="currentColor" /> Watch Free Masterclasses</Button></div></div></Container>
    </section>
  </main><SiteFooter /></>;
}
