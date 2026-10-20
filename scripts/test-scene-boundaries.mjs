import puppeteer from "puppeteer-core";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function run() {
  console.log("=== TESTING HERO SCENE BOUNDARIES (SLOW SCROLL) ===");
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--enable-webgl", "--use-gl=angle"],
  });

  const page = await browser.newPage();
  const vWidth = 1440;
  const vHeight = 900;
  await page.setViewport({ width: vWidth, height: vHeight });

  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded", timeout: 15000 });
  await new Promise((r) => setTimeout(r, 1500));

  const totalScrollDistance = await page.evaluate(() => {
    const wrapper = document.getElementById("hero-wrapper");
    return wrapper.offsetHeight - window.innerHeight;
  });

  const boundaryTests = [
    // Boundary 01 -> 02 (around 20%)
    { label: "scene-01-end-19pct", progress: 0.19 },
    { label: "scene-boundary-01-02-20pct", progress: 0.20 },
    { label: "scene-02-start-21pct", progress: 0.21 },

    // Boundary 02 -> 03 (around 40%)
    { label: "scene-02-end-39pct", progress: 0.39 },
    { label: "scene-boundary-02-03-40pct", progress: 0.40 },
    { label: "scene-03-start-41pct", progress: 0.41 },

    // Boundary 03 -> 04 (around 60%)
    { label: "scene-03-end-59pct", progress: 0.59 },
    { label: "scene-boundary-03-04-60pct", progress: 0.60 },
    { label: "scene-04-start-61pct", progress: 0.61 },

    // Boundary 04 -> 05 (around 80%)
    { label: "scene-04-end-79pct", progress: 0.79 },
    { label: "scene-boundary-04-05-80pct", progress: 0.80 },
    { label: "scene-05-start-81pct", progress: 0.81 },
  ];

  for (const b of boundaryTests) {
    const targetY = Math.round(b.progress * totalScrollDistance);
    await page.evaluate((y) => window.scrollTo(0, y), targetY);
    await new Promise((r) => setTimeout(r, 600));

    const state = await page.evaluate(() => {
      const scrub = document.getElementById("scrub-indicator")?.textContent;
      const scene = document.getElementById("scene-title")?.textContent;
      return { scrub, scene };
    });

    console.log(`[${b.label}] ScrollY: ${targetY}px, Progress: ${(b.progress * 100).toFixed(0)}%, Scene: "${state.scene}", Scrub: "${state.scrub}"`);
    await page.screenshot({ path: `${b.label}.png` });
  }

  await browser.close();
  console.log("=== BOUNDARY TESTING COMPLETE ===");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
