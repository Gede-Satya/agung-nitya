import puppeteer from "puppeteer-core";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function run() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--enable-webgl", "--use-gl=angle"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded", timeout: 15000 });
  await new Promise((r) => setTimeout(r, 1200));

  const total = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
  console.log("Total scrollable height:", total);

  const targets = [
    { name: "stage-01-walk-t12", y: Math.round(total * 0.09) },
    { name: "stage-02-pilar", y: Math.round(total * 0.18) },
    { name: "stage-03-walk-t23", y: Math.round(total * 0.30) },
    { name: "stage-04-produk", y: Math.round(total * 0.44) },
    { name: "stage-05-walk-t34", y: Math.round(total * 0.58) },
    { name: "stage-06-cara", y: Math.round(total * 0.69) },
    { name: "stage-07-walk-t45", y: Math.round(total * 0.79) },
    { name: "stage-08-faq", y: Math.round(total * 0.88) },
    { name: "stage-09-footer", y: Math.round(total * 0.97) },
  ];

  for (const t of targets) {
    await page.evaluate((y) => window.scrollTo(0, y), t.y);
    // Allow inertia lerp (factor ~0.12) to catch up smoothly
    await new Promise((r) => setTimeout(r, 600));

    const p = await page.evaluate(() => (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)).toFixed(3));
    console.log(`Capturing ${t.name} at scrollY: ${t.y} (progress: ${p})`);
    await page.screenshot({ path: `${t.name}.png` });
  }

  await browser.close();
  console.log("All stages captured successfully!");
}

run().catch(console.error);
