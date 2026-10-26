import type { Metadata } from "next";
import { ArrowUpRight, Check, CheckCircle2, Clock3, Info, Mail, SquareSplitHorizontal } from "lucide-react";
import CourseLandingFooter from "../CourseLandingFooter";
import CourseLandingHeader from "../CourseLandingHeader";
import styles from "../course-landing.module.css";

export const metadata: Metadata = {
  title: "You’re In! | Free Digital Marketing Course | Sikumna Nepal",
  description: "Welcome to Sikumna Nepal’s free 30-day digital marketing course.",
  alternates: { canonical: "/free-dm-course/thank-you" },
};

export default function FreeDmCourseThankYouPage() {
  return <div className={styles.site}>
    <CourseLandingHeader />
    <main>
      <section className={`${styles.hero} ${styles.thanksHero}`}><div className={styles.container}>
        <div className={styles.thanksCopy}><span className={styles.successIcon}><Check size={38} /></span><span className={styles.eyebrow}>You’re officially on your way</span><h1>You’re in! 🎉<br /><em>Let’s get learning.</em></h1><p><strong>Congratulations on joining our FREE 30-Day Digital Marketing Course.</strong> Your first lesson will arrive by email. For the next 30 days, you’ll receive one practical video lesson and assignment each day.</p><div className={styles.pills}><span><Mail size={17} /> One video daily</span><span><CheckCircle2 size={17} /> Practical assignments</span><span><Clock3 size={17} /> Learn at your pace</span></div></div>
      </div></section>

      <section className={`${styles.section} ${styles.nextStep}`}><div className={styles.container}><div className={styles.sectionHeading}><span>Important next step</span><h2>Check your inbox for your first lesson.</h2><p>If you cannot find the email, check these three places.</p></div><div className={styles.inboxPlaces}><article><span><Mail /></span><h3>Primary inbox</h3><p>Your first course email may already be waiting in your main inbox.</p></article><article><span><SquareSplitHorizontal /></span><h3>Promotions</h3><p>Gmail may place the lesson inside the Promotions tab.</p></article><article><span>△</span><h3>Spam or junk</h3><p>If it is there, mark it as <strong>Not Spam</strong>.</p></article></div><div className={styles.helpTip}><Info size={20} /><p>Add the sender to your contacts so future lessons are easier to find.</p></div><div className={styles.emailActions}><a href="https://mail.google.com/" target="_blank" rel="noreferrer">Open Gmail <ArrowUpRight size={17} /></a><a href="https://outlook.live.com/mail/" target="_blank" rel="noreferrer">Open Outlook <ArrowUpRight size={17} /></a></div></div></section>
    </main>
    <CourseLandingFooter />
  </div>;
}
