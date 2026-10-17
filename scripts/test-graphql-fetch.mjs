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

  const result = await page.evaluate(async () => {
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
            images
            labels
            defaultPrice
            defaultPriceWithTax
            name
            stockAvailability
            sellerName
            username
            slug
            brand {
              brandName
            }
            category {
              name
              id
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

    // Test with perPage: 100
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
              page: 1,
              perPage: 100
            }
          }
        }
      })
    });

    const json = await res.json();
    return json;
  });

  console.log('Test perPage=100 result:');
  const sp = result.data?.searchProducts;
  if (sp) {
    console.log('Total:', sp.total);
    console.log('perPage:', sp.perPage);
    console.log('currentPage:', sp.currentPage);
    console.log('lastPage:', sp.lastPage);
    console.log('Items returned count:', sp.items?.length);
    if (sp.items?.length > 0) {
      console.log('Item 0:', sp.items[0].name, 'Rp', sp.items[0].defaultPriceWithTax);
      console.log('Item last:', sp.items[sp.items.length - 1].name, 'Rp', sp.items[sp.items.length - 1].defaultPriceWithTax);
    }
  } else {
    console.log('Error or other response:', JSON.stringify(result, null, 2));
  }

  process.exit(0);
}

main().catch(console.error);
