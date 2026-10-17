# Sikumna Nepal architecture

## Routes and navigation

- `/` — editorial homepage with full navigation.
- `/programs` and `/programs/[slug]` — structured program discovery and details.
- `/free-masterclasses` and `/free-masterclasses/[slug]` — recorded learning library and watch/discussion experience.
- `/free-courses/digital-marketing` — public 30-lesson free course experience.
- `/stories` and `/about` — supporting journeys.
- `/events/ai-marketing-masterclass` and `/events/english-fluency-workshop` — focused live-event pages with simplified navigation.

Internal navigation uses accessible native anchors through `SafeLink` to avoid the current hosted Vinext client-navigation bug. Recorded masterclasses and live-event landing pages remain separate products.

## Content architecture

Programs, masterclasses and experts live in `data/` as typed, CMS-ready records. Pages derive relationships from stable slugs and trainer IDs instead of repeating content.

## Theme

Light is the first-visit default. A pre-hydration script applies the saved `sikumna-theme-v2` value before paint; system preference is never consulted. A visitor's saved light or dark choice is restored before the page is shown. Both logo variants have identical dimensions.

## Open learning access

All recorded learning pages and playback endpoints are public. Visitors do not create profiles, register, sign in, verify an email address or maintain a website session. The public playback endpoint returns a privacy-enhanced YouTube embed URL when a verified content ID is present and an honest coming-soon status otherwise.

## Performance rules

- Server components are the default; client code is isolated to menus, theme, forms, animation and the click-to-load video facade.
- YouTube uses a facade and is not loaded until play.
- Below-fold images use responsive `next/image` sizing and lazy loading.
- Motion uses opacity/transform and respects reduced motion.
- Homepage routes do not load comment or video-player code.

## Required production configuration

- Supply verified YouTube IDs for recorded masterclasses and course lessons.
- Keep the click-to-load video facade so YouTube is not loaded until a visitor chooses a video.
