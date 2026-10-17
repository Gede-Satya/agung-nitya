import puppeteer from 'puppeteer-core';

async function main() {
  const browser = await puppeteer.connect({
    browserURL: 'http://127.0.0.1:9222',
    defaultViewport: null
  });

  const pages = await browser.pages();
  const inaprocPage = pages.find(p => p.url().includes('katalog.inaproc.id'));
  if (!inaprocPage) {
    console.log('No page found');
    process.exit(1);
  }

  // Click the "10 Data" button to inspect its options
  const dropdownText = await inaprocPage.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button, div, span')).filter(el => el.innerText && el.innerText.trim().startsWith('10 Data'));
    if (btns.length > 0) {
      btns[0].click();
      return 'Clicked button: ' + btns[0].innerText;
    }
    return 'No 10 Data button found';
  });
  console.log('Dropdown click:', dropdownText);

  await new Promise(r => setTimeout(r, 1000));

  // Check what new elements appeared
  const menuOptions = await inaprocPage.evaluate(() => {
    const options = Array.from(document.querySelectorAll('*')).filter(el => {
      return el.innerText && (el.innerText.includes('20 Data') || el.innerText.includes('50 Data') || el.innerText.includes('100 Data') || el.innerText.includes('30 Data'));
    });
    return options.map(o => o.innerText.trim());
  });
  console.log('Menu options found:', [...new Set(menuOptions)]);

  process.exit(0);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
