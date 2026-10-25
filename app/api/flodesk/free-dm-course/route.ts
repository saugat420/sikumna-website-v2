import { NextResponse } from "next/server";

const FLODESK_FORM_URL = "https://form.flodesk.com/forms/6952526d047e037ff4b248c7/submit";

export async function POST(request: Request) {
  const data = await request.formData();
  const firstName = String(data.get("firstName") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const honeypot = String(data.get("confirm_email_address") ?? "").trim();

  if (honeypot) return NextResponse.json({ ok: true });
  if (!firstName || firstName.length > 255 || !/^\S+@\S+\.\S+$/.test(email) || email.length > 255) {
    return NextResponse.json({ error: "Please enter a valid name and email address." }, { status: 400 });
  }

  const payload = new URLSearchParams({ firstName, email, confirm_email_address: "" });
  const response = await fetch(FLODESK_FORM_URL, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded", accept: "text/html,application/json" },
    body: payload,
    redirect: "manual",
  });

  if (response.status < 200 || response.status >= 400) {
    return NextResponse.json({ error: "Registration could not be completed." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
