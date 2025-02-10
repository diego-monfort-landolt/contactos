import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, TextInput, Modal } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign, Feather } from '@expo/vector-icons';

const Home = () => {
  // Typdefinition für einen Kontakt
  type Contact = { 
    name: string; 
    phone: string; 
    email: string; 
    favorite: boolean; 
  };
  // Zustandshaken für die Kontaktliste und Modale
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentContact, setCurrentContact] = useState<Contact | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  // useFocusEffect-Haken zum Laden der gespeicherten Kontakte beim Start
  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem('contacts')
        .then((existingContactsString) => {
          if (existingContactsString) {
            setContacts(JSON.parse(existingContactsString));
          }
        });
    }, [])
  );

  // Funktion zum Löschen eines Kontakts
  const deleteContact = (index: number) => {
    Alert.alert(
      "Eliminar contacto",
      "¿Estás seguro de que deseas eliminar este contacto?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Eliminar",
          onPress: async () => {
            const newContacts = [...contacts];
            newContacts.splice(index, 1);
            setContacts(newContacts);
            await AsyncStorage.setItem('contacts', JSON.stringify(newContacts));
          }
        }
      ]
    );
  };

  // Funktion zum Bearbeiten eines Kontakts
  const editContact = (index: number) => {
    setCurrentContact(contacts[index]);
    setCurrentIndex(index);
    setModalVisible(true);
  };

  // Funktion zum Speichern eines bearbeiteten Kontakts
  const saveContact = async () => {
    if (currentContact && currentIndex !== null) {
      const newContacts = [...contacts];
      newContacts[currentIndex] = currentContact;
      setContacts(newContacts);
      await AsyncStorage.setItem('contacts', JSON.stringify(newContacts));
      setModalVisible(false);
    }
  };

  // Funktion zum Markieren eines Kontakts als Favorit
  const toggleFavorite = async (index: number) => {
    const newContacts = [...contacts];
    newContacts[index].favorite = !newContacts[index].favorite;
    setContacts(newContacts);
    await AsyncStorage.setItem('contacts', JSON.stringify(newContacts));
  };

  // Funktion zum Rendern eines Kontakts
  const renderItem = ({ item, index }: { item: Contact, index: number }) => (
    <View style={styles.contactItem}>
      <TouchableOpacity onPress={() => toggleFavorite(index)}>
        <AntDesign name="star" size={24} color={item.favorite ? 'green' : 'black'} style={styles.favoriteIcon} />
      </TouchableOpacity>
      <View style={styles.contactTextContainer}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text>{item.phone}</Text>
        <Text>{item.email}</Text>
      </View>
      <TouchableOpacity style={styles.deleteIcon} onPress={() => deleteContact(index)}>
        <AntDesign name="close" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.editIcon} onPress={() => editContact(index)}>
        <Feather name="edit" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.containerHome}>
      <Text style={styles.title}>Mis Contactos</Text>
      <FlatList
        data={contacts.sort((a, b) => Number(b.favorite) - Number(a.favorite))}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Editar Contacto</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={currentContact?.name}
            onChangeText={(text) => setCurrentContact({ ...currentContact, name: text } as Contact)}
          />
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            value={currentContact?.phone}
            onChangeText={(text) => setCurrentContact({ ...currentContact, phone: text } as Contact)}
          />
          <TextInput
            style={styles.input}
            placeholder="Correo Electrónico"
            value={currentContact?.email}
            onChangeText={(text) => setCurrentContact({ ...currentContact, email: text } as Contact)}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={saveContact}>
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default Home;

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
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  contactName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  favoriteIcon: {
    marginRight: 10,
  },
  deleteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    marginVertical: 5,
  },
  editIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    marginVertical: 5,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    width: '100%',
  },
  button: {
    flex: 1,
    height: 40,
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: 'green',
  },
  cancelButton: {
    backgroundColor: 'red',
  },
});
