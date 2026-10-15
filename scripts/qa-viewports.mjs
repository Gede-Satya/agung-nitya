import puppeteer from "puppeteer-core";
import path from "path";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const artifactDir = "C:\\Users\\LENOVO\\.gemini\\antigravity-ide\\brain\\a7644a5b-8c28-4bad-9b2b-b13aa899b767";

const viewports = [
  { name: "qa-390px-mobile", width: 390, height: 844 },
  { name: "qa-768px-tablet", width: 768, height: 1024 },
  { name: "qa-1024px-laptop", width: 1024, height: 768 },
  { name: "qa-1440px-desktop", width: 1440, height: 900 },
];

async function runQAViewports() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--enable-webgl", "--use-gl=angle"],
  });

  for (const vp of viewports) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle0", timeout: 30000 });
    await new Promise((r) => setTimeout(r, 1500));

    // Capture hero
    await page.screenshot({
      path: path.join(artifactDir, `${vp.name}-hero.png`),
    });

    // Scroll to verification section
    await page.evaluate(() => {
      const el = document.getElementById("verifikasi");
      if (el) el.scrollIntoView({ behavior: "instant" });
    });
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({
      path: path.join(artifactDir, `${vp.name}-verifikasi.png`),
    });

    // Scroll to contact section
    await page.evaluate(() => {
      const el = document.getElementById("kontak");
      if (el) el.scrollIntoView({ behavior: "instant" });
    });
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({
      path: path.join(artifactDir, `${vp.name}-kontak.png`),
    });

    await page.close();
  }

  await browser.close();
  console.log("All viewport QA screenshots captured successfully!");
}

runQAViewports().catch(console.error);
