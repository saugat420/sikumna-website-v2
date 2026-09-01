import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { getExpert } from "../../../data/experts";
import { getProgram, programs } from "../../../data/programs";
import { Badge, Container } from "../../components/DesignSystem";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import Accordion from "../../components/Accordion";
export function generateStaticParams() { return programs.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const program = getProgram((await params).slug); return program ? { title: `${program.title} | Sikumna Nepal`, description: program.description, alternates: { canonical: `/programs/${program.slug}` }, openGraph: { title: program.title, description: program.description, images: [{ url: program.image }] }, twitter: { card: "summary_large_image", title: program.title, description: program.description, images: [program.image] } } : {}; }
export default async function ProgramDetail({ params }: { params: Promise<{ slug: string }> }) {
  const program = getProgram((await params).slug); if (!program) notFound();
  const trainer = getExpert(program.trainerId); if (!trainer) notFound();
  return <><SiteHeader /><main><section className="detail-hero"><Container><div><Badge>{program.category}</Badge><h1>{program.title}</h1><p>{program.positioning}</p><div className="content-meta"><span>{program.format}</span><span>{program.duration}</span><span>With {trainer.name}</span></div><Link className="ds-button ds-button-primary ds-button-lg" href={program.relatedEvent}>Join the Free Live Session <ArrowRight size={18} /></Link></div><div className="detail-hero-art"><Image src={program.image} alt={`${program.title} illustration`} fill sizes="(max-width: 760px) 100vw, 45vw" /></div></Container></section><Container>
    <section className="detail-section"><Badge>About the program</Badge><h2>Practical learning with a clear path</h2><p>{program.about}</p></section>
    <section className="two-column-detail"><div><Badge>Who it is for</Badge><h2>Built for motivated learners</h2><ul>{program.audience.map((item) => <li key={item}><CheckCircle2 size={18} />{item}</li>)}</ul></div><div><Badge>Program outcomes</Badge><h2>Move from learning to doing</h2><ul>{program.outcomes.map((item) => <li key={item}><CheckCircle2 size={18} />{item}</li>)}</ul></div></section>
    <section className="two-column-detail"><div><Badge>Curriculum</Badge><h2>What You’ll Learn</h2><ol>{program.modules.map((module, index) => <li key={module}><span>0{index + 1}</span>{module}</li>)}</ol></div><div><Badge>Learning experience</Badge><h2>How the Program Works</h2><ul>{program.howItWorks.map((item) => <li key={item}><CheckCircle2 size={18} />{item}</li>)}</ul></div></section>
    <section className="trainer-inline trainer-large"><Image src={trainer.image} alt={trainer.name} width={180} height={180} /><div><Badge>Your Trainer</Badge><h2>{trainer.name}</h2><p>{trainer.bio}</p><Link className="text-link" href={`/experts/${trainer.slug}`}>View Trainer Profile →</Link></div></section>
    <section className="program-faq"><Badge>Questions</Badge><h2>Frequently Asked Questions</h2><Accordion items={program.faq} /></section>
    <section className="detail-cta"><h2>Interested in {program.title}?</h2><p>Start with the free live session and experience Sikumna’s practical teaching style.</p><Link className="ds-button ds-button-primary ds-button-lg" href={program.relatedEvent}>Join the Free Live Session <ArrowRight size={18} /></Link></section>
  </Container></main><SiteFooter /></>;
}
