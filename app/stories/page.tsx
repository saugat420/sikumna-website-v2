import type { Metadata } from "next";
import Image from "next/image";
import { Star } from "lucide-react";
import { learnerReviews } from "../../data/reviews";
import { Container } from "../components/DesignSystem";
import InnerPageHero from "../components/InnerPageHero";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export const metadata: Metadata = { title: "Learner Stories | Sikumna Nepal", description: "Verified Google reviews from learners applying practical Sikumna skills.", alternates: { canonical: "/stories" } };

export default function StoriesPage(){return <><SiteHeader/><main><InnerPageHero eyebrow="Verified Google Reviews" title="Real Stories From Real Learners" description="Read what learners have shared publicly about their experience with Digital Saugat."/><Container><div className="review-grid stories-review-grid">{learnerReviews.map((review)=><article className="review-card" key={review.name}><div className="review-stars" aria-label="5 out of 5 stars">{Array.from({length:review.rating},(_,index)=><Star key={index} size={16} fill="currentColor"/>)}</div><blockquote>“{review.quote}”</blockquote><footer className="review-author"><Image src={review.image} width={44} height={44} alt={`${review.name}'s Google profile`}/><div><a href={review.profileUrl} target="_blank" rel="noreferrer"><strong>{review.name}</strong></a><small>Google review</small></div></footer></article>)}</div></Container></main><SiteFooter/></>}
