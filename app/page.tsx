'use client';

export default function Home() {
  // 目前只有一個商品（你之後可以繼續在陣列裡新增）
  const products = [
    {
      id: 1,
      title: "拉杆箱",
      price: { amount: 255, currencyCode: "USD" },
      variantId: "51217893490992",   // ← 已改成你 Shopify 最新的正確 variant ID
    },
  ];

  const handleBuy = (variantId: string) => {
    // 使用你已驗證成功的自訂結帳域名
    const checkoutUrl = `https://checkout.hsanat.com/cart/${variantId}:1`;
    window.open(checkoutUrl, "_blank");
  };

  return (
    <div style={{ 
      padding: "40px", 
      textAlign: "center", 
      fontFamily: "system-ui",
      maxWidth: "1200px",
      margin: "0 auto"
    }}>
      <h1 style={{ marginBottom: "40px" }}>My Shopify Store</h1>

      <div style={{ 
        display: "flex", 
        gap: "30px", 
        justifyContent: "center", 
        flexWrap: "wrap" 
      }}>
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ddd",
              padding: "30px",
              borderRadius: "12px",
              width: "320px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
            }}
          >
            <h3 style={{ marginBottom: "10px" }}>{p.title}</h3>
            <p style={{ fontSize: "26px", fontWeight: "bold", margin: "15px 0" }}>
              {p.price.amount} {p.price.currencyCode}
            </p>

            <button
              onClick={() => handleBuy(p.variantId)}
              style={{
                display: "block",
                width: "100%",
                padding: "16px",
                background: "#000",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "17px",
                fontWeight: "bold",
                cursor: "pointer",
                marginTop: "20px"
              }}
            >
              立即購買
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}