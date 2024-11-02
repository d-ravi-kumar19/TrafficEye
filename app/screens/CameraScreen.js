import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import CameraControls from '../components/CameraControls';
import ImageCapture from '../components/ImageCapture';
import { checkCameraPermission } from '../utils/permissions';
import { sendImageToBackend } from '../services/api';

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const cameraPermission = await checkCameraPermission();
      setHasPermission(cameraPermission);
    })();
  }, []);

  const startCapture = () => {
    setIsCapturing(true);
  };

  const stopCapture = () => {
    setIsCapturing(false);
  };

  const captureImage = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        const resizedPhoto = await ImageManipulator.manipulateAsync(
          photo.uri,
          [{ resize: { width: 300 } }],
          { format: 'jpeg', compress: 0.7 }
        );
        await sendImageToBackend(resizedPhoto.uri);
      } catch (error) {
        console.error('Error capturing or sending image:', error);
        Alert.alert('Error', 'Failed to capture or send image');
      }
    }
  };

  if (hasPermission === null) {
    return <View style={styles.container} />;
  }
  if (hasPermission === false) {
    Alert.alert('Error', 'No access to camera');
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <Camera 
        type={'back'} 
        ref={cameraRef}
      >
        <View style={styles.controlsContainer}>
          <CameraControls
            isCapturing={isCapturing}
            onStartCapture={startCapture}
            onStopCapture={stopCapture}
          />
        </View>
      </Camera>
      {isCapturing && <ImageCapture onCapture={captureImage} interval={1000} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
});