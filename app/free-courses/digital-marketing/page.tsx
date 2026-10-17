import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { BookOpenCheck, Clock3, LockKeyhole, PlayCircle, PlaySquare } from "lucide-react";
import CourseLessonAccordion from "../../components/CourseLessonAccordion";
import { Badge, Container } from "../../components/DesignSystem";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import { digitalMarketingCourse } from "../../../data/courses";
import { getSessionLearner } from "../../../lib/auth/session";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Free Digital Marketing Course | Sikumna Nepal",
  description: digitalMarketingCourse.description,
  alternates: { canonical: "/free-courses/digital-marketing" },
  openGraph: { title: digitalMarketingCourse.title, description: digitalMarketingCourse.description, images: [{ url: digitalMarketingCourse.thumbnail }] },
  twitter: { card: "summary_large_image", title: digitalMarketingCourse.title, description: digitalMarketingCourse.description, images: [digitalMarketingCourse.thumbnail] },
};

export default async function DigitalMarketingCoursePage() {
  const learner = await getSessionLearner();
  if (!learner) redirect("/sign-in?next=%2Ffree-courses%2Fdigital-marketing");

  return <><SiteHeader /><main className="course-page">
    <section className="course-hero"><Container><div className="course-hero-copy"><Badge><PlaySquare size={15} /> Must Watch</Badge><h1>{digitalMarketingCourse.title}</h1><p>{digitalMarketingCourse.description}</p><div className="course-meta"><span><BookOpenCheck size={17} /> {digitalMarketingCourse.lessons.length} video lessons</span><span><Clock3 size={17} /> Learn at your pace</span><span><LockKeyhole size={17} /> Free learner access</span></div><a className="ds-button ds-button-primary ds-button-lg" href="#course-lessons"><PlayCircle size={19} /> Start learning</a></div><div className="course-hero-art"><Image src={digitalMarketingCourse.thumbnail} alt="Digital marketing course illustration" fill priority sizes="(max-width: 760px) 100vw, 48vw" /></div></Container></section>
    <Container><section className="course-curriculum" id="course-lessons"><div className="course-curriculum-heading"><div><Badge>Course curriculum</Badge><h2>Learn digital marketing step by step.</h2><p>Welcome, {learner.name}. Open one lesson at a time and move through all {digitalMarketingCourse.lessons.length} lessons in order.</p></div><strong>{digitalMarketingCourse.lessons.length} lessons</strong></div><CourseLessonAccordion lessons={digitalMarketingCourse.lessons} /></section></Container>
  </main><SiteFooter /></>;
}
