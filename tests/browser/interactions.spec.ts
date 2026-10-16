import { test, expect } from "@playwright/test";
import { projects } from "../../data/projects";

test("hero preview arrow, Home and End keys retain focus and the selected destination", async ({ page }) => {
  await page.goto("/");
  const first = page.getByRole("button", { name: "Preview VANTA Motorworks", exact: true });
  await first.focus(); await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("button", { name: "Preview NEXA", exact: true })).toBeFocused();
  await expect(page.locator(".hero-preview")).toHaveAttribute("href", "/work/nexa");
  await page.keyboard.press("End");
  await expect(page.getByRole("button", { name: "Preview SOVA", exact: true })).toBeFocused();
  await expect(page.locator(".hero-preview")).toHaveAttribute("href", "/work/sova");
  await page.keyboard.press("Home"); await expect(first).toBeFocused();
  await page.keyboard.press("ArrowLeft");
  await expect(page.locator(".hero-preview")).toHaveAttribute("href", "/work/sova");
});

test("collection anchors and scroll state agree at desktop, tablet and mobile widths", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [375, 768, 1440]) {
    await page.setViewportSize({ width, height: 950 }); await page.goto("/work");
    const nav = page.getByRole("navigation", { name: "Project collection index", exact: true });
    for (const slug of ["nexa", "sova", "vanta"]) {
      const link = nav.locator(`a[href="#project-${slug}"]`);
      await link.click(); await expect(page).toHaveURL(new RegExp(`#project-${slug}$`));
      await expect(link).toHaveAttribute("aria-current", "location");
      const box = await page.locator(`#project-${slug}`).boundingBox();
      expect(box!.y).toBeGreaterThanOrEqual(width < 768 ? 74 : 145);
    }
    await page.locator("#project-ember").evaluate(node => node.scrollIntoView({ block: "start" }));
    await expect(nav.locator('a[href="#project-ember"]')).toHaveAttribute("aria-current", "location");
    await page.getByRole("button", { name: "SaaS & Dashboard", exact: true }).click();
    await expect(nav).toHaveCount(0);
    await expect(page.locator(".project-presentation")).toHaveCount(1);
  }
});

test("all case-study section anchors and previous/next destinations remain usable", async ({ page }) => {
  test.setTimeout(90000); await page.emulateMedia({ reducedMotion: "reduce" });
  for (const [index, project] of projects.entries()) {
    await page.goto(`/work/${project.slug}`);
    const nav = page.getByRole("navigation", { name: "Case study sections", exact: true });
    for (const id of ["design", "responsive", "skills", "overview"]) {
      const link = nav.locator(`a[href="#${id}"]`); await link.click();
      await expect(link).toHaveAttribute("aria-current", "location");
      expect((await page.locator(`#${id}`).boundingBox())!.y).toBeGreaterThanOrEqual(88);
    }
    const previous = projects[(index - 1 + projects.length) % projects.length];
    const previousLink = page.getByRole("navigation", { name: "More project navigation", exact: true }).getByRole("link", { name: /^Previous project/ });
    await expect(previousLink).toContainText(previous.title);
    await expect(previousLink).toHaveAttribute("href", `/work/${previous.slug}`);
    await expect(page.locator(".next-project-title")).toHaveAttribute("href", `/work/${projects[(index + 1) % projects.length].slug}`);
  }
});

test("pointer affordance stays inside the screenshot and restores a stable keyboard state", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 950 }); await page.goto("/work");
  const cover = page.locator("#project-vanta .presentation-cover");
  await cover.scrollIntoViewIfNeeded(); await cover.hover({ position: { x: 80, y: 90 } });
  const badge = cover.locator(".project-arrow");
  await expect.poll(() => badge.evaluate(node => getComputedStyle(node).opacity)).toBe("1");
  const rect = await cover.boundingBox(); const badgeRect = await badge.boundingBox();
  expect(badgeRect!.x).toBeGreaterThanOrEqual(rect!.x);
  expect(badgeRect!.x + badgeRect!.width).toBeLessThanOrEqual(rect!.x + rect!.width);
  await page.mouse.move(0, 0); await cover.focus();
  await expect(badge).not.toHaveAttribute("style", /translate/);
  await expect.poll(() => badge.evaluate(node => getComputedStyle(node).opacity)).toBe("1");
  await page.emulateMedia({ reducedMotion: "reduce" }); await cover.hover();
  expect(await badge.evaluate(node => getComputedStyle(node).transform)).toBe("none");
  await page.keyboard.press("Enter"); await expect(page).toHaveURL(/\/work\/vanta$/);
});

test("no JavaScript keeps the project, case contents and contact paths readable", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL: "http://localhost:3101", viewport: { width: 375, height: 844 } });
  const page = await context.newPage(); await page.goto("/");
  await expect(page.locator("h1")).toContainText("every stage by Alson Chua");
  await expect(page.locator(".hero-preview")).toHaveAttribute("href", "/work/vanta");
  await expect(page.locator(".project-presentation")).toHaveCount(6);
  await expect(page.locator(".motion-pending")).toHaveCount(0);
  await page.goto("/work/atelier");
  await expect(page.locator("#overview")).toBeVisible();
  await expect(page.getByRole("link", { name: /View Live Website/ }).first()).toHaveAttribute("href", projects[4].liveUrl);
  await expect(page.locator('a[href^="mailto:"]').first()).toBeVisible();
  await context.close();
});
