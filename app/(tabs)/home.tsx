import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'

const Home = () => {
  type Contact = { 
    name: string; 
    phone: string; 
    email: string; 
  };

  const contacts: Contact[] = [
    {
      name: 'Juan',
      phone: '1234567890',
      email: 'juan@huan.es',
    },
    {
      name: 'Carla',
      phone: '1234567890',
      email: 'Carla@huan.es',
    },
    {
      name: 'Pepe',
      phone: '1234567890',
      email: 'pepe@huan.es',
    },
    {
      name: 'Hugo',
      phone: '1234567890',
      email: 'Hugo@huan.es',
    },
  ]
 

  const renderItem = ({ item }: { item: Contact }) => (
    <View style={styles.contactItem}>
      <Text style={styles.contactName}>{item.name}</Text>
      <Text>{item.phone}</Text>
      <Text>{item.email}</Text>
    </View>
  );

  return (
    <View style={styles.containerHome}>
      <Text style={styles.title}>Mis Contactos</Text>
      <FlatList
        data={contacts}
        renderItem={ renderItem }
        keyExtractor={(Item, index) => index.toString()} 
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  containerHome: {
    flex: 1,
    backgroundColor: 'lightgrey',
    padding: 20,
  },
  title: {
    fontSize: 25,
    letterSpacing: 2,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  contactItem: {
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 10,
  },
  contactName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})