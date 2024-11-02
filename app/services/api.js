import * as FileSystem from 'expo-file-system';

const API_URL = 'https://your-backend-api-url.com/upload';

export const sendImageToBackend = async (imageUri) => {
  try {
    const response = await FileSystem.uploadAsync(API_URL, imageUri, {
      httpMethod: 'POST',
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      fieldName: 'image',
    });

    const result = JSON.parse(response.body);
    console.log('Image uploaded successfully:', result);
    return result;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};