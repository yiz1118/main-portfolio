import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdirSync } from "node:fs";
import { projects } from "../../data/projects";
import { site } from "../../lib/site";

const routes = ["/", "/work", "/services", "/about", "/contact", ...projects.map(project => `/work/${project.slug}`)];
const widths = [375, 390, 430, 768, 1024, 1440];

for (const width of widths) {
  test(`all eleven pages render with loaded images and no overflow at ${width}px`, async ({ page }) => {
    test.setTimeout(120000);
    await page.setViewportSize({ width, height: 950 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status(), route).toBe(200);
      await page.locator("h1").waitFor();
      await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), route).toBe(true);
      expect(await page.locator("h1").count()).toBe(1);
      await expect(page.locator("body")).not.toContainText(/NEEDS MY CONTENT|Contact details pending|Draft case study|Interface illustration|case studies are on the way/i);
      await page.locator("img").evaluateAll(images => images.forEach(image => (image as HTMLImageElement).loading = "eager"));
      await expect.poll(() => page.locator("img").evaluateAll(images => images.every(image => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
      // Loaded off-screen images may not yet be painted in a full-page Chrome capture.
      for (const image of await page.locator("img").all()) {
        if (await image.isVisible()) {
          await image.scrollIntoViewIfNeeded();
          await image.evaluate(element => (element as HTMLImageElement).decode());
          await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
        }
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      mkdirSync("artifacts/redesign/responsive", { recursive: true });
      await page.screenshot({ path: `artifacts/redesign/responsive/${route === "/" ? "home" : route.slice(1).replaceAll("/", "-")}-${width}.png`, fullPage: true });
    }
    expect(errors).toEqual([]);
  });
}

test("mobile navigation handles focus, escape, and route changes", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 }); await page.goto("/");
  const trigger = page.getByRole("button", { name: "Open navigation" });
  await trigger.click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Work", exact: true })).toBeFocused();
  await page.keyboard.press("Escape"); await expect(trigger).toBeFocused(); await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await trigger.click(); await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Work", exact: true }).click();
  await expect(page).toHaveURL(/\/work$/); await expect(page.getByRole("button", { name: "Open navigation" })).toHaveAttribute("aria-expanded", "false");
});

test("home presents all six projects in order with usable case and live links", async ({ page }) => {
  await page.goto("/");
  const presentations = page.locator(".project-presentation");
  await expect(presentations).toHaveCount(6);
  for (const [index, project] of projects.entries()) {
    const presentation = presentations.nth(index);
    await expect(presentation.getByRole("heading")).toHaveText(project.title);
    await expect(presentation.getByText("Independent Concept Project · 2026", { exact: true })).toBeVisible();
    await expect(presentation.getByRole("link", { name: "View Case Study", exact: true })).toHaveAttribute("href", `/work/${project.slug}`);
    const live = presentation.getByRole("link", { name: /View Live Site/ });
    await expect(live).toHaveAttribute("href", project.liveUrl);
    await expect(live).toHaveAttribute("target", "_blank");
    await expect(live).toHaveAttribute("rel", "noopener noreferrer");
  }
  expect(await page.locator("a,button").evaluateAll(controls => controls.every(control => !/[←→↗↘↑↓]/u.test(control.textContent || "")))).toBe(true);
});

test("work filters, legacy redirects, unknown routes and preview SEO are correct", async ({ page, request }) => {
  await page.goto("/projects"); await expect(page).toHaveURL(/\/work$/);
  await page.getByRole("button", { name: "SaaS & Dashboard", exact: true }).click();
  await expect(page.locator(".project-presentation")).toHaveCount(1);
  await page.getByRole("heading", { name: "NEXA", exact: true }).getByRole("link").click();
  await expect(page).toHaveURL(/\/work\/nexa$/);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  expect((await page.goto("/work/unknown"))?.status()).toBe(404);
  expect((await request.get("/projects/labellens")).status()).toBe(404);
  expect(await (await request.get("/robots.txt")).text()).toContain("Disallow: /");
  expect(await (await request.get("/sitemap.xml")).text()).not.toContain("<loc>");
  expect((await request.get("/opengraph-image")).headers()["content-type"]).toContain("image/png");
});

test("every case has complete content, external actions, and ordered next navigation", async ({ page }) => {
  for (const [index, project] of projects.entries()) {
    await page.goto(`/work/${project.slug}`);
    for (const id of ["overview", "brief", "design", "experience", "responsive", "implementation", "skills"]) await expect(page.locator(`#${id}`)).toBeVisible();
    await expect(page.locator(".case-badges")).toContainText("Independent Concept Project · 2026");
    await expect(page.locator(".mobile-screenshot img")).toHaveAttribute("src", /mobile-01/);
    const source = page.getByRole("link", { name: /View Source Code/ }).first();
    await expect(source).toHaveAttribute("href", project.githubUrl); await expect(source).toHaveAttribute("target", "_blank");
    await expect(page.locator(".next-project-title")).toHaveAttribute("href", `/work/${projects[(index + 1) % projects.length].slug}`);
    await expect(page.getByRole("link", { name: "Start a Project", exact: true }).first()).toHaveAttribute("href", "/contact");
  }
});

test("internal links and local image links resolve", async ({ page, request }) => {
  test.setTimeout(60000);
  const paths = new Set<string>();
  for (const route of routes) {
    await page.goto(route);
    for (const href of await page.locator('a[href^="/"]').evaluateAll(links => links.map(link => link.getAttribute("href")!))) paths.add(href.split("#")[0]);
  }
  for (const path of paths) expect((await request.get(path)).status(), path).toBe(200);
});

