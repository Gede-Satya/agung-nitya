import puppeteer from "puppeteer-core";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function runQualityTest() {
  console.log("=== COMPREHENSIVE SCROLL SMOOTHNESS & QUALITY TEST ===");
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--enable-webgl", "--use-gl=angle"],
  });

  const page = await browser.newPage();

  // Test 1: Desktop Viewport (1440 x 900)
  console.log("\n--- Testing Desktop Viewport (1440 x 900) ---");
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded", timeout: 15000 });
  await new Promise((r) => setTimeout(r, 2000));

  const totalScrollDistance = await page.evaluate(() => {
    const wrapper = document.getElementById("hero-wrapper");
    return wrapper.offsetHeight - window.innerHeight;
  });
  console.log("Total scroll distance (desktop):", totalScrollDistance, "px");

  // A. Slow scrub across scenes (0% -> 10% -> 25% -> 50% -> 75% -> 95%)
  const scrubPoints = [0.0, 0.10, 0.25, 0.50, 0.75, 0.95];
  for (const p of scrubPoints) {
    const y = Math.round(p * totalScrollDistance);
    await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
    // Allow damping (~28ms half-life) to settle
    await new Promise((r) => setTimeout(r, 300));

    const state = await page.evaluate(() => {
      const scrub = document.getElementById("scrub-indicator")?.textContent;
      const scene = document.getElementById("scene-title")?.textContent;
      return { scrub, scene };
    });
    console.log(`[Desktop Scrub ${(p * 100).toFixed(0)}%] ScrollY: ${y}px, Scene: "${state.scene}", Scrub: "${state.scrub}"`);
    await page.screenshot({ path: `qa-desktop-scrub-${Math.round(p * 100)}.png` });
  }

  // B. Fast flick scroll simulation (0 to 70% in sudden burst, then back to 30%)
  console.log("\n--- Testing Desktop Fast Flick Scroll ---");
  const flickTarget = Math.round(0.70 * totalScrollDistance);
  await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), flickTarget);
  await new Promise((r) => setTimeout(r, 100)); // check fast response during motion
  const midFlickState = await page.evaluate(() => document.getElementById("scrub-indicator")?.textContent);
  console.log(`[Desktop Fast Flick @100ms] Scrub: "${midFlickState}"`);
  await new Promise((r) => setTimeout(r, 350)); // settled
  const settledFlickState = await page.evaluate(() => document.getElementById("scrub-indicator")?.textContent);
  console.log(`[Desktop Fast Flick Settled] Scrub: "${settledFlickState}"`);
  await page.screenshot({ path: `qa-desktop-fast-flick.png` });

  // Test 2: Mobile Viewport (390 x 844, iPhone 14 style)
  console.log("\n--- Testing Mobile Viewport (390 x 844) ---");
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded", timeout: 15000 });
  await new Promise((r) => setTimeout(r, 2000));

  const mobileScrollDistance = await page.evaluate(() => {
    const wrapper = document.getElementById("hero-wrapper");
    return wrapper.offsetHeight - window.innerHeight;
  });
  console.log("Total scroll distance (mobile):", mobileScrollDistance, "px");

  for (const p of [0.0, 0.20, 0.40, 0.60, 0.80]) {
    const y = Math.round(p * mobileScrollDistance);
    await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
    await new Promise((r) => setTimeout(r, 300));

    const state = await page.evaluate(() => {
      const scrub = document.getElementById("scrub-indicator")?.textContent;
      const scene = document.getElementById("scene-title")?.textContent;
      return { scrub, scene };
    });
    console.log(`[Mobile Scrub ${(p * 100).toFixed(0)}%] ScrollY: ${y}px, Scene: "${state.scene}", Scrub: "${state.scrub}"`);
    await page.screenshot({ path: `qa-mobile-scrub-${Math.round(p * 100)}.png` });
  }

  await browser.close();
  console.log("\n=== ALL QA TESTS COMPLETED SUCCESSFULLY ===");
}

runQualityTest().catch((err) => {
  console.error("QA Test Error:", err);
  process.exit(1);
});
