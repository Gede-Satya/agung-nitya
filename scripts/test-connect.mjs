import puppeteer from 'puppeteer-core';

async function main() {
  const browser = await puppeteer.connect({
    browserURL: 'http://127.0.0.1:9222',
    defaultViewport: null
  });

  const pages = await browser.pages();
  const inaprocPage = pages.find(p => p.url().includes('katalog.inaproc.id'));
  
  if (!inaprocPage) {
    console.error('Inaproc page not found');
    return;
  }

  console.log('Connected to tab:', inaprocPage.url());

  const data = await inaprocPage.evaluate(() => {
    // Look for all product cards in current page
    const cards = Array.from(document.querySelectorAll('a[href*="/product/"]'));
    return cards.map(c => {
      const href = c.getAttribute('href');
      const img = c.querySelector('img')?.getAttribute('src');
      const text = c.innerText.split('\n').filter(Boolean);
      return { href, img, text };
    });
  });

  console.log(`Extracted ${data.length} products from current page:`);
  console.log(JSON.stringify(data.slice(0, 3), null, 2));

  // Check if there are cookies
  const cookies = await inaprocPage.cookies();
  console.log('Cookies count:', cookies.length);
  const cfCookies = cookies.map(c => c.name);
  console.log('Cookie names:', cfCookies);
}

main().catch(console.error);
