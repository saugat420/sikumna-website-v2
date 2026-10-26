import { NextResponse } from "next/server";

const FLODESK_FORM_URL = "https://form.flodesk.com/forms/6a0056f54d292a1f518a517b/submit";

export async function POST(request: Request) {
  const data = await request.formData();
  const firstName = String(data.get("firstName") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const whatsapp = String(data.get("fields.whatsapp") ?? "").trim();
  const honeypot = String(data.get("confirm_email_address") ?? "").trim();

  if (honeypot) return NextResponse.json({ ok: true });
  if (
    !firstName ||
    firstName.length > 255 ||
    !/^\S+@\S+\.\S+$/.test(email) ||
    email.length > 255 ||
    whatsapp.length < 7 ||
    whatsapp.length > 24
  ) {
    return NextResponse.json({ error: "Please enter a valid name, email and WhatsApp number." }, { status: 400 });
  }

  const payload = new URLSearchParams({
    firstName,
    email,
    "fields.whatsapp": whatsapp,
    confirm_email_address: "",
  });
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
