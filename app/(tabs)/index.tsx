import { useFavorites } from "@/context/favorites-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// 1. KITA IMPORT AXIOS YANG UDAH DI-SETTING DARI FOLDER API
import api from "../../api/axios";

const { width } = Dimensions.get("window");

// ==========================================
// GANTI 192.168.X.X SAMA IP WIFI LAPTOP LU!
// ==========================================
const IP_LAPTOP = "192.168.0.114"; 
const ASSET_URL = `http://${IP_LAPTOP}/Nike_Clone_Web_App/public/storage/`;

type ProductItem = {
  id: string;
  title?: string;
  category?: string;
  description?: string;
  price?: string;
  image?: string;
};

const STORIES = [
  {
    id: 1,
    title: "How to Choose the Best Nike Soccer Cleats",
    category: "Buying Guide",
    image:
      "https://static.nike.com/a/images/f_auto,cs_srgb/w_960,c_limit/66801069-cf93-4b0a-8329-b5ae9b965f45/nike-komt-met-een-nieuwe-voetbalschoen-de-tiempo-legend-10.jpg",
  },
  {
    id: 2,
    title: "The origins of the Dunk",
    category: "From the archives",
    image:
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRzYRMjoHpkU2XfpA0US0OmwPOi1jQ9yBkg7QuTp_rWzs7WK7Zj",
  },
];

const SNEAKER_WEEK_DATA = [
  {
    id: "1",
    label: "Sneaker of the Week",
    desc: "Get fast dibs on the week's best drops every Friday...",
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a3e7dead-1ad2-4c40-996d-93ebc9df0fca/dunk-low-retro-mens-shoes-njHwD3.png",
  },
  {
    id: "2",
    label: "Just In: Air Max",
    desc: "Classic comfort meets modern style.",
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e6da41fa-1be4-4ce5-b89c-22be4f1f02d4/air-force-1-07-mens-shoes-jBrhbr.png",
  },
];

// ==========================================
// 2. FUNGSI FETCH LARAVEL ADA DI SINI CUI
// ==========================================
async function fetchLaravelProducts() {
  try {
    // Nembak ke http://IP_LAPTOP/Nike_Clone_Web_App/public/api/products
    const response = await api.get('/products');
    
    const mapped: ProductItem[] = response.data.data.map((item: any) => ({
      id: item.id.toString(),
      title: item.nama_barang,
      category: "Sneakers", 
      description: item.deskripsi,
      price: item.harga.toString(), 
      image: `${ASSET_URL}${item.gambar}`,
    }));

    if (!mapped.length) {
      throw new Error("Katalog produk di Laravel masih kosong.");
    }

    return mapped;
  } catch (error: any) {
    if (error.response) {
      throw new Error(`Server Error: ${error.response.status}`);
    } else if (error.request) {
      throw new Error("Gagal nyambung ke Laravel. Cek IP Address lu!");
    } else {
      throw new Error(error.message);
    }
  }
}

const Header = () => (
  <View style={styles.header}>
    <View style={styles.logoToggle}>
      <Image
        source={{ uri: "https://img.icons8.com/ios-filled/50/000000/nike.png" }}
        style={{
          width: 26,
          height: 26,
          marginRight: 10,
          tintColor: "black",
          resizeMode: "contain",
        }}
      />
      <View style={{ width: 1, height: 12, backgroundColor: "#ddd" }} />
      <Image
        source={{
          uri: "https://img.icons8.com/ios-filled/50/000000/air-jordan.png",
        }}
        style={{
          width: 26,
          height: 26,
          marginLeft: 10,
          tintColor: "#aaa",
          resizeMode: "contain",
        }}
      />
    </View>
    <TouchableOpacity>
      <Ionicons name="search-outline" size={24} color="black" />
    </TouchableOpacity>
  </View>
);

