import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
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

// --- DUMMY DATA (Sesuai Gambar) ---
const TOP_PICKS = [
  {
    id: 1,
    title: "Air Jordan 1 Low SE",
    category: "Men's Shoes",
    price: "Rp 1.909.000",
    image: require("../../assets/images/nike1.jpg"),
  },
  {
    id: 2,
    title: "Air Jordan 11 Retro",
    category: "Men's Shoes",
    price: "Rp 3.399.000",
    image: require("../../assets/images/nike2.jpg"),
  },
  {
    id: 3,
    title: "Nike Zoom Fly 5",
    category: "Running Shoes",
    price: "Rp 2.499.000",
    image: require("../../assets/images/nike3.jpg"),
  },
];

const AIR_MAX_PICKS = [
  {
    id: 4,
    title: "Nike Air Max 90 G",
    category: "Men's Shoes",
    price: "Rp 2.099.000",
    image: require("../../assets/images/nike4.jpg"),
  },
  {
    id: 5,
    title: "Nike Air Max Ishod",
    category: "Men's Shoes",
    price: "Rp 1.729.000",
    image: require("../../assets/images/nike5.jpg"),
  },
  {
    id: 6,
    title: "Nike Air Max Pre-Day",
    category: "Women's Shoes",
    price: "Rp 1.429.000",
    image: require("../../assets/images/nike4.jpg"),
  },
];