test("direct contact links use Alson's supplied identity and encoded WhatsApp message", async ({ page }) => {
  await page.goto("/contact");
  const sidebar = page.locator(".contact-sidebar");
  await expect(sidebar.locator(`a[href="mailto:${site.email}"]`)).toBeVisible();
  const whatsapp = sidebar.getByRole("link", { name: /Discuss your project on WhatsApp/ });
  expect(new URL((await whatsapp.getAttribute("href"))!).searchParams.get("text")).toBe(site.whatsappMessage);
  await expect(whatsapp).toHaveAttribute("target", "_blank");
  await expect(sidebar.getByRole("link", { name: "Connect on LinkedIn" })).toHaveAttribute("href", site.linkedin);
  await expect(page.getByText(site.availability, { exact: false }).first()).toBeVisible();
});

test("contact validates, preserves a failed brief, and accepts a mocked provider receipt", async ({ page }) => {
  await page.goto("/contact"); await page.getByRole("button", { name: "Tell me about your project", exact: true }).click();
  await expect(page.locator("#name-error")).toBeVisible(); await expect(page.locator("#name")).toBeFocused();
  await page.getByLabel("Name Required", { exact: true }).fill("Test Founder");
  await page.getByLabel("Email Required", { exact: true }).fill("founder@example.com");
  await page.getByLabel("Project type Required", { exact: true }).selectOption("MVP");
  await page.getByLabel("Tell me about your project Required", { exact: true }).fill("[MOCK_FAILURE] Build a portal for customers and administrators.");
  await page.getByRole("button", { name: "Tell me about your project", exact: true }).click();
  await expect(page.getByText("Your inquiry could not be confirmed.", { exact: false })).toBeVisible();
  await expect(page.locator("#name")).toHaveValue("Test Founder");
  await page.locator("#description").fill("Build a portal for customers and administrators with a clear user flow.");
  await page.getByRole("button", { name: "Tell me about your project", exact: true }).click();
  await expect(page.getByText("Your inquiry has been accepted by the email service.", { exact: false })).toBeVisible();
  await expect(page.getByRole("button", { name: "Inquiry accepted", exact: true })).toBeDisabled();
});

test("copy fallback preserves entered details and reduced motion suppresses transitions", async ({ page }) => {
  await page.goto("/contact"); await page.locator("#name").fill("Brief owner");
  await page.locator("#description").fill("A small business website with booking integration.");
  await page.getByText("View a copyable project brief", { exact: true }).click(); await expect(page.locator("#brief")).toHaveValue(/Brief owner/);
  await page.emulateMedia({ reducedMotion: "reduce" }); await page.goto("/");
  expect(await page.locator(".button").first().evaluate(element => getComputedStyle(element).transitionDuration)).toBe("1e-05s");
});

test("all page types pass automated accessibility checks", async ({ page }) => {
  test.setTimeout(120000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of routes) {
    await page.goto(route);
    const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(result.violations, route).toEqual([]);
  }
});

test("hero shows real work immediately and all six previews support keyboard selection", async ({ page }) => {
  for (const width of [375, 390, 430, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 844 }); await page.goto("/");
    const image = page.locator(".hero-preview img");
    const rect = await image.boundingBox();
    expect(rect!.y, `first visual at ${width}`).toBeLessThan(width < 768 ? 600 : 400);
    expect(rect!.width).toBeGreaterThan(width < 768 ? 290 : 300);
    for (const project of projects) {
      const button = page.getByRole("button", { name: `Preview ${project.title}`, exact: true });
      await button.focus(); await page.keyboard.press("Enter");
      await expect(button).toHaveAttribute("aria-pressed", "true");
      await expect(page.locator(".hero-preview")).toHaveAttribute("href", `/work/${project.slug}`);
      await expect(image).toHaveAttribute("alt", project.coverAlt);
      await expect(page.locator(".hero-preview")).not.toHaveClass(/preview-enter/);
    }
  }
});

test("scroll reveals complete once, reduced motion stays visible, and hover remains restrained", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 950 });
  await page.emulateMedia({ reducedMotion: "no-preference" }); await page.goto("/");
  const visual = page.locator("#project-vanta .presentation-visuals");
  await expect(visual).toHaveClass(/motion-pending/);
  await visual.scrollIntoViewIfNeeded(); await expect(visual).not.toHaveClass(/motion-pending/);
  await expect.poll(() => visual.evaluate(element => getComputedStyle(element).opacity)).toBe("1");
  await page.evaluate(() => window.scrollTo(0, 0)); await expect(visual).not.toHaveClass(/motion-pending/);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".motion-pending")).toHaveCount(0);
  const cover = page.locator("#project-vanta .presentation-cover");
  await cover.hover();
  expect(await cover.locator("img").evaluate(element => getComputedStyle(element).transform)).toBe("none");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await cover.hover();
  await expect.poll(() => cover.locator("img").evaluate(element => getComputedStyle(element).transform)).toBe("matrix(1.015, 0, 0, 1.015, 0, 0)");
  await expect(page.locator(".site-header")).toHaveClass(/header-scrolled/);
});

test("touch preview controls work without hover or hidden mobile overlays", async ({ browser }) => {
  const context = await browser.newContext({ baseURL: test.info().project.use.baseURL, viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage(); await page.goto("/");
  await page.getByRole("button", { name: "Preview NEXA", exact: true }).tap();
  await expect(page.locator(".hero-preview")).toHaveAttribute("href", "/work/nexa");
  await page.locator("#project-nexa").scrollIntoViewIfNeeded();
  await expect(page.locator("#project-nexa .presentation-companion")).toBeHidden();
  expect((await page.locator("#project-nexa .presentation-cover").boundingBox())!.width).toBeGreaterThan(300);
  await context.close();
});
