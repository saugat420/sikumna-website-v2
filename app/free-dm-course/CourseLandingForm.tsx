"use client";

import { FormEvent } from "react";
import { ArrowRight, Check, Mail } from "lucide-react";
import styles from "./course-landing.module.css";

export default function CourseLandingForm() {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    localStorage.setItem("sikumna-free-dm-course-registration", JSON.stringify({ name: data.get("name"), email: data.get("email"), registeredAt: new Date().toISOString() }));
    window.location.assign(new URL("/free-dm-course/thank-you", window.location.origin));
  }

  return <div className={styles.formShell} id="join"><div className={styles.formCard}><div className={styles.formTop}><span>Sikumna Free Learning</span><b><i /> Open to everyone</b></div><h2>Get your first lesson<br />in your inbox. <Mail size={22} /></h2><p>Sign up once. We’ll send you one video lesson every day for the next 30 days.</p><form onSubmit={submit}><label htmlFor="dm-name">Your full name</label><input id="dm-name" name="name" autoComplete="name" placeholder="Enter your full name" required /><label htmlFor="dm-email">Your email address</label><input id="dm-email" name="email" type="email" autoComplete="email" placeholder="Enter your email address" required /><button type="submit">Join the FREE 30-Day Course <ArrowRight size={17} /></button><small>♡ Your details stay private. No payment required.</small></form><div className={styles.formBenefits}><span><Check size={13} /> Beginner Friendly</span><span><Check size={13} /> Learn by Doing</span><span><Check size={13} /> At Your Pace</span></div></div><div className={styles.floatingNote}><Mail size={18} /><span><strong>1 lesson every day</strong><small>Delivered directly to your email</small></span></div></div>;
}
