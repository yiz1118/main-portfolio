import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import { projects } from "../data/projects.ts";
import { site, whatsappUrl } from "../lib/site.ts";

const browser = await chromium.launch({ channel: "chrome", headless: true });
const opened = [];
const checked = [];
const context = await browser.newContext();
const page = await context.newPage();
try {
  // Open all twelve primary destinations as actual browser pages.
  for (const project of projects) {
    for (const [kind, url] of [["live", project.liveUrl], ["source", project.githubUrl]]) {
      try {
        const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
        await page.waitForTimeout(150);
        const result = { project: project.slug, kind, url, finalUrl: page.url(), status: response?.status(), title: await page.title() };
        opened.push(result); console.log(JSON.stringify(result));
      } catch (error) { opened.push({ project: project.slug, kind, url, error: error.message }); }
    }
  }
  const destinations = new Set(projects.flatMap(project => project.experience.map(item => new URL(item.page, project.liveUrl).toString())));
  for (const url of destinations) {
    try {
      const response = await context.request.get(url, { timeout: 30000 });
      checked.push({ url, status: response.status(), finalUrl: response.url() });
    } catch (error) { checked.push({ url, error: error.message }); }
  }
  for (const url of [site.github, site.linkedin, whatsappUrl()]) {
    try {
      const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
      checked.push({ url, status: response?.status(), finalUrl: page.url(), title: await page.title() });
    } catch (error) { checked.push({ url, error: error.message }); }
  }
} finally {
  await browser.close();
  await mkdir("artifacts/integration", { recursive: true });
  await writeFile("artifacts/integration/external-links.json", JSON.stringify({ verifiedAt: new Date().toISOString(), opened, checked, email: { href: `mailto:${site.email}`, verification: "URI only; no message sent" } }, null, 2));
}
if (opened.some(result => !result.status || result.status >= 400) || checked.some(result => !result.status || result.status >= 400)) process.exitCode = 1;
