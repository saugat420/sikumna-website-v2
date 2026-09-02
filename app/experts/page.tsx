import type { Metadata } from "next";
import Image from "next/image";
import Link from "../components/SafeLink";
import { ArrowRight } from "lucide-react";
import { experts } from "../../data/experts";
import { Container } from "../components/DesignSystem";
import InnerPageHero from "../components/InnerPageHero";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
export const metadata: Metadata = { title: "Sikumna Experts", description: "Meet the experienced practitioners behind Sikumna Nepal's programs and masterclasses.", alternates: { canonical: "/experts" } };
export default function ExpertsPage() { return <><SiteHeader /><main><InnerPageHero eyebrow="Learn from Practitioners" title="Learn From Experienced Practitioners" description="Meet the experts behind Sikumna's programs, workshops and free masterclasses." /><Container><div className="expert-list-grid">{experts.map((expert) => <article key={expert.slug}><div><Image src={expert.image} alt={expert.name} fill sizes="(max-width: 700px) 100vw, 50vw" /></div><span>{expert.expertise}</span><h2>{expert.name}</h2><p>{expert.bio}</p><Link className="text-link" href={`/experts/${expert.slug}`}>View Profile <ArrowRight size={16} /></Link></article>)}</div></Container></main><SiteFooter /></>; }
