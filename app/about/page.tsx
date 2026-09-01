import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Container } from "../components/DesignSystem";
import InnerPageHero from "../components/InnerPageHero";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
export const metadata: Metadata = { title: "About Sikumna Nepal", description: "Practical education designed for careers, businesses and everyday life in Nepal.", alternates: { canonical: "/about" } };
export default function AboutPage() { return <><SiteHeader /><main><InnerPageHero eyebrow="About Sikumna" title="Practical Education for Real Life" description="Sikumna Nepal helps learners build useful skills through practical teaching, experienced practitioners and a supportive learning community." /><Container><section className="two-column-detail"><div><h2>Why we exist</h2><p>Education is most valuable when learners can use it. Sikumna connects clear teaching with the realities of careers, businesses and everyday confidence in Nepal.</p></div><div><h2>What guides us</h2><ul>{["Practical by design", "Relevant to Nepal", "Supportive and interactive", "Focused on real progress"].map((item) => <li key={item}><CheckCircle2 size={18} />{item}</li>)}</ul></div></section></Container></main><SiteFooter /></>; }
