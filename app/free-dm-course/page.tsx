import type { Metadata } from "next";
import { Container } from "../components/DesignSystem";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Free 30-Day Digital Marketing Course | Sikumna Nepal",
  description: "Learn digital marketing free in 30 days with one beginner-friendly video lesson and one practical assignment every day.",
  alternates: { canonical: "/free-dm-course" },
  openGraph: {
    title: "Learn Digital Marketing in 30 Days—For Free",
    description: "One video lesson every day. One practical assignment. 30 days of learning by doing.",
    images: [{ url: "/content/courses/digital-marketing-course.webp" }],
  },
};

export default function FreeDmCourseLandingPage() {
  return <><SiteHeader variant="landing" ctaHref="/free-courses/digital-marketing" ctaLabel="Start Free Course" />
    <main className="free-dm-page">
      <section className="free-dm-hero">
        <Container className="free-dm-hero-layout free-dm-hero-simple">
          <div className="free-dm-hero-copy">
            <h1>Learn Digital Marketing in Just 30 Days. <span>For FREE!</span></h1>
            <p className="free-dm-lead">One video lesson every day. One practical assignment. 30 days of learning by doing.</p>
            <p>Join 255,000+ learners from across Nepal who have already signed up for our FREE Digital Marketing Course.</p>
            <p>No IT background. No previous experience. Just your laptop, an internet connection, and the willingness to learn.</p>
            <a className="ds-button ds-button-primary ds-button-lg" href="/free-courses/digital-marketing">Join the FREE 30-Day Course</a>
          </div>
        </Container>
      </section>
    </main>
    <SiteFooter variant="landing" />
  </>;
}
