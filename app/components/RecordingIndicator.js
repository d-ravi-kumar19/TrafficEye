import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function RecordingIndicator({ duration }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Recording: {duration}s</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});
