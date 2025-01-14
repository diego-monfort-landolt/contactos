import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native'
import React from 'react'

const add = () => {
  // Definiere Zustände für Name, Telefon und E-Mail
  const [name, setName] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [email, setEmail] = React.useState('')

  const handleSubmit = async () => {
    if(name && phone && email) {
      // Zeige eine Erfolgsmeldung an 
      Alert.alert('Perfecto', 'Se guardó su Contacto nuevo con éxito'); // Leere die Eingabefelder 
      setName(''); 
      setPhone(''); 
      setEmail(''); 
      } else {
        Alert.alert('Error', 'No se pudo guardar el contacto')
      }
  }

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
  )
}

export default add
// Stile für die Komponenten
const styles = StyleSheet.create({
  containerAdd: {
    display: 'flex',
    backgroundColor: 'lightgrey',
    padding: 20,
    textAlign: 'center',
    marginTop: 0,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    letterSpacing: 2,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 20,
    marginTop: 5,
  }
})