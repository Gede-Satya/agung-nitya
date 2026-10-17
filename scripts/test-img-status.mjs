import puppeteer from 'puppeteer-core';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testImg() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  page.on('response', res => {
    if (res.url().includes('asset.inaproc.id')) {
      console.log('Asset response:', res.status(), res.url(), res.headers()['content-type']);
    }
  });

  page.on('requestfailed', req => {
    if (req.url().includes('asset.inaproc.id')) {
      console.log('Asset request FAILED:', req.url(), req.failure()?.errorText);
    }
  });

  await page.goto('http://localhost:3000/katalog', { waitUntil: 'networkidle0' });

  await browser.close();
}

testImg().catch(console.error);
