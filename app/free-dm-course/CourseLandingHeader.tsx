import { ArrowUpRight } from "lucide-react";
import BrandLogo from "../components/BrandLogo";
import Link from "../components/SafeLink";
import styles from "./course-landing.module.css";

export default function CourseLandingHeader() {
  return <header className={styles.header}><div className={styles.container}><Link href="/" aria-label="Sikumna Nepal home" className={styles.logo}><BrandLogo /></Link><Link href="/" className={styles.backButton}>Back to homepage <ArrowUpRight size={16} /></Link></div></header>;
}
