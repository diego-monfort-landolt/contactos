import { StyleSheet } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name='home'></Tabs.Screen>
      <Tabs.Screen name='add'></Tabs.Screen>
      <Tabs.Screen name='profile'></Tabs.Screen>
    </Tabs>
  )
}

export default TabsLayout

const styles = StyleSheet.create({})