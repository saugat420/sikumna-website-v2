import type { Metadata } from "next";
import Link from "../../components/SafeLink";
import { notFound } from "next/navigation";
import { Clock3 } from "lucide-react";
import { getMasterclass, masterclasses } from "../../../data/masterclasses";
import MasterclassExperience from "../../components/MasterclassExperience";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";

export function generateStaticParams() { return masterclasses.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const item = getMasterclass((await params).slug); if (!item) return {}; return { title: `${item.title} | Free Sikumna Masterclass`, description: item.description, alternates: { canonical: `/free-masterclasses/${item.slug}` }, openGraph: { title: item.title, description: item.description, images: [{ url: item.thumbnail }] }, twitter: { card: "summary_large_image", title: item.title, description: item.description, images: [item.thumbnail] } }; }
export default async function MasterclassPage({ params }: { params: Promise<{ slug: string }> }) {
  const item = getMasterclass((await params).slug); if (!item) notFound();
  const related = masterclasses.filter((candidate) => candidate.slug !== item.slug).slice(0, 3);
  return <><SiteHeader /><main><div className="watch-page ds-container"><nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/free-masterclasses">Free Masterclasses</Link><span aria-hidden="true">/</span><span>{item.title}</span></nav><header className="watch-header"><span className="ds-badge">{item.category}</span><h1>{item.title}</h1><p>{item.description}</p><div><span><Clock3 size={16} /> {item.duration}</span></div></header><MasterclassExperience masterclass={{ slug: item.slug, title: item.title, youtubeId: item.youtubeId }} /><section className="related-content"><h2>Related Masterclasses</h2><div>{related.map((relatedItem) => <Link href={`/free-masterclasses/${relatedItem.slug}`} key={relatedItem.slug}>{relatedItem.title}<span aria-hidden="true">→</span></Link>)}</div></section></div></main><SiteFooter /></>;
}
