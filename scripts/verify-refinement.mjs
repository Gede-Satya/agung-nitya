import puppeteer from "puppeteer-core";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function run() {
  console.log("Starting refinement verification...");
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--enable-webgl", "--use-gl=angle"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded", timeout: 15000 });
  await new Promise((r) => setTimeout(r, 1200));

  const heroStageHeight = await page.evaluate(() => {
    const stage = document.getElementById("hero-stage");
    return stage ? stage.offsetHeight : 0;
  });
  console.log("Hero stage height:", heroStageHeight, "(vh approx:", heroStageHeight / 900, "viewports)");

  const heroScrollDistance = heroStageHeight - 900;
  console.log("Hero scroll distance:", heroScrollDistance);

  // 1. Hero start (scrollY: 0) -> Scene 1
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 600));
  const scene1Text = await page.evaluate(() => document.getElementById("scene-title")?.textContent);
  const scrub1 = await page.evaluate(() => document.getElementById("scrub-indicator")?.textContent);
  console.log("Scene at y=0:", scene1Text, scrub1);
  await page.screenshot({ path: "refine-01-hero-start.png" });

  // 2. One viewport scroll (scrollY = 900) -> visible advancement (~25%) -> Scene 2
  await page.evaluate(() => window.scrollTo(0, 900));
  await new Promise((r) => setTimeout(r, 600));
  const scene2Text = await page.evaluate(() => document.getElementById("scene-title")?.textContent);
  const scrub2 = await page.evaluate(() => document.getElementById("scrub-indicator")?.textContent);
  console.log("Scene after 1 viewport (y=900):", scene2Text, scrub2);
  await page.screenshot({ path: "refine-02-one-viewport.png" });

  // 3. Middle of hero (scrollY ~ 50% of hero scroll distance) -> Scene 3
  const yMid = Math.round(heroScrollDistance * 0.5);
  await page.evaluate((y) => window.scrollTo(0, y), yMid);
  await new Promise((r) => setTimeout(r, 600));
  const scene3Text = await page.evaluate(() => document.getElementById("scene-title")?.textContent);
  const scrub3 = await page.evaluate(() => document.getElementById("scrub-indicator")?.textContent);
  console.log("Scene at mid (50%):", scene3Text, scrub3);
  await page.screenshot({ path: "refine-03-hero-mid.png" });

  // 4. Scene 4 (scrollY ~ 70% of hero scroll distance) -> Maintenance
  const yMaint = Math.round(heroScrollDistance * 0.7);
  await page.evaluate((y) => window.scrollTo(0, y), yMaint);
  await new Promise((r) => setTimeout(r, 600));
  const scene4Text = await page.evaluate(() => document.getElementById("scene-title")?.textContent);
  const scrub4 = await page.evaluate(() => document.getElementById("scrub-indicator")?.textContent);
  console.log("Scene at 70%:", scene4Text, scrub4);
  await page.screenshot({ path: "refine-04-hero-maint.png" });

  // 5. Hero end (scrollY ~ 95% of hero scroll distance) -> Scene 5
  const yEnd = Math.round(heroScrollDistance * 0.95);
  await page.evaluate((y) => window.scrollTo(0, y), yEnd);
  await new Promise((r) => setTimeout(r, 600));
  const scene5Text = await page.evaluate(() => document.getElementById("scene-title")?.textContent);
  const scrub5 = await page.evaluate(() => document.getElementById("scrub-indicator")?.textContent);
  console.log("Scene at end (95%):", scene5Text, scrub5);
  await page.screenshot({ path: "refine-05-hero-end.png" });

  // 6. Natural content flow below hero: Empat Pilar
  const pilarY = await page.evaluate(() => {
    const el = document.getElementById("pilar");
    return el ? el.offsetTop - 72 : 0;
  });
  await page.evaluate((y) => window.scrollTo(0, y), pilarY);
  await new Promise((r) => setTimeout(r, 600));
  console.log("Scrolled to #pilar at y:", pilarY);
  await page.screenshot({ path: "refine-06-content-pilar.png" });

  // 7. Produk & Layanan
  const produkY = await page.evaluate(() => {
    const el = document.getElementById("produk");
    return el ? el.offsetTop - 72 : 0;
  });
  await page.evaluate((y) => window.scrollTo(0, y), produkY);
  await new Promise((r) => setTimeout(r, 600));
  console.log("Scrolled to #produk at y:", produkY);
  await page.screenshot({ path: "refine-07-content-produk.png" });

  // 8. Alur Pengadaan & FAQ
  const pengadaanY = await page.evaluate(() => {
    const el = document.getElementById("pengadaan");
    return el ? el.offsetTop - 72 : 0;
  });
  await page.evaluate((y) => window.scrollTo(0, y), pengadaanY);
  await new Promise((r) => setTimeout(r, 600));
  console.log("Scrolled to #pengadaan at y:", pengadaanY);
  await page.screenshot({ path: "refine-08-content-pengadaan.png" });

  // 9. FAQ section with interactive click test
  const faqY = await page.evaluate(() => {
    const el = document.getElementById("faq");
    return el ? el.offsetTop - 72 : 0;
  });
  await page.evaluate((y) => window.scrollTo(0, y), faqY);
  await new Promise((r) => setTimeout(r, 600));
  // Click second FAQ item to test toggle
  await page.evaluate(() => {
    const items = document.querySelectorAll(".faq-item");
    if (items.length > 1) {
      const q = items[1].querySelector(".faq-q");
      if (q) q.click();
    }
  });
  await new Promise((r) => setTimeout(r, 400));
  console.log("Scrolled to #faq and toggled item at y:", faqY);
  await page.screenshot({ path: "refine-09-content-faq.png" });

  // 10. Footer / Kontak
  const kontakY = await page.evaluate(() => {
    const el = document.getElementById("kontak");
    return el ? el.offsetTop - 72 : 0;
  });
  await page.evaluate((y) => window.scrollTo(0, y), kontakY);
  await new Promise((r) => setTimeout(r, 600));
  console.log("Scrolled to #kontak at y:", kontakY);
  await page.screenshot({ path: "refine-10-content-footer.png" });

  // 11. Mobile Viewport Test (390px x 844px)
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 600));
  console.log("Mobile hero captured");
  await page.screenshot({ path: "refine-11-mobile-hero.png" });

  // 12. Reduced Motion Test
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
  await new Promise((r) => setTimeout(r, 800));
  const reducedScrub = await page.evaluate(() => document.getElementById("scrub-indicator")?.textContent);
  console.log("Reduced motion scrub indicator:", reducedScrub);
  await page.screenshot({ path: "refine-12-reduced-motion.png" });

  await browser.close();
  console.log("All verification stages completed successfully!");
}

run().catch(console.error);
