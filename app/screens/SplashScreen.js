// // SplashScreen.js
// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import * as Progress from 'react-native-progress';

// export default function SplashScreen({ onFinish }) {
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setProgress(prev => {
//         if (prev >= 1) {
//           clearInterval(interval);
//           onFinish();
//           return 1;
//         }
//         return prev + 0.1;
//       });
//     }, 300); // Adjust the interval duration as needed
//   }, [onFinish]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Loading App...</Text>
//       <Progress.Bar progress={progress} width={200} color="#3498db" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   text: {
//     fontSize: 18,
//     marginBottom: 20,
//   },
// });
