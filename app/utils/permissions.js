import { Camera } from 'expo-camera';

export const checkCameraPermission = async () => {
  const { status } = await Camera.requestCameraPermissionsAsync();
  return status === 'granted';
};