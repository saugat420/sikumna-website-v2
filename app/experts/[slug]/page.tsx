import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { experts, getExpert } from "../../../data/experts";
import { masterclasses } from "../../../data/masterclasses";
import { programs } from "../../../data/programs";
import { Badge, Container } from "../../components/DesignSystem";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
export function generateStaticParams() { return experts.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const expert = getExpert((await params).slug); return expert ? { title: `${expert.name} | Sikumna Expert`, description: expert.bio, alternates: { canonical: `/experts/${expert.slug}` }, openGraph: { title: expert.name, description: expert.bio, images: [{ url: expert.image }] }, twitter: { card: "summary_large_image", title: expert.name, description: expert.bio, images: [expert.image] } } : {}; }
export default async function ExpertProfile({ params }: { params: Promise<{ slug: string }> }) { const expert = getExpert((await params).slug); if (!expert) notFound(); const expertPrograms = programs.filter((item) => item.trainerId === expert.slug); const expertClasses = masterclasses.filter((item) => item.trainerId === expert.slug); return <><SiteHeader /><main><section className="profile-hero"><Container><div className="profile-photo"><Image src={expert.image} alt={expert.name} fill sizes="(max-width: 760px) 100vw, 42vw" /></div><div><Badge>Sikumna Practitioner</Badge><h1>{expert.name}</h1><strong>{expert.expertise}</strong><p>{expert.biography}</p><div className="tag-list">{expert.areas.map((area) => <span key={area}>{area}</span>)}</div></div></Container></section><Container><section className="related-content"><h2>Learn with {expert.name}</h2><div>{expertPrograms.map((item) => <Link href={`/programs/${item.slug}`} key={item.slug}>{item.title}<ArrowRight size={17} /></Link>)}{expertClasses.map((item) => <Link href={`/free-masterclasses/${item.slug}`} key={item.slug}>{item.title}<ArrowRight size={17} /></Link>)}{expertPrograms.length + expertClasses.length === 0 && <p className="empty-state">No active programs currently.</p>}</div></section></Container></main><SiteFooter /></>; }
