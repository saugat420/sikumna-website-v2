import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, BrainCircuit, CalendarClock, ChartNoAxesCombined, Check, Mail, Megaphone, MessageSquareText, MousePointerClick, Route, ShieldCheck, Target, Users, WandSparkles, Wrench, Zap } from "lucide-react";
import Accordion from "../components/Accordion";
import CourseLandingFooter from "../free-dm-course/CourseLandingFooter";
import CourseLandingHeader from "../free-dm-course/CourseLandingHeader";
import courseStyles from "../free-dm-course/course-landing.module.css";
import AiMasterclassForm from "./AiMasterclassForm";
import styles from "./ai-masterclass.module.css";

export const metadata: Metadata = {
  title: "Free AI Marketing Masterclass | Sikumna Nepal",
  description: "Learn how AI is changing digital marketing and how beginners can use practical AI tools for content, ads, email and freelance work.",
  alternates: { canonical: "/ai-marketing-masterclass" },
};

const faqs = [
  { question: "Is the AI Marketing Masterclass free?", answer: "Yes. The live masterclass is free to join. Reserve your seat using the short registration form on this page." },
  { question: "Do I need marketing or coding experience?", answer: "No. The session is designed for complete beginners. You do not need previous marketing experience or coding knowledge." },
  { question: "Where will the masterclass happen?", answer: "The masterclass will take place live on Zoom. You’ll receive the access details after registration." },
  { question: "What will I learn in 90 minutes?", answer: "You’ll understand what AI marketing means, which beginner-friendly tools matter, and how AI can support content, ads, emails, landing pages and freelance work." },
];

export default function AiMarketingMasterclassPage() {
  return <div className={courseStyles.site}>
    <CourseLandingHeader />
    <main>
      <section className={courseStyles.hero}>
        <div className={courseStyles.container}>
          <div className={courseStyles.heroGrid}>
            <div className={courseStyles.heroCopy}>
              <span className={`${courseStyles.eyebrow} ${styles.liveDate}`}><CalendarClock size={16} /> Live • 14th Dec at 8 PM</span>
              <h1>Learn AI Marketing From Scratch in <em>90 Minutes.</em></h1>
              <p>See how AI can help you create content, write ads and emails, plan landing pages and start building a practical freelance skill—even if you’re a complete beginner.</p>
              <div className={courseStyles.pills}><span><Check size={15} /> Free live session</span><span><Check size={15} /> Beginner friendly</span><span><Check size={15} /> No coding needed</span></div>
              <div className={courseStyles.heroAction}><a href="#join" className={courseStyles.primaryButton}>Reserve My Free Seat <ArrowRight size={18} /></a></div>
              <div className={courseStyles.proof}><div className={courseStyles.avatarStack}><i>S</i><i>R</i><i>A</i><i>M</i></div><p><strong>Join learners across Nepal building useful digital skills.</strong></p></div>
            </div>
            <AiMasterclassForm />
          </div>
        </div>
      </section>

      <section className={`${courseStyles.section} ${courseStyles.softSection}`} id="what-you-will-learn">
        <div className={courseStyles.container}>
          <div className={courseStyles.sectionHeading}><span>Practical and beginner friendly</span><h2>What you’ll learn in the masterclass</h2><p>Leave with a clear understanding of AI marketing and a practical next step.</p></div>
          <div className={styles.learnGrid}>
            <article><span><BrainCircuit /></span><h3>What AI marketing means</h3><p>Understand AI marketing in simple language and see where it fits in real work.</p></article>
            <article><span><ChartNoAxesCombined /></span><h3>How AI is changing marketing</h3><p>See how modern tools are reshaping research, content and campaign work.</p></article>
            <article><span><MessageSquareText /></span><h3>Create ideas faster</h3><p>Use AI to support ads, content, emails and landing-page ideas.</p></article>
            <article><span><Wrench /></span><h3>Useful tools for beginners</h3><p>Learn which types of AI tools are worth exploring when you are starting.</p></article>
            <article><span><Route /></span><h3>Your first practical steps</h3><p>Get a simple path for building an AI-powered marketing and freelance skill.</p></article>
          </div>
        </div>
      </section>

      <section className={courseStyles.section}>
        <div className={courseStyles.container}><div className={styles.aiShift}>
          <div className={styles.aiShiftIntro}><span><WandSparkles size={16} /> Why this skill matters</span><h2>AI will not replace people who learn <em>how to use it.</em></h2><p>AI is most useful when it strengthens your thinking—not when it replaces it. Learn how to combine human judgment with faster tools.</p></div>
          <div className={styles.aiShiftCards}>
            <article><span><BrainCircuit /></span><div><small>Think</small><h3>Keep the human strategy</h3><p>Use your judgment to ask better questions and choose better ideas.</p></div></article>
            <article><span><Zap /></span><div><small>Create</small><h3>Move from idea to draft faster</h3><p>Support research, content, ads, emails and landing pages with AI.</p></div></article>
            <article><span><Target /></span><div><small>Apply</small><h3>Turn speed into useful work</h3><p>Build a clear path toward practical marketing and freelance skills.</p></div></article>
          </div>
          <div className={styles.aiShiftFooter}><ShieldCheck size={20} /><p>Clear examples. Responsible use. A realistic next step for beginners.</p></div>
        </div></div>
      </section>

      <section className={`${courseStyles.section} ${courseStyles.softSection}`} id="who-can-join">
        <div className={courseStyles.container}>
          <div className={courseStyles.sectionHeading}><span>Start wherever you are</span><h2>Who is this masterclass for?</h2><p>No marketing experience and no coding knowledge are required.</p></div>
          <div className={courseStyles.audience}>
            <article><Users /><h3>Students</h3><p>Explore a practical skill alongside your studies.</p></article>
            <article><MousePointerClick /><h3>Job Seekers</h3><p>Understand a growing skill you can add to your career journey.</p></article>
            <article><Megaphone /><h3>Freelancers</h3><p>Learn how AI can support faster, more useful client work.</p></article>
            <article><Mail /><h3>Complete Beginners</h3><p>Begin with simple explanations and a clear next step.</p></article>
          </div>
        </div>
      </section>

      <section className={courseStyles.section}>
        <div className={courseStyles.container}><div className={styles.trainerCard}><div className={styles.trainerPhoto}><Image src="/ai-marketing-masterclass/saugat-basnet.jpg" alt="Saugat Basnet, host of the AI Marketing Masterclass" fill sizes="(max-width: 620px) 150px, 190px" /></div><div><small>Your masterclass host</small><h2>Saugat Basnet</h2><p>Digital marketing consultant and coach with more than nine years of experience. Saugat, also known as Digital Saugat, founded Sikumna to help people across Nepal turn modern tools into practical skills and real opportunities.</p></div></div></div>
      </section>

      <section className={`${courseStyles.section} ${courseStyles.faqSection} ${courseStyles.softSection}`} id="faqs">
        <div className={courseStyles.container}><div className={courseStyles.sectionHeading}><span>Good to know</span><h2>Frequently asked questions</h2></div><div className={courseStyles.faqWrap}><Accordion items={faqs} /></div></div>
      </section>

      <section className={courseStyles.finalCta}><div className={courseStyles.container}><div><h2>Start learning AI marketing with a clear first step.</h2><p>Join the free live masterclass and learn what to focus on as a beginner.</p><a href="#join" className={courseStyles.whiteButton}>Reserve My Free Seat <ArrowRight size={17} /></a></div></div></section>
    </main>
    <CourseLandingFooter />
  </div>;
}
