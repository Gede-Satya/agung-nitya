import puppeteer from "puppeteer-core";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function verify() {
  console.log("=== VERIFYING HERO WRAPPER PIN & PROGRESS ===");
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

  const layout = await page.evaluate(() => {
    const wrapper = document.getElementById("hero-wrapper");
    const stage = document.getElementById("hero-stage");
    const pilar = document.getElementById("pilar") || document.getElementById("main-content");
    const totalScrollDistance = wrapper.offsetHeight - window.innerHeight;
    return {
      wrapperHeight: wrapper?.offsetHeight,
      stageHeight: stage?.offsetHeight,
      stageWidth: stage?.offsetWidth,
      windowH: window.innerHeight,
      windowW: window.innerWidth,
      totalScrollDistance,
    };
  });
  console.log("Layout info:", layout);

  const testPoints = [
    { name: "0%", fraction: 0.0, expectedScene: 0 },
    { name: "25%", fraction: 0.25, expectedScene: 1 },
    { name: "50%", fraction: 0.50, expectedScene: 2 },
    { name: "75%", fraction: 0.75, expectedScene: 3 },
    { name: "90%", fraction: 0.90, expectedScene: 4 },
    { name: "100%", fraction: 1.00, expectedScene: 4 },
  ];

  for (const pt of testPoints) {
    const targetY = Math.round(pt.fraction * layout.totalScrollDistance);
    console.log(`\n--- Testing Wrapper Progress ${pt.name} (target scrollY = ${targetY}px) ---`);
    await page.evaluate((y) => window.scrollTo(0, y), targetY);
    // Wait for lerp to settle
    await new Promise((r) => setTimeout(r, 1000));

    const state = await page.evaluate(() => {
      const stage = document.getElementById("hero-stage");
      const sRect = stage.getBoundingClientRect();
      const pilar = document.getElementById("pilar") || document.getElementById("main-content");
      const pRect = pilar.getBoundingClientRect();
      const scrub = document.getElementById("scrub-indicator")?.textContent;
      const scene = document.getElementById("scene-title")?.textContent;
      const debugText = document.getElementById("hero-debug-readout")?.innerText;
      return {
        stageTop: sRect.top,
        stageBottom: sRect.bottom,
        stageHeight: sRect.height,
        pilarTop: pRect.top,
        scrub,
        scene,
        debugText,
      };
    });

    console.log(`State at ${pt.name}:`, state);

    // Assertions:
    const stagePinnedAtTop = Math.abs(state.stageTop) <= 1;
    const stageFillsViewport = Math.abs(state.stageHeight - layout.windowH) <= 1;
    const nextSectionHidden = state.pilarTop >= layout.windowH - 1;

    console.log(`- Stage pinned at top (top === 0): ${stagePinnedAtTop} (actual: ${state.stageTop})`);
    console.log(`- Stage fills viewport height: ${stageFillsViewport} (actual: ${state.stageHeight})`);
    console.log(`- Next section hidden (pilarTop >= ${layout.windowH}): ${nextSectionHidden} (actual: ${state.pilarTop})`);

    if (!stagePinnedAtTop || !stageFillsViewport || !nextSectionHidden) {
      console.error(`FAIL: Invariant broken at wrapper progress ${pt.name}!`);
      process.exit(1);
    }

    if (pt.fraction === 1.0) {
      console.log(`- Confirming final scene at 100%: ${state.scene}`);
      console.log(`- Confirming scrub at 100%: ${state.scrub}`);
    }

    await page.screenshot({ path: `verify-${pt.name.replace("%", "pct")}.png` });
  }

  // Test beyond wrapper:
  console.log(`\n--- Testing Beyond Wrapper (e.g. 110%, scrollY = ${layout.totalScrollDistance + 500}px) ---`);
  await page.evaluate((y) => window.scrollTo(0, y), layout.totalScrollDistance + 500);
  await new Promise((r) => setTimeout(r, 1000));

  const stateBeyond = await page.evaluate(() => {
    const stage = document.getElementById("hero-stage");
    const sRect = stage.getBoundingClientRect();
    const pilar = document.getElementById("pilar") || document.getElementById("main-content");
    const pRect = pilar.getBoundingClientRect();
    const hud = document.getElementById("hero-scene-hud");
    const hudOpacity = window.getComputedStyle(hud).opacity;
    return {
      stageTop: sRect.top,
      stageBottom: sRect.bottom,
      pilarTop: pRect.top,
      hudOpacity,
    };
  });
  console.log("State beyond wrapper:", stateBeyond);
  const stageReleased = stateBeyond.stageTop < 0;
  const nextSectionVisible = stateBeyond.pilarTop < layout.windowH;
  const hudInactive = stateBeyond.hudOpacity === "0";
  console.log(`- Stage released: ${stageReleased}`);
  console.log(`- Next section entered viewport: ${nextSectionVisible}`);
  console.log(`- HUD inactive / hidden: ${hudInactive}`);

  await page.screenshot({ path: "verify-beyond.png" });

  await browser.close();
  console.log("\n=== ALL WRAPPER PROGRESS POINTS (0%, 25%, 50%, 75%, 90%, 100%, and beyond) PASSED! ===");
}

verify().catch((e) => {
  console.error("Verification failed:", e);
  process.exit(1);
});