const ProductCard = ({ item }: { item: ProductItem }) => {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();
  
  // Format harga ke Rupiah
  const formattedPrice = item.price 
    ? `Rp ${parseInt(item.price).toLocaleString('id-ID')}` 
    : "Harga tidak tersedia";

  const safeItem = {
    ...item,
    title: item.title ?? "Nike Shoes",
    category: item.category ?? "Sneakers",
    description: item.description ?? "Product from Laravel API.",
    price: item.price,
    image:
      item.image ??
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1170&auto=format&fit=crop",
  };
  
  const favorited = isFavorite(safeItem.id, safeItem.title);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        router.push({
          pathname: "/detailproduct",
          params: {
            product: JSON.stringify(safeItem),
          },
        })
      }>
      <View style={styles.productCard}>
        <View style={styles.productImageBg}>
          <TouchableOpacity
            style={styles.cardHeartBtn}
            onPress={(event) => {
              event.stopPropagation();
              toggleFavorite({
                id: safeItem.id,
                title: safeItem.title,
                category: safeItem.category,
                description: safeItem.description,
                price: formattedPrice,
                image: safeItem.image,
              });
            }}>
            <Ionicons
              name={favorited ? "heart" : "heart-outline"}
              size={18}
              color="#111"
            />
          </TouchableOpacity>
          <Image source={{ uri: safeItem.image }} style={styles.productImage} />
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.productTitle} numberOfLines={1}>
            {safeItem.title}
          </Text>
          <Text style={styles.productCategory}>{safeItem.category}</Text>
          <Text style={styles.productPrice}>{formattedPrice}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const EditorialBanner = ({ image, smallTag, title, btnText }: any) => (
  <View style={styles.bannerContainer}>
    <Image source={{ uri: image }} style={styles.bannerImage} />
    <View style={styles.bannerOverlay}>
      {smallTag && <Text style={styles.bannerTag}>{smallTag}</Text>}
      <Text style={styles.bannerTitle}>{title}</Text>
      <TouchableOpacity style={styles.bannerBtn}>
        <Text style={styles.bannerBtnText}>{btnText}</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const StoryCard = ({ item }: any) => (
  <View style={styles.storyCard}>
    <Image source={{ uri: item.image }} style={styles.storyImage} />
    <View style={styles.storyTextContainer}>
      <Text style={styles.storyCategory}>{item.category}</Text>
      <Text style={styles.storyTitle} numberOfLines={3}>
        {item.title}
      </Text>
    </View>
  </View>
);

export default function NikeExactClone() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      // Panggil fungsi API buatan kita
      const result = await fetchLaravelProducts();
      setProducts(result);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown API error";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const topPicks = useMemo(() => products.slice(0, 6), [products]);

  const airMaxPicks = useMemo(() => {
    const airMax = products.filter((item) =>
      (item.title ?? "").toLowerCase().includes("air max"),
    );

    if (airMax.length >= 3) {
      return airMax.slice(0, 6);
    }

    return products.slice(6, 12);
  }, [products]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="dark-content" />
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.padding20}>
          <Text style={styles.greetingText}>Good Afternoon, Liyyy</Text>
        </View>

        {/* UI KOTAK-KOTAK LOADING */}
        {loading && (
          <View style={styles.apiStateBox}>
            <ActivityIndicator size="small" color="#111" />
            <Text style={styles.apiStateText}>Menarik koleksi dari Server...</Text>
          </View>
        )}

        {/* UI KOTAK-KOTAK ERROR */}
        {!loading && error && (
          <View style={styles.apiStateBox}>
            <Text style={styles.apiErrorText}>{error}</Text>
            <TouchableOpacity onPress={loadProducts} style={styles.retryBtn}>
              <Text style={styles.retryBtnText}>Coba Lagi</Text>
            </TouchableOpacity>
          </View>
        )}

        {!loading && !error && (
          <>
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Top Picks for You</Text>
                <Text style={styles.viewAll}>View All</Text>
              </View>
              <Text style={styles.sectionSub}>Live from Babaali Store</Text>

              <FlatList
                horizontal
                data={topPicks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ProductCard item={item} />}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: 20, paddingRight: 5 }}
              />
            </View>

            <View style={styles.padding20}>
              <Text style={styles.sectionTitle}>New From Nike</Text>
            </View>

            <EditorialBanner
              image="https://static.nike.com/a/images/f_auto/dpr_3.0,cs_srgb/h_511,c_limit/8a8afb5e-5bef-4cf5-b991-790910bde18c/nike-just-do-it.png"
              smallTag="Breaking New Grounds"
              title={"NIKE YEAR OF THE\nHORSE COLLECTION"}
              btnText="Shop"
            />

            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Because you like</Text>
              </View>
              <Text style={styles.sectionSub}>Air Max</Text>

              <FlatList
                horizontal
                data={airMaxPicks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ProductCard item={item} />}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: 20, paddingRight: 5 }}
              />
            </View>
          </>
        )}

        <View style={styles.storiesSection}>
          <View
            style={[styles.sectionHeader, { paddingHorizontal: 20, paddingTop: 40 }]}>
            <Text style={[styles.sectionTitle, { color: "white" }]}>Stories for you</Text>
            <Text style={[styles.viewAll, { color: "#707072" }]}>View All</Text>
          </View>

          <View style={styles.mainStoryContainer}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1170&auto=format&fit=crop",
              }}
              style={styles.mainStoryImage}
            />
            <View style={{ marginTop: 15 }}>
              <Text style={{ color: "white", fontSize: 12 }}>From the archives</Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: "700",
                  marginTop: 5,
                }}>
                The origins of the Air Force 1
              </Text>
            </View>
          </View>

          <FlatList
            horizontal
            data={STORIES}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <StoryCard item={item} />}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20, paddingBottom: 40 }}
          />

          <View style={{ padding: 20, paddingBottom: 60 }}>
            <TouchableOpacity style={styles.footerBtn}>
              <Text style={styles.footerBtnText}>View All</Text>
            </TouchableOpacity>

            <View style={{ alignItems: "center", marginTop: 40 }}>
              <Image
                source={{ uri: "https://img.icons8.com/ios-filled/100/ffffff/nike.png" }}
                style={{ width: 60, height: 30, resizeMode: "contain" }}
              />
              <Text
                style={{
                  color: "#707072",
                  fontSize: 10,
                  marginTop: 10,
                  fontWeight: "bold",
                }}>
                Thanks for being with us.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  padding20: { paddingHorizontal: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  logoToggle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  greetingText: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 20,
    fontFamily: "System",
  },
  apiStateBox: {
    marginHorizontal: 20,
    marginBottom: 30,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    gap: 10,
  },
  apiStateText: {
    fontSize: 13,
    color: "#111",
  },
  apiErrorText: {
    fontSize: 13,
    color: "#B91C1C",
    textAlign: "center",
  },
  retryBtn: {
    backgroundColor: "#111",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  retryBtnText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  sectionContainer: { marginBottom: 40 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 20,
    paddingLeft: 20,
  },
  sectionTitle: { fontSize: 20, fontWeight: "700", marginBottom: 20 },
  sectionSub: {
    fontSize: 14,
    color: "#707072",
    marginBottom: 15,
    paddingLeft: 20,
  },
  viewAll: { fontSize: 14, fontWeight: "500", color: "black" },
  productCard: {
    width: width * 0.45,
    marginRight: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },
  productImageBg: {
    height: 210,
    width: "100%",
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  productInfo: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 12,
  },
  cardHeartBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 3,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: { width: "100%", height: "100%", resizeMode: "contain" },
  productTitle: { fontSize: 15, fontWeight: "600", color: "#111111" },
  productCategory: { fontSize: 13, color: "#707072", marginTop: 4 },
  productPrice: { fontSize: 14, fontWeight: "700", marginTop: 8, color: "#111111" },
  sotwContainer: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  sotwImage: { width: 60, height: 60, marginRight: 15 },
  sotwContent: { flex: 1 },
  sotwLabel: { fontSize: 12, fontWeight: "700", marginBottom: 4 },
  sotwDesc: { fontSize: 12, color: "#707072" },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 40,
    gap: 6,
  },
  paginationDot: {
    height: 3,
    borderRadius: 2,
  },
  paginationDotActive: {
    width: 20,
    backgroundColor: "black",
  },
  paginationDotInactive: {
    width: 3,
    backgroundColor: "#ccc",
  },
  bannerContainer: { marginBottom: 8, position: "relative" },
  bannerImage: { width: width, height: 500, resizeMode: "cover" },
  bannerOverlay: { position: "absolute", bottom: 40, left: 20, right: 20 },
  bannerTag: { color: "white", fontWeight: "bold", marginBottom: 5 },
  bannerTitle: {
    fontSize: 48,
    fontWeight: "900",
    color: "white",
    textTransform: "uppercase",
    lineHeight: 44,
    marginBottom: 20,
  },
  bannerBtn: {
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignSelf: "flex-start",
  },
  bannerBtnText: { fontWeight: "bold", fontSize: 14 },
  storiesSection: { backgroundColor: "#111111", minHeight: 600 },
  mainStoryContainer: { padding: 20, marginBottom: 20 },
  mainStoryImage: {
    width: "100%",
    height: 400,
    resizeMode: "cover",
    borderRadius: 15,
  },
  storyCard: { width: 160, marginRight: 25 },
  storyImage: { width: 170, height: 200, resizeMode: "cover", borderRadius: 4 },
  storyTextContainer: { marginTop: 10 },
  storyCategory: { color: "white", fontSize: 12, marginBottom: 4 },
  storyTitle: { color: "white", fontSize: 14, fontWeight: "700" },
  footerBtn: {
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: "center",
  },
  footerBtnText: { color: "white", fontWeight: "700" },
});