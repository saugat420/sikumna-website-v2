# Sikumna learner authentication setup

The application code is complete, but real accounts, verification links, database records, and email delivery remain disabled until the following services are configured. Never commit real keys. Add local values to `.env.local`; add production values through the hosting platform's encrypted secret settings.

## 1. Create and configure Supabase

1. Create a Supabase project.
2. Open **SQL Editor** and run `supabase/migrations/202610170001_create_learner_profiles.sql`.
3. In **Authentication → Providers → Email**, enable Email and require email confirmation.
4. In **Authentication → URL Configuration**, set the production Site URL and add these redirect URLs:
   - `http://localhost:3000/auth/callback`
   - `https://YOUR_PRODUCTION_DOMAIN/auth/callback`
5. In **Project Settings → API**, copy the project URL and publishable/anon key into the matching public environment variables. Add the service-role key only as a server-side secret.
6. In **Authentication → Attack Protection**, enable CAPTCHA (Cloudflare Turnstile or hCaptcha) before a high-traffic launch and review Supabase Auth rate limits.
7. To grant the first administrator access, run this once in SQL Editor using that learner's auth user ID:

```sql
update public.profiles set is_admin = true where id = 'USER_UUID_HERE';
```

Never add an admin control to the learner-facing profile API.

## 2. Configure Brevo transactional email

1. Add and verify `sikumna.com` in Brevo's sender/domain settings.
2. Add every DNS record Brevo displays at the DNS host for `sikumna.com` (DKIM and the requested domain-authentication records). Use the exact values Brevo supplies; do not invent them.
3. Create a verified sender such as `learning@sikumna.com` and use it for `BREVO_SENDER_EMAIL`.
4. Create a Brevo API key and store it only as `BREVO_API_KEY` in encrypted server secrets.
5. In Supabase **Project Settings → Authentication → SMTP Settings**, enable custom SMTP and enter the Brevo SMTP host, port, username, password and verified sender shown in the Brevo dashboard. This sends verification and password-reset emails through Brevo instead of Supabase's restricted test sender.
6. Customize the Supabase confirmation and recovery templates so their links point to the configured `/auth/callback` flow.

As of October 17, 2026, Brevo documents a Free-plan limit of **300 email sends per day** and up to **100,000 contacts**. Unused daily sends do not roll over; Brevo says up to 1,000 additional transactional emails can queue after the daily limit. Confirm the live limits in the dashboard before launch: https://help.brevo.com/hc/en-us/articles/208580669-FAQs-What-are-the-limits-of-the-Free-plan and https://help.brevo.com/hc/en-us/articles/208589409-About-Brevo-s-pricing-plans

Supabase's default SMTP is a test service: it sends only to addresses authorized on the project team and is currently limited to **2 messages per hour**. With custom SMTP, Supabase documents a default Auth email rate limit of **30 messages per hour**, configurable under **Authentication → Rate Limits**. New Free projects created after June 3, 2026 also need custom SMTP to customize Auth email templates. See https://supabase.com/docs/guides/auth/auth-smtp and https://supabase.com/changelog/46599-changes-to-email-template-customisation-on-free-tier

Provider failures do not block verified learners: the profile records a failed welcome attempt and the next successful login retries it. The atomic `claim_welcome_email` function plus Brevo's idempotency key prevents concurrent duplicate welcome sends, while marketing-contact sync is isolated so it cannot retry a welcome email that was already delivered.

## 3. Environment variables

Copy `.env.example` to `.env.local` for local development and replace placeholders. For production, enter the same names in the hosting platform's encrypted secret settings. Never place `SUPABASE_SERVICE_ROLE_KEY` or `BREVO_API_KEY` in any `NEXT_PUBLIC_` variable.

## 4. Video privacy limitation

Masterclass playback metadata is returned only by the authenticated server endpoint `/api/masterclasses/[slug]/playback`, and only to learners with verified emails. No YouTube IDs are currently supplied, so every masterclass truthfully displays **Video coming soon** after authentication.

If a public or unlisted YouTube ID is added later, website authentication can hide the embed URL from logged-out visitors but cannot stop an authenticated viewer from extracting or sharing that YouTube URL. Stronger playback protection requires a video provider with signed, expiring playback tokens or domain-restricted playback.

## 5. Production checks

- Register a new test account using an address owned by the project team.
- Confirm duplicate registration messaging and verification email delivery.
- Verify the account, confirm return to the selected masterclass, and test logout/login.
- Test expired verification links and resend.
- Test forgot-password and reset-password links.
- Confirm an unverified or logged-out request to the playback endpoint returns 401/403.
- Confirm one learner cannot query another learner's profile using the public key.
- Confirm a normal learner receives 403 from the CSV export and cannot open `/admin/learners`.
- Confirm welcome email status changes to `sent` once, failed sends retry, and marketing contacts are created only after opt-in.
- Test at mobile and desktop widths before launch.
