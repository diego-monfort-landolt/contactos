import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, TextInput, Modal } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign, Feather } from '@expo/vector-icons';

const Home = () => {

  type Contact = { 
    name: string; 
    phone: string; 
    email: string; 
  };

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentContact, setCurrentContact] = useState<Contact | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

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
          onPress: () => {
            const newContacts = [...contacts];
            newContacts.splice(index, 1);
            setContacts(newContacts);
            AsyncStorage.setItem('contacts', JSON.stringify(newContacts));
          }
        }
      ]
    );
  };

  const editContact = (index: number) => {
    setCurrentContact(contacts[index]);
    setCurrentIndex(index);
    setModalVisible(true);
  };

  const saveContact = () => {
    if (currentContact && currentIndex !== null) {
      const newContacts = [...contacts];
      newContacts[currentIndex] = currentContact;
      setContacts(newContacts);
      AsyncStorage.setItem('contacts', JSON.stringify(newContacts));
      setModalVisible(false);
    }
  };

  const renderItem = ({ item, index }: { item: Contact, index: number }) => (
    <View style={styles.contactItem}>
      <Text style={styles.contactName}>{item.name}</Text>
      <Text>{item.phone}</Text>
      <Text>{item.email}</Text>
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
        data={contacts}
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
  },
  contactName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  deleteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  editIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
