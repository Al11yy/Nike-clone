import { Tabs } from 'expo-router';
import React from 'react';
import { 
  Home, 
  Search, 
  Heart, 
  ShoppingBag, 
  User 
} from 'lucide-react-native';
import { View, Text, Platform } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { useCart } from '@/context/cart-context';
import { useFavorites } from '@/context/favorites-context';

export default function TabLayout() {
  const { totalQuantity } = useCart();
  const { favoriteCount } = useFavorites();
  const bagBadge = totalQuantity > 99 ? '99+' : String(totalQuantity);
  const favoriteBadge = favoriteCount > 99 ? '99+' : String(favoriteCount);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#000000', // Hitam pekat saat aktif
        tabBarInactiveTintColor: '#757575', // Abu-abu saat tidak aktif
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
            height: Platform.OS === 'ios' ? 85 : 60, // Tinggi tab bar
            paddingTop: 1,
            paddingBottom: Platform.OS === 'ios' ? 28 : 8,
            backgroundColor: '#ffffff',
            borderTopWidth: 1,
            borderTopColor: '#f0f0f0',
        },
        tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: '500',
            marginTop: 2,
        }
      }}>

      {/* 1. HOME TAB */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
             <Home size={22} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />

      {/* 2. SHOP TAB (Icon Search) */}
      <Tabs.Screen
        name="shop" // Pastikan file app/(tabs)/shop.tsx ada (atau ganti nama file-nya)
        options={{
          title: 'Shop',
          tabBarIcon: ({ color, focused }) => (
             <Search size={22} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />

      {/* 3. FAVORITES TAB */}
      <Tabs.Screen
        name="favorites" // Pastikan file app/(tabs)/favorites.tsx ada
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, focused }) => (
             <View>
               <Heart size={22} color={color} strokeWidth={focused ? 2.5 : 2} />
               {favoriteCount > 0 ? (
                 <View style={{
                   position: 'absolute',
                   top: -5,
                   right: -10,
                   minWidth: 16,
                   height: 16,
                   borderRadius: 8,
                   backgroundColor: '#111',
                   alignItems: 'center',
                   justifyContent: 'center',
                   paddingHorizontal: 3,
                 }}>
                   <Text style={{
                     fontSize: 9,
                     fontWeight: '700',
                     color: '#fff',
                   }}>{favoriteBadge}</Text>
                 </View>
               ) : null}
             </View>
          ),
        }}
      />

      {/* 4. BAG TAB (Ada Badge Angka 1) */}
      <Tabs.Screen
        name="bag" // Pastikan file app/(tabs)/bag.tsx ada
        options={{
          title: 'Bag',
          tabBarIcon: ({ color, focused }) => (
             <View>
                 <ShoppingBag size={22} color={color} strokeWidth={focused ? 2.5 : 2} />
                 {totalQuantity > 0 ? (
                   <View style={{
                     position: 'absolute',
                     top: -5,
                     right: -10,
                     minWidth: 16,
                     height: 16,
                     borderRadius: 8,
                     backgroundColor: '#111',
                     alignItems: 'center',
                     justifyContent: 'center',
                     paddingHorizontal: 3,
                   }}>
                     <Text style={{
                       fontSize: 9,
                       fontWeight: '700',
                       color: '#fff',
                     }}>{bagBadge}</Text>
                   </View>
                 ) : null}
             </View>
          ),
        }}
      />

      {/* 5. PROFILE TAB */}
      <Tabs.Screen
        name="profile" // Pastikan file app/(tabs)/profile.tsx ada
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
             <User size={22} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />

    </Tabs>
  );
}
