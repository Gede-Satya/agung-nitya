import puppeteer from 'puppeteer-core';
import fs from 'fs';

const CHROME_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const URL = 'http://localhost:3000';

async function runQA() {
  console.log('🚀 Starting Phase 3 QA Test Suite...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  // Test 1: Viewports verification
  const viewports = [
    { width: 390, height: 844, name: '390-mobile' },
    { width: 768, height: 1024, name: '768-tablet' },
    { width: 1024, height: 768, name: '1024-laptop' },
    { width: 1440, height: 900, name: '1440-desktop' },
    { width: 1920, height: 1080, name: '1920-wide' },
  ];

  if (!fs.existsSync('public/qa-screenshots')) {
    fs.mkdirSync('public/qa-screenshots', { recursive: true });
  }

  for (const vp of viewports) {
    console.log(`\n📱 Testing Viewport ${vp.width}x${vp.height} (${vp.name})...`);
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto(`${URL}/#pemeliharaan-hardware`, { waitUntil: 'networkidle2' });
    await new Promise((r) => setTimeout(r, 600));

    // Check fit within one viewport height
    const fitInfo = await page.evaluate(() => {
      const stickyBox = document.querySelector('#pemeliharaan-hardware > div');
      return {
        stickyHeight: stickyBox ? stickyBox.offsetHeight : 0,
        windowHeight: window.innerHeight,
        fits: stickyBox ? stickyBox.offsetHeight <= window.innerHeight + 1 : false,
      };
    });
    console.log(`   Fit check: sticky=${fitInfo.stickyHeight}px, viewport=${fitInfo.windowHeight}px, fits=${fitInfo.fits}`);

    await page.screenshot({ path: `public/qa-screenshots/${vp.name}-initial.png` });

    // Scroll halfway into section
    await page.evaluate(() => {
      const sec = document.getElementById('pemeliharaan-hardware');
      if (sec) {
        window.scrollTo({ top: sec.offsetTop + sec.offsetHeight * 0.45, behavior: 'instant' });
      }
    });
    await new Promise((r) => setTimeout(r, 400));
    await page.screenshot({ path: `public/qa-screenshots/${vp.name}-midscroll.png` });
  }

  // Test 2: Rapid Scroll Up & Down
  console.log('\n⚡ Testing Fast Scroll Up and Down...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(URL, { waitUntil: 'networkidle2' });
  for (let i = 0; i < 5; i++) {
    await page.evaluate(() => window.scrollBy(0, 1500));
    await new Promise((r) => setTimeout(r, 50));
    await page.evaluate(() => window.scrollBy(0, -800));
    await new Promise((r) => setTimeout(r, 50));
  }
  console.log('   Fast scroll completed without crash.');

  // Test 3: Navbar Scrollspy verification
  console.log('\n🧭 Testing Navbar Scrollspy when in Pemeliharaan section...');
  await page.evaluate(() => {
    const sec = document.getElementById('pemeliharaan-hardware');
    if (sec) {
      window.scrollTo({ top: sec.offsetTop + 400, behavior: 'instant' });
    }
  });
  await new Promise((r) => setTimeout(r, 600));

  const activeNavText = await page.evaluate(() => {
    const activeLink = document.querySelector('header nav a[aria-current="true"]');
    return activeLink ? activeLink.textContent.trim() : null;
  });
  console.log('   Active nav evaluation:', activeNavText);

  // Test 4: Stepper Click and Focus Navigation
  console.log('\n🔘 Testing Stepper Buttons and Focus Navigation...');
  const stepperResult = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('#pemeliharaan-hardware nav button'));
    return buttons.map((b) => ({
      text: b.textContent.replace(/\s+/g, ' ').trim(),
      ariaCurrent: b.getAttribute('aria-current'),
    }));
  });
  console.log('   Stepper buttons:', stepperResult);

  // Click stage 3 (Upgrade & Penggantian)
  const buttons = await page.$$('#pemeliharaan-hardware nav button');
  if (buttons.length >= 3) {
    console.log('   Clicking Stage 3 button...');
    await buttons[2].click();
    await new Promise((r) => setTimeout(r, 700));
    await page.screenshot({ path: 'public/qa-screenshots/stage3-clicked.png' });
  }

  // Test 5: Prefers-reduced-motion
  console.log('\n♿ Testing prefers-reduced-motion...');
  const pageRM = await browser.newPage();
  await pageRM.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await pageRM.goto(`${URL}/#pemeliharaan-hardware`, { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 1200));
  const reducedMotionState = await pageRM.evaluate(() => {
    const sec = document.getElementById('pemeliharaan-hardware');
    const canvas = sec ? sec.querySelector('canvas') : null;
    const staticImg = sec ? sec.querySelector('img') : null;
    const height = sec ? sec.style.height : '';
    return { hasCanvas: !!canvas, hasStaticImg: !!staticImg, height };
  });
  console.log('   Reduced motion state:', reducedMotionState);
  await pageRM.screenshot({ path: 'public/qa-screenshots/reduced-motion.png' });
  await pageRM.close();

  console.log(`\n🔍 Console Errors logged during QA: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.log(consoleErrors);
  }

  await browser.close();
  console.log('\n✅ Phase 3 QA Test Suite Finished Successfully!');
}

runQA().catch((err) => {
  console.error('QA Test Suite Failed:', err);
  process.exit(1);
});
