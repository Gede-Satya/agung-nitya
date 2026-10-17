import puppeteer from 'puppeteer-core';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testReferrerPolicy() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Test loading the image directly with no-referrer
  const status = await page.evaluate(async () => {
    return new Promise((resolve) => {
      const img = new Image();
      img.referrerPolicy = 'no-referrer';
      img.onload = () => resolve({ success: true, width: img.naturalWidth, height: img.naturalHeight });
      img.onerror = (e) => resolve({ success: false });
      img.src = 'https://asset.inaproc.id/upload/8971ee2a-c095-11f1-af9c-a6b1f9d8fd25.jpeg';
    });
  });

  console.log('Result with referrerPolicy="no-referrer":', status);

  await browser.close();
}

testReferrerPolicy().catch(console.error);
