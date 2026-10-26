import type { Metadata } from "next";
import { ArrowUpRight, CalendarCheck2, Check, Mail, MessageCircle } from "lucide-react";
import CourseLandingFooter from "../../free-dm-course/CourseLandingFooter";
import CourseLandingHeader from "../../free-dm-course/CourseLandingHeader";
import courseStyles from "../../free-dm-course/course-landing.module.css";
import styles from "../ai-masterclass.module.css";

export const metadata: Metadata = {
  title: "You’re Registered | AI Marketing Masterclass | Sikumna Nepal",
  description: "Complete your AI Marketing Masterclass registration and receive your live-session reminders.",
  alternates: { canonical: "/ai-marketing-masterclass/thank-you" },
};

export default function AiMarketingMasterclassThankYouPage() {
  return <div className={courseStyles.site}>
    <CourseLandingHeader />
    <main>
      <section className={`${courseStyles.hero} ${courseStyles.thanksHero}`}><div className={courseStyles.container}><div className={courseStyles.thanksCopy}><span className={courseStyles.successIcon}><Check size={38} /></span><span className={courseStyles.eyebrow}>Your seat request is received</span><h1>You’re registered! 🎉<br /><em>One quick step remains.</em></h1><p>Complete the Zoom registration below so you receive the live-session access details. You can also join the WhatsApp group for useful reminders.</p><div className={courseStyles.pills}><span><CalendarCheck2 size={17} /> 14th Dec at 8 PM</span><span><Mail size={17} /> Details by email</span><span><MessageCircle size={17} /> WhatsApp reminders</span></div><div className={styles.thanksActions}><a href="https://us06web.zoom.us/webinar/register/1817895398312/WN_phhWVNeFSJWAWJbzb8zs0w" target="_blank" rel="noreferrer">Complete Zoom Registration <ArrowUpRight size={18} /></a><a href="https://chat.whatsapp.com/GZrJUFLKMKD8oo8OR9rUt8" target="_blank" rel="noreferrer">Join WhatsApp Group <ArrowUpRight size={18} /></a></div></div></div></section>

      <section className={`${courseStyles.section} ${styles.videoSection}`}><div className={courseStyles.container}><div className={courseStyles.sectionHeading}><span>A message before the session</span><h2>Watch this short welcome video</h2></div><div className={styles.videoWrap}><iframe src="https://player.vimeo.com/video/1193138612?dnt=1&title=0&byline=0&portrait=0&badge=0" title="Welcome to the AI Marketing Masterclass" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen /></div><p className={styles.note}>Your schedule and access details will be shared through the registration channels. Keep an eye on your inbox and WhatsApp reminders.</p></div></section>

      <section className={`${courseStyles.section} ${courseStyles.softSection}`}><div className={courseStyles.container}><div className={courseStyles.sectionHeading}><span>Before the masterclass</span><h2>Make sure you don’t miss the live session</h2></div><div className={styles.nextGrid}><article><span><Mail /></span><h3>Check your inbox</h3><p>Look for the registration email and check Promotions or Spam if you do not see it.</p><a href="https://mail.google.com/" target="_blank" rel="noreferrer">Open Gmail <ArrowUpRight size={16} /></a></article><article><span><MessageCircle /></span><h3>Join the reminder group</h3><p>Use the WhatsApp group for session reminders so the live link is easy to find.</p><a href="https://chat.whatsapp.com/GZrJUFLKMKD8oo8OR9rUt8" target="_blank" rel="noreferrer">Open WhatsApp <ArrowUpRight size={16} /></a></article></div></div></section>
    </main>
    <CourseLandingFooter />
  </div>;
}
