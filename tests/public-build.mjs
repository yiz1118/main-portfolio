// Isolated production-mode verification. The .example domain is a test fixture only.
import { spawn, spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import assert from "node:assert/strict";
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
const root=process.cwd();const base="http://localhost:3102";
const build=spawnSync(process.execPath,["node_modules/next/dist/bin/next","build"],{cwd:root,env:{...process.env,PORTFOLIO_BUILD_DIR:".next-public",SITE_MODE:"production",SITE_URL:"https://portfolio.example",SITE_INDEXING:"true",NEXT_TELEMETRY_DISABLED:"1"},encoding:"utf8",windowsHide:true});
if(build.status!==0){console.error(build.stdout,build.stderr);process.exit(1);}
console.log("Isolated public-mode build passed.");
const server=spawn(process.execPath,["node_modules/next/dist/bin/next","start","-p","3102"],{cwd:root,env:{...process.env,PORTFOLIO_BUILD_DIR:".next-public",SITE_MODE:"production",SITE_URL:"https://portfolio.example",SITE_INDEXING:"true",RESEND_API_KEY:"",CONTACT_FROM:"",CONTACT_TO:"",NEXT_TELEMETRY_DISABLED:"1"},stdio:["ignore","pipe","pipe"],windowsHide:true});
let chrome;
try{
  let ready=false;
  for(let i=0;i<60;i++){try{const r=await fetch(base);if(r.ok){ready=true;break;}}catch{}await new Promise(r=>setTimeout(r,500));}
  assert.ok(ready,"Production test server must start");
  const checks=[];
  for(const route of ["/","/projects","/services","/about","/contact"]){const r=await fetch(base+route);assert.equal(r.status,200);const text=await r.text();assert.ok(!text.includes("Portfolio preview"));assert.ok(!text.includes("Draft case study"));assert.ok(text.includes('name="robots" content="index, follow"'));const canonical=text.match(/rel="canonical" href="([^"]+)"/);assert.ok(canonical,`Canonical missing for ${route}`);assert.equal(new URL(canonical[1]).origin,"https://portfolio.example");assert.equal(new URL(canonical[1]).pathname,route);checks.push({route,status:r.status});}
  for(const slug of ["labellens","chuangxu-planning-agent","rongcheng-city-explorer","unknown"]){const r=await fetch(`${base}/projects/${slug}`);assert.equal(r.status,404);checks.push({route:`/projects/${slug}`,status:r.status});}
  const robots=await (await fetch(base+"/robots.txt")).text();assert.ok(robots.includes("Disallow: /api/"));assert.ok(robots.includes("https://portfolio.example/sitemap.xml"));
  const sitemap=await (await fetch(base+"/sitemap.xml")).text();assert.ok(sitemap.includes("https://portfolio.example/services"));assert.ok(!sitemap.includes("labellens"));
  const contact=await (await fetch(base+"/contact")).text();assert.ok(contact.includes("Online submission is not available yet"));
  mkdirSync("artifacts/lighthouse",{recursive:true});mkdirSync("artifacts/reports",{recursive:true});
  mkdirSync("artifacts/lighthouse-profile",{recursive:true});
  chrome=await chromeLauncher.launch({chromePath:"C:/Program Files/Google/Chrome/Application/chrome.exe",userDataDir:root+"/artifacts/lighthouse-profile",chromeFlags:["--headless=new","--no-sandbox","--disable-dev-shm-usage"]});
  const scores=[];
  for(const route of ["/","/projects","/services","/about","/contact"]){
    const result=await lighthouse(base+route,{port:chrome.port,output:["html","json"],onlyCategories:["performance","accessibility","best-practices","seo"],logLevel:"error"});
    const label=route==="/"?"home":route.slice(1);writeFileSync(`artifacts/lighthouse/${label}.html`,result.report[0]);writeFileSync(`artifacts/lighthouse/${label}.json`,result.report[1]);
    const categories=Object.fromEntries(Object.entries(result.lhr.categories).map(([key,value])=>[key,Math.round(value.score*100)]));scores.push({route,...categories});console.log(JSON.stringify({route,...categories}));
  }
  writeFileSync("artifacts/reports/public-build.json",JSON.stringify({verifiedAt:new Date().toISOString(),checks,robots,sitemap,lighthouse:scores,domain:"Isolated fixture https://portfolio.example, not a deployment"},null,2));
  console.log("Public-mode routes, draft exclusion, metadata, robots, sitemap, and unconfigured contact verified.");
}finally{server.kill();if(chrome)await chrome.kill();}
