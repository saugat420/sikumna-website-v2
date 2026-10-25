import type { Metadata } from "next";
import { ArrowUpRight, Check, CheckCircle2, Clock3, Info, Mail, Play, SquareSplitHorizontal } from "lucide-react";
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
      <section className={`${styles.hero} ${styles.thanksHero}`}><div className={`${styles.container} ${styles.thanksGrid}`}>
        <div className={styles.thanksCopy}><span className={styles.successIcon}><Check size={36} /></span><span className={styles.eyebrow}>✦ You’re officially on your way</span><h1>You’re in! 🎉<br /><em>Let’s get learning.</em></h1><p><strong>Congratulations on joining our FREE 30-Day Digital Marketing Course!</strong> For the next 30 days, you’ll receive one video lesson and one simple, practical assignment in your email every day.</p><div className={styles.pills}><span><Mail size={15} /> 1 video daily</span><span><CheckCircle2 size={15} /> 1 practical assignment</span><span><Clock3 size={15} /> Learn at your pace</span></div></div>
        <div className={styles.journeyCard}><header><span>Your learning journey</span><b><Check size={13} /> Free course</b></header><div className={styles.inboxCard}><div className={styles.inboxTitle}><Mail size={25} /><span><strong>Lessons delivered to your inbox</strong><small>One lesson, every day for 30 days</small></span></div><div className={styles.emailMock}><small>From: Sikumna Team</small><strong>Your Digital Marketing Journey Starts Here 🚀</strong><i /><i /><i /><div><Play size={18} fill="currentColor" /><span><b>Today’s Video Lesson</b><small>Watch · Learn · Complete the assignment</small></span></div></div></div><div className={styles.journeySteps}><span><b>1</b><strong>Start</strong><small>Check your email</small></span><span><b>2</b><strong>Practice</strong><small>Watch & do</small></span><span><b>30</b><strong>Grow</strong><small>Build real skills</small></span></div><p>An example of what your daily email will look like.</p></div>
      </div></section>

      <section className={`${styles.section} ${styles.nextStep}`}><div className={styles.container}><div className={styles.sectionHeading}><span>Important next step</span><h2>Don’t miss your first lesson. 📩</h2><p>Check the email address you used to register. If you can’t find our email in your inbox, check these folders too:</p></div><div className={styles.inboxPlaces}><article><span><Mail /></span><h3>1. Primary / Inbox</h3><p>Start here. Your first course email may already be waiting in your main inbox.</p></article><article><span><SquareSplitHorizontal /></span><h3>2. Promotions</h3><p>If you use Gmail, your lesson email may appear in the Promotions tab.</p></article><article><span>△</span><h3>3. Spam / Junk</h3><p>If it’s there, mark it as <strong>Not Spam</strong> so you don’t miss future lessons.</p></article></div><div className={styles.helpTip}><Info size={18} /><p><strong>Helpful tip:</strong> Move our email to your Primary inbox or add the sender to your contacts. That way, your next 29 lessons are easier to find.</p></div><div className={styles.emailActions}><a href="https://mail.google.com/" target="_blank" rel="noreferrer">✉ Open Gmail <ArrowUpRight size={16} /></a><a href="https://outlook.live.com/mail/" target="_blank" rel="noreferrer">Open Outlook <ArrowUpRight size={16} /></a></div></div></section>

      <section className={styles.thanksCta}><div className={styles.container}><div><span>✦ ✨ ✦</span><h2>Don’t just watch. Take action.</h2><p>Spend a little time learning and practicing each day. Small, consistent steps are how real skills are built.</p><strong>Good luck on your journey! 🤍 — Team Sikumna</strong></div></div></section>
    </main>
    <CourseLandingFooter label="Course welcome page" />
  </div>;
}
