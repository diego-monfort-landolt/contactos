import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Add = () => {
  // Definiere Zustände für Name, Telefon und E-Mail
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');

  // Funktion zum Speichern des neuen Kontakts
  const handleSubmit = async () => {
    if (name && phone && email) {
      const contact = { name, phone, email };
      const existingContactsString = await AsyncStorage.getItem('contacts');
      let contacts = [];
      if (existingContactsString) {
        contacts = JSON.parse(existingContactsString);
      }

      // Füge den neuen Kontakt zur Kontaktliste hinzu
      contacts.push(contact);
      await AsyncStorage.setItem('contacts', JSON.stringify(contacts));
      // Zeige eine Erfolgsmeldung an und leere das Formular
      Alert.alert(
        'Guardado con exito',
        'Nombre: ' + name + '\nTelefono: ' + phone + '\nE-Mail ' + email
      );
      setName('');
      setPhone('');
      setEmail('');
    } else {
      // Zeige eine Fehlermeldung an, wenn das Formular unvollständig ist
      Alert.alert('Error', 'Porfavor revisa el formulario.');
    }
  };
  return (
    <View style={styles.containerAdd}>
      <Text style={styles.title}>Contacto nuevo</Text>
      <Text>Nombre:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text>Telefono:</Text>
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} />
      <Text>E-Mail:</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      <Button title="Guardar Contacto" onPress={handleSubmit}></Button>
    </View>
  );
};
export default Add;

const styles = StyleSheet.create({
  containerAdd: {
    display: 'flex',
    backgroundColor: 'lightgrey',
    padding: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 60,
    marginBottom: 10,
    letterSpacing: 2,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 20,
    marginTop: 5,
  },
});