# Sikumna Nepal architecture

## Routes and navigation

- `/` — editorial homepage with full navigation.
- `/programs` and `/programs/[slug]` — structured program discovery and details.
- `/free-masterclasses` and `/free-masterclasses/[slug]` — recorded learning library and watch/discussion experience.
- `/stories`, `/about`, `/account`, `/sign-in`, `/register`, `/forgot-password`, `/reset-password` — supporting journeys.
- `/admin/learners` — server-authorized learner administration and CSV export.
- `/events/ai-marketing-masterclass` and `/events/english-fluency-workshop` — focused live-event pages with simplified navigation.

Internal navigation uses accessible native anchors through `SafeLink` to avoid the current hosted Vinext client-navigation bug. Recorded masterclasses and live-event landing pages remain separate products.

## Content architecture

Programs, masterclasses and experts live in `data/` as typed, CMS-ready records. Pages derive relationships from stable slugs and trainer IDs instead of repeating content.

## Theme

Dark is the first-visit default. A pre-hydration script applies the saved `sikumna-theme` value before paint; system preference is never consulted. The root renders dark on the server, while a saved light preference removes that class before the page is shown. Both logo variants have identical dimensions.

## Learner authentication

Supabase Auth is authoritative for learner identity, email verification, password storage and sessions. `public.profiles` stores only learner metadata and consent; it never stores passwords or duplicate email addresses. Row Level Security allows a learner to read only their own profile, while profile updates are validated through authenticated server routes. Admin access is checked server-side against `profiles.is_admin` and uses the service role only after authorization.

Masterclass pages stay public, but playback data comes from `/api/masterclasses/[slug]/playback` only after a server-side verified-session check. Public or unlisted YouTube URLs cannot be made unshareable by website login; signed playback requires a provider that supports expiring tokens.

Brevo sends one transactional welcome email after verification. An atomic database claim prevents duplicate sends, failures are recorded for retry, and marketing contact sync happens only with explicit promotional consent.

## Comments and notifications

`lib/comments/` defines repository and notification interfaces. The current comment repository is device-local. Reply hooks exist, but no browser email is sent and no secret is exposed.

## Performance rules

- Server components are the default; client code is isolated to menus, theme, forms, animation, video gating and comments.
- YouTube uses a facade and is not loaded until play.
- Below-fold images use responsive `next/image` sizing and lazy loading.
- Motion uses opacity/transform and respects reduced motion.
- Homepage routes do not load comment or video-player code.

## Required production configuration

- Apply the Supabase migration and configure redirect URLs.
- Add Supabase and Brevo values through encrypted hosting secrets.
- Configure Brevo custom SMTP in Supabase for verification and recovery emails.
- Enable CAPTCHA in Supabase Auth before a high-traffic launch.
- Supply verified playback IDs or move videos to a signed-playback provider.
- Comments remain device-local and should move to a moderated server repository before community launch.

See `AUTH_SETUP.md` for exact setup and QA steps.
