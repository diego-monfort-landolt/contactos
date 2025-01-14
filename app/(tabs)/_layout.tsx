import { StyleSheet } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { DarkTheme } from '@react-navigation/native'

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen 
      name='home' 
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name='home' color={color} size={size}/>
        ),
      }}
      />

      <Tabs.Screen name='add' options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name='add' color={color} size={size}/>
        ),
      }}
      />

      <Tabs.Screen name='profile' options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name='person' color={color} size={size}/>
        ),
      }}
      />
    </Tabs>
  )
}

export default TabsLayout

const styles = StyleSheet.create({})