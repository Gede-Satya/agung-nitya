import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const artifactDir = "C:\\Users\\LENOVO\\.gemini\\antigravity-ide\\brain\\a7644a5b-8c28-4bad-9b2b-b13aa899b767";

if (!fs.existsSync(artifactDir)) {
  fs.mkdirSync(artifactDir, { recursive: true });
}

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--enable-webgl", "--use-gl=angle"],
  });

  // 1. Desktop 1440px
  const pageDesktop = await browser.newPage();
  await pageDesktop.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await pageDesktop.goto("http://localhost:3000", { waitUntil: "networkidle0", timeout: 30000 });
  // Wait a moment for R3F canvas to initialize and render device
  await new Promise((r) => setTimeout(r, 2500));
  const desktopPath = path.join(artifactDir, "hero-1440px.png");
  await pageDesktop.screenshot({ path: desktopPath, fullPage: false });
  console.log(`Saved desktop screenshot to: ${desktopPath}`);
  await pageDesktop.close();

  // 2. Mobile 390px
  const pageMobile = await browser.newPage();
  await pageMobile.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await pageMobile.goto("http://localhost:3000", { waitUntil: "networkidle0", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 2500));
  const mobilePath = path.join(artifactDir, "hero-390px.png");
  await pageMobile.screenshot({ path: mobilePath, fullPage: false });
  console.log(`Saved mobile screenshot to: ${mobilePath}`);
  await pageMobile.close();

  await browser.close();
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});
