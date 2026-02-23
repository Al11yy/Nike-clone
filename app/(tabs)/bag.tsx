import React, { useState } from 'react';
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
import {
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  CreditCard,
  MapPin,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Truck,
} from 'lucide-react-native';

import { formatUSD, useCart } from '@/context/cart-context';

export default function BagScreen() {
  const router = useRouter();
  const { items, subtotal, totalQuantity, updateQuantity, removeFromCart, clearCart } = useCart();
  const [viewMode, setViewMode] = useState<'bag' | 'checkout' | 'success'>('bag');

  const shipping = 0;
  const estimatedTotal = subtotal + shipping;

  if (viewMode === 'success') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />

        <View style={styles.header}>
          <Text style={styles.headerTitle}>Order Complete</Text>
        </View>

        <View style={styles.successContainer}>
          <View style={styles.successIconCircle}>
            <CircleCheck size={34} color="#111" strokeWidth={1.8} />
          </View>
          <Text style={styles.successTitle}>Payment Received</Text>
          <Text style={styles.successSub}>Your order is confirmed and being prepared.</Text>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => {
              setViewMode('bag');
            }}>
            <Text style={styles.secondaryBtnText}>Back to Bag</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.checkoutBtn}
            onPress={() => {
              clearCart();
              setViewMode('bag');
              router.push('/(tabs)/shop');
            }}>
            <Text style={styles.checkoutText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!items.length) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />

        <View style={styles.header}>
          <Text style={styles.headerTitle}>Bag</Text>
        </View>

        <View style={styles.emptyContainer}>
          <View style={styles.iconCircle}>
            <ShoppingBag size={28} color="#000" strokeWidth={1.5} />
          </View>
          <Text style={styles.emptyTitle}>Your Bag is empty.</Text>
          <Text style={styles.emptySub}>
            When you add products, they&apos;ll{"\n"}appear here.
          </Text>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.checkoutBtn} onPress={() => router.push('/')}>
            <Text style={styles.checkoutText}>Shop Now</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          {viewMode === 'checkout' ? (
            <TouchableOpacity style={styles.backBtn} onPress={() => setViewMode('bag')}>
              <ChevronLeft size={18} color="#111" />
              <Text style={styles.backBtnText}>Back</Text>
            </TouchableOpacity>
          ) : null}
          <Text style={styles.headerTitle}>{viewMode === 'checkout' ? 'Checkout' : 'Bag'}</Text>
          <Text style={styles.headerSub}>
            {viewMode === 'checkout' ? 'Review your order' : `${totalQuantity} item(s)`}
          </Text>
        </View>

        {viewMode === 'bag' ? (
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
        ) : (
          <ScrollView contentContainerStyle={styles.checkoutContent} showsVerticalScrollIndicator={false}>
            <View style={styles.checkoutCard}>
              <View style={styles.checkoutCardHead}>
                <View style={styles.checkoutCardTitleWrap}>
                  <MapPin size={16} color="#111" />
                  <Text style={styles.checkoutCardTitle}>Delivery Address</Text>
                </View>
                <ChevronRight size={16} color="#707072" />
              </View>
              <Text style={styles.checkoutCardText}>Aliyy R • Jl. Sudirman No. 88</Text>
              <Text style={styles.checkoutCardTextMuted}>Jakarta Selatan, 12910</Text>
            </View>

            <View style={styles.checkoutCard}>
              <View style={styles.checkoutCardHead}>
                <View style={styles.checkoutCardTitleWrap}>
                  <Truck size={16} color="#111" />
                  <Text style={styles.checkoutCardTitle}>Shipping Method</Text>
                </View>
                <ChevronRight size={16} color="#707072" />
              </View>
              <Text style={styles.checkoutCardText}>Standard Delivery (2-4 days)</Text>
              <Text style={styles.checkoutCardTextMuted}>Free</Text>
            </View>

            <View style={styles.checkoutCard}>
              <View style={styles.checkoutCardHead}>
                <View style={styles.checkoutCardTitleWrap}>
                  <CreditCard size={16} color="#111" />
                  <Text style={styles.checkoutCardTitle}>Payment Method</Text>
                </View>
                <ChevronRight size={16} color="#707072" />
              </View>
              <Text style={styles.checkoutCardText}>Visa •••• 2408</Text>
              <Text style={styles.checkoutCardTextMuted}>Billing same as shipping</Text>
            </View>

            <View style={styles.checkoutItemsBlock}>
              <Text style={styles.checkoutItemsTitle}>Items</Text>
              {items.map((item) => (
                <View key={item.key} style={styles.checkoutItemRow}>
                  <Image source={{ uri: item.image }} style={styles.checkoutItemImage} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.checkoutItemTitle} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text style={styles.checkoutItemMeta}>
                      {item.size} • Qty {item.quantity}
                    </Text>
                  </View>
                  <Text style={styles.checkoutItemPrice}>
                    {item.unitPrice != null ? formatUSD(item.unitPrice * item.quantity) : item.priceLabel}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.summaryContainer}>
              <Text style={styles.checkoutItemsTitle}>Order Summary</Text>
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
        )}

        {viewMode === 'bag' ? (
          <View style={styles.footer}>
            <TouchableOpacity style={styles.checkoutBtn} onPress={() => setViewMode('checkout')}>
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.footer}>
            <TouchableOpacity style={styles.secondaryBtn} onPress={() => setViewMode('bag')}>
              <Text style={styles.secondaryBtnText}>Back to Bag</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.checkoutBtn} onPress={() => setViewMode('success')}>
              <Text style={styles.checkoutText}>Place Order</Text>
            </TouchableOpacity>
          </View>
        )}
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
  backBtn: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 10,
  },
  backBtnText: {
    fontSize: 13,
    color: '#111',
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: -50,
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
    fontWeight: '500',
    color: '#111',
    marginBottom: 8,
  },
  emptySub: {
    fontSize: 15,
    color: '#111',
    textAlign: 'center',
    lineHeight: 22,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
    marginTop: -40,
  },
  successIconCircle: {
    width: 82,
    height: 82,
    borderRadius: 41,
    borderWidth: 1.5,
    borderColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 22,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
    marginBottom: 8,
  },
  successSub: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    lineHeight: 21,
  },

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
  checkoutContent: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 160,
    gap: 12,
  },
  checkoutCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#ECECEC',
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  checkoutCardHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkoutCardTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkoutCardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111',
  },
  checkoutCardText: {
    fontSize: 13,
    color: '#111',
    fontWeight: '500',
    marginBottom: 2,
  },
  checkoutCardTextMuted: {
    fontSize: 12,
    color: '#707072',
  },
  checkoutItemsBlock: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#ECECEC',
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#fff',
    gap: 10,
  },
  checkoutItemsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111',
    marginBottom: 4,
  },
  checkoutItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkoutItemImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  checkoutItemTitle: {
    fontSize: 13,
    color: '#111',
    fontWeight: '600',
  },
  checkoutItemMeta: {
    fontSize: 12,
    color: '#707072',
    marginTop: 2,
  },
  checkoutItemPrice: {
    fontSize: 12,
    color: '#111',
    fontWeight: '700',
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
    gap: 10,
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  secondaryBtnText: {
    color: '#111',
    fontSize: 15,
    fontWeight: '700',
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
