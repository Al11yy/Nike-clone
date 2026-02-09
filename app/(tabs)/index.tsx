import { View, Text, ScrollView, Pressable, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router } from 'expo-router'

type UsersType = {
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

export default function index() {
  const [data, setData] = useState<UsersType[]>([])

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(result => setData(result))
  }, [])
  
  return (
    <ScrollView style={{backgroundColor: '#f8f9fa'}}>
  <View style={{flexDirection: 'row',flexWrap: 'wrap',justifyContent: 'space-between', padding: 10,marginTop: 60}}>
    {data.map(item => (

      <Pressable 
      key={item.id}
      style={{ width: '48%', marginBottom: 15 }}
      onPress={() =>
        router.push({
          pathname: '/detailproduct',
          params: {product: JSON.stringify(item)},
        })
      }
      >
      <View style={{ padding: 10, borderRadius: 10, backgroundColor: 'white', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
        <Image source={{ uri: item.image }} style={{ width: '100%', height: 120, resizeMode: 'contain', marginBottom: 10 }}/>
        <Text numberOfLines={2} style={{ fontWeight: 'bold', marginBottom: 5 }}>{item.title}</Text>
        <Text style={{ color: 'green', fontWeight: 'bold', marginBottom: 5 }}>${item.price}</Text>
        <Text style={{ fontSize: 12, color: '#777' }}>⭐ {item.rating.rate}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <TouchableOpacity style={{ backgroundColor: '#007bff', padding: 6, borderRadius: 5 }}>
            <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: '#28a745', padding: 6, borderRadius: 5 }}>
            <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>Buy</Text>
          </TouchableOpacity>
        </View>
      </View>
      </Pressable>
    
    ))}
  </View>
    </ScrollView>

  )
}