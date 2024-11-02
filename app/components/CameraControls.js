import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CameraControls({ isCapturing, onStartCapture, onStopCapture }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isCapturing ? styles.stopButton : styles.startButton]}
        onPress={isCapturing ? onStopCapture : onStartCapture}
      >
        <Text style={styles.buttonText}>
          {isCapturing ? 'Stop Capture' : 'Start Capture'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  button: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  stopButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});