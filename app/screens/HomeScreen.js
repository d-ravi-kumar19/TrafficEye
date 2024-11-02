import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* <Image source={require('../assets/logo.png')} style={styles.logo} />  */}
      <Text style={styles.title}>Traffic Eye</Text>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Camera')}
      >
        <Text style={styles.buttonText}>Open Camera</Text> 
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
  },
  logo: {
    width: 100,    // Adjust width as needed
    height: 100,   // Adjust height as needed
    marginTop: 50, // Spacing from the top of the screen
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    margin: 20,
  },
  button: {
    position: 'absolute',
    bottom: 40,       // Position button at the bottom
    backgroundColor: 'dodgerblue', // Use a more prominent color for "Record"
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
