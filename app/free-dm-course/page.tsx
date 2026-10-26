import type { Metadata } from "next";
import { ArrowRight, BriefcaseBusiness, Check, CheckCircle2, GraduationCap, Mail, Play, Rocket, Store } from "lucide-react";
import Accordion from "../components/Accordion";
import CourseLandingForm from "./CourseLandingForm";
import CourseLandingHeader from "./CourseLandingHeader";
import CourseLandingFooter from "./CourseLandingFooter";
import styles from "./course-landing.module.css";

export const metadata: Metadata = {
  title: "Free 30-Day Digital Marketing Course | Sikumna Nepal",
  description: "Learn digital marketing free in 30 days with one beginner-friendly video lesson and one practical assignment every day.",
  alternates: { canonical: "/free-dm-course" },
};

const faqs = [
  { question: "Is this course really 100% free?", answer: "Yes. This is a free 30-day digital marketing course. You don’t have to pay to access the lessons." },
  { question: "How will I receive the lessons?", answer: "You’ll receive one lesson at a time using the email address you register with." },
  { question: "Do I need an IT background?", answer: "No. The course is designed for beginners and does not require technical knowledge or previous experience." },
  { question: "How much time should I spend each day?", answer: "Plan for around one focused hour to watch the lesson and complete its practical assignment." },
  { question: "Can I watch the videos anytime?", answer: "Yes. You can learn at your own pace and return to the lessons when it suits you." },
];

export default function FreeDmCourseLandingPage() {
  return <div className={styles.site}>
    <CourseLandingHeader />
    <main>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <span className={styles.eyebrow}>▣ 30-Day Free Digital Marketing Course</span>
              <h1>Learn Digital<br />Marketing in <em>30 Days.</em><br />For FREE.</h1>
              <p>One video in your email every day. One easy assignment to put your learning into action. Build real skills by doing, not just watching.</p>
              <div className={styles.pills}><span><Check size={14} /> 100% Free</span><span><Check size={14} /> Beginner Friendly</span><span><Check size={14} /> Learn Anytime</span></div>
              <div className={styles.heroAction}><a href="#join" className={styles.primaryButton}>Start Learning for FREE <ArrowRight size={17} /></a></div>
              <div className={styles.proof}><div className={styles.avatarStack}><i>S</i><i>R</i><i>A</i><i>M</i></div><p><strong>255,000+ learners across Nepal have joined</strong></p></div>
            </div>
            <CourseLandingForm />
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.softSection}`} id="how-it-works">
        <div className={styles.container}>
          <div className={styles.sectionHeading}><span>It’s really this simple</span><h2>How the 30-day course works</h2><p>No complicated schedule. No overwhelm. Just one small step forward, every day.</p></div>
          <div className={styles.steps}>
            <article><span><Mail size={25} /></span><h3>Get one video daily</h3><p>A new digital marketing lesson lands in your email each day for 30 days.</p></article>
            <article><span><Play size={25} /></span><h3>Watch when you want</h3><p>Learn from your laptop, wherever you are, whenever it suits you.</p></article>
            <article><span><CheckCircle2 size={25} /></span><h3>Do the assignment</h3><p>Every lesson includes a simple task you can usually finish in about an hour.</p></article>
          </div>
        </div>
      </section>

      <section className={styles.section} id="why-this-course">
        <div className={`${styles.container} ${styles.actionGrid}`}>
          <div className={styles.actionCopy}><span className={styles.kicker}>More than just videos</span><h2>Don’t just watch.<br /><em>Learn. Practice. Implement.</em></h2><p>Watching tutorials doesn’t automatically build skills. This course is designed to help you actually use what you learn—one manageable assignment at a time.</p><ul><li><Check size={16} /> Simple lessons for complete beginners</li><li><Check size={16} /> Practical tasks after every video</li><li><Check size={16} /> About one hour a day for your assignment</li><li><Check size={16} /> No IT or technical background required</li></ul></div>
          <div className={styles.lessonPreview}><header><strong>This is what learning looks like</strong><span>Day 1 of 30</span></header><div className={styles.lessonCard}><b>Your next lesson is ready!</b><div className={styles.videoMock}><i><Play size={23} fill="currentColor" /></i></div></div><div className={styles.assignment}><CheckCircle2 size={22} /><span><strong>Today’s practical assignment</strong><small>Watch, practice and complete.</small></span></div></div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.softSection}`} id="who-can-join">
        <div className={styles.container}>
          <div className={styles.sectionHeading}><span>Everyone is welcome</span><h2>Who can join this course?</h2><p>Whether you’re starting from zero or exploring a new skill, this course is for you.</p></div>
          <div className={styles.audience}>
            <article><GraduationCap /><h3>Students</h3><p>Start learning useful digital skills alongside your studies.</p></article>
            <article><BriefcaseBusiness /><h3>Job Seekers</h3><p>Explore a practical skill you can add to your journey.</p></article>
            <article><Rocket /><h3>Freelancers</h3><p>Build your digital marketing foundation through practice.</p></article>
            <article><Store /><h3>Business Owners</h3><p>Understand digital marketing to make better business decisions.</p></article>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.faqSection}`} id="faqs">
        <div className={styles.container}>
          <div className={styles.sectionHeading}><span>Good to know</span><h2>Frequently asked questions</h2></div>
          <div className={styles.faqWrap}><Accordion items={faqs} /></div>
        </div>
      </section>

      <section className={styles.finalCta}><div className={styles.container}><div><h2>30 days from now, you’ll be glad you started.</h2><p>Get one lesson a day. Practice what you learn. Build your skills for free.</p><a href="#join" className={styles.whiteButton}>Join the FREE Course <ArrowRight size={16} /></a></div></div></section>
    </main>
    <CourseLandingFooter />
  </div>;
}
