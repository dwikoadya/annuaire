import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

export default function ButtonSave(props) {
  const { onPress } = props
  return (
    <TouchableOpacity style={styles.uploadButton} onPress={onPress}>
      <Text style={styles.buttonText}>Save</Text>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  uploadButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})