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

  let captured = false;

  page.on('request', req => {
    if (req.url().includes('graphql')) {
      console.log('\n=== GRAPHQL REQUEST CAPTURED ===');
      console.log('URL:', req.url());
      console.log('Headers:', JSON.stringify(req.headers(), null, 2));
      console.log('Post Data:', req.postData());
      captured = true;
    }
  });

  page.on('response', async res => {
    if (res.url().includes('graphql')) {
      console.log('\n=== GRAPHQL RESPONSE CAPTURED ===');
      try {
        const json = await res.json();
        console.log('Response sample:', JSON.stringify(json, null, 2).slice(0, 1500));
      } catch (e) {}
    }
  });

  console.log('Navigating to page 4 to trigger GraphQL...');
  await page.goto('https://katalog.inaproc.id/agung-wijaya-nitya?page=4', { waitUntil: 'networkidle2', timeout: 30000 });

  await new Promise(r => setTimeout(r, 2000));
  process.exit(0);
}

main().catch(console.error);
