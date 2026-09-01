# Sikumna Nepal design system

Dark mode is the first-visit default. The stored manual choice is authoritative across every route; system preference is intentionally ignored. Dark mode uses the transparent white-wordmark asset, while light mode uses the transparent dark-wordmark asset. Both variants keep identical dimensions so switching never shifts the layout.

## Foundation

- Font: Manrope, used globally.
- Primary action: `#0C66E4`; hover `#0055CC` in light mode.
- Core type: `#0F172A`; body: `#475569`; muted: `#64748B`.
- Light surfaces: white, `#F8FAFC`, and `#F4F8FF`.
- The maximum content width is `1200px`. Do not add alternate page widths.
- Major section rhythm is `112px` desktop, `92px` tablet, and `70px` mobile.

## Shared components

Use the primitives in `app/components/DesignSystem.tsx`: `Container`, `Section`, `PageTitle`, `SectionTitle`, `SectionDescription`, `Badge`, `Card`, `Button`, and `ResponsiveImage`.

- Body copy is normally `16px` at weight `500`; supporting copy is `17–19px`.
- Page titles use one H1 and scale from roughly `54px` mobile to `70px` desktop.
- Section titles scale from roughly `30px` mobile to `48px` desktop.
- Buttons are at least `50px` high (`54px` large); mobile targets must never drop below `44px`.
- Cards use semantic borders, a `18px` radius, and only a calm `-2px` hover lift.

## Page rhythm

The homepage is editorial rather than a grid of small cards: text-first hero, proof strip, three-step learning path, alternating program features, live events, free learning, experts, platform reasons, learner outcomes, and one final CTA.

Event pages use one structured record in `app/events/eventData.ts` and one reusable `EventLandingPage`. The template is: centered hero, learning blocks, learning journey, audience checklist, instructor, testimonials, registration, and FAQ. Do not make a one-off workshop layout.

## Image and asset rules

- All educational illustrations use `object-fit: contain`, centered and bottom anchored where appropriate. Give them enough space to feel intentionally integrated—not like tiny objects in a large card.
- Only photographic thumbnails may use `object-fit: cover`; portraits use cover only in intentional portrait frames.
- Never crop visible illustration edges, embedded labels, hands, faces, icons, or key objects.
- Keep source artwork under `public/images/<category>/` or the existing generated asset folders. Use `next/image` with an accurate `sizes` value.
- The theme-aware Sikumna logo uses a dark-text transparent light asset and a true transparent white-wordmark dark asset at `public/images/brand/sikumna-logo-dark.png`. Do not apply CSS filters to recolor logos.
- In dark mode, an opaque white raster rectangle is not acceptable as a decorative graphic. Replace it with a genuine transparent asset, an intentional framed photo, or a CSS/Lucide visual.
- Functional UI symbols use Lucide icons; do not paste blurry icon screenshots.

## Themes

Theme tokens live in `app/globals.css`. `ThemeToggle` persists `sikumna-theme` and `app/layout.tsx` applies it before paint. Use tokens such as `--surface`, `--surface-raised`, `--surface-alt`, `--ink`, `--body`, `--border`, and `--primary-soft`; do not hard-code light backgrounds inside reusable components.

## Responsive and accessibility rules

Validate at `390`, `430`, `768`, `1024`, `1280`, and `1440` pixels. Check no horizontal overflow, readable type, image composition, touch targets, links, form labels, FAQ keyboard use, theme persistence, and reduced-motion behavior. Use one H1 per page and preserve visible focus states.

## Future-page checklist

1. Reuse the shared container, type scale, button, card, image, header, footer, theme, and accordion systems.
2. Preserve real routes, metadata, forms, analytics, and integrations. The current registration and newsletter forms are client-side confirmation flows; do not claim a webhook or tracking integration exists unless it is added separately.
3. Run lint, TypeScript checks, production build/tests, then browser QA in both themes before publishing.
