import { 
  Settings, 
  Calendar, 
  QrCode, 
  Package, 
  ChevronRight 
} from 'lucide-react-native';
import React from 'react';
import { 
  Image, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  Dimensions,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// Dummy Following Images (Aesthetic Nike Vibes)
const FOLLOWING_IMAGES = [
    'https://images.unsplash.com/photo-1546502208-81d149d52bd7?q=80&w=2073&auto=format&fit=crop', // Basket
    'https://images.unsplash.com/photo-1579298245158-33e8f568f7d3?q=80&w=2090&auto=format&fit=crop', // Soccer
    'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070&auto=format&fit=crop', // Running
    'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=2025&auto=format&fit=crop', // Shoes close up
    'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=2079&auto=format&fit=crop', // Red shoes
    'https://static.nike.com/a/images/w_960,c_limit,q_auto,f_auto/e952c0fc-e47d-4704-b2da-105597a83da3/air-max-95-big-bubble-seongsu-iq3363-025-release-date.jpg', // Jordan detail
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* 1. HEADER PROFILE */}
        <View style={styles.header}>
            <Image 
                source={{ uri: 'https://people.com/thmb/TG5A7wDuGEhEvkWX3RZsUiG1sJ8=/4000x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(299x0:301x2)/leonardo-dicaprio-600-23-65fb979b3852485daa6b89e13969dd39.jpg' }} 
                style={styles.avatar} 
            />
            <Text style={styles.username}>Liyyy</Text>
            
            <TouchableOpacity style={styles.editBtn}>
                <Text style={styles.editBtnText}>Edit Profile</Text>
            </TouchableOpacity>
        </View>

        {/* 2. MENU GRID (Orders, Pass, Events, Settings) */}
        <View style={styles.menuGrid}>
            <MenuIconItem icon={Package} label="Orders" />
            <View style={styles.verticalDivider} />
            <MenuIconItem icon={QrCode} label="Pass" />
            <View style={styles.verticalDivider} />
            <MenuIconItem icon={Calendar} label="Events" />
            <View style={styles.verticalDivider} />
            <MenuIconItem icon={Settings} label="Settings" />
        </View>

        {/* 3. LIST MENU (Inbox & Benefits) */}
        <View style={styles.listSection}>
            <TouchableOpacity style={styles.listItem}>
                <View>
                    <Text style={styles.listTitle}>Inbox</Text>
                    <Text style={styles.listSub}>View messages</Text>
                </View>
                <ChevronRight size={20} color="#000" />
            </TouchableOpacity>
            
            <View style={styles.divider} />

            <TouchableOpacity style={styles.listItem}>
                <View>
                    <Text style={styles.listTitle}>Your Nike Member Benefits</Text>
                    <Text style={styles.listSub}>3 available</Text>
                </View>
                <ChevronRight size={20} color="#000" />
            </TouchableOpacity>
        </View>

        <View style={styles.sectionDivider} />

        {/* 4. FOLLOWING GRID */}
        <View style={styles.followingSection}>
            <View style={styles.followingHeader}>
                <Text style={styles.sectionTitle}>Following (10)</Text>
                <TouchableOpacity>
                    <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.imageGrid}>
                {FOLLOWING_IMAGES.map((img, index) => (
                    <Image key={index} source={{ uri: img }} style={styles.gridImage} />
                ))}
            </View>
        </View>

        {/* 5. FOOTER */}
        <Text style={styles.memberSince}>Member Since July 2024</Text>

      </ScrollView>
    </SafeAreaView>
  );
}

// Sub Component: Menu Icon
const MenuIconItem = ({ icon: Icon, label }: any) => (
    <TouchableOpacity style={styles.menuItem}>
        <Icon size={24} color="#000" strokeWidth={1.5} />
        <Text style={styles.menuLabel}>{label}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  // Header
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 16,
  },
  username: {
    fontSize: 22,
    fontWeight: '500', // Medium
    color: '#000',
    marginBottom: 16,
  },
  editBtn: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  editBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },

  // Menu Grid
  menuGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  menuItem: {
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  menuLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000',
  },
  verticalDivider: {
    width: 1,
    height: '60%', // Biar gak full tinggi
    backgroundColor: '#eee',
    alignSelf: 'center',
  },

  // List Menu
  listSection: {
    paddingHorizontal: 20,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 4,
  },
  listSub: {
    fontSize: 14,
    color: '#707072',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginLeft: 0, 
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginTop: 10,
    marginBottom: 30,
    marginHorizontal: 20,
  },

  // Following Grid
  followingSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  followingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  editText: {
    fontSize: 14,
    color: '#707072',
    fontWeight: '500',
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  gridImage: {
    width: (width - 40 - 20) / 3, // (Layar - Padding Kiri Kanan - Total Gap) / 3
    height: (width - 40 - 20) / 3, // Square aspect ratio
    backgroundColor: '#f5f5f5',
  },

  // Footer
  memberSince: {
    textAlign: 'center',
    fontSize: 12,
    color: '#707072',
    marginBottom: 20,
  },
});