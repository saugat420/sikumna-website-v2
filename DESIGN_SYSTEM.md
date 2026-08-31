# Sikumna Nepal Design System

This project uses one shared visual system. New pages should extend it instead of introducing page-specific typography, spacing, colors, buttons, cards, headers, footers, or image behavior.

## Foundations

- Font: Manrope, loaded once in `app/layout.tsx`.
- Main container: `1200px` maximum width via `<Container />` or `.ds-container`.
- Horizontal padding: `36px` desktop, `28px` tablet, `19px` mobile.
- Major section spacing: `96px` desktop, `80px` tablet, `60–64px` mobile.
- Primary blue: `#0C66E4`; hover: `#0754BD`; soft blue: `#EAF2FF`.
- Main text: `#0F172A`; body: `#475569`; muted: `#64748B`; border: `#E2E8F0`.
- Body copy is normally `16px`, weight `500`, with `1.55–1.7` line height. Important descriptions must not use tiny or pale text.
- Page titles: `52–60px` desktop and `36–40px` mobile.
- Section titles: `32–36px` desktop and `26–30px` mobile.
- Card titles: `20–24px` desktop and `18–21px` mobile.

The CSS variables live at the top of `app/globals.css`. Light and dark surfaces use the same semantic variables (`--surface`, `--surface-raised`, `--ink`, `--body`, `--muted`, and `--border`).

## Shared components

Use the exports in `app/components/DesignSystem.tsx`:

- `<Container />` for all primary page content.
- `<Section />` for standard major-section spacing.
- `<PageTitle />`, `<SectionTitle />`, and `<SectionDescription />` for hierarchy.
- `<Badge />` for concise labels only.
- `<Button variant="primary|secondary|ghost" size="sm|md|lg" />` for actions.
- `<Card />` for the standard border, radius, surface, shadow, and hover behavior.
- `<ResponsiveImage />` for artwork and content imagery.

Use `SiteHeader` and `SiteFooter` for every page. Their `default` and `landing` variants intentionally share height, typography, colors, button styling, theme control, and responsive behavior. Use `Accordion` for FAQ content.

## Image policy

`<ResponsiveImage />` defaults to `fit="contain"`. Keep that default for educational artwork, logos, banners, program art, event art, masterclass art, and transparent-background instructor art. Give the wrapper a predictable aspect ratio and center the complete image within it.

Use `fit="cover"` only when cropping is intentional, primarily for real profile photographs inside circular avatar frames. Never cut heads, hands, illustration edges, embedded text, or key objects.

## Buttons, cards, and forms

- Buttons use a `48–52px` target height, `10px` radius, and calm `150–200ms` transitions.
- Primary actions are always Sikumna blue. Accent colors do not replace the primary action color.
- Cards use a `1px` semantic border, `16px` radius, subtle shadow, and at most a `-2px` hover lift.
- Inputs are at least `48px` high, use `16px` text, and always have visible labels.
- Focus uses a visible blue outline; do not remove it.

## Theme behavior

The theme bootstrap in `app/layout.tsx` respects the saved `sikumna-theme` preference, otherwise the system preference, before paint. `ThemeToggle` persists changes in `localStorage` and applies the `dark` class to the root element. Add dark styles through semantic tokens rather than color inversion.

## Responsive breakpoints

- Desktop: above `1024px`.
- Tablet/navigation collapse: `860px` and below.
- Mobile: `620px` and below.

Validate new work at `390`, `430`, `768`, `1024`, `1280`, and `1440` pixels. Check for horizontal overflow, cropped images, undersized touch targets, unreadable text, broken navigation, and form/accordion keyboard behavior.

## Event landing pages

All event pages must use `EventLandingPage` with a data object from `app/events/eventData.ts`. Do not duplicate the layout for individual workshops. The shared architecture provides the landing header, centered hero, feature strip, learning cards, audience grid, instructor card, testimonials, registration form, FAQ, and landing footer. Event-specific files should supply only content and metadata.

## Future-page checklist

Before shipping a page:

1. Reuse the shared container, type, spacing, button, card, image, header, footer, theme, and accordion systems.
2. Keep one H1 and semantic section headings.
3. Use `next/image` with useful `sizes`; reserve `priority` for above-the-fold assets.
4. Keep paragraph widths readable and body copy at weight `500`.
5. Preserve existing routes, links, forms, tracking, metadata, and integrations.
6. Run lint, TypeScript, build/tests, and responsive light/dark browser QA.
