import React from 'react';
import { useRouter } from 'expo-router';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react-native'; // Tambah icon ShoppingBag

import { formatUSD, useCart } from '@/context/cart-context';

export default function BagScreen() {
  const router = useRouter();
  const { items, subtotal, totalQuantity, updateQuantity, removeFromCart } = useCart();

  const shipping = 0;
  const estimatedTotal = subtotal + shipping;

  // --- LOGIC EMPTY STATE BARU ---
  if (!items.length) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Bag</Text>
        </View>

        {/* Center Content */}
        <View style={styles.emptyContainer}>
          <View style={styles.iconCircle}>
            <ShoppingBag size={28} color="#000" strokeWidth={1.5} />
          </View>
          <Text style={styles.emptyTitle}>Your Bag is empty.</Text>
          <Text style={styles.emptySub}>
            When you add products, they&apos;ll{"\n"}appear here.
          </Text>
        </View>

        {/* Bottom Button */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.checkoutBtn} onPress={() => router.push('/')}>
            <Text style={styles.checkoutText}>Shop Now</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // --- LOGIC CART ISI (TETAP SAMA) ---
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Bag</Text>
          <Text style={styles.headerSub}>{totalQuantity} item(s)</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {items.map((item) => {
            const linePrice =
              item.unitPrice != null ? formatUSD(item.unitPrice * item.quantity) : item.priceLabel;

            return (
              <View key={item.key} style={styles.cartItemContainer}>
                <View style={styles.itemTopRow}>
                  <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="contain" />

                  <View style={styles.productDetails}>
                    <Text style={styles.productTitle} numberOfLines={2}>{item.title}</Text>
                    <Text style={styles.productSubtitle}>{item.category}</Text>
                    <Text style={styles.productOption}>Size: {item.size}</Text>
                    <Text style={styles.itemPrice}>{linePrice}</Text>
                  </View>
                </View>

                <View style={styles.itemBottomRow}>
                  <View style={styles.qtyControl}>
                    <TouchableOpacity
                      onPress={() => updateQuantity(item.key, item.quantity - 1)}
                      style={styles.qtyBtn}>
                      <Minus size={14} color="#111" />
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>{item.quantity}</Text>
                    <TouchableOpacity
                      onPress={() => updateQuantity(item.key, item.quantity + 1)}
                      style={styles.qtyBtn}>
                      <Plus size={14} color="#111" />
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={() => removeFromCart(item.key)}>
                    <Trash2 size={14} color="#666" />
                    <Text style={styles.removeText}>Remove</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.divider} />
              </View>
            );
          })}

          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>{formatUSD(subtotal)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>Free</Text>
            </View>
            <View style={[styles.summaryRow, { marginTop: 10 }]}>
              <Text style={styles.totalLabel}>Estimated Total</Text>
              <Text style={styles.totalValue}>{formatUSD(estimatedTotal)}</Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.checkoutBtn}>
            <Text style={styles.checkoutText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 14,
    // Hapus border bottom di header kalau mau clean putih kyk gambar kosong
    // borderBottomWidth: 1, 
    // borderBottomColor: '#efefef',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
  },
  headerSub: {
    fontSize: 13,
    color: '#707072',
    marginTop: 4,
  },
  
  // --- STYLES BARU BUAT EMPTY STATE ---
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: -50, // Naik dikit biar pas tengah visual
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1.5,
    borderColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '500', // Agak medium kyk gambar
    color: '#111',
    marginBottom: 8,
  },
  emptySub: {
    fontSize: 15,
    color: '#111',
    textAlign: 'center',
    lineHeight: 22,
  },
  // ------------------------------------

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
    paddingTop: 14,
  },
  cartItemContainer: {
    marginBottom: 8,
  },
  itemTopRow: {
    flexDirection: 'row',
  },
  productImage: {
    width: 108,
    height: 108,
    marginRight: 14,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
    paddingTop: 2,
  },
  productTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },
  productSubtitle: {
    fontSize: 13,
    color: '#707072',
    marginTop: 4,
  },
  productOption: {
    fontSize: 13,
    color: '#707072',
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
    marginTop: 8,
  },
  itemBottomRow: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 122,
  },
  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 999,
    height: 34,
    paddingHorizontal: 4,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    minWidth: 28,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
  },
  removeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  removeText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#efefef',
    marginTop: 16,
  },
  summaryContainer: {
    marginTop: 14,
    gap: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 30,
    // Border top dihapus aja biar clean kyk gambar
    // borderTopWidth: 1, 
    // borderTopColor: '#efefef',
  },
  checkoutBtn: {
    backgroundColor: '#111',
    borderRadius: 999,
    paddingVertical: 17,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
