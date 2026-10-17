import puppeteer from 'puppeteer-core';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\LENOVO\\.gemini\\antigravity-ide\\brain\\fbfc065f-a160-474d-8376-9e23d190ec95';

async function testCards() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto('http://localhost:3000/katalog', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // Scroll down so the product grid is fully in view
  await page.evaluate(() => {
    window.scrollBy(0, 350);
  });
  await new Promise(r => setTimeout(r, 500));

  const ss = path.join(artifactDir, 'katalog-742-grid-scrolled.png');
  await page.screenshot({ path: ss, fullPage: false });
  console.log('Saved:', ss);

  await browser.close();
}

testCards().catch(console.error);
