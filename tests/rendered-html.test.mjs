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
  assert.match(html, /Featured Programs/);
  assert.match(html, /Free Masterclass Library/);
  assert.match(html, /Meet Our Experts/);
  assert.match(html, /How Sikumna Works/);
  assert.match(html, /Ready to level up your skills/);
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
  assert.match(aiHtml, /AI Marketing Masterclass \| Sikumna Nepal/);
  assert.match(aiHtml, /Reserve Your Free Seat/);
  assert.match(aiHtml, /What You’ll Learn/);
  assert.match(aiHtml, /Frequently Asked Questions/);
  assert.doesNotMatch(aiHtml, /\/og\.png/);
  assert.match(englishHtml, /English Fluency Workshop \| Sikumna Nepal/);
  assert.match(englishHtml, /Start Speaking English Confidently Today/);
  assert.match(englishHtml, /Frequently Asked Questions/);
  assert.doesNotMatch(englishHtml, /\/og\.png/);
});

test("keeps the homepage assets and responsive implementation in place", async () => {
  const [page, home, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/HomeClient.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /<HomeClient \/>/);
  assert.match(home, /const programs/);
  assert.match(home, /const events/);
  assert.match(home, /const masterclasses/);
  assert.match(home, /const experts/);
  assert.match(home, /const processSteps/);
  assert.match(css, /@media \(max-width:620px\)/);
  assert.match(css, /prefers-reduced-motion/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await Promise.all([
    access(new URL("../public/sikumna-logo.png", import.meta.url)),
    access(new URL("../public/generated/sikumna-hero-v3.png", import.meta.url)),
    access(new URL("../public/generated/icons/ai-marketing-launchpad.png", import.meta.url)),
    access(new URL("../public/generated/icons/learn-live.png", import.meta.url)),
    access(new URL("../public/generated/mentors/prakriti-tamang.png", import.meta.url)),
    access(new URL("../public/generated/events/ai-marketing-masterclass-hero.png", import.meta.url)),
    access(new URL("../public/generated/events/english-fluency-workshop-hero.png", import.meta.url)),
    access(new URL("../public/og.png", import.meta.url)),
  ]);
});
