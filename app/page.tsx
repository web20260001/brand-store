export default async function Home() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_TOKEN;

  const query = `
    {
      products(first: 12) {
        edges {
          node {
            id
            title
            handle
            images(first: 1) {
              edges {
                node {
                  url
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch(
    `https://${domain}/api/2025-01/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token!,
      },
      body: JSON.stringify({ query }),
      cache: 'no-store',
    }
  );

  const { data } = await response.json();
  const products = data.products.edges;

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', fontSize: '48px', marginBottom: '40px' }}>
        My Shopify Store
      </h1>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '30px' 
      }}>
        {products.map((item: any) => {
          const product = item.node;
          const image = product.images.edges[0]?.node.url;
          const variantId = product.variants.edges[0]?.node.id.split('/').pop();
          const price = product.variants.edges[0]?.node.price.amount;
          const currency = product.variants.edges[0]?.node.price.currencyCode;

          return (
            <div key={product.id} style={{ 
              border: '1px solid #ddd', 
              borderRadius: '12px', 
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              {image && (
                < img 
                  src={image} 
                  alt={product.title}
                  style={{ width: '100%', height: '280px', objectFit: 'cover' }}
                />
              )}
              <div style={{ padding: '20px' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '20px' }}>{product.title}</h3>
                <p style={{ fontSize: '18px', color: '#000', marginBottom: '20px' }}>
                  {price} {currency}
                </p >
                <a
                  href= "_blank"
                  style={{
                    display: 'block',
                    background: '#000',
                    color: '#fff',
                    textAlign: 'center',
                    padding: '14px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 'bold'
                  }}
                >
                  立即购买
                </a >
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}