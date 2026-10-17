import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";

async function render(path = "/", headers = {}) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html", ...headers } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

const routeMatrix = [
  "/", "/programs", "/programs/digital-marketing", "/programs/ai-powered-digital-marketing",
  "/programs/personal-branding", "/programs/communication", "/programs/personal-finance", "/programs/english-fluency",
  "/free-masterclasses", "/free-masterclasses/freelancing-101", "/free-masterclasses/seo-masterclass",
  "/free-masterclasses/ecommerce-masterclass", "/free-masterclasses/personal-branding-masterclass",
  "/free-masterclasses/social-media-marketing", "/free-courses/digital-marketing", "/stories", "/about",
  "/help-center", "/faq", "/refund-policy", "/terms", "/privacy-policy",
  "/events/ai-marketing-masterclass", "/events/english-fluency-workshop",
];

test("server-renders the complete Sikumna homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Sikumna Nepal \| Learn Skills That Matter/);
  assert.match(html, /Learn skills that/);
  assert.match(html, /A skill for your next chapter/);
  assert.match(html, /Start learning for free/);
  assert.doesNotMatch(html, /Learn from people who actually do the work/);
  assert.match(html, /Om Sarbottam Pudasaini/);
  assert.doesNotMatch(html, /how-number/);
  assert.doesNotMatch(html, /href="\/experts|Learn from people who actually do the work/);
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

test("renders the structured learning and program journeys without account gates", async () => {
  const responses = await Promise.all([
    render("/free-masterclasses"), render("/free-masterclasses/freelancing-101"),
    render("/programs"), render("/programs/ai-powered-digital-marketing"), render("/free-courses/digital-marketing"),
  ]);
  responses.forEach((response) => assert.equal(response.status, 200));
  const html = await Promise.all(responses.map((response) => response.text()));
  assert.match(html[0], /Learn Practical Skills for Free/);
  assert.match(html[0], /Free Digital Marketing Course/);
  assert.ok(html[0].indexOf("Free Digital Marketing Course") < html[0].indexOf("Freelancing 101"), "the free course should be listed before masterclasses");
  assert.match(html[1], /Free to watch—no account or sign-in required/);
  assert.match(html[2], /A skill for your next chapter/);
  assert.match(html[3], /Ask about this cohort/);
  assert.match(html[4], /No account required/);
  assert.doesNotMatch(html.join("\n"), /Create Your Sikumna Account|Welcome Back|Sign In/);
});

test("keeps the complete digital marketing course public", async () => {
  const [courseResponse, homeResponse, learningResponse, courseData, accordion] = await Promise.all([
    render("/free-courses/digital-marketing"),
    render("/"), render("/free-masterclasses"),
    readFile(new URL("../data/courses.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/components/CourseLessonAccordion.tsx", import.meta.url), "utf8"),
  ]);
  assert.equal(courseResponse.status, 200);
  const course = await courseResponse.text();
  assert.match(course, /Welcome to Digital Marketing/);
  assert.match(course, /Your Next Steps in Digital Marketing/);
  assert.match(course, /No account required/);
  assert.doesNotMatch(course, /\/sign-in|\/register|Demo Learner/);
  const [home, learning] = await Promise.all([homeResponse.text(), learningResponse.text()]);
  assert.match(home, /Must Watch/);
  assert.match(learning, /Free complete course/);
  assert.ok(home.indexOf("Free Digital Marketing Course") < home.indexOf("Freelancing 101"));
  assert.ok(learning.indexOf("Free Digital Marketing Course") < learning.indexOf("Freelancing 101"));
  assert.equal((courseData.match(/^ {2}".+",$/gm) ?? []).length, 30);
  assert.match(accordion, /aria-expanded=\{isOpen\}/);
  assert.match(accordion, /setOpenLesson\(isOpen \? "" : lesson\.id\)/);
});

test("every route in the complete route matrix renders", async () => {
  const responses = await Promise.all(routeMatrix.map((path) => render(path)));
  responses.forEach((response, index) => assert.equal(response.status, 200, `${routeMatrix[index]} should render`));
  const missing = await render("/programs/not-a-real-program");
  assert.equal(missing.status, 404);
  assert.match(await missing.text(), /We couldn’t find this page/);
  const removedExperts = await render("/experts");
  assert.equal(removedExperts.status, 404);
});

test("renders the requested support content and removes unfinished footer items", async () => {
  const [privacy, refund, help, faq, terms, home] = await Promise.all([
    render("/privacy-policy"), render("/refund-policy"), render("/help-center"),
    render("/faq"), render("/terms"), render("/"),
  ]).then((responses) => Promise.all(responses.map((response) => response.text())));
  assert.match(privacy, /Last updated: October 16, 2026/);
  assert.match(refund, /7-day refund policy/);
  assert.match(help, /support@sikumna\.com/);
  assert.match(faq, /What is Sikumna Nepal/);
  assert.match(terms, /Learning outcomes/);
  assert.doesNotMatch(home, /Coming soon|Careers/);
});

test("every rendered internal link resolves to a real route or section", async () => {
  const pages = await Promise.all(routeMatrix.map(async (path) => ({ path, html: await (await render(path)).text() })));
  const hrefs = new Set();
  for (const { html } of pages) {
    for (const match of html.matchAll(/href="([^"]+)"/g)) if (match[1].startsWith("/") && !match[1].startsWith("/_next/")) hrefs.add(match[1]);
  }
  for (const href of hrefs) {
    const url = new URL(href, "http://localhost");
    if (/\.(?:css|ico|jpe?g|png|svg|webp|woff2?)$/i.test(url.pathname)) continue;
    const response = await render(url.pathname);
    assert.ok(response.status < 400, `${href} should resolve`);
  }
  const home = pages.find((page) => page.path === "/")?.html ?? "";
  const aiEvent = pages.find((page) => page.path === "/events/ai-marketing-masterclass")?.html ?? "";
  assert.match(home, /id="events"/);
  assert.match(aiEvent, /id="reserve"/);
});

test("masterclass cards open their public detail pages", async () => {
  const source = await readFile(new URL("../app/components/MasterclassLink.tsx", import.meta.url), "utf8");
  assert.match(source, /SafeLink/);
  assert.match(source, /href=\{`\/free-masterclasses\/\$\{slug\}`\}/);
  assert.doesNotMatch(source, /preventDefault|mockAuthProvider|router\.push/);
});

test("uses the supplied artwork and simplified learning detail pages", async () => {
  const [home, programsPage, programDetail, masterclassDetail, header] = await Promise.all([
    render("/"), render("/programs"), render("/programs/digital-marketing"),
    render("/free-masterclasses/social-media-marketing"),
    readFile(new URL("../app/components/LiveMasterclassMenu.tsx", import.meta.url), "utf8"),
  ]);
  const [homeHtml, programsHtml, programHtml, masterclassHtml] = await Promise.all([home, programsPage, programDetail, masterclassDetail].map((response) => response.text()));
  assert.match(programsHtml, /digital-marketing\.webp/);
  assert.match(homeHtml, /freelancing\.webp/);
  assert.match(homeHtml, /https:\/\/ai\.sikumna\.com\//);
  assert.match(homeHtml, /https:\/\/sen\.sikumna\.com\//);
  assert.match(homeHtml, /ai-marketing-masterclass\.webp/);
  assert.match(homeHtml, /english-fluency-workshop\.webp/);
  assert.doesNotMatch(programHtml, /Your Trainer|About the trainer/);
  assert.doesNotMatch(masterclassHtml, /About This Masterclass|What You’ll Learn|About the trainer/);
  assert.match(header, /AI Marketing Masterclass/);
  assert.match(header, /English Fluency Workshop/);
});

test("applies the latest content and readability refinements", async () => {
  const [homeResponse, programsResponse, masterclassesResponse, masterclassResponse, storiesResponse, refundResponse, programSource] = await Promise.all([
    render("/"), render("/programs"), render("/free-masterclasses"),
    render("/free-masterclasses/seo-masterclass"), render("/stories"), render("/refund-policy"),
    readFile(new URL("../app/components/ProgramDirectory.tsx", import.meta.url), "utf8"),
  ]);
  const [home, programs, masterclasses, masterclass, stories, refund] = await Promise.all(
    [homeResponse, programsResponse, masterclassesResponse, masterclassResponse, storiesResponse, refundResponse].map((response) => response.text()),
  );

  assert.match(programs, /Live cohort/);
  assert.doesNotMatch(programs, /Learn live, together/);
  assert.match(programSource, /<i aria-hidden="true" \/>Live cohort/);
  assert.doesNotMatch(masterclasses, /Saugat Basnet|Rajan Adhikari|Prakriti Tamang/);
  assert.doesNotMatch(masterclass, /Saugat Basnet|Rajan Adhikari|Prakriti Tamang/);
  assert.doesNotMatch(home, /Google review · (?:\d+ months ago|a year ago)/);
  assert.doesNotMatch(stories, /Google review · (?:\d+ months ago|a year ago)/);
  assert.match(refund, /refund-policy-copy/);
  assert.match(home, /From curiosity to real-world skill/);
});

test("keeps all supplied content artwork optimized", async () => {
  const paths = [
    "../public/content/programs/digital-marketing.webp", "../public/content/programs/ai-powered-digital-marketing.webp",
    "../public/content/programs/personal-branding.webp", "../public/content/programs/communication.webp",
    "../public/content/programs/personal-finance.webp", "../public/content/programs/english-fluency.webp",
    "../public/content/masterclasses/freelancing.webp", "../public/content/masterclasses/seo.webp",
    "../public/content/masterclasses/ecommerce.webp", "../public/content/masterclasses/personal-branding.webp",
    "../public/content/masterclasses/social-media-marketing.webp",
    "../public/content/live-events/ai-marketing-masterclass.webp",
    "../public/content/live-events/english-fluency-workshop.webp",
    "../public/content/courses/digital-marketing-course.webp",
  ];
  const sizes = await Promise.all(paths.map((path) => stat(new URL(path, import.meta.url)).then((file) => file.size)));
  assert.ok(sizes.every((size) => size < 70_000), "each supplied artwork asset should remain under 70 KB");
  assert.ok(sizes.reduce((sum, size) => sum + size, 0) < 430_000, "all supplied artwork should remain under 430 KB");
});

test("uses production-safe native navigation instead of the broken hosted link runtime", async () => {
  const [safeLink, header, footer] = await Promise.all([
    readFile(new URL("../app/components/SafeLink.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/SiteHeader.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/SiteFooter.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(safeLink, /return <a href=\{href\}/);
  assert.match(header, /from "\.\/SafeLink"/);
  assert.match(footer, /from "\.\/SafeLink"/);
  assert.doesNotMatch(`${header}\n${footer}`, /next\/link|useRouter|router\.push/);
});

test("keeps page imagery within the performance budget", async () => {
  const paths = [
    "../public/generated/events/ai-marketing-masterclass-hero.webp",
    "../public/generated/events/english-fluency-workshop-hero.webp",
    "../public/generated/mentors/anita-karki.webp",
    "../public/generated/mentors/prakriti-tamang.webp",
    "../public/generated/mentors/rajan-adhikari.webp",
    "../public/generated/mentors/saurav-shrestha.webp",
    "../public/generated/icons/ai-marketing-launchpad.webp",
    "../public/generated/icons/english-fluency.webp",
    "../public/generated/icons/freelancing.webp",
    "../public/generated/icons/seo.webp",
    "../public/generated/icons/ecommerce.webp",
    "../public/generated/icons/personal-branding.webp",
    "../public/generated/icons/social-media.webp",
    "../public/generated/icons/ai-masterclass.webp",
    "../public/generated/icons/english-workshop.webp",
  ];
  const sizes = await Promise.all(paths.map((path) => stat(new URL(path, import.meta.url)).then((file) => file.size)));
  assert.ok(sizes.every((size) => size < 100_000), "each page image should remain under 100 KB");
  assert.ok(sizes.reduce((sum, size) => sum + size, 0) < 700_000, "all primary page imagery should remain under 700 KB");
  const brandSource = await readFile(new URL("../app/components/BrandLogo.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(brandSource, /next\/image|brand-logo-light|brand-logo-dark/);
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
  assert.match(home, /learnerReviews/);
  assert.doesNotMatch(home, /ReviewerIdentity/);
  assert.match(home, /ProgramDirectory/);
  assert.doesNotMatch(layout, /className="dark"/);
  assert.match(layout, /colorScheme: "light"/);
  assert.doesNotMatch(layout, /prefers-color-scheme/);
  assert.doesNotMatch(layout, /next\/headers|generateMetadata/);
  assert.match(layout, /saved==='dark'\?'dark':'light'/);
  assert.match(layout, /type="speculationrules"/);
  assert.match(css, /@media\(max-width:620px\)/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /html\.dark/);
  assert.match(designSystem, /export function Container/);
  assert.match(designSystem, /fit = "contain"/);
  assert.match(designSystemDocs, /Future-page checklist/);
  assert.match(architecture, /Open learning access/);
  assert.doesNotMatch(eventPage, /event-hero-art/);
  assert.doesNotMatch(eventPage, /RotatingWords|event-animated-line/);
  assert.doesNotMatch(eventPage, /ReviewerIdentity/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await Promise.all([
    access(new URL("../public/sikumna-logo-optimized.png", import.meta.url)),
    access(new URL("../public/images/brand/sikumna-logo-dark-optimized.png", import.meta.url)),
    access(new URL("../public/generated/sikumna-hero-v3.png", import.meta.url)),
    access(new URL("../public/generated/icons/ai-marketing-launchpad.webp", import.meta.url)),
    access(new URL("../public/generated/icons/learn-live.png", import.meta.url)),
    access(new URL("../public/generated/mentors/prakriti-tamang.webp", import.meta.url)),
    access(new URL("../public/generated/events/ai-marketing-masterclass-hero.webp", import.meta.url)),
    access(new URL("../public/generated/events/english-fluency-workshop-hero.webp", import.meta.url)),
    access(new URL("../public/og.png", import.meta.url)),
  ]);
});

test("keeps recorded learning public and removes learner authentication", async () => {
  const [playback, environment, homepage, header, packageJson] = await Promise.all([
    readFile(new URL("../app/api/masterclasses/[slug]/playback/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../.env.example", import.meta.url), "utf8"),
    readFile(new URL("../app/HomeClient.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/SiteHeader.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(playback, /auth|getUser|email_confirmed_at/i);
  assert.match(playback, /cache-control": "public, max-age=300/);
  assert.doesNotMatch(environment, /SUPABASE|BREVO|SERVICE_ROLE/i);
  assert.doesNotMatch(packageJson, /@supabase/);
  assert.doesNotMatch(header, /AccountMenu|Sign In|Create Account/);
  assert.match(homepage, /Radio size=\{19\}/);
  assert.match(homepage, /MessagesSquare size=\{19\}/);
  assert.match(homepage, /BriefcaseBusiness size=\{19\}/);
  assert.match(homepage, /Target size=\{19\}/);

  const [playbackResponse, signInResponse, registerResponse, accountResponse] = await Promise.all([
    render("/api/masterclasses/freelancing-101/playback"),
    render("/sign-in"), render("/register"), render("/account"),
  ]);
  assert.equal(playbackResponse.status, 200);
  assert.match(await playbackResponse.text(), /coming_soon/);
  assert.equal(signInResponse.status, 404);
  assert.equal(registerResponse.status, 404);
  assert.equal(accountResponse.status, 404);
});
