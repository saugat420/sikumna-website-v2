"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import courseStyles from "../free-dm-course/course-landing.module.css";

export default function AiMasterclassForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    setStatus("submitting");

    try {
      const response = await fetch("/api/flodesk/ai-marketing-masterclass", { method: "POST", body: data });
      if (!response.ok) throw new Error("Registration was not accepted.");
      localStorage.setItem("sikumna-ai-masterclass-registration", JSON.stringify({
        name: data.get("firstName"),
        email: data.get("email"),
        registeredAt: new Date().toISOString(),
      }));
      window.location.assign(new URL("/ai-marketing-masterclass/thank-you", window.location.origin));
    } catch {
      setStatus("error");
    }
  }

  return <div className={courseStyles.formShell} id="join">
    <div className={courseStyles.formCard}>
      <h2>Reserve your free seat. <Sparkles size={27} /></h2>
      <p>Fill out this short form. We’ll send the live-session details to your email and WhatsApp.</p>
      <form action="https://form.flodesk.com/forms/6a0056f54d292a1f518a517b/submit" method="post" onSubmit={submit}>
        <label htmlFor="ai-first-name">First name</label>
        <input id="ai-first-name" name="firstName" autoComplete="given-name" maxLength={255} placeholder="Enter your first name" required />
        <label htmlFor="ai-email">Email address</label>
        <input id="ai-email" name="email" type="email" autoComplete="email" maxLength={255} placeholder="Enter your email address" required />
        <label htmlFor="ai-whatsapp">WhatsApp number</label>
        <input id="ai-whatsapp" name="fields.whatsapp" type="tel" inputMode="tel" autoComplete="tel" minLength={7} maxLength={24} placeholder="Enter your WhatsApp number" required />
        <input className={courseStyles.honeypot} type="text" name="confirm_email_address" maxLength={255} tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <button type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Reserving your seat…" : <>Reserve My Free Seat <ArrowRight size={18} /></>}</button>
        {status === "error" && <span className={courseStyles.formError} role="alert">We couldn’t complete your registration. Please check your details and try again.</span>}
      </form>
    </div>
  </div>;
}
