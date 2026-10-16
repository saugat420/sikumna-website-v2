import type { ReactNode } from "react";
import { Container } from "./DesignSystem";
import InnerPageHero from "./InnerPageHero";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

export default function PolicyLayout({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children: ReactNode }) {
  return <><SiteHeader/><main><InnerPageHero eyebrow={eyebrow} title={title} description={description}/><Container><article className="policy-content">{children}</article></Container></main><SiteFooter/></>;
}
