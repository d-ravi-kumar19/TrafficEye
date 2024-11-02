// import axios from 'axios';
// import { API_URL } from 'react-native-dotenv';

// export const sendImageForPrediction = async (imageUri) => {
//   try {
//     const formData = new FormData();
//     formData.append('file', {
//       uri: imageUri,
//       name: imageUri.split('/').pop(),
//       type: 'image/jpeg',
//     });

//     const response = await axios.post(`${API_URL}/predict-image`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.error('Error sending image for prediction:', error.message);
//     throw error;
//   }
// };
