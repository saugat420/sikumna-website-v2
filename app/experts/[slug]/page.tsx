import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { experts, getExpert } from "../../../data/experts";
import { masterclasses } from "../../../data/masterclasses";
import { programs } from "../../../data/programs";
import { Badge, Container } from "../../components/DesignSystem";
import { aiMarketingEvent, englishFluencyEvent } from "../../events/eventData";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
export function generateStaticParams() { return experts.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const expert = getExpert((await params).slug); return expert ? { title: `${expert.name} | Sikumna Expert`, description: expert.bio, alternates: { canonical: `/experts/${expert.slug}` }, openGraph: { title: expert.name, description: expert.bio, images: [{ url: expert.image }] }, twitter: { card: "summary_large_image", title: expert.name, description: expert.bio, images: [expert.image] } } : {}; }
export default async function ExpertProfile({ params }: { params: Promise<{ slug: string }> }) {
  const expert = getExpert((await params).slug); if (!expert) notFound();
  const expertPrograms = programs.filter((item) => item.trainerId === expert.slug);
  const expertClasses = masterclasses.filter((item) => item.trainerId === expert.slug);
  const events = [
    { slug: "ai-marketing-masterclass", data: aiMarketingEvent },
    { slug: "english-fluency-workshop", data: englishFluencyEvent },
  ].filter((item) => item.data.instructor.trainerId === expert.slug);
  return <><SiteHeader /><main><section className="profile-hero"><Container><div className="profile-photo"><Image src={expert.image} alt={expert.name} fill sizes="(max-width: 760px) 100vw, 42vw" /></div><div><Badge>Sikumna Practitioner</Badge><h1>{expert.name}</h1><strong>{expert.expertise}</strong><p>{expert.bio}</p><div className="tag-list">{expert.areas.map((area) => <span key={area}>{area}</span>)}</div></div></Container></section><Container>
    <section className="detail-section"><Badge>About</Badge><h2>About {expert.name}</h2><p>{expert.biography}</p></section>
    <section className="related-content"><h2>Programs by {expert.name}</h2><div>{expertPrograms.map((item) => <Link href={`/programs/${item.slug}`} key={item.slug}>{item.title}<ArrowRight size={17} /></Link>)}{expertPrograms.length === 0 && <p className="empty-state">No active programs currently.</p>}</div></section>
    <section className="related-content"><h2>Free masterclasses by {expert.name}</h2><div>{expertClasses.map((item) => <Link href={`/free-masterclasses/${item.slug}`} key={item.slug}>{item.title}<ArrowRight size={17} /></Link>)}{expertClasses.length === 0 && <p className="empty-state">No recorded masterclasses currently.</p>}</div></section>
    {events.length > 0 && <section className="related-content"><h2>Upcoming live sessions</h2><div>{events.map((item) => <Link href={`/events/${item.slug}`} key={item.slug}>{item.data.title}<ArrowRight size={17} /></Link>)}</div></section>}
    <section className="detail-cta"><h2>Learn with {expert.name}</h2><p>Explore the practical programs and free learning resources connected to this practitioner.</p><Link className="ds-button ds-button-primary ds-button-lg" href={expertClasses.length ? `/free-masterclasses/${expertClasses[0].slug}` : expertPrograms.length ? `/programs/${expertPrograms[0].slug}` : "/free-masterclasses"}>Explore learning <ArrowRight size={18} /></Link></section>
  </Container></main><SiteFooter /></>;
}