const STORIES = [
  {
    id: 1,
    title: "How to Choose the Best Nike Soccer Cleats",
    category: "Buying Guide",
    image: "https://images.unsplash.com/photo-1633306603064-582250e68a1a?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "The origins of the Dunk",
    category: "From the archives",
    image: "https://images.unsplash.com/photo-1623684225794-a8f1f5037f5c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

// --- COMPONENTS ---

// 1. HEADER (Toggle Nike/Jordan & Search)
const Header = () => (
  <View style={styles.header}>
    <View style={styles.logoToggle}>
      {/* Simulasi Logo Nike & Jordan pake Text/Icon krn gapunya SVG */}
      <Image
        source={{ uri: "https://img.icons8.com/ios-filled/50/000000/nike.png" }}
        style={{ width: 26, height: 26, marginRight: 10, tintColor: "black", resizeMode: "contain" }}
      />
      <View style={{ width: 1, height: 12, backgroundColor: "#ddd" }} />
      <Image
        source={{ uri: "https://img.icons8.com/ios-filled/50/000000/air-jordan.png" }}
        style={{ width: 26, height: 26, marginLeft: 10, tintColor: "#aaa", resizeMode: "contain" }}
      />
    </View>
    <TouchableOpacity>
      <Ionicons name="search-outline" size={24} color="black" />
    </TouchableOpacity>
  </View>
);

// 2. PRODUCT CARD (Standard)
const ProductCard = ({ item }: any) => {
  const router = useRouter();
  const imageUri =
    typeof item.image === "number"
      ? Image.resolveAssetSource(item.image).uri
      : item.image;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        router.push({
          pathname: "/detailproduct",
          params: {
            product: JSON.stringify({ ...item, image: imageUri }),
          },
        })
      }>
      <View style={styles.productCard}>
        <View style={styles.productImageBg}>
          <Image
            source={
              typeof item.image === "string" ? { uri: item.image } : item.image
            }
            style={styles.productImage}
          />
        </View>
        <Text style={styles.productTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.productCategory}>{item.category}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

// 3. EDITORIAL BANNER (Full Width Image)
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

// 4. SNEAKER OF THE WEEK (Small Banner)
const SneakerOfWeek = () => (
  <View style={styles.sotwContainer}>
    <Image
      source={{
        uri: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a3e7dead-1ad2-4c40-996d-93ebc9df0fca/dunk-low-retro-mens-shoes-njHwD3.png",
      }}
      style={styles.sotwImage}
    />
    <View style={styles.sotwContent}>
      <Text style={styles.sotwLabel}>Sneaker of the Week ✨</Text>
      <Text style={styles.sotwDesc}>
        Get fast dibs on the week's best drops every Friday...
      </Text>
    </View>
  </View>
);

// 5. STORY CARD (Dark Theme)
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
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="dark-content" />

      {/* Header Fixed */}
      <Header />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Greeting */}
        <View style={styles.padding20}>
          <Text style={styles.greetingText}>Good Afternoon, Ally</Text>
        </View>

        {/* SECTION 1: Top Picks */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Picks for You</Text>
            <Text style={styles.viewAll}>View All</Text>
          </View>
          <Text style={styles.sectionSub}>Recommended products</Text>

          <FlatList
            horizontal
            data={TOP_PICKS}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ProductCard item={item} />}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20, paddingRight: 5 }}
          />
        </View>

        {/* SECTION 2: Sneaker of the Week */}
        <View style={styles.padding20}>
          <SneakerOfWeek />
        </View>

        {/* Pagination Dots (Dummy) */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 6,
            marginBottom: 40,
          }}>
          <View
            style={{
              width: 20,
              height: 3,
              backgroundColor: "black",
              borderRadius: 2,
            }}
          />
          <View
            style={{
              width: 3,
              height: 3,
              backgroundColor: "#ccc",
              borderRadius: 2,
            }}
          />
          <View
            style={{
              width: 3,
              height: 3,
              backgroundColor: "#ccc",
              borderRadius: 2,
            }}
          />
        </View>

        {/* SECTION 3: New From Nike */}
        <View style={styles.padding20}>
          <Text style={styles.sectionTitle}>New From Nike</Text>
        </View>

        {/* Banner 1: Year of Horse */}
        <EditorialBanner
          image="https://images.unsplash.com/photo-1547447134-cd3f5c716030?q=80&w=2068&auto=format&fit=crop"
          smallTag="Breaking New Grounds"
          title={"NIKE YEAR OF THE\nHORSE COLLECTION"}
          btnText="Shop"
        />

        {/* Banner 2: New Era */}
        <EditorialBanner
          image="https://images.unsplash.com/photo-1525198104776-f6e8a873f9b7?q=80&w=2070&auto=format&fit=crop"
          smallTag="Nike Kids"
          title={"THE NEW ERA OF\nTEEN PERFORMANCE."}
          btnText="Explore"
        />

        {/* SECTION 4: Because you like Air Max */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Because you like</Text>
          </View>
          <Text style={styles.sectionSub}>Air Max</Text>

          <FlatList
            horizontal
            data={AIR_MAX_PICKS}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ProductCard item={item} />}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20, paddingRight: 5 }}
          />
        </View>

        {/* SECTION 5: Stories for you (Dark Section) */}
        <View style={styles.storiesSection}>
          <View
            style={[
              styles.sectionHeader,
              { paddingHorizontal: 20, paddingTop: 40 },
            ]}>
            <Text style={[styles.sectionTitle, { color: "white" }]}>
              Stories for you
            </Text>
            <Text style={[styles.viewAll, { color: "#707072" }]}>View All</Text>
          </View>

          {/* Main Story (Large) */}
          <View style={styles.mainStoryContainer}>
            <Image
              source={require("../../assets/images/nikeshoesn.png")}
              style={styles.mainStoryImage}
            />
            <View style={{ marginTop: 15 }}>
              <Text style={{ color: "white", fontSize: 12 }}>
                From the archives
              </Text>
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

          {/* Horizontal Stories */}
          <FlatList
            horizontal
            data={STORIES}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <StoryCard item={item} />}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20, paddingBottom: 40 }}
          />

          {/* Footer Button */}
          <View style={{ padding: 20, paddingBottom: 60 }}>
            <TouchableOpacity style={styles.footerBtn}>
              <Text style={styles.footerBtnText}>View All</Text>
            </TouchableOpacity>

            {/* Bottom Logo */}
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

  // Header
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

  // Sections
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

  // Product Card
  productCard: { width: width * 0.45, marginRight: 15, backgroundColor: "#dfdfdf3d", padding: 10, borderRadius: 4 },
  productImageBg: {
    height: 200,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  productImage: { width: "90%", height: "90%", resizeMode: "contain" },
  productTitle: { fontSize: 16, fontWeight: "700" },
  productCategory: { fontSize: 14, color: "#707072" },
  productPrice: { fontSize: 14, fontWeight: "700", marginTop: 4 },

  // Sneaker of Week
  sotwContainer: {
    backgroundColor: "#F5F5F5",
    padding: 15,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  sotwImage: { width: 60, height: 60, marginRight: 15 },
  sotwContent: { flex: 1 },
  sotwLabel: { fontSize: 12, fontWeight: "700", marginBottom: 4 },
  sotwDesc: { fontSize: 12, color: "#707072" },

  // Editorial Banner
  bannerContainer: { marginBottom: 20, position: "relative" },
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

  // Stories Section (Dark)
  storiesSection: { backgroundColor: "#111111", minHeight: 600 },
  mainStoryContainer: { padding: 20, marginBottom: 20 },
  mainStoryImage: {
    width: "100%",
    height: 400,
    resizeMode: "cover",
    borderRadius: 15,
  },
  storyCard: { width: 160, marginRight: 15 },
  storyImage: { width: 160, height: 200, resizeMode: "cover", borderRadius: 4 },
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
