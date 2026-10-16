import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

async function fetchAllProducts() {
  console.log('Connecting to Chrome via port 9222...');
  const browser = await puppeteer.connect({
    browserURL: 'http://127.0.0.1:9222',
    defaultViewport: null
  });

  const pages = await browser.pages();
  const page = pages.find(p => p.url().includes('katalog.inaproc.id'));
  if (!page) {
    console.error('Inaproc page not found in Chrome tabs');
    process.exit(1);
  }

  console.log('Found INAPROC page tab. Starting multi-page GraphQL batch extraction...');

  const query = `query searchProducts($input: SearchProductInput!) {
    searchProducts(input: $input) {
      ... on ListSearchProductResponse {
        total
        perPage
        currentPage
        lastPage
        items {
          id
          type
          isActive
          images
          isPreOrder
          isRegionPrice
          isSellerUMKK
          labels
          isWholesale
          defaultPrice
          defaultPriceWithTax
          createdAt
          maxPrice
          maxPriceWithTax
          minPrice
          minPriceWithTax
          ppnBmPercentage
          ppnPercentage
          tkdn {
            value
            bmpValue
            tkdnBmp
            status
          }
          location {
            name
            child {
              name
            }
          }
          name
          stockAvailability
          stockAccumulation
          sellerName
          sellerId
          unitSold
          username
          slug
          variants {
            id
            options {
              name
              value
            }
            price
            priceWithTax
            stock
          }
          brand {
            brandName
          }
          category {
            id
            name
          }
        }
      }
      ... on GenericError {
        __typename
        message
        code
      }
    }
  }`;

  const allItems = [];
  const perPage = 100;
  let totalReported = 0;
  let lastPage = 8;

  for (let p = 1; p <= lastPage; p++) {
    console.log(`Fetching batch page ${p}...`);
    const result = await page.evaluate(async (query, pageNum, perPage) => {
      const res = await fetch('/graphql', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'accept': 'application/graphql-response+json, application/json'
        },
        body: JSON.stringify({
          operationName: 'searchProducts',
          query,
          variables: {
            input: {
              sort: [{ field: 'CREATED_AT', order: 'DESC' }],
              filter: {
                strategy: 'SELLER_CATALOGUE',
                keyword: null,
                sellerId: '01J9R1W45B2V1NJWHKVSGTP328'
              },
              pagination: {
                page: pageNum,
                perPage: perPage
              }
            }
          }
        })
      });
      return await res.json();
    }, query, p, perPage);

    const sp = result.data?.searchProducts;
    if (!sp || !sp.items) {
      console.error(`Failed on page ${p}:`, result);
      break;
    }

    totalReported = sp.total;
    lastPage = sp.lastPage;
    allItems.push(...sp.items);
    console.log(`Page ${p} fetched: +${sp.items.length} items (Running total: ${allItems.length}/${totalReported})`);

    // Friendly delay between pages
    await new Promise(r => setTimeout(r, 600));
  }

  console.log(`\nSuccessfully downloaded all ${allItems.length} raw products!`);

  // Transform into structured format
  const formattedProducts = allItems.map((item, index) => {
    const rawPrice = item.defaultPriceWithTax || item.defaultPrice || 0;
    const priceFormatted = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(rawPrice);

    // Determine type label
    let itemType = 'Barang';
    if (item.type === 'SERVICE') itemType = 'Jasa';
    else if (item.type === 'DIGITAL') itemType = 'Digital';

    // Origin
    const isPDN = item.labels?.includes('PDN') || item.tkdn?.value > 0;
    const origin = isPDN ? 'PDN' : 'Impor';

    // Location
    const locProvince = item.location?.name || 'BALI';
    const locRegency = item.location?.child?.name || 'KAB. BADUNG';
    const locationStr = `${locRegency}, ${locProvince}`;

    // Category mapping & normalization
    const catName = item.category?.name || 'Perangkat TI & Elektronik';

    return {
      id: item.id,
      index: index + 1,
      name: item.name,
      slug: item.slug,
      type: itemType,
      category: catName,
      brand: item.brand?.brandName || 'Generik / Multi-brand',
      price: rawPrice,
      priceFormatted,
      origin,
      scale: item.isSellerUMKK ? 'UMKK' : 'Non-UMKK',
      tkdn: item.tkdn?.value ?? null,
      unitSold: item.unitSold ?? 0,
      stockAvailability: item.stockAvailability ?? true,
      image: item.images?.[0] || 'https://katalog.inaproc.id/images/default-product.png',
      images: item.images || [],
      location: locationStr,
      labels: item.labels || [],
      url: `https://katalog.inaproc.id/agung-wijaya-nitya/${item.slug}`
    };
  });

  // Save raw JSON
  const jsonPath = path.resolve('src/data/inaprocAllProducts.json');
  fs.writeFileSync(jsonPath, JSON.stringify(formattedProducts, null, 2), 'utf-8');
  console.log(`Saved JSON to ${jsonPath} (${(fs.statSync(jsonPath).size / 1024).toFixed(1)} KB)`);

  // Compute category statistics
  const catStats = {};
  for (const p of formattedProducts) {
    catStats[p.category] = (catStats[p.category] || 0) + 1;
  }
  console.log('\nCategory breakdown:');
  Object.entries(catStats)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => console.log(` - ${cat}: ${count} produk`));

  process.exit(0);
}

fetchAllProducts().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
