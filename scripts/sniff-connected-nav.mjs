import puppeteer from 'puppeteer-core';

async function main() {
  const browser = await puppeteer.connect({
    browserURL: 'http://127.0.0.1:9222',
    defaultViewport: null
  });

  const pages = await browser.pages();
  const page = pages.find(p => p.url().includes('katalog.inaproc.id'));
  if (!page) {
    console.log('No page found');
    process.exit(1);
  }

  page.on('response', async res => {
    const url = res.url();
    if (!url.endsWith('.js') && !url.endsWith('.css') && !url.endsWith('.png') && !url.endsWith('.jpg') && !url.endsWith('.webp') && !url.endsWith('.woff2')) {
      const ct = res.headers()['content-type'] || '';
      console.log(`[RESP] ${res.status()} ${ct} ${url}`);
      if (ct.includes('json') || url.includes('_rsc')) {
        try {
          const text = await res.text();
          console.log(`Payload snippet (${text.length} chars):`, text.slice(0, 300));
        } catch (e) {}
      }
    }
  });

  console.log('Navigating page to page=3...');
  await page.goto('https://katalog.inaproc.id/agung-wijaya-nitya?page=3', { waitUntil: 'networkidle2', timeout: 30000 });

  // Extract products from page 3
  const products = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a[href^="https://katalog.inaproc.id/agung-wijaya-nitya/"]'));
    return links.map(a => {
      const title = a.querySelector('h3, h4, p, span, div')?.innerText || '';
      return {
        url: a.href,
        rawText: a.innerText.split('\n').filter(Boolean)
      };
    });
  });

  console.log(`Extracted from Page 3 (${products.length} products):`);
  console.log(JSON.stringify(products, null, 2));

  process.exit(0);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
