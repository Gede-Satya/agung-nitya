import puppeteer from "puppeteer-core";
import path from "path";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const artifactDir = "C:\\Users\\LENOVO\\.gemini\\antigravity-ide\\brain\\a7644a5b-8c28-4bad-9b2b-b13aa899b767";

async function runWheelTest() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--enable-webgl", "--use-gl=angle"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 1500));

  // Move mouse to center
  await page.mouse.move(700, 400);

  // Wheel down for stage 2
  await page.mouse.wheel({ deltaY: 2500 });
  await new Promise((r) => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(artifactDir, "apple-stage-2-hardware.png") });

  // Wheel down for stage 3
  await page.mouse.wheel({ deltaY: 2500 });
  await new Promise((r) => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(artifactDir, "apple-stage-3-software.png") });

  await browser.close();
  console.log("Wheel test with mouse.move completed!");
}

runWheelTest().catch(console.error);
