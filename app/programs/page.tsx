import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import { experts } from "../../data/experts";
import { programs } from "../../data/programs";
import { Badge, Container } from "../components/DesignSystem";
import InnerPageHero from "../components/InnerPageHero";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
export const metadata: Metadata = { title: "Practical Programs | Sikumna Nepal", description: "Explore Sikumna Nepal's practical, expert-led mentorship programs.", alternates: { canonical: "/programs" } };
export default function ProgramsPage() { return <><SiteHeader /><main><InnerPageHero eyebrow="Live Mentorship Programs" title="Programs Built for Real-World Growth" description="Explore practical, expert-led programs designed to help you build skills you can apply in your career, business and everyday life." /><Container><div className="editorial-list">{programs.map((program, index) => { const trainer = experts.find((expert) => expert.slug === program.trainerId); return <article className={index % 2 ? "editorial-item reverse" : "editorial-item"} key={program.slug}><div className="editorial-art"><Image src={program.image} alt="" fill sizes="(max-width: 760px) 100vw, 50vw" /></div><div><Badge>{program.category}</Badge><h2>{program.title}</h2><p>{program.description}</p><div className="content-meta"><span>{program.format}</span><span><Clock3 size={15} /> {program.duration}</span><span>{trainer?.name}</span></div><Link className="ds-button ds-button-primary ds-button-md" href={`/programs/${program.slug}`}>Get More Details <ArrowRight size={17} /></Link></div></article>; })}</div></Container></main><SiteFooter /></>; }
