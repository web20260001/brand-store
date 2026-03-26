'use client';

export default function Home() {
  // 硬編碼產品（暫時繞過 API，避免 401 錯誤）
  const products = [
    {
      id: 1,
      title: "拉杆箱",
      price: { amount: 255, currencyCode: "USD" },
      variantId: "10111565070640",   // 你的真實 variant ID
    },
    // 你可以繼續在這裡新增其他商品
  ];

  const handleBuy = (variantId: string) => {
  if (!variantId) {
    alert("Product not available");
    return;
  }

  const checkoutUrl = `https://m9dtcg-0u.myshopify.com/cart/${variantId}:1`;
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
              padding: "20px",
              borderRadius: "12px",
              width: "280px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}
          >
            <h3>{p.title}</h3>
            <p style={{ fontSize: "22px", fontWeight: "bold", margin: "10px 0" }}>
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