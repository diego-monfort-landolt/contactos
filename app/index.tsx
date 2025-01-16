import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const Index = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Mi Agenda</Text>
      <Link href="/(tabs)/home" style={styles.navLinks}>Mi Libreta</Link>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    textAlign: 'center',
  },
  headline: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 2,
  },
  navLinks: {
    color: 'white',
    padding: 10,
    backgroundColor: '#007BFF', // Ein schönes Blau
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
