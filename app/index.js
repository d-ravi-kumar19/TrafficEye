import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import CameraScreen from './screens/CameraScreen';

const Stack = createNativeStackNavigator();

export default function Index() {
  return (
    <Stack.Navigator initialRouteName="Home">
    <Stack.Screen 
      name="Home" 
      component={HomeScreen} 
      options={{ headerShown: false }} // Corrected property
    />
    <Stack.Screen 
      name="Camera" 
      component={CameraScreen} 
      options={{ headerShown: false }} // Corrected property
    />
  </Stack.Navigator>
  );
}
