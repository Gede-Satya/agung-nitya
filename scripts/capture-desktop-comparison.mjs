import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const artifactDir = "C:\\Users\\LENOVO\\.gemini\\antigravity-ide\\brain\\f3a013ef-fcf8-45d3-9ca4-5a49ad75cc7d";

if (!fs.existsSync(artifactDir)) {
  fs.mkdirSync(artifactDir, { recursive: true });
}

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const targets = [
    { url: "http://localhost:3000/", name: "desktop-1440-home-after", width: 1440, height: 900 },
    { url: "http://localhost:3000/katalog", name: "desktop-1440-katalog-after", width: 1440, height: 900 },
    { url: "http://localhost:3000/", name: "desktop-1280-home-after", width: 1280, height: 800 },
    { url: "http://localhost:3000/katalog", name: "desktop-1280-katalog-after", width: 1280, height: 800 },
  ];

  for (const t of targets) {
    const page = await browser.newPage();
    await page.setViewport({ width: t.width, height: t.height, deviceScaleFactor: 1 });
    await page.goto(t.url, { waitUntil: "networkidle0", timeout: 30000 });
    await new Promise((r) => setTimeout(r, 1500));

    // Capture viewport (first screen)
    const viewportPath = path.join(artifactDir, `${t.name}-viewport.png`);
    await page.screenshot({ path: viewportPath });
    console.log(`Saved: ${viewportPath}`);

    // If home, also capture scrolled sections: Ekosistem & Unit Siap
    if (t.url === "http://localhost:3000/") {
      await page.evaluate(() => {
        const el = document.getElementById("ekosistem");
        if (el) el.scrollIntoView();
      });
      await new Promise((r) => setTimeout(r, 800));
      const sectionPath = path.join(artifactDir, `${t.name}-sections.png`);
      await page.screenshot({ path: sectionPath });
      console.log(`Saved: ${sectionPath}`);
    }

    await page.close();
  }

  await browser.close();
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});
