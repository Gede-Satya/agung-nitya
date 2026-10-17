import puppeteer from 'puppeteer-core';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\LENOVO\\.gemini\\antigravity-ide\\brain\\fbfc065f-a160-474d-8376-9e23d190ec95';

async function testMobile() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000/katalog', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  const ssMobile1 = path.join(artifactDir, 'katalog-742-mobile-top.png');
  await page.screenshot({ path: ssMobile1, fullPage: false });
  console.log('Saved mobile top:', ssMobile1);

  await page.evaluate(() => {
    window.scrollBy(0, 500);
  });
  await new Promise(r => setTimeout(r, 600));

  const ssMobile2 = path.join(artifactDir, 'katalog-742-mobile-cards.png');
  await page.screenshot({ path: ssMobile2, fullPage: false });
  console.log('Saved mobile cards:', ssMobile2);

  await browser.close();
}

testMobile().catch(console.error);
