import type { Metadata } from "next";
import { MessageCircleMore } from "lucide-react";
import { Container } from "../components/DesignSystem";
import InnerPageHero from "../components/InnerPageHero";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import ReviewerIdentity from "../components/ReviewerIdentity";
export const metadata: Metadata = { title: "Learner Stories | Sikumna Nepal", description: "Stories from learners applying practical Sikumna skills in real life.", alternates: { canonical: "/stories" } };
const stories=[{name:"Rajan Shrestha",role:"Freelancer",quote:"The session felt practical from the first minute. I left knowing what to work on next."},{name:"Prakriti Tamang",role:"Student",quote:"The teaching style was simple, supportive and easy to apply in real life."},{name:"Sushil Adhikari",role:"Working professional",quote:"I liked that there was space to ask questions instead of only watching a recording."}];
export default function StoriesPage(){return <><SiteHeader/><main><InnerPageHero eyebrow="Learner Outcomes" title="Stories of Learning and Progress" description="Hear from learners using practical skills to move forward with more clarity and confidence."/><Container><div className="story-grid">{stories.map((story)=><blockquote key={story.name}><MessageCircleMore size={26}/><p>“{story.quote}”</p><footer><ReviewerIdentity name={story.name} role={story.role}/></footer></blockquote>)}</div></Container></main><SiteFooter/></>}
