export default async function Home() {
  let products: any[] = [];
  let errorMessage = '';

  try {
    const domain = process.env.SHOPIFY_STORE_DOMAIN;
    const token = process.env.SHOPIFY_STOREFRONT_TOKEN;

    if (!domain) throw new Error('SHOPIFY_STORE_DOMAIN 未设置！必须填你的 .myshopify.com 地址');
    if (!token) throw new Error('SHOPIFY_STOREFRONT_TOKEN 未设置！');

    const response = await fetch(
      `https://${domain}/api/2026-01/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': token,
        },
        body: JSON.stringify({
          query: `
            { products(first: 12) {
                edges {
                  node {
                    id title handle
                    images(first: 1) { edges { node { url } } }
                    variants(first: 1) {
                      edges { node { id price { amount currencyCode } } }
                    }
                  }
                }
              }
            }
          `
        }),
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error(`Shopify API 错误 ${response.status}：${await response.text()}`);
    }

    const { data } = await response.json();
    products = data.products.edges;

  } catch (err: any) {
    errorMessage = err.message || '未知服务器错误';
    console.error('Shopify fetch 错误:', err);
  }

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', fontSize: '48px', marginBottom: '40px' }}>
        My Shopify Store
      </h1>

      {errorMessage ? (
        <div style={{ color: 'red', background: '#ffebee', padding: '30px', borderRadius: '12px', border: '2px solid red', textAlign: 'center', fontSize: '18px' }}>
          ❌ 出错了：<br />{errorMessage}<br /><br />
          请把这个错误文字完整发给我，我立刻帮你修复！
        </div>
      ) : products.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
          {products.map((item: any) => {
            const p = item.node;
            const img = p.images.edges[0]?.node.url;
            const variantId = p.variants.edges[0]?.node.id.split('/').pop();
            return (
              <div key={p.id} style={{ border: '1px solid #ddd', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                {img && < img src={img} alt={p.title} style={{ width: '100%', height: '280px', objectFit: 'cover' }} />}
                <div style={{ padding: '20px' }}>
                  <h3>{p.title}</h3>
                  <p style={{ fontSize: '18px', margin: '10px 0' }}>
                    {p.variants.edges[0]?.node.price.amount} {p.variants.edges[0]?.node.price.currencyCode}
                  </p >
                  <a href= "_blank"
                    style={{ display: 'block', background: '#000', color: '#fff', padding: '14px', textAlign: 'center', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
                    立即购买
                  </a >
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p style={{ textAlign: 'center', fontSize: '20px' }}>暂无商品</p >
      )}
    </div>
  );
}