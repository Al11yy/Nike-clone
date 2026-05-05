import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import api from '@/api/axios';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      // Nembak ke API Laravel
      const response = await api.post('/login', { email, password });
      
      // Simpen Token
      await SecureStore.setItemAsync('userToken', response.data.token);
      
      // Pindah ke Home
      router.replace('/(tabs)');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image 
          source={{ uri: 'https://img.icons8.com/ios-filled/100/000000/nike.png' }} 
          style={styles.logo} 
        />
        <Text style={styles.title}>YOUR ACCOUNT FOR EVERYTHING NIKE</Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Email address"
          placeholderTextColor="#707072"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#707072"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Text style={styles.forgotPassword}>Forgotten your password?</Text>

        <TouchableOpacity style={styles.btn} onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Not a Member? </Text>
          <TouchableOpacity onPress={() => router.push('/register')}>
            <Text style={styles.footerLink}>Join Us.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 30, flex: 1, justifyContent: 'center' },
  logo: { width: 50, height: 50, resizeMode: 'contain', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: '900', textTransform: 'uppercase', marginBottom: 30, color: '#111' },
  input: { borderWidth: 1, borderColor: '#E5E5E5', borderRadius: 4, padding: 16, fontSize: 16, marginBottom: 16, color: '#111' },
  forgotPassword: { color: '#707072', fontSize: 12, marginBottom: 30, textAlign: 'right' },
  btn: { backgroundColor: '#111', padding: 18, borderRadius: 4, alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 30 },
  footerText: { color: '#707072', fontSize: 14 },
  footerLink: { color: '#111', fontSize: 14, fontWeight: '700', textDecorationLine: 'underline' },
  errorText: { color: '#B91C1C', marginBottom: 16, fontSize: 14 },
});