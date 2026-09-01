import { Badge, Container, PageTitle } from "./DesignSystem";
export default function InnerPageHero({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <section className="inner-hero"><div className="hero-grid" aria-hidden="true" /><Container><Badge>{eyebrow}</Badge><PageTitle>{title}</PageTitle><p>{description}</p></Container></section>;
}
