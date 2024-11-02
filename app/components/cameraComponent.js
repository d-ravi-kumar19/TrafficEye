import React, { useState, useRef, useEffect } from 'react';
import { Animated, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as FileSystem from 'expo-file-system'; // Import the file system
import RecordingIndicator from './RecordingIndicator';
import CameraControls from './CameraControls';

export default function CameraComponent({ navigation, aspectRatio }) {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [recording, setRecording] = useState(false);
  const [recordDuration, setRecordDuration] = useState(100);
  const cameraRef = useRef(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Check for camera permission
  if (!permission) {
    return <View />;
  }

  // Request permission if not granted
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

  // Toggle between front and back camera
  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  async function handleRecording() {
    console.log('enter')

  try {
    if (recording) {
      // If already recording, stop the recording
      console.log('recording was on')
      setRecording(false);
      if (cameraRef.current) {
        await cameraRef.current.stopRecording();
      }
      scaleAnim.setValue(1); // Reset button scale
      setRecordDuration(0);
    } else {
      // Start recording
      setRecording(true);
      console.log('recording starts')
      if (cameraRef.current) {
        // Start recording
        const recordingData = await cameraRef.current.recordAsync();
        console.log('Recording started:', recordingData);
        // Optional: Delay before stopping
        setTimeout(async () => {
          await cameraRef.current.stopRecording();
          console.log('Recording stopped');
        }, 1000); // Delay for 1 second or adjust as necessary
      }

      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ])
      ).start();
      startDurationTimer();
      startImageCapture(); // Start capturing images every second
    }
  } catch (error) {
    console.error('Recording Error:', error);
  }
}

  // Start a timer to track recording duration
  function startDurationTimer() {
    setRecordDuration(0);
    const interval = setInterval(() => {
      setRecordDuration(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval); // Clear interval on component unmount
  }

  // Function to capture image every second
  const startImageCapture = () => {
    const captureInterval = setInterval(async () => {
      if (cameraRef.current) {
        try {
          const photo = await cameraRef.current.takePictureAsync();
          const savedImageUri = await saveImageToLocal(photo.uri); // Save image locally
          console.log('Image saved to:', savedImageUri); // Log the saved image URI
        } catch (error) {
          console.error('Image Capture Error:', error);
        }
      }
    }, 1000);

    return () => clearInterval(captureInterval); // Clear interval on component unmount
  };

  // Save image to local file system
  const saveImageToLocal = async (uri) => {
    const fileName = uri.split('/').pop(); // Get the filename from URI
    const localUri = FileSystem.documentDirectory + fileName; // Create a path in the document directory
    await FileSystem.moveAsync({
      from: uri,
      to: localUri,
    });
    return localUri; // Return the new local URI
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef} facing={facing} ratio={aspectRatio}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
        <RecordingIndicator duration={recordDuration} />
      </CameraView>
      
      <CameraControls 
        toggleCameraFacing={toggleCameraFacing} 
        handleRecording={handleRecording} 
        recording={recording} 
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
  closeButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
