import BrandLogo from "../components/BrandLogo";
import Link from "../components/SafeLink";
import styles from "./course-landing.module.css";

export default function CourseLandingFooter({ label }: { label: string }) {
  return <footer className={styles.footer}><div className={styles.container}><Link href="/" aria-label="Sikumna Nepal home" className={styles.logo}><BrandLogo /></Link><span>Practical education for real life.</span><small>© 2026 Sikumna Nepal · {label}</small></div></footer>;
}
