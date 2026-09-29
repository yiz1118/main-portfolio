import { chromium } from "playwright";
import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";
const browser=await chromium.launch({channel:"chrome",headless:true});
try{
  const context=await browser.newContext({permissions:["clipboard-read","clipboard-write"]});const page=await context.newPage();const errors=[];page.on("pageerror",error=>errors.push(error.message));page.on("console",message=>{if(message.type()==="error")errors.push(message.text());});const base="http://localhost:3000";const metadata=[];
  for(const route of ["/","/projects","/services","/about","/contact","/projects/labellens","/projects/chuangxu-planning-agent","/projects/rongcheng-city-explorer"]){
    await page.goto(base+route);const tags=await page.evaluate(()=>({title:document.title,description:document.querySelector('meta[name="description"]')?.getAttribute("content"),og:document.querySelector('meta[property="og:image"]')?.getAttribute("content"),twitter:document.querySelector('meta[name="twitter:card"]')?.getAttribute("content"),robots:document.querySelector('meta[name="robots"]')?.getAttribute("content")}));
    assert.ok(tags.title&&tags.description&&tags.og,JSON.stringify({route,...tags}));assert.equal(tags.twitter,"summary_large_image");assert.ok(tags.robots.includes("noindex"));metadata.push({route,...tags});
  }
  assert.deepEqual(errors,[],"Normal page routes must have no browser errors");await page.goto(base+"/contact");assert.equal(await page.getByRole("button",{name:"Tell me about your project",exact:true}).count(),0);assert.ok(await page.getByText("Online submission is not available yet.",{exact:false}).isVisible());
  await page.locator("#name").fill("Local verification");await page.locator("#description").fill("A local-only test brief for the copy workflow.");await page.getByRole("button",{name:"Copy project brief",exact:true}).click();assert.ok((await page.evaluate(()=>navigator.clipboard.readText())).includes("Local verification"));
  mkdirSync("artifacts/preview",{recursive:true});mkdirSync("artifacts/reports",{recursive:true});
  await page.setViewportSize({width:390,height:950});await page.reload();await page.evaluate(()=>document.fonts.ready);await page.evaluate(()=>{document.activeElement?.blur?.();window.scrollTo(0,0);});await page.screenshot({path:"artifacts/preview/contact-mobile.png",fullPage:true});
  await page.setViewportSize({width:1440,height:1000});await page.goto(base);await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:"artifacts/preview/home-desktop.png"});
  const response=await context.request.post(base+"/api/contact",{headers:{origin:base},data:{name:"Local check",email:"test@example.com",company:"",projectType:"Website",budget:"",description:"A local-only verification of the unconfigured endpoint.",website:"",submissionId:"12345678-1234-4234-8234-123456789012"}});assert.equal(response.status(),503);
  writeFileSync("artifacts/reports/preview-smoke.json",JSON.stringify({verifiedAt:new Date().toISOString(),metadata,contact:"Unconfigured; copy workflow verified; API returns 503; no email sent"},null,2));console.log("Normal preview metadata, unconfigured form, clipboard fallback, and endpoint verified.");
}finally{await browser.close();}
