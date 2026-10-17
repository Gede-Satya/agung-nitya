import puppeteer from 'puppeteer-core';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function sniffAll() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  const allReqs = [];

  page.on('request', req => {
    allReqs.push(`${req.method()} ${req.url()}`);
  });

  page.on('response', async res => {
    const ct = res.headers()['content-type'] || '';
    if (ct.includes('json')) {
      try {
        const text = await res.text();
        console.log(`[JSON Response] ${res.status()} ${res.url()} (size: ${text.length})`);
        if (text.length > 50) {
          console.log('Snippet:', text.slice(0, 300));
        }
      } catch (e) {}
    }
  });

  await page.goto('https://katalog.inaproc.id/agung-wijaya-nitya', {
    waitUntil: 'networkidle0',
    timeout: 45000
  });

  console.log('\n--- ALL REQUESTS ---');
  console.log('Total requests:', allReqs.length);
  const nonStatic = allReqs.filter(r => !r.includes('.js') && !r.includes('.css') && !r.includes('.woff') && !r.includes('.png') && !r.includes('.jpg') && !r.includes('.webp') && !r.includes('.svg'));
  console.log('Non-static requests:', nonStatic);

  // Let's also inspect DOM in page:
  const domInfo = await page.evaluate(() => {
    // Look for product cards
    const cards = Array.from(document.querySelectorAll('a[href*="/product/"]'));
    return {
      title: document.title,
      productLinks: cards.map(a => ({
        href: a.href,
        text: a.innerText.slice(0, 100)
      })),
      bodyTextSnippet: document.body.innerText.slice(0, 500)
    };
  });
  console.log('\n--- DOM INFO ---');
  console.log('Title:', domInfo.title);
  console.log('Product links count on page 1:', domInfo.productLinks.length);
  if (domInfo.productLinks.length > 0) {
    console.log('First 3 links:', domInfo.productLinks.slice(0, 3));
  }
  console.log('Body snippet:', domInfo.bodyTextSnippet);

  await browser.close();
}

sniffAll().catch(console.error);
