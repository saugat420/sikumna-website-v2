"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import styles from "./course-landing.module.css";

export default function CourseLandingForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    setStatus("submitting");
    try {
      const response = await fetch("/api/flodesk/free-dm-course", { method: "POST", body: data });
      if (!response.ok) throw new Error("Flodesk rejected the registration.");
      localStorage.setItem("sikumna-free-dm-course-registration", JSON.stringify({ name: data.get("firstName"), email: data.get("email"), registeredAt: new Date().toISOString() }));
      window.location.assign(new URL("/free-dm-course/thank-you", window.location.origin));
    } catch {
      setStatus("error");
    }
  }

  return <div className={styles.formShell} id="join"><div className={styles.formCard}><h2>Get your first lesson in your inbox. <Mail size={26} /></h2><p>Join once and receive one practical video lesson each day for 30 days.</p><form action="https://form.flodesk.com/forms/6952526d047e037ff4b248c7/submit" method="post" data-ff-el="form" onSubmit={submit}><label htmlFor="dm-name">Full name</label><input id="dm-name" name="firstName" autoComplete="name" maxLength={255} placeholder="Enter your full name" required /><label htmlFor="dm-email">Email address</label><input id="dm-email" name="email" type="email" autoComplete="email" maxLength={255} placeholder="Enter your email address" required /><input className={styles.honeypot} type="text" name="confirm_email_address" maxLength={255} tabIndex={-1} autoComplete="off" aria-hidden="true" /><button type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Joining the course…" : <>Join the FREE 30-Day Course <ArrowRight size={18} /></>}</button>{status === "error" && <span className={styles.formError} role="alert">We couldn’t complete your registration. Please try again.</span>}</form></div></div>;
}
