import React, { createContext, useContext, useMemo, useState } from "react";

export type CartProductInput = {
  id?: string;
  title?: string;
  category?: string;
  description?: string;
  price?: string | number;
  image?: string;
  size?: string;
};

export type CartItem = {
  key: string;
  id: string;
  title: string;
  category: string;
  description: string;
  priceLabel: string;
  unitPrice: number | null;
  image: string;
  size: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  totalQuantity: number;
  subtotal: number;
  addToCart: (product: CartProductInput, quantity?: number) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeFromCart: (key: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1170&auto=format&fit=crop";

function parsePriceToNumber(value: string | number | undefined): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value !== "string") {
    return null;
  }

  const cleaned = value.replace(/[^0-9.,]/g, "");
  if (!cleaned) return null;

  let normalized = cleaned;
  const hasComma = cleaned.includes(",");
  const hasDot = cleaned.includes(".");

  if (hasComma && hasDot) {
    const lastComma = cleaned.lastIndexOf(",");
    const lastDot = cleaned.lastIndexOf(".");
    const decimalSep = lastComma > lastDot ? "," : ".";
    const thousandsSep = decimalSep === "," ? "." : ",";
    normalized = cleaned.split(thousandsSep).join("").replace(decimalSep, ".");
  } else if (hasComma) {
    normalized = /,\d{1,2}$/.test(cleaned)
      ? cleaned.replace(",", ".")
      : cleaned.split(",").join("");
  } else if (hasDot) {
    normalized = /\.\d{1,2}$/.test(cleaned)
      ? cleaned
      : cleaned.split(".").join("");
  }

  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

export function formatUSD(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: CartProductInput, quantity = 1) => {
    const safeQuantity = Math.max(1, Math.floor(quantity));
    const title = product.title ?? "Nike Shoes";
    const id = product.id ?? title.toLowerCase().replace(/\s+/g, "-");
    const size = product.size ?? "EU 45.5";
    const key = `${id}::${size}`;
    const unitPrice = parsePriceToNumber(product.price);
    const priceLabel =
      unitPrice != null
        ? formatUSD(unitPrice)
        : typeof product.price === "string"
          ? product.price
          : "Price unavailable";

    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.key === key);
      if (existingIndex === -1) {
        return [
          ...prev,
          {
            key,
            id,
            title,
            category: product.category ?? "Sneakers",
            description: product.description ?? "Nike product.",
            priceLabel,
            unitPrice,
            image: product.image ?? FALLBACK_IMAGE,
            size,
            quantity: safeQuantity,
          },
        ];
      }

      const next = [...prev];
      next[existingIndex] = {
        ...next[existingIndex],
        quantity: next[existingIndex].quantity + safeQuantity,
        unitPrice: next[existingIndex].unitPrice ?? unitPrice,
        priceLabel:
          next[existingIndex].priceLabel === "Price unavailable"
            ? priceLabel
            : next[existingIndex].priceLabel,
      };
      return next;
    });
  };

  const updateQuantity = (key: string, quantity: number) => {
    const safeQuantity = Math.max(0, Math.floor(quantity));
    setItems((prev) =>
      safeQuantity === 0
        ? prev.filter((item) => item.key !== key)
        : prev.map((item) => (item.key === key ? { ...item, quantity: safeQuantity } : item)),
    );
  };

  const removeFromCart = (key: string) => {
    setItems((prev) => prev.filter((item) => item.key !== key));
  };

  const clearCart = () => setItems([]);

  const totalQuantity = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );
  const itemCount = items.length;
  const subtotal = useMemo(
    () =>
      items.reduce((sum, item) => {
        if (item.unitPrice == null) return sum;
        return sum + item.unitPrice * item.quantity;
      }, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      itemCount,
      totalQuantity,
      subtotal,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
    }),
    [itemCount, items, subtotal, totalQuantity],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
