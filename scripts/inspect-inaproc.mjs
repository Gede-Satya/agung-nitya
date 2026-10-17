import fs from 'fs';

async function main() {
  const res = await fetch('https://katalog.inaproc.id/agung-wijaya-nitya', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });
  const html = await res.text();
  fs.writeFileSync('scripts/inaproc_sample.html', html);
  
  // Find self.__next_f
  const nextFMatches = [...html.matchAll(/self\.__next_f\.push\(\[1,"([\s\S]*?)"\]\)/g)];
  console.log('self.__next_f matches:', nextFMatches.length);
  
  let combinedNextF = '';
  for (const m of nextFMatches) {
    combinedNextF += m[1];
  }
  
  fs.writeFileSync('scripts/next_f.txt', combinedNextF);
  console.log('Saved next_f.txt, length:', combinedNextF.length);
  
  // Check if there are URLs or API calls
  const urls = combinedNextF.match(/https?:\/\/[a-zA-Z0-9_\-\.\/\?=&%]+/g) || [];
  console.log('Unique URLs in RSC payload:', [...new Set(urls)].slice(0, 20));
  
  // Look for keywords like agung-wijaya-nitya or product or vendor
  const vendorMatch = combinedNextF.match(/agung-wijaya-nitya/g);
  console.log('Mentions username:', vendorMatch?.length);
}
main();
