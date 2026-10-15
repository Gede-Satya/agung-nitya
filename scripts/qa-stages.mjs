import puppeteer from "puppeteer-core";
import path from "path";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const artifactDir = "C:\\Users\\LENOVO\\.gemini\\antigravity-ide\\brain\\a7644a5b-8c28-4bad-9b2b-b13aa899b767";

async function runQAStages() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--enable-webgl", "--use-gl=angle"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 2000));

  // Stage 1
  await page.screenshot({ path: path.join(artifactDir, "apple-stage-1-hero.png") });

  // Scroll to Stage 2 (immediate)
  await page.evaluate(() => {
    if (window.__lenis) {
      window.__lenis.scrollTo(window.innerHeight * 1.4, { immediate: true });
    } else {
      window.scrollTo(0, window.innerHeight * 1.4);
    }
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(artifactDir, "apple-stage-2-hardware.png") });

  // Scroll to Stage 3 (immediate)
  await page.evaluate(() => {
    if (window.__lenis) {
      window.__lenis.scrollTo(window.innerHeight * 2.5, { immediate: true });
    } else {
      window.scrollTo(0, window.innerHeight * 2.5);
    }
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(artifactDir, "apple-stage-3-software.png") });

  // Scroll to Stage 4 (immediate)
  await page.evaluate(() => {
    if (window.__lenis) {
      window.__lenis.scrollTo(window.innerHeight * 3.6, { immediate: true });
    } else {
      window.scrollTo(0, window.innerHeight * 3.6);
    }
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(artifactDir, "apple-stage-4-services.png") });

  await browser.close();
  console.log("All Apple stages captured successfully via immediate scrollTo!");
}

runQAStages().catch(console.error);
