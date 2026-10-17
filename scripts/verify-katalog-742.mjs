import puppeteer from 'puppeteer-core';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\LENOVO\\.gemini\\antigravity-ide\\brain\\fbfc065f-a160-474d-8376-9e23d190ec95';

async function verify() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  
  console.log('Navigating to http://localhost:3000/katalog...');
  await page.goto('http://localhost:3000/katalog', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1500));

  // 1. Initial State
  const initialInfo = await page.evaluate(() => {
    const bannerText = document.querySelector('body')?.innerText || '';
    const cards = document.querySelectorAll('h3');
    const categoryButtons = Array.from(document.querySelectorAll('button')).map(b => b.innerText.trim()).filter(t => t.includes('(') || t.includes('416') || t.includes('742'));
    return {
      title: document.title,
      totalCardsOnPage1: cards.length,
      firstCard: cards[0]?.innerText,
      secondCard: cards[1]?.innerText,
      categoryButtons: categoryButtons.slice(0, 8),
      mentions742: bannerText.includes('742')
    };
  });
  console.log('Initial Info:', JSON.stringify(initialInfo, null, 2));

  // Screenshot 1: Desktop View
  const ss1 = path.join(artifactDir, 'katalog-742-initial.png');
  await page.screenshot({ path: ss1, fullPage: false });
  console.log('Saved screenshot 1:', ss1);

  // 2. Test Category: Perangkat Lunak/Software
  console.log('\nTesting click on "Perangkat Lunak/Software"...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const softwareBtn = btns.find(b => b.innerText.includes('Perangkat Lunak/Software'));
    if (softwareBtn) softwareBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));

  const softwareInfo = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('h3')).map(h => h.innerText);
    const countText = document.querySelector('#catalog-results')?.innerText;
    return { countText, sampleCards: cards.slice(0, 5) };
  });
  console.log('Software Category Info:', JSON.stringify(softwareInfo, null, 2));

  const ss2 = path.join(artifactDir, 'katalog-742-software.png');
  await page.screenshot({ path: ss2, fullPage: false });
  console.log('Saved screenshot 2:', ss2);

  // 3. Test Search: "Sony"
  console.log('\nTesting search for "Sony"...');
  await page.type('input[placeholder*="Cari dari 742 produk"]', 'Sony');
  await new Promise(r => setTimeout(r, 600));

  const sonyInfo = await page.evaluate(() => {
    const countText = document.querySelector('#catalog-results')?.innerText;
    const cards = Array.from(document.querySelectorAll('h3')).map(h => h.innerText);
    return { countText, sampleCards: cards.slice(0, 4) };
  });
  console.log('Search "Sony" Info:', JSON.stringify(sonyInfo, null, 2));

  const ss3 = path.join(artifactDir, 'katalog-742-search-sony.png');
  await page.screenshot({ path: ss3, fullPage: false });
  console.log('Saved screenshot 3:', ss3);

  await browser.close();
  console.log('\nAll QA tests completed successfully!');
}

verify().catch(console.error);
