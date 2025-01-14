import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Profile = () => {
  return (
    <View style={styles.containerProfile}>
      <Text style={styles.titleProfile}>Contactos</Text>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  containerProfile: {
    display: 'flex',
    backgroundColor: '#000',
    padding: 10,
    textAlign: 'center',
    marginTop: 0,
  },
  titleProfile: {
    fontSize: 25,
    color: '#fff',
    textAlign: 'left',
    marginBottom: 10,
    letterSpacing: 2,
  }
})