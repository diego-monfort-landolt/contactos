import { StyleSheet, Text, TextInput, View, Button, Alert, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const storedName = await AsyncStorage.getItem('name');
      const storedEmail = await AsyncStorage.getItem('email');
      const storedPhone = await AsyncStorage.getItem('phone');
      const storedProfileImage = await AsyncStorage.getItem('profileImage');

      if (storedName) setName(storedName);
      if (storedEmail) setEmail(storedEmail);
      if (storedPhone) setPhone(storedPhone);
      if (storedProfileImage) setProfileImage(storedProfileImage);
    };

    loadProfile();
  }, []);

  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Error', 'Se requieren permisos para acceder a la galería');
      }
    };

    requestPermission();
  }, []);

  const handleSave = async () => {
    await AsyncStorage.setItem('name', name);
    await AsyncStorage.setItem('email', email);
    await AsyncStorage.setItem('phone', phone);
    if (profileImage) {
      await AsyncStorage.setItem('profileImage', profileImage);
    }
    Alert.alert('Éxito', 'Perfil guardado con éxito');
    setIsEditing(false);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.uri);
    }
  };

  return (
    <View style={styles.containerProfile}>
      <Text style={styles.titleProfile}>Mi Perfil</Text>
      {isEditing ? (
        <>
          <TouchableOpacity onPress={pickImage}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imagePlaceholderText}>Subir Foto</Text>
              </View>
            )}
          </TouchableOpacity>
          <Text>Nombre:</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />
          <Text>Correo electrónico:</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} />
          <Text>Teléfono:</Text>
          <TextInput style={styles.input} value={phone} onChangeText={setPhone} />
          <Button title="Guardar Perfil" onPress={handleSave} />
        </>
      ) : (
        <>
          {profileImage && <Image source={{ uri: profileImage }} style={styles.profileImage} />}
          <Text style={styles.profileDetailText}>Nombre: {name}</Text>
          <Text style={styles.profileDetailText}>Correo electrónico: {email}</Text>
          <Text style={styles.profileDetailText}>Teléfono: {phone}</Text>
          <Button title="Editar Perfil" onPress={() => setIsEditing(true)} />
        </>
      )}
    </View>
  );
};
export default Profile;

const styles = StyleSheet.create({
  containerProfile: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    textAlign: 'center',
  },
  titleProfile: {
    fontSize: 25,
    color: '#333',
    textAlign: 'left',
    marginTop: 60,
    marginBottom: 20,
    letterSpacing: 2,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePlaceholderText: {
    color: '#888',
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  profileDetailText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
});
