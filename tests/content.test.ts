import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";
import { projects, findProject, nextProject, visibleProjects } from "../data/projects";
import { publicationConfig, site, whatsappUrl, emailUrl } from "../lib/site";

const slugs = ["vanta", "nexa", "form27", "ember", "atelier", "sova"];
test("the six public concept cases keep the requested order and attribution", () => {
  assert.deepEqual(projects.map(project => project.slug), slugs);
  assert.deepEqual(projects.map(project => project.number), ["01", "02", "03", "04", "05", "06"]);
  assert.equal(visibleProjects().length, 6);
  for (const project of projects) {
    assert.equal(project.projectType, "Independent Concept Project");
    assert.equal(project.year, 2026);
    assert.ok(project.overview && project.brief && project.businessObjective && project.demoNote);
    assert.ok(project.designDirection.length && project.experience.length && project.implementation.length && project.skills.length);
    assert.equal(new URL(project.liveUrl).protocol, "https:");
    assert.equal(new URL(project.githubUrl).host, "github.com");
    assert.ok(project.role.length && project.services.length && project.technologies.length);
    assert.doesNotMatch(JSON.stringify(project), /NEEDS MY CONTENT|placeholder|testimonial|award/i);
  }
});
test("every displayed screenshot has a capture receipt matching its exact file", () => {
  const capture = JSON.parse(readFileSync("artifacts/integration/screenshot-receipts.json", "utf8")) as {
    receipts: { file: string; source: string; status: number; sha256: string; viewport: { width: number } }[];
    failures: unknown[];
  };
  assert.deepEqual(capture.failures, []);
  for (const project of projects) {
    const images = [project.coverImage, project.heroImage, ...project.galleryImages.map(image => image.src), ...project.mobileImages.map(image => image.src)];
    assert.equal(images.length, 6);
    for (const image of images) {
      const path = join(process.cwd(), "public", image);
      assert.ok(existsSync(path), image);
      const receipt = capture.receipts.find(receipt => receipt.file === image);
      assert.ok(receipt, image);
      assert.equal(new URL(receipt.source).origin, new URL(project.liveUrl).origin);
      assert.equal(receipt.status, 200);
      assert.equal(createHash("sha256").update(readFileSync(path)).digest("hex"), receipt.sha256);
      if (image.includes("mobile")) assert.equal(receipt.viewport.width, 390);
    }
  }
});
test("unknown cases are absent and next-project navigation cycles in the same order", () => {
  assert.equal(findProject("unknown"), undefined);
  assert.equal(findProject("labellens"), undefined);
  assert.equal(nextProject("unknown"), undefined);
  for (let index = 0; index < slugs.length; index++) assert.equal(nextProject(slugs[index])?.slug, slugs[(index + 1) % slugs.length]);
});
test("canonical identity uses the supplied domain while indexing remains explicit", () => {
  assert.equal(publicationConfig({}).url?.href, site.url);
  assert.equal(publicationConfig({ SITE_INDEXING: "true" }).indexable, false);
  assert.equal(publicationConfig({ SITE_MODE: "production", SITE_INDEXING: "true" }).indexable, true);
  assert.equal(publicationConfig({ SITE_MODE: "production", SITE_URL: "http://localhost:3000", SITE_INDEXING: "true" }).indexable, false);
  assert.equal(publicationConfig({ SITE_MODE: "production", SITE_URL: "invalid", SITE_INDEXING: "true" }).url, undefined);
});
test("direct contact URLs preserve the exact prefilled message and encoded brief", () => {
  const whatsapp = new URL(whatsappUrl());
  assert.equal(whatsapp.origin + whatsapp.pathname, site.whatsapp);
  assert.equal(whatsapp.searchParams.get("text"), "Hi Alson, I came across your portfolio and I'm interested in discussing a website/app project with you.");
  const brief = "Website & app\nName: A + B";
  assert.equal(new URL(whatsappUrl(brief)).searchParams.get("text"), brief);
  assert.equal(emailUrl(), "mailto:alsonchua18@gmail.com");
  assert.equal(new URL(emailUrl(brief)).searchParams.get("body"), brief);
});
