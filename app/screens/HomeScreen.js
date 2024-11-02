import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={{uri:'../assets/images/cctv.png'}}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Traffic Eye</Text>
      <Text style={styles.description}>Monitor and analyze traffic congestion in real-time.</Text>
      <View style={styles.buttonContainer}>
        <Button title="Open Camera" onPress={() => navigation.navigate('Camera')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // Space items evenly with button at the bottom
    alignItems: 'center',
    padding: 20, // Optional: Add padding
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 'auto', // Push the button container to the bottom
    marginBottom: 20, // Optional: Add some margin at the bottom
  },
});
