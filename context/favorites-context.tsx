import React, { createContext, useContext, useMemo, useState } from "react";

export type FavoriteProductInput = {
  id?: string;
  title?: string;
  category?: string;
  description?: string;
  price?: string | number;
  image?: string;
};

export type FavoriteItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  price: string;
  image: string;
};

type FavoritesContextValue = {
  items: FavoriteItem[];
  favoriteCount: number;
  isFavorite: (id?: string, fallbackTitle?: string) => boolean;
  toggleFavorite: (product: FavoriteProductInput) => void;
  removeFavorite: (id?: string, fallbackTitle?: string) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1170&auto=format&fit=crop";

function resolveProductId(id?: string, fallbackTitle?: string) {
  if (id && id.trim().length > 0) return id;
  if (fallbackTitle && fallbackTitle.trim().length > 0) {
    return fallbackTitle.toLowerCase().replace(/\s+/g, "-");
  }
  return "unknown-product";
}

function resolvePriceLabel(price?: string | number) {
  if (typeof price === "number" && Number.isFinite(price)) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  }
  if (typeof price === "string" && price.trim().length > 0) {
    return price;
  }
  return "Price unavailable";
}

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<FavoriteItem[]>([]);

  const isFavorite = (id?: string, fallbackTitle?: string) => {
    const key = resolveProductId(id, fallbackTitle);
    return items.some((item) => item.id === key);
  };

  const toggleFavorite = (product: FavoriteProductInput) => {
    const key = resolveProductId(product.id, product.title);

    setItems((prev) => {
      const exists = prev.some((item) => item.id === key);
      if (exists) {
        return prev.filter((item) => item.id !== key);
      }

      return [
        ...prev,
        {
          id: key,
          title: product.title ?? "Nike Shoes",
          category: product.category ?? "Sneakers",
          description: product.description ?? "Nike product.",
          price: resolvePriceLabel(product.price),
          image: product.image ?? FALLBACK_IMAGE,
        },
      ];
    });
  };

  const removeFavorite = (id?: string, fallbackTitle?: string) => {
    const key = resolveProductId(id, fallbackTitle);
    setItems((prev) => prev.filter((item) => item.id !== key));
  };

  const value = useMemo(
    () => ({
      items,
      favoriteCount: items.length,
      isFavorite,
      toggleFavorite,
      removeFavorite,
    }),
    [items],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used inside FavoritesProvider");
  }
  return context;
}
