import { Heart } from "lucide-react-native";
import React from "react";
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { useFavorites } from "@/context/favorites-context";

const { width } = Dimensions.get("window");

export default function FavoritesScreen() {
  const router = useRouter();
  const { items, favoriteCount, removeFavorite } = useFavorites();

  if (!items.length) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Favorites</Text>
        </View>
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyTitle}>No favorites yet</Text>
          <Text style={styles.emptySub}>
            Tap the heart on products and they&apos;ll show up here.
          </Text>
          <TouchableOpacity style={styles.shopBtn} onPress={() => router.push("/")}>
            <Text style={styles.shopBtnText}>Browse Products</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorites</Text>
        <Text style={styles.headerSub}>{favoriteCount} item(s)</Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <View style={styles.imageBackground}>
              <View style={styles.imageAccentCircle} />
              <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="contain" />
              <TouchableOpacity
                style={styles.heartButton}
                onPress={() => removeFavorite(item.id, item.title)}>
                <Heart size={20} color="#000" fill="#000" />
              </TouchableOpacity>
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.titleText} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.categoryText} numberOfLines={1}>{item.category}</Text>
              <Text style={styles.priceText}>{item.price}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
  },
  headerSub: {
    marginTop: 4,
    fontSize: 12,
    color: "#707072",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 24,
  },
  cardContainer: {
    width: (width - 50) / 2,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ECECEC",
    overflow: "hidden",
  },
  imageBackground: {
    backgroundColor: "#FFFFFF",
    height: 180,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFEF",
  },
  imageAccentCircle: {
    position: "absolute",
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "#F8F4EA",
    top: 24,
  },
  productImage: {
    width: "88%",
    height: "88%",
  },
  heartButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E6E6E6",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 12,
  },
  titleText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 2,
  },
  categoryText: {
    fontSize: 12,
    color: "#707072",
    marginBottom: 4,
  },
  priceText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
  },
  emptyWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
  },
  emptySub: {
    marginTop: 8,
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  shopBtn: {
    marginTop: 16,
    backgroundColor: "#111",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 999,
  },
  shopBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
});
