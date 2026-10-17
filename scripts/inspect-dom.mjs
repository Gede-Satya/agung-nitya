import puppeteer from 'puppeteer-core';

async function main() {
  const browser = await puppeteer.connect({
    browserURL: 'http://127.0.0.1:9222',
    defaultViewport: null
  });

  const pages = await browser.pages();
  const inaprocPage = pages.find(p => p.url().includes('katalog.inaproc.id'));
  
  if (!inaprocPage) return;

  const info = await inaprocPage.evaluate(() => {
    // Find all links
    const allLinks = Array.from(document.querySelectorAll('a')).map(a => a.href);
    
    // Find elements containing "Rp" or prices
    const priceElements = Array.from(document.querySelectorAll('*')).filter(el => {
      return el.children.length === 0 && el.innerText && el.innerText.includes('Rp ');
    });
    
    const sampleCards = priceElements.map(el => {
      let parent = el.parentElement;
      for (let i = 0; i < 4; i++) {
        if (parent && parent.parentElement) parent = parent.parentElement;
      }
      return {
        tag: parent?.tagName,
        className: parent?.className,
        htmlSnippet: parent?.outerHTML?.slice(0, 400),
        text: parent?.innerText?.split('\n').filter(Boolean)
      };
    });

    return {
      allLinksCount: allLinks.length,
      sampleLinks: allLinks.filter(l => !l.includes('#') && !l.includes('javascript')).slice(0, 20),
      pricesCount: priceElements.length,
      sampleCards: sampleCards.slice(0, 3)
    };
  });

  console.log('Result:', JSON.stringify(info, null, 2));
}

main().catch(console.error);
