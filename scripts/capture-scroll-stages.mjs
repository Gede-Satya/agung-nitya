import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const artifactDir = "C:\\Users\\LENOVO\\.gemini\\antigravity-ide\\brain\\a7644a5b-8c28-4bad-9b2b-b13aa899b767";

async function captureStages() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--enable-webgl", "--use-gl=angle"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 2000));

  const totalHeight = await page.evaluate(() => document.body.scrollHeight - window.innerHeight);

  // Stage 1: Hero (scroll 0)
  const p1 = path.join(artifactDir, "scroll-stage-1-hero.png");
  await page.screenshot({ path: p1 });
  console.log(`Saved Stage 1: ${p1}`);

  // Stage 2: Hardware (scroll ~33%)
  await page.evaluate((th) => window.scrollTo({ top: th * 0.33, behavior: "instant" }), totalHeight);
  await new Promise((r) => setTimeout(r, 1200));
  const p2 = path.join(artifactDir, "scroll-stage-2-hardware.png");
  await page.screenshot({ path: p2 });
  console.log(`Saved Stage 2: ${p2}`);

  // Stage 3: Software (scroll ~60%)
  await page.evaluate((th) => window.scrollTo({ top: th * 0.60, behavior: "instant" }), totalHeight);
  await new Promise((r) => setTimeout(r, 1200));
  const p3 = path.join(artifactDir, "scroll-stage-3-software.png");
  await page.screenshot({ path: p3 });
  console.log(`Saved Stage 3: ${p3}`);

  // Stage 4: Services (scroll ~88%)
  await page.evaluate((th) => window.scrollTo({ top: th * 0.88, behavior: "instant" }), totalHeight);
  await new Promise((r) => setTimeout(r, 1200));
  const p4 = path.join(artifactDir, "scroll-stage-4-services.png");
  await page.screenshot({ path: p4 });
  console.log(`Saved Stage 4: ${p4}`);

  await browser.close();
}

captureStages().catch((err) => {
  console.error(err);
  process.exit(1);
});
