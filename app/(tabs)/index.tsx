import { useFavorites } from "@/context/favorites-context";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
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

const { width } = Dimensions.get("window");

function resolveSneaksApiBaseUrl() {
  const envUrl = process.env.EXPO_PUBLIC_SNEAKS_API_URL;
  if (envUrl) return envUrl;

  const hostUri = Constants.expoConfig?.hostUri;
  if (!hostUri) return "http://localhost:4000";

  const host = hostUri.split(":")[0];
  if (!host) return "http://localhost:4000";

  return `http://${host}:4000`;
}

const SNEAKS_API_BASE_URL = resolveSneaksApiBaseUrl();

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
  {
    id: "3",
    label: "Jordan Retro",
    desc: "The legend continues with new colorways.",
    image:
      "https://www.footlocker.id/media/catalog/product/cache/f57d6f7ebc711fc328170f0ddc174b08/0/2/02-NIKE-F34KBNIK5-NIKDM0967010-Black.jpg",
  },
];

async function fetchNikeShoes() {
  let response: Response;
  try {
    response = await fetch(
      `${SNEAKS_API_BASE_URL}/api/sneakers?q=${encodeURIComponent("Nike shoes")}&limit=12`,
    );
  } catch {
    throw new Error(
      `Cannot reach Sneaks API at ${SNEAKS_API_BASE_URL}. Start 'npm run api' and use your laptop IP in EXPO_PUBLIC_SNEAKS_API_URL when testing on a phone.`,
    );
  }

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Sneaks API request failed: ${response.status} ${message}`);
  }

  const data = (await response.json()) as { items?: ProductItem[] };
  const mapped = (data.items ?? []).filter((item) => item.id);

  if (!mapped.length) {
    throw new Error("No Nike shoes found from Sneaks API.");
  }

  return mapped;
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
  const safeItem = {
    ...item,
    title: item.title ?? "Nike Shoes",
    category: item.category ?? "Sneakers",
    description: item.description ?? "Product from Sneaks-API.",
    price: item.price ?? "Price unavailable",
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
                price: safeItem.price,
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
          <Text style={styles.productPrice}>{safeItem.price}</Text>
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

const SneakerOfWeek = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    setActiveIndex(roundIndex);
  };

  return (
    <View>
      <FlatList
        data={SNEAKER_WEEK_DATA}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <View style={{ width: width - 40 }}>
            <View style={styles.sotwContainer}>
              <Image source={{ uri: item.image }} style={styles.sotwImage} />
              <View style={styles.sotwContent}>
                <Text style={styles.sotwLabel}>{item.label}</Text>
                <Text style={styles.sotwDesc}>{item.desc}</Text>
              </View>
            </View>
          </View>
        )}
      />
      <View style={styles.paginationContainer}>
        {SNEAKER_WEEK_DATA.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              activeIndex === index
                ? styles.paginationDotActive
                : styles.paginationDotInactive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

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
      const result = await fetchNikeShoes();
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

        {loading && (
          <View style={styles.apiStateBox}>
            <ActivityIndicator size="small" color="#111" />
            <Text style={styles.apiStateText}>Loading Nike shoes from Sneaks API...</Text>
          </View>
        )}

        {!loading && error && (
          <View style={styles.apiStateBox}>
            <Text style={styles.apiErrorText}>{error}</Text>
            <TouchableOpacity onPress={loadProducts} style={styles.retryBtn}>
              <Text style={styles.retryBtnText}>Retry API</Text>
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
              <Text style={styles.sectionSub}>Live from Nike Store</Text>

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
              <SneakerOfWeek />
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

            <EditorialBanner
              image="data:image/jpeg;base64,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"
              smallTag="Nike Kids"
              title={"THE NEW ERA OF\nTEEN PERFORMANCE."}
              btnText="Explore"
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
