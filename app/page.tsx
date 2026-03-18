export default function Home() {
  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '50px', 
      fontFamily: 'sans-serif',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ fontSize: '48px', color: '#000', marginBottom: '20px' }}>
        My Shopify Store
      </h1>
      <p style={{ fontSize: '24px', color: '#666' }}>
        欢迎来到我的店铺！（正在对接 Shopify 商品...）
      </p>
    </div>
  );
}