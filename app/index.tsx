import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Link } from 'expo-router';

const Index = () => {
  return (
    <ImageBackground
      source={{ uri: 'https://cdn.pixabay.com/photo/2021/11/30/00/54/sweden-6834164_640.jpg' }}
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
    resizeMode: 'cover', // Verwenden Sie resizeMode als Prop
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 10,
  },
  headline: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  navLinks: {
    color: 'white',
    padding: 10,
    backgroundColor: '#007BFF',
    fontSize: 20,
    textAlign: 'center',
    width: 200,
    borderRadius: 10,
    borderWidth: 0,
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
});