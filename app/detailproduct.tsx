import { View, Text, Image } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

type products = {
  id: number
  title: string
  image: string
  price: number
  category: string
  description: string
  rating: {
    rate: number
    count: number
  }
}


export default function detailproduct() {
const params = useLocalSearchParams();
const product: products = JSON.parse(params.product as string);
    
    return (

        <SafeAreaView style={{flex: 1, backgroundColor: '#f8f9fa'}}>
    <View>
      <Image 
      source={{ uri: product.image }} 
      style={{ width: '100%', height: 120, resizeMode: 'contain', marginBottom: 10 }}/>  
      <Text style={{ fontWeight: 'bold', marginBottom: 10, fontSize: 18, textAlign: 'center'}}>{product.title}</Text>
      <Text>{product.description}</Text>
      <Text>{product.price}</Text>
    </View>
        </SafeAreaView>
  )
}