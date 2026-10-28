import puppeteer from 'puppeteer-core';
import fs from 'fs';

const chromePaths = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
];
const exe = chromePaths.find(p => fs.existsSync(p));

if (exe) {
  const browser = await puppeteer.launch({ executablePath: exe, headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'C:/Users/LENOVO/.gemini/antigravity-ide/brain/5f8cd63a-a013-4af4-8b83-a7916ceec6e9/hero_poppins.png' });
  await browser.close();
  console.log('SUCCESS');
}
