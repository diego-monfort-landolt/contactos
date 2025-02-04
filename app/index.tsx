import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const Index = () => {
  return (
    <ImageBackground
      source={{ uri:'https://cdn.pixabay.com/photo/2021/11/30/00/54/sweden-6834164_640.jpg' }}
      style={styles.background}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <Text style={styles.headline}>Mi Agenda</Text>
        <Link href="/(tabs)/home" style={styles.navLinks}>Mi Libreta</Link>
      </View>
    </ImageBackground>
  );
};
export default Index;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  backgroundImage: {
    resizeMode: 'cover', 
    aspectRatio: 1, 
  },
  overlay: {
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparente para mejorar la visibilidad del texto y botones
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  headline: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 2,
    color: 'white', // Asegura que el texto sea visible
  },
  navLinks: {
    color: 'white',
    padding: 10,
    backgroundColor: '#007BFF', // Un bonito azul
    fontSize: 20,
    textAlign: 'center',
    width: 200,
    borderRadius: 10,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
});
