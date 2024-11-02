// app/components/CameraComponent.js

import React, { useState, useRef, useEffect } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { MaterialIcons } from '@expo/vector-icons'; // For back arrow icon
import CameraControls from './CameraControls'; // Importing the new CameraControls component

export default function CameraComponent({ navigation, aspectRatio }) {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions({ audio: false });
  const cameraRef = useRef(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [isRecording, setIsRecording] = useState(false);
  const [imageCaptureInterval, setImageCaptureInterval] = useState(null);
  const [recordDuration, setRecordDuration] = useState(0);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const startImageCapture = () => {
    if (cameraRef.current) {
      setIsRecording(true);
      const interval = setInterval(async () => {
        try {
          const photo = await cameraRef.current.takePictureAsync({ skipProcessing: true });
          const savedImageUri = await saveImageToLocal(photo.uri);
          console.log(`Image saved at: ${savedImageUri}`);
          setRecordDuration(prev => prev + 1);
        } catch (error) {
          console.error('Image Capture Error:', error);
        }
      }, 2000);

      setImageCaptureInterval(interval);
    }
  };

  const stopImageCapture = () => {
    if (imageCaptureInterval) {
      clearInterval(imageCaptureInterval);
      setImageCaptureInterval(null);
      setIsRecording(false);
      setRecordDuration(0);
    }
  };

  const handleRecording = () => {
    if (isRecording) {
      stopImageCapture();
    } else {
      startImageCapture();
    }
  };

  const saveImageToLocal = async (uri) => {
    const fileName = uri.split('/').pop();
    const localUri = `${FileSystem.documentDirectory}captured_images/${fileName}`;
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'captured_images', { intermediates: true });
    await FileSystem.moveAsync({
      from: uri,
      to: localUri,
    });
    return localUri;
  };


  useEffect(() => {
    return () => {
      stopImageCapture();
    };
  }, []);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={styles.text}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef} facing={facing} ratio={aspectRatio}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <MaterialIcons name="arrow-back" size={24} color="white" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
      </CameraView>

      <CameraControls 
        toggleCameraFacing={toggleCameraFacing} 
        handleRecording={handleRecording} 
        recording={isRecording} 
        scaleAnim={scaleAnim} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    padding: 10,
    flexDirection: 'row', // Arrange icon and text in a row
    alignItems: 'center', // Align items vertically centered
  },
  backText: {
    color: 'white', // Set the text color to white for better visibility
    marginLeft: 5, // Add some space between the icon and text
  },
});

