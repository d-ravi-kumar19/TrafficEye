import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Settings({ onClose }) {
  const [captureInterval, setCaptureInterval] = useState(1); // in seconds
  const [highQuality, setHighQuality] = useState(false);
  const [saveLocally, setSaveLocally] = useState(false);

  const handleIntervalChange = (increase) => {
    setCaptureInterval(prevInterval => {
      const newInterval = increase ? prevInterval + 1 : Math.max(1, prevInterval - 1);
      return newInterval;
    });
  };

  const handleSave = () => {
    // Here you would typically save these settings to AsyncStorage or your preferred storage method
    console.log('Saving settings:', { captureInterval, highQuality, saveLocally });
    onClose();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Ionicons name="close" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Settings</Text>
      
      <View style={styles.setting}>
        <Text>Capture Interval (seconds)</Text>
        <View style={styles.intervalControl}>
          <TouchableOpacity onPress={() => handleIntervalChange(false)}>
            <Ionicons name="remove" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.intervalText}>{captureInterval}</Text>
          <TouchableOpacity onPress={() => handleIntervalChange(true)}>
            <Ionicons name="add" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.setting}>
        <Text>High Quality Images</Text>
        <Switch
          value={highQuality}
          onValueChange={setHighQuality}
        />
      </View>

      <View style={styles.setting}>
        <Text>Save Images Locally</Text>
        <Switch
          value={saveLocally}
          onValueChange={setSaveLocally}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  intervalControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  intervalText: {
    marginHorizontal: 10,
    fontSize: 18,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
});