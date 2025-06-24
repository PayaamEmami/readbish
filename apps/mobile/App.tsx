import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to Readbish!</Text>
      <Text style={styles.description}>Your voice-powered reading assistant.</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
  },
});

export default App;