import type { Metadata } from "next";
import { Container } from "../components/DesignSystem";
import ProgramDirectory from "../components/ProgramDirectory";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
export const metadata: Metadata = { title: "Practical Programs | Sikumna Nepal", description: "Explore Sikumna Nepal's practical, expert-led mentorship programs.", alternates: { canonical: "/programs" } };
export default function ProgramsPage() { return <><SiteHeader /><main className="programs-page"><Container><ProgramDirectory /></Container></main><SiteFooter /></>; }
