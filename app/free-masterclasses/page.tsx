import type { Metadata } from "next";
import Image from "next/image";
import { Clock3, LockKeyhole, Play } from "lucide-react";
import { experts } from "../../data/experts";
import { masterclasses } from "../../data/masterclasses";
import { Badge, Container } from "../components/DesignSystem";
import InnerPageHero from "../components/InnerPageHero";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import MasterclassLink from "../components/MasterclassLink";

export const metadata: Metadata = { title: "Free Masterclasses | Sikumna Nepal", description: "Learn practical skills for free with recorded Sikumna Nepal masterclasses.", alternates: { canonical: "/free-masterclasses" } };
export default function FreeMasterclassesPage() { return <><SiteHeader /><main><InnerPageHero eyebrow="Free Learning" title="Learn Practical Skills for Free" description="Explore free masterclasses from experienced practitioners across AI, marketing, freelancing, SEO, ecommerce, personal branding and more." /><Container><div className="filter-row" aria-label="Masterclass categories">{["All", "AI", "Marketing", "Freelancing", "SEO", "Business", "Communication", "Personal Branding"].map((item) => <span key={item}>{item}</span>)}</div><div className="content-card-grid">{masterclasses.map((item) => { const trainer = experts.find((expert) => expert.slug === item.trainerId); return <article className="content-card" key={item.slug}><MasterclassLink className="content-card-image" slug={item.slug} ariaLabel={`Watch ${item.title}`}><Image src={item.thumbnail} alt="" fill sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw" /></MasterclassLink><div><Badge>{item.category}</Badge><MasterclassLink slug={item.slug}><h2>{item.title}</h2></MasterclassLink><p>{item.description}</p><div className="content-meta"><span><Clock3 size={15} /> {item.duration}</span><span>{trainer?.name}</span></div><MasterclassLink className="card-action" slug={item.slug}><Play size={17} fill="currentColor" /> Watch Masterclass</MasterclassLink><small><LockKeyhole size={13} /> Free account required</small></div></article>; })}</div></Container></main><SiteFooter /></>; }
