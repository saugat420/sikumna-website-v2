import Link from "next/link";
import SiteHeader from "./components/SiteHeader";
export default function NotFound(){return <><SiteHeader/><main className="not-found"><span className="ds-badge">404</span><h1>We couldn’t find this page.</h1><p>The page may have moved, or the link may be incomplete.</p><div><Link className="ds-button ds-button-primary ds-button-lg" href="/">Go Home</Link><Link className="ds-button ds-button-secondary ds-button-lg" href="/free-masterclasses">Explore Free Masterclasses</Link></div></main></>}
