import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

// Data Dummy Size
const SIZES = [
  "EU 40",
  "EU 41",
  "EU 42",
  "EU 42.5",
  "EU 43",
  "EU 44",
  "EU 45",
  "EU 45.5",
  "EU 46",
  "EU 47.5",
];

export default function ProductDetailScreen() {
  const router = useRouter();
  const { product } = useLocalSearchParams<{ product?: string }>();
  const [selectedSize, setSelectedSize] = useState("EU 45.5");
  const [activeSlide, setActiveSlide] = useState(0);

  const parsedProduct = useMemo(() => {
    if (!product) return null;
    const raw = Array.isArray(product) ? product[0] : product;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }, [product]);

  const fallbackTitle = "Air Jordan 1 Low SE";
  const fallbackCategory = "Men's Shoes";
  const fallbackDescription =
    "Always in, always fresh. The Air Jordan 1 Low sets you up with a piece of Jordan history and heritage that's comfortable all day. Choose your colours, then step out in the iconic profile that's built with a high-end mix of materials and encapsulated Air in the heel.";
  const fallbackImage =
    "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b1bcbca4-e853-4df7-b329-5be3c61ee057/air-jordan-1-low-se-mens-shoes-hgc4Q5.png";

  const productTitle = parsedProduct?.title ?? fallbackTitle;
  const productCategory = parsedProduct?.category ?? fallbackCategory;
  const productDescription = parsedProduct?.description ?? fallbackDescription;
  const productPrice =
    typeof parsedProduct?.price === "number"
      ? `$${parsedProduct.price.toFixed(2)}`
      : typeof parsedProduct?.price === "string"
        ? parsedProduct.price
        : "IDR 1,939,000";
  const productImage = parsedProduct?.image ?? fallbackImage;

  // Gambar Sepatu (Carousel)
  const images = [productImage, productImage, productImage];

  const handleScroll = (event: any) => {
    const slide = Math.ceil(
      event.nativeEvent.contentOffset.x /
        event.nativeEvent.layoutMeasurement.width,
    );
    if (slide !== activeSlide) {
      setActiveSlide(slide);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* 1. HEADER (Floating) */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" color="#000" size={24} />
        </TouchableOpacity>

        <Text style={styles.headerTitle} numberOfLines={1}>
          {productTitle}
        </Text>

        <View style={styles.headerActions}>
          <TouchableOpacity style={{ marginRight: 16 }}>
            <Ionicons name="share-social-outline" color="#000" size={24} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="search" color="#000" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}>
        {/* 2. IMAGE CAROUSEL */}
        <View style={styles.carouselContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}>
            {images.map((img, index) => (
              <View key={index} style={styles.imageWrapper}>
                <Image
                  source={{ uri: img }}
                  style={styles.productImage}
                  resizeMode="contain"
                />
              </View>
            ))}
          </ScrollView>

          {/* Dots Indicator */}
          <View style={styles.pagination}>
            {images.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, activeSlide === index && styles.activeDot]}
              />
            ))}
          </View>
        </View>

        {/* 3. PRODUCT INFO */}
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{productTitle}</Text>
          <Text style={styles.category}>{productCategory}</Text>
          <Text style={styles.price}>{productPrice}</Text>

          <Text style={styles.description}>{productDescription}</Text>

          <View style={styles.bulletPoints}>
            <Text style={styles.bulletText}>
              • Shown: Obsidian/University Gold/Chile Red/Obsidian
            </Text>
            <Text style={styles.bulletText}>• Style: IO7448-400</Text>
            <Text style={styles.bulletText}>
              • Country/Region of Origin: Vietnam
            </Text>
          </View>

          <TouchableOpacity>
            <Text style={styles.viewDetails}>View Product Details</Text>
          </TouchableOpacity>
        </View>

        {/* 4. SIZE SELECTOR */}
        <View style={styles.sizeSection}>
          <View style={styles.sizeHeader}>
            <Text style={styles.sectionLabel}>Select Size</Text>
            <TouchableOpacity style={styles.sizeGuideBtn}>
              <Ionicons name="ribbon-outline" size={16} color="#666" />
              <Text style={styles.sizeGuideText}>Size Guide</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}>
            {SIZES.map((size, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.sizeBox,
                  selectedSize === size && styles.selectedSizeBox,
                ]}
                onPress={() => setSelectedSize(size)}>
                <Text
                  style={[
                    styles.sizeText,
                    selectedSize === size && styles.selectedSizeText,
                  ]}>
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.lowStockWarning}>
            <Ionicons name="time-outline" size={16} color="#C2410C" />
            <Text style={styles.lowStockText}>Just a few left</Text>
          </View>
        </View>

        {/* 5. REVIEWS ACCORDION */}
        <View style={styles.reviewsSection}>
          <View style={styles.reviewsHeader}>
            <Text style={styles.reviewsTitle}>Reviews (0)</Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
              <View style={{ flexDirection: "row" }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Ionicons key={i} name="star" size={16} color="#000" />
                ))}
                {/* Bintang kosong outline hitam */}
              </View>
              <Ionicons name="chevron-down" size={20} color="#000" />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* 6. BOTTOM ACTIONS (Fixed) */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.addToBagBtn}>
          <Text style={styles.addToBagText}>Add to Bag</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.favoriteBtn}>
          <Text style={styles.favoriteText}>Favorite</Text>
          <Ionicons name="heart-outline" size={18} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    // Shadow tipis biar misah sama konten kalau discroll
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    marginTop: 40,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    flex: 1,
    textAlign: "center",
    marginHorizontal: 16,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },

  // Carousel
  carouselContainer: {
    width: width,
    height: 400,
    position: "relative",
    marginBottom: 20,
  },
  imageWrapper: {
    width: width,
    height: 380,
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    width: "90%",
    height: "90%",
  },
  pagination: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#ccc",
  },
  activeDot: {
    backgroundColor: "#000",
    width: 8,
    height: 8,
    borderRadius: 4,
    bottom: 1, // Sedikit adjust biar center
  },

  // Info
  infoContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "500", // Nike titles biasanya gak terlalu bold
    color: "#000",
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: "#000",
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    color: "#111",
    lineHeight: 22,
    marginBottom: 20,
  },
  bulletPoints: {
    marginBottom: 16,
  },
  bulletText: {
    fontSize: 14,
    color: "#111",
    lineHeight: 22,
    marginBottom: 2,
  },
  viewDetails: {
    fontSize: 14,
    textDecorationLine: "underline",
    fontWeight: "500",
    color: "#000",
  },

  // Size Section
  sizeSection: {
    marginBottom: 24,
  },
  sizeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  sizeGuideBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  sizeGuideText: {
    fontSize: 14,
    color: "#666",
  },
  sizeBox: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 8,
    minWidth: 70,
    alignItems: "center",
  },
  selectedSizeBox: {
    borderColor: "#000",
    borderWidth: 1.5,
  },
  sizeText: {
    fontSize: 14,
    color: "#000",
  },
  selectedSizeText: {
    fontWeight: "600",
  },
  lowStockWarning: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 12,
    paddingHorizontal: 20,
  },
  lowStockText: {
    color: "#C2410C", // Orange bata
    fontSize: 14,
  },

  // Reviews
  reviewsSection: {
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 50,
  },
  reviewsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reviewsTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },

  // Bottom Actions
  bottomActions: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 30, // Extra padding buat safe area
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    gap: 12,
  },
  addToBagBtn: {
    backgroundColor: "#000",
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: "center",
  },
  addToBagText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  favoriteBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 30,
    paddingVertical: 16,
  },
  favoriteText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
});
