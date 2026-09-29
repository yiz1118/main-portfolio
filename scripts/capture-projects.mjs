import { chromium } from "@playwright/test";
import sharp from "sharp";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { projects } from "../data/projects.ts";

const browser = await chromium.launch({ channel: "chrome", headless: true });
let previous = { receipts: [], failures: [] };
try { previous = JSON.parse(await readFile("artifacts/integration/screenshot-receipts.json", "utf8")); } catch { /* First capture has no receipts. */ }
const receipts = previous.receipts;
const failures = previous.failures;
const selected = process.argv.slice(2).filter(argument => !argument.startsWith("--"));
const selectedImage = process.argv.find(argument => argument.startsWith("--image="))?.split("=")[1];

async function settle(page) {
  await page.evaluate(() => document.fonts.ready);
  // Activate actual scroll-reveal and lazy images before returning to the capture position.
  await page.evaluate(async () => {
    const height = document.documentElement.scrollHeight;
    for (let y = 0; y < height; y += window.innerHeight * .8) {
      window.scrollTo(0, y);
      await new Promise(resolve => setTimeout(resolve, 70));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(500);
  await page.waitForFunction(() => [...document.images].filter(img => {
    const box = img.getBoundingClientRect();
    return box.top < innerHeight && box.bottom > 0 && box.left < innerWidth && box.right > 0 && box.width > 0 && box.height > 0;
  }).every(img => img.complete && img.naturalWidth > 0), undefined, { timeout: 20000 });
}

try {
  for (const project of projects.filter(project => !selected.length || selected.includes(project.slug))) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 960 }, reducedMotion: "reduce", deviceScaleFactor: 1 });
    const page = await context.newPage();
    const specs = [
      { src: project.coverImage, page: "/", width: 1440, height: 960 },
      { src: project.heroImage, page: "/", width: 1440, height: 1000 },
      ...project.galleryImages.map(image => ({ ...image, width: 1440, height: 1000 })),
      ...project.mobileImages.map(image => ({ ...image, width: 390, height: 844 })),
    ];
    await mkdir(`public/projects/${project.slug}`, { recursive: true });
    for (const spec of specs.filter(spec => !selectedImage || spec.src.endsWith(`/${selectedImage}.webp`))) {
      const url = new URL(spec.page, project.liveUrl).toString();
      try {
        await page.setViewportSize({ width: spec.width, height: spec.height });
        const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
        if (!response?.ok()) throw new Error(`HTTP ${response?.status()}`);
        await settle(page);
        const bytes = await sharp(await page.screenshot()).webp({ quality: 85 }).toBuffer();
        await writeFile(`public${spec.src}`, bytes);
        const oldReceipt = receipts.findIndex(receipt => receipt.file === spec.src);
        if (oldReceipt >= 0) receipts.splice(oldReceipt, 1);
        const oldFailure = failures.findIndex(failure => failure.file === spec.src);
        if (oldFailure >= 0) failures.splice(oldFailure, 1);
        receipts.push({ project: project.slug, file: spec.src, source: page.url(), status: response.status(), title: await page.title(), viewport: { width: spec.width, height: spec.height }, capturedAt: new Date().toISOString(), bytes: bytes.length, sha256: createHash("sha256").update(bytes).digest("hex") });
        console.log(`Captured ${project.slug} ${spec.src} (${bytes.length} bytes)`);
      } catch (error) {
        failures.push({ project: project.slug, file: spec.src, url, error: error.message });
        console.error(`Capture failed ${url}: ${error.message}`);
      }
    }
    await context.close();
  }
} finally {
  await browser.close();
  await mkdir("artifacts/integration", { recursive: true });
  await writeFile("artifacts/integration/screenshot-receipts.json", JSON.stringify({ capturedAt: new Date().toISOString(), receipts, failures }, null, 2));
}
if (failures.length) process.exitCode = 1;
