import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useCallback } from 'react'
import { useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {

  type Contact = { 
    name: string; 
    phone: string; 
    email: string; 
  };

  const [contacts, setContacts] = React.useState<Contact[]>([]);
 

  useFocusEffect(
    useCallback( () => {
        AsyncStorage.getItem('contacts')
        .then( (existingContactsString) => {
            if(existingContactsString) {
                setContacts(JSON.parse(existingContactsString));
            }
          });
    }, [])
);
 

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
    marginTop: 60,
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