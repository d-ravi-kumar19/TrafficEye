// app/components/CameraControls.js

import React from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CameraControls({ toggleCameraFacing, handleRecording, recording }) {
  return (
    <View style={styles.controls}>
      <TouchableOpacity style={styles.flipButton} onPress={toggleCameraFacing}>
        <Text style={styles.text}>Flip Camera</Text>
      </TouchableOpacity>
        <TouchableOpacity style={styles.recordButton} onPress={handleRecording}>
          <Text style={styles.text}>{recording ? 'Stop Recording' : 'Start Recording'}</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'linen',
    padding: 30,
  },
  flipButton: {
    marginHorizontal: 20,
    backgroundColor: 'dodgerblue',
    padding: 15,
    borderRadius: 5,
  },
  recordButton: {
    backgroundColor: 'dodgerblue',
    borderRadius: 5,
    padding: 15,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
});
