import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const artifactDir = "C:\\Users\\LENOVO\\.gemini\\antigravity-ide\\brain\\a7644a5b-8c28-4bad-9b2b-b13aa899b767";

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 1000));

  // 1. Viewport First Screen (Fold)
  const foldPath = path.join(artifactDir, "apple-first-screen-1440.png");
  await page.screenshot({ path: foldPath, fullPage: false });
  console.log(`Saved first-screen screenshot: ${foldPath}`);

  // 2. Fullpage
  const fullpagePath = path.join(artifactDir, "apple-rebuilt-fullpage.png");
  await page.screenshot({ path: fullpagePath, fullPage: true });
  console.log(`Saved fullpage screenshot: ${fullpagePath}`);

  await browser.close();
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});
