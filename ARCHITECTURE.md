# Sikumna Nepal architecture

## Routes and navigation

- `/` — editorial homepage with full navigation.
- `/programs` and `/programs/[slug]` — structured program discovery and details.
- `/free-masterclasses` and `/free-masterclasses/[slug]` — recorded learning library and watch/discussion experience.
- `/experts` and `/experts/[slug]` — practitioner directory and profiles.
- `/stories`, `/about`, `/account`, `/sign-in`, `/register` — supporting journeys.
- `/events/ai-marketing-masterclass` and `/events/english-fluency-workshop` — focused live-event pages with simplified navigation.

Internal navigation uses `next/link`. Recorded masterclasses and live-event landing pages remain separate products.

## Content architecture

Programs, masterclasses and experts live in `data/` as typed, CMS-ready records. Pages derive relationships from stable slugs and trainer IDs instead of repeating content.

## Theme

Dark is the first-visit default. A pre-hydration script applies the saved `sikumna-theme` value before paint; system preference is never consulted. The root renders dark on the server, while a saved light preference removes that class before the page is shown. Both logo variants have identical dimensions.

## Development authentication

`lib/auth/` defines the provider interface. The current mock provider stores a prototype user only on the device. It is not secure authentication and must not authorize protected data. UI components depend on the interface boundary so a server-backed provider can replace it.

## Comments and notifications

`lib/comments/` defines repository and notification interfaces. The current comment repository is device-local. Reply hooks exist, but no browser email is sent and no secret is exposed.

## Performance rules

- Server components are the default; client code is isolated to menus, theme, forms, animation, video gating and comments.
- YouTube uses a facade and is not loaded until play.
- Below-fold images use responsive `next/image` sizing and lazy loading.
- Motion uses opacity/transform and respects reduced motion.
- Homepage routes do not load comment or video-player code.

## TODO before production authentication

- Select a server-side authentication and session provider.
- Select a durable database and persist users, comments and preferences.
- Add email verification, password reset and secure recovery.
- Implement server-side reply notifications with an approved email provider.
- Add spam protection, rate limiting and moderation tools.
- Replace device-local storage and enforce authorization server-side.
