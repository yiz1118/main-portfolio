import { chromium } from "playwright";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import assert from "node:assert/strict";
import { projects } from "../data/projects.ts";

const directory = "artifacts/portfolio-interactions/after";
const base = "http://localhost:3000";
const browser = await chromium.launch({ channel: "chrome", headless: true });
mkdirSync(`${directory}/details`, { recursive: true });
mkdirSync(`${directory}/reports`, { recursive: true });
const checks = []; const errors = [];
try {
  const page = await browser.newPage();
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  await page.emulateMedia({ reducedMotion: "reduce" });
  const baseline = JSON.parse(readFileSync("artifacts/portfolio-interactions/before/audit.json", "utf8"));
  for (const width of [320, 375, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of ["/", "/work", "/services", "/about", "/contact", ...projects.map(project => `/work/${project.slug}`)]) {
      assert.equal((await page.goto(base + route)).status(), 200);
      await page.evaluate(() => document.fonts.ready);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      if (route === "/") {
        assert.ok(await page.locator(".hero-project-caption").getByText("Independent concept", { exact: true }).isVisible(), "Concept disclosure stays visible at every width");
        const frame = await page.locator(".hero-showcase").boundingBox();
        for (const button of await page.locator(".hero-selector button").all()) {
          const bounds = await button.boundingBox();
          assert.ok(bounds.height >= 44 && bounds.x >= frame.x - 1 && bounds.x + bounds.width <= frame.x + frame.width + 1, `Preview target fits its own frame at ${width}`);
        }
        if (width < 768) assert.ok(await page.locator(".selector-thumbnail").evaluateAll(nodes => nodes.every(node => getComputedStyle(node).display === "none")), "Compact previews omit image fragments");
      }
      const links = await page.locator("main a[href]").evaluateAll(nodes => nodes.map(node => node.getAttribute("href")));
      const before = baseline.find(item => item.route === route && item.width === width);
      if (before) for (const href of before.links) assert.ok(links.includes(href), `Preserved link missing: ${route} ${href}`);
      for (const image of await page.locator("main img").all()) {
        if (await image.isVisible()) { await image.scrollIntoViewIfNeeded(); await image.evaluate(node => node.decode()); }
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      const name = route === "/" ? "home" : route.slice(1).replaceAll("/", "-");
      await page.screenshot({ path: `${directory}/details/${name}-${width}-viewport.png` });
      checks.push({ route, width, linksPreserved: Boolean(before), overflow: false });
    }
    await page.goto(base + "/work");
    await page.locator("#project-nexa").evaluate(node => node.scrollIntoView({ block: "start" }));
    await page.locator("#project-nexa img").first().evaluate(node => node.decode());
    await page.waitForFunction(() => document.querySelector('.collection-navigation a[href="#project-nexa"]')?.getAttribute("aria-current") === "location");
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    await page.screenshot({ path: `${directory}/details/work-nexa-${width}-index.png` });
    await page.goto(base + "/work/vanta");
    await page.getByRole("navigation", { name: "Case study sections", exact: true }).locator('a[href="#design"]').click();
    await page.screenshot({ path: `${directory}/details/case-design-${width}.png` });
  }
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 1000 }); await page.goto(base + "/work");
  const cover = page.locator("#project-vanta .presentation-cover"); await cover.scrollIntoViewIfNeeded();
  await cover.locator("img").evaluate(node => node.decode()); await cover.hover({ position: { x: 460, y: 160 } });
  await page.waitForFunction(() => getComputedStyle(document.querySelector(".project-arrow")).opacity === "1");
  await page.screenshot({ path: `${directory}/details/pointer-exploration-1440.png` });
  assert.deepEqual(errors, []);
  writeFileSync(`${directory}/reports/interaction-evidence.json`, JSON.stringify({ verifiedAt: new Date().toISOString(), checks, browserErrors: errors, notes: "Chrome browser emulation and local production preview; original main-content destinations compared with baseline. No email, WhatsApp message, push or deployment." }, null, 2));
  console.log(`Verified ${checks.length} route/viewport combinations, preserved baseline links and zero console/page errors. Detail screenshots saved.`);
} finally { await browser.close(); }
