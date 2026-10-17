import type { Metadata } from "next";
import { ArrowRight, BookOpenCheck, Handshake, Lightbulb, Target } from "lucide-react";
import { Badge, Button, Container } from "../components/DesignSystem";
import InnerPageHero from "../components/InnerPageHero";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "About Sikumna Nepal",
  description: "Sikumna Nepal connects people with practical skills and expert-led learning for Nepal's skill-based economy.",
  alternates: { canonical: "/about" },
};

const approach = [
  { icon: Handshake, title: "Connect with experts", description: "We work with people who understand their field and know what practical progress looks like." },
  { icon: BookOpenCheck, title: "Curate useful programs", description: "We shape focused learning experiences around skills people can apply in work, business and everyday life." },
  { icon: Lightbulb, title: "Make learning practical", description: "We share clear guidance, live practice and useful resources that help learners move from knowing to doing." },
];

export default function AboutPage() {
  return <><SiteHeader /><main className="about-page">
    <InnerPageHero eyebrow="About Sikumna" title="Helping Nepal Learn the Skills That Matter" description="We are building a practical learning platform for people who want to become more capable, confident and valuable in a changing world." />
    <Container>
      <section className="about-story">
        <div className="about-story-heading"><Badge>Why we exist</Badge><h2>The world values what you can do.</h2></div>
        <div className="about-story-copy">
          <p>We now live in a skill-based economy. Practical ability, confidence and the capacity to solve real problems often matter as much as traditional education and degrees.</p>
          <p>But many people in Nepal still do not have easy access to practical learning that connects knowledge with real work. Too often, learners understand the theory but do not get enough guidance, practice or support to use it.</p>
          <p><strong>Sikumna exists to help close that gap.</strong> We connect with experienced people, curate practical programs and make their knowledge accessible through one trusted platform.</p>
        </div>
      </section>
      <section className="about-mission">
        <div className="about-mission-icon"><Target size={34} /></div>
        <div><Badge>Our mission</Badge><h2>Empower every Nepali to become skilled and valuable.</h2><p>We want learners to build useful abilities that strengthen their careers, businesses and everyday lives—not simply collect more information.</p></div>
      </section>
      <section className="about-approach">
        <div className="about-section-heading"><Badge>How we do it</Badge><h2>Learning built around real progress</h2><p>Our role is to bring the right expertise, structure and learning experience together.</p></div>
        <div className="about-approach-grid">{approach.map(({ icon: Icon, title, description }) => <article key={title}><span><Icon size={27} /></span><h3>{title}</h3><p>{description}</p></article>)}</div>
      </section>
      <section className="about-cta">
        <div><Badge>Build your next skill</Badge><h2>Learn something you can use.</h2><p>Explore practical live cohort programs or begin with a free learning video.</p></div>
        <div><Button href="/programs" variant="secondary" size="lg">Explore programs</Button><Button href="/free-masterclasses" size="lg">Watch free videos <ArrowRight size={18} /></Button></div>
      </section>
    </Container>
  </main><SiteFooter /></>;
}
