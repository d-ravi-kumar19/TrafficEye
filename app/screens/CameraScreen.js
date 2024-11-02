import React from 'react';
import { View, StyleSheet } from 'react-native';
import CameraComponent from '../components/cameraComponent';

export default function CameraScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <CameraComponent navigation={navigation} aspectRatio="16:9" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
