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
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 1500));

  const fullpagePath = path.join(artifactDir, "final-rebuild-fullpage.png");
  await page.screenshot({ path: fullpagePath, fullPage: true });
  console.log(`Saved fullpage screenshot to: ${fullpagePath}`);

  await browser.close();
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});
