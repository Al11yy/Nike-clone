import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import 'react-native-reanimated';

import { CartProvider } from '@/context/cart-context';
import { FavoritesProvider } from '@/context/favorites-context';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [showVideoSplash, setShowVideoSplash] = useState(true);

  const handleSplashStatusUpdate = useCallback((status: AVPlaybackStatus) => {
    if (!status.isLoaded) return;

    if (status.didJustFinish) {
      setShowVideoSplash(false);
    }
  }, []);

  if (showVideoSplash) {
    return (
      <View style={styles.splashContainer}>
        <Video
          source={require('../assets/images/nike-splash.mp4')}
          style={styles.splashVideo}
          resizeMode={ResizeMode.COVER}
          shouldPlay
          isLooping={false}
          onPlaybackStatusUpdate={handleSplashStatusUpdate}
          onError={() => setShowVideoSplash(false)}
        />
        <StatusBar style="light" />
      </View>
    );
  }

  return (
    <FavoritesProvider>
      <CartProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
            <Stack.Screen name="detailproduct" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </CartProvider>
    </FavoritesProvider>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  splashVideo: {
    width: '100%',
    height: '100%',
  },
});
