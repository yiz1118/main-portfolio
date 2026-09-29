import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { projects, findProject, visibleProjects } from "../data/projects";
import { publicationConfig } from "../lib/site";

test("project slugs are unique and cover files exist",()=>{assert.equal(new Set(projects.map(p=>p.slug)).size,projects.length);for(const p of projects){assert.match(p.slug,/^[a-z0-9-]+$/);assert.ok(existsSync(join(process.cwd(),"public",p.coverImage)));assert.ok(p.overview&&p.problem&&p.goal&&p.solution&&p.role);assert.ok(p.features.length&&p.architecture.length&&p.results.length&&p.challenges.length);}});
test("drafts are accessible in preview but absent from public listings and lookup",()=>{assert.equal(visibleProjects(true).length,3);assert.equal(visibleProjects(false).length,0);assert.equal(findProject("labellens",false),undefined);assert.equal(findProject("unknown",true),undefined);});
test("preview and missing-domain production builds cannot be indexed",()=>{assert.equal(publicationConfig({SITE_URL:"https://portfolio.example",SITE_INDEXING:"true"}).indexable,false);assert.equal(publicationConfig({SITE_MODE:"production",SITE_INDEXING:"true"}).indexable,false);assert.equal(publicationConfig({SITE_MODE:"production",SITE_INDEXING:"true",SITE_URL:"https://portfolio.example"}).indexable,true);});
test("Vercel production cannot expose draft content even with preview mode configured",()=>{assert.equal(publicationConfig({VERCEL_ENV:"production",SITE_MODE:"preview"}).includeDrafts,false);});
test("placeholder visuals are honestly classified and no demos are invented",()=>{for(const p of projects){assert.equal(p.publicationStatus,"draft");assert.equal(p.projectType,undefined);assert.equal(p.demoUrl,undefined);assert.ok(p.screenshots.every(s=>s.kind==="illustration"));}});
