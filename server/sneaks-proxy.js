const express = require("express");
const cors = require("cors");
const SneaksAPI = require("sneaks-api");

const app = express();
const sneaks = new SneaksAPI();

const PORT = Number(process.env.SNEAKS_API_PORT || 4000);

app.use(cors());

function mapSneaksProduct(product, index) {
  const retailPrice = typeof product.retailPrice === "number"
    ? `$${product.retailPrice}`
    : "Price unavailable";

  return {
    id: product.styleID || product.shoeName || `sneaks-${index}`,
    title: product.shoeName || "Nike Shoes",
    category: product.brand || "Nike Shoes",
    description: product.description || "Product from Sneaks-API search results.",
    price: retailPrice,
    image:
      product.thumbnail ||
      product.image ||
      product.resellLinks?.stockX ||
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1170&auto=format&fit=crop",
    releaseDate: product.releaseDate || null,
    styleId: product.styleID || null,
  };
}

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "sneaks-proxy" });
});

app.get("/api/sneakers", (req, res) => {
  const q = String(req.query.q || "Nike");
  const limitValue = Number(req.query.limit || 12);
  const limit = Number.isNaN(limitValue) ? 12 : Math.min(Math.max(limitValue, 1), 30);

  sneaks.getProducts(q, limit, (err, products = []) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to fetch sneakers from Sneaks-API",
        error: String(err),
      });
    }

    const mapped = products.map(mapSneaksProduct);
    res.json({
      query: q,
      total: mapped.length,
      items: mapped,
    });
  });
});

app.listen(PORT, () => {
  console.log(`Sneaks proxy running on http://localhost:${PORT}`);
});
