import puppeteer from "puppeteer-core";
import path from "path";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const artifactDir = "C:\\Users\\LENOVO\\.gemini\\antigravity-ide\\brain\\f3a013ef-fcf8-45d3-9ca4-5a49ad75cc7d";

async function run() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 950 });
  await page.goto("http://localhost:3000/katalog?kategori=Perangkat+Lunak%2FSoftware", {
    waitUntil: "networkidle0",
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({
    path: path.join(artifactDir, "desktop-1440-katalog-blueprint-placeholder.png"),
  });
  console.log("Captured blueprint placeholder");
  await browser.close();
}
run();
