import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

type ShopProduct = {
  id: string;
  title: string;
  category: string;
  price: string;
  image: string;
};

const TOP_TABS = ["Men", "Women", "Kids"];

const TRENDING_PRODUCTS: ShopProduct[] = [
  {
    id: "shop-1",
    title: "Nike Air Max Dn8",
    category: "Men's Shoes",
    price: "$190.00",
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/96d3f7da-4123-4a4d-b3d2-31d625f10f49/air-max-dn8-shoes.png",
  },
  {
    id: "shop-2",
    title: "Nike V2K Run",
    category: "Women's Shoes",
    price: "$120.00",
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/f39d495f-6ede-4be8-b0f3-c8c8f91d1774/v2k-run-shoes.png",
  },
  {
    id: "shop-3",
    title: "Nike P-6000",
    category: "Shoes",
    price: "$110.00",
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ea56ddf5-a41f-4225-a0fc-d4986f30795f/p-6000-shoes.png",
  },
  {
    id: "shop-4",
    title: "Nike Vomero 18",
    category: "Road Running Shoes",
    price: "$160.00",
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/42e58d56-d26b-468d-a891-5ed2745f7374/vomero-18-road-running-shoes.png",
  },
];

const SPORT_TILES = [
  {
    id: "sport-1",
    title: "Running",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "sport-2",
    title: "Training",
    image:
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "sport-3",
    title: "Basketball",
    image:
      "https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "sport-4",
    title: "Football",
    image:
      "https://images.unsplash.com/photo-1522778526097-ce0a22ceb253?q=80&w=1200&auto=format&fit=crop",
  },
];

const ICON_STORIES = [
  {
    id: "icon-1",
    title: "Air Force 1",
    subtitle: "Always on point.",
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "icon-2",
    title: "Pegasus",
    subtitle: "Built for daily miles.",
    image:
      "https://images.unsplash.com/photo-1561808843-7adeb9606939?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "icon-3",
    title: "Dunk",
    subtitle: "From court to street.",
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1200&auto=format&fit=crop",
  },
];

