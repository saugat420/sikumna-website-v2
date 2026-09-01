import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the complete Sikumna homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Sikumna Nepal \| Learn Skills That Matter/);
  assert.match(html, /Learn skills that/);
  assert.match(html, /Programs built around real outcomes/);
  assert.match(html, /Start learning for free/);
  assert.match(html, /Learn from people who actually do the work/);
  assert.match(html, /From curiosity to real-world skill/);
  assert.match(html, /What do you want to learn next/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("renders both event registration landing pages", async () => {
  const [aiResponse, englishResponse] = await Promise.all([
    render("/events/ai-marketing-masterclass"),
    render("/events/english-fluency-workshop"),
  ]);

  assert.equal(aiResponse.status, 200);
  assert.equal(englishResponse.status, 200);

  const [aiHtml, englishHtml] = await Promise.all([aiResponse.text(), englishResponse.text()]);
  assert.match(aiHtml, /Learn AI Marketing From Scratch In 90 Mins \| Sikumna Nepal/);
  assert.match(aiHtml, /Reserve My Free Seat/);
  assert.match(aiHtml, /Registration is free; seats are kept limited/);
  assert.match(aiHtml, /Walk away with a clear AI marketing roadmap/);
  assert.match(aiHtml, /A live learning journey/);
  assert.match(aiHtml, /Frequently asked questions/);
  assert.doesNotMatch(aiHtml, /\/og\.png/);
  assert.match(englishHtml, /Speak English Confidently in Daily Life \| Sikumna Nepal/);
  assert.match(englishHtml, /Join the FREE English Fluency Workshop/);
  assert.match(englishHtml, /Reserve My FREE Seat/);
  assert.match(englishHtml, /Start speaking English confidently today/);
  assert.match(englishHtml, /A live learning journey/);
  assert.match(englishHtml, /Frequently asked questions/);
  assert.doesNotMatch(englishHtml, /\/og\.png/);
});

test("renders the structured learning, program, and expert journeys", async () => {
  const responses = await Promise.all([
    render("/free-masterclasses"), render("/free-masterclasses/freelancing-101"),
    render("/programs"), render("/programs/ai-marketing-launchpad"),
    render("/experts"), render("/experts/saugat-basnet"), render("/register"), render("/sign-in"),
  ]);
  responses.forEach((response) => assert.equal(response.status, 200));
  const html = await Promise.all(responses.map((response) => response.text()));
  assert.match(html[0], /Learn Practical Skills for Free/);
  assert.match(html[1], /Create a free account to watch/);
  assert.match(html[2], /Programs Built for Real-World Growth/);
  assert.match(html[3], /Join the Free Live Session/);
  assert.match(html[4], /Learn From Experienced Practitioners/);
  assert.match(html[5], /Saugat Basnet/);
  assert.match(html[6], /Create Your Sikumna Account/);
  assert.match(html[7], /Welcome Back/);
});

test("keeps the shared design system, assets, and responsive implementation in place", async () => {
  const [page, home, layout, css, packageJson, designSystem, designSystemDocs, architecture, eventPage] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/HomeClient.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../app/components/DesignSystem.tsx", import.meta.url), "utf8"),
    readFile(new URL("../DESIGN_SYSTEM.md", import.meta.url), "utf8"),
    readFile(new URL("../ARCHITECTURE.md", import.meta.url), "utf8"),
    readFile(new URL("../app/events/EventLandingPage.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(page, /<HomeClient \/>/);
  assert.match(home, /const events/);
  assert.match(home, /const testimonials/);
  assert.match(home, /ReviewerIdentity/);
  assert.match(home, /from "\.\.\/data\/programs"/);
  assert.match(layout, /className="dark"/);
  assert.doesNotMatch(layout, /prefers-color-scheme/);
  assert.match(layout, /saved==='light'\?'light':'dark'/);
  assert.match(css, /@media\(max-width:620px\)/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /html\.dark/);
  assert.match(designSystem, /export function Container/);
  assert.match(designSystem, /fit = "contain"/);
  assert.match(designSystemDocs, /Future-page checklist/);
  assert.match(architecture, /Development authentication/);
  assert.doesNotMatch(eventPage, /event-hero-art/);
  assert.doesNotMatch(eventPage, /RotatingWords|event-animated-line/);
  assert.match(css, /reviewer-identity/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await Promise.all([
    access(new URL("../public/sikumna-logo.png", import.meta.url)),
    access(new URL("../public/images/brand/sikumna-logo-dark.png", import.meta.url)),
    access(new URL("../public/generated/sikumna-hero-v3.png", import.meta.url)),
    access(new URL("../public/generated/icons/ai-marketing-launchpad.png", import.meta.url)),
    access(new URL("../public/generated/icons/learn-live.png", import.meta.url)),
    access(new URL("../public/generated/mentors/prakriti-tamang.png", import.meta.url)),
    access(new URL("../public/generated/events/ai-marketing-masterclass-hero.png", import.meta.url)),
    access(new URL("../public/generated/events/english-fluency-workshop-hero.png", import.meta.url)),
    access(new URL("../public/og.png", import.meta.url)),
  ]);
});
