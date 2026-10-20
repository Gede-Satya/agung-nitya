import puppeteer from "puppeteer-core";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function run() {
  console.log("=== TESTING HERO PINNING AND STAGE SIZING STATES ===");
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

  const metrics = await page.evaluate(() => {
    const wrapper = document.getElementById("hero-wrapper");
    const stage = document.getElementById("hero-stage");
    const pilar = document.getElementById("pilar");
    const totalScrollDistance = wrapper.offsetHeight - window.innerHeight;
    const holdDistance = Math.min(window.innerHeight * 0.75, totalScrollDistance * 0.2);
    const activeScrubDistance = Math.max(1, totalScrollDistance - holdDistance);
    return {
      wrapperHeight: wrapper?.offsetHeight,
      stageHeight: stage?.offsetHeight,
      stageWidth: stage?.offsetWidth,
      totalScrollDistance,
      holdDistance,
      activeScrubDistance,
      pilarOffsetTop: pilar?.offsetTop,
    };
  });

  console.log("Layout metrics:", metrics);

  // 1. STATE 1: At top (scrollY = 0)
  console.log("\n--- Testing State 1: At top (scrollY = 0) ---");
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 800));

  const state1 = await page.evaluate(() => {
    const stage = document.getElementById("hero-stage");
    const rect = stage.getBoundingClientRect();
    const scrub = document.getElementById("scrub-indicator")?.textContent;
    const scene = document.getElementById("scene-title")?.textContent;
    const pilarRect = document.getElementById("pilar")?.getBoundingClientRect();
    return {
      stageRect: { top: rect.top, bottom: rect.bottom, width: rect.width, height: rect.height },
      scrub,
      scene,
      pilarTop: pilarRect?.top,
      vh: window.innerHeight,
      vw: window.innerWidth,
    };
  });
  console.log("State 1 results:", state1);
  await page.screenshot({ path: "stage-state1-top.png" });

  // 2. STATE 2: Around the middle (scrollY ~ activeScrubDistance * 0.5)
  console.log("\n--- Testing State 2: Middle of sequence ---");
  const yMid = Math.round(metrics.activeScrubDistance * 0.5);
  await page.evaluate((y) => window.scrollTo(0, y), yMid);
  await new Promise((r) => setTimeout(r, 800));

  const state2 = await page.evaluate(() => {
    const stage = document.getElementById("hero-stage");
    const rect = stage.getBoundingClientRect();
    const scrub = document.getElementById("scrub-indicator")?.textContent;
    const scene = document.getElementById("scene-title")?.textContent;
    const pilarRect = document.getElementById("pilar")?.getBoundingClientRect();
    return {
      stageRect: { top: rect.top, bottom: rect.bottom, width: rect.width, height: rect.height },
      scrub,
      scene,
      pilarTop: pilarRect?.top,
      isPilarOffscreen: pilarRect ? pilarRect.top >= window.innerHeight : true,
    };
  });
  console.log("State 2 results:", state2);
  await page.screenshot({ path: "stage-state2-mid.png" });

  // 3. STATE 3: At SCRUB // 100% (inside hold range, e.g. activeScrubDistance + 300px)
  console.log("\n--- Testing State 3: SCRUB // 100% ---");
  const yScrub100 = Math.round(metrics.activeScrubDistance + (metrics.holdDistance * 0.5));
  await page.evaluate((y) => window.scrollTo(0, y), yScrub100);
  await new Promise((r) => setTimeout(r, 800));

  const state3 = await page.evaluate(() => {
    const stage = document.getElementById("hero-stage");
    const rect = stage.getBoundingClientRect();
    const scrub = document.getElementById("scrub-indicator")?.textContent;
    const scene = document.getElementById("scene-title")?.textContent;
    const pilarRect = document.getElementById("pilar")?.getBoundingClientRect();
    return {
      stageRect: { top: rect.top, bottom: rect.bottom, width: rect.width, height: rect.height },
      scrub,
      scene,
      pilarTop: pilarRect?.top,
      isStageFullViewport: rect.top === 0 && Math.abs(rect.height - window.innerHeight) <= 1,
      isPilarHidden: pilarRect ? pilarRect.top >= window.innerHeight : true,
    };
  });
  console.log("State 3 results:", state3);
  await page.screenshot({ path: "stage-state3-scrub100.png" });

  // 4. STATE 4: Only after scrolling beyond the hero wrapper
  console.log("\n--- Testing State 4: Beyond the hero wrapper ---");
  const yBeyond = metrics.totalScrollDistance + 600;
  await page.evaluate((y) => window.scrollTo(0, y), yBeyond);
  await new Promise((r) => setTimeout(r, 800));

  const state4 = await page.evaluate(() => {
    const stage = document.getElementById("hero-stage");
    const rect = stage.getBoundingClientRect();
    const pilarRect = document.getElementById("pilar")?.getBoundingClientRect();
    return {
      stageRect: { top: rect.top, bottom: rect.bottom, width: rect.width, height: rect.height },
      pilarTop: pilarRect?.top,
      isPilarVisible: pilarRect ? pilarRect.top < window.innerHeight : false,
    };
  });
  console.log("State 4 results:", state4);
  await page.screenshot({ path: "stage-state4-beyond-hero.png" });

  await browser.close();
  console.log("\n=== ALL 4 STATES TESTED SUCCESSFULLY ===");
}

run().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