function ProductRailCard({ item }: { item: ShopProduct }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.productCard}
      onPress={() =>
        router.push({
          pathname: "/detailproduct",
          params: {
            product: JSON.stringify(item),
          },
        })
      }>
      <View style={styles.productImageWrap}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.productCategory}>{item.category}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function ShopScreen() {
  const [activeTopTab, setActiveTopTab] = useState("Men");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.topShopBlock}>
        <View style={styles.header}>
          <View style={styles.logoToggle}>
            <View style={styles.logoPillActive}>
              <Image
                source={{ uri: "https://img.icons8.com/ios-filled/50/000000/nike.png" }}
                style={styles.logoIcon}
              />
            </View>
            <View style={styles.logoPillInactive}>
              <Image
                source={{ uri: "https://img.icons8.com/ios-filled/50/000000/air-jordan.png" }}
                style={[styles.logoIcon, { tintColor: "#7A7A7A" }]}
              />
            </View>
          </View>
          <Text style={styles.headerTitle}>Shop</Text>
          <TouchableOpacity style={styles.searchBtn}>
            <Ionicons name="search-outline" size={27} color="#111" />
          </TouchableOpacity>
        </View>

        <View style={styles.topTabsRow}>
          {TOP_TABS.map((tab) => {
            const active = activeTopTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTopTab(tab)}
                style={styles.topTabBtn}>
                <Text style={[styles.topTabText, active && styles.topTabTextActive]}>{tab}</Text>
                {active ? <View style={styles.topTabUnderline} /> : null}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.heroWrap}>
          <View style={styles.activeTabNoteWrap}>
            <Text style={styles.activeTabNote}>{activeTopTab} Essentials</Text>
          </View>
        </View>

        <View style={styles.heroWrapMain}>
          <ImageBackground
            source={{
              uri: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1600&auto=format&fit=crop",
            }}
            style={styles.heroImage}
            imageStyle={styles.heroImageStyle}>
            <View style={styles.heroOverlay}>
              <Text style={styles.heroTag}>Nike Running</Text>
              <Text style={styles.heroTitle}>FASTER STARTS HERE</Text>
              <Text style={styles.heroDesc}>
                New-season silhouettes built to move from everyday training to race day.
              </Text>
              <TouchableOpacity style={styles.heroBtn}>
                <Text style={styles.heroBtnText}>Shop Running</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Trending Now</Text>
          <Text style={styles.sectionLink}>View All</Text>
        </View>
        <FlatList
          horizontal
          data={TRENDING_PRODUCTS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ProductRailCard item={item} />}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productRail}
        />

        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Shop by Sport</Text>
        </View>
        <View style={styles.sportGrid}>
          {SPORT_TILES.map((tile) => (
            <TouchableOpacity key={tile.id} style={styles.sportCard} activeOpacity={0.9}>
              <ImageBackground
                source={{ uri: tile.image }}
                style={styles.sportImage}
                imageStyle={styles.sportImageStyle}>
                <View style={styles.sportOverlay}>
                  <Text style={styles.sportTitle}>{tile.title}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Nike Icons</Text>
          <Text style={styles.sectionLink}>Explore</Text>
        </View>
        <FlatList
          horizontal
          data={ICON_STORIES}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.iconCard} activeOpacity={0.9}>
              <ImageBackground
                source={{ uri: item.image }}
                style={styles.iconImage}
                imageStyle={styles.iconImageStyle}>
                <View style={styles.iconOverlay}>
                  <Text style={styles.iconTitle}>{item.title}</Text>
                  <Text style={styles.iconSubtitle}>{item.subtitle}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.iconRail}
        />

        <View style={styles.memberWrap}>
          <ImageBackground
            source={{
              uri: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1600&auto=format&fit=crop",
            }}
            style={styles.memberBanner}
            imageStyle={styles.memberImageStyle}>
            <View style={styles.memberOverlay}>
              <Text style={styles.memberTag}>Nike Member Access</Text>
              <Text style={styles.memberTitle}>EARLY ACCESS. EXCLUSIVE DROPS.</Text>
              <TouchableOpacity style={styles.memberBtn}>
                <Text style={styles.memberBtnText}>Join Us</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topShopBlock: {
    backgroundColor: "#F4F4F4",
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "500",
    color: "#111",
    marginLeft: 12,
    flex: 1,
  },
  logoToggle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0E0E0",
    borderRadius: 22,
    padding: 3,
  },
  logoPillActive: {
    width: 62,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  logoPillInactive: {
    width: 62,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  logoIcon: {
    width: 21,
    height: 21,
    resizeMode: "contain",
  },
  searchBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  topTabsRow: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 6,
    flexDirection: "row",
    gap: 22,
  },
  topTabBtn: {
    paddingBottom: 10,
  },
  topTabText: {
    fontSize: 16,
    color: "#7B7B7B",
    fontWeight: "600",
  },
  topTabTextActive: {
    color: "#111",
  },
  topTabUnderline: {
    position: "absolute",
    left: 1,
    right: 1,
    bottom: 0,
    height: 3,
    borderRadius: 999,
    backgroundColor: "#111",
  },
  heroWrap: {
    paddingHorizontal: 20,
    paddingTop: 14,
    marginBottom: 10,
  },
  activeTabNoteWrap: {
    alignSelf: "flex-start",
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  activeTabNote: {
    fontSize: 12,
    color: "#5E5E5E",
    fontWeight: "600",
  },
  heroWrapMain: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  heroImage: {
    width: "100%",
    height: 420,
    justifyContent: "flex-end",
  },
  heroImageStyle: {
    borderRadius: 16,
  },
  heroOverlay: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.28)",
  },
  heroTag: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 6,
  },
  heroTitle: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "900",
    lineHeight: 40,
    marginBottom: 10,
  },
  heroDesc: {
    color: "#fff",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 14,
  },
  heroBtn: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  heroBtnText: {
    color: "#111",
    fontSize: 13,
    fontWeight: "700",
  },
  sectionHead: {
    paddingHorizontal: 20,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111",
  },
  sectionLink: {
    fontSize: 14,
    color: "#707072",
    fontWeight: "600",
  },
  productRail: {
    paddingLeft: 20,
    paddingRight: 6,
    marginBottom: 30,
  },
  productCard: {
    width: width * 0.46,
    marginRight: 14,
    borderWidth: 1,
    borderColor: "#ECECEC",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  productImageWrap: {
    height: 200,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F1F1",
  },
  productImage: {
    width: "90%",
    height: "90%",
    resizeMode: "contain",
  },
  productInfo: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  productTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
  },
  productCategory: {
    fontSize: 13,
    color: "#707072",
    marginTop: 3,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111",
    marginTop: 8,
  },
  sportGrid: {
    paddingHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
    marginBottom: 30,
  },
  sportCard: {
    width: (width - 52) / 2,
    height: 180,
    borderRadius: 12,
    overflow: "hidden",
  },
  sportImage: {
    flex: 1,
    justifyContent: "flex-end",
  },
  sportImageStyle: {
    borderRadius: 12,
  },
  sportOverlay: {
    padding: 12,
    backgroundColor: "rgba(0,0,0,0.24)",
  },
  sportTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  iconRail: {
    paddingLeft: 20,
    paddingRight: 8,
    marginBottom: 30,
  },
  iconCard: {
    width: width * 0.72,
    height: 260,
    marginRight: 14,
    borderRadius: 14,
    overflow: "hidden",
  },
  iconImage: {
    flex: 1,
    justifyContent: "flex-end",
  },
  iconImageStyle: {
    borderRadius: 14,
  },
  iconOverlay: {
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  iconTitle: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "800",
  },
  iconSubtitle: {
    color: "#fff",
    fontSize: 13,
    marginTop: 4,
  },
  memberWrap: {
    paddingHorizontal: 20,
  },
  memberBanner: {
    width: "100%",
    height: 280,
    justifyContent: "flex-end",
  },
  memberImageStyle: {
    borderRadius: 14,
  },
  memberOverlay: {
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.28)",
    borderRadius: 14,
  },
  memberTag: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 6,
  },
  memberTitle: {
    color: "#fff",
    fontSize: 28,
    lineHeight: 30,
    fontWeight: "900",
    marginBottom: 12,
  },
  memberBtn: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  memberBtnText: {
    color: "#111",
    fontSize: 13,
    fontWeight: "700",
  },
  bottomSpace: {
    height: 34,
  },
});
