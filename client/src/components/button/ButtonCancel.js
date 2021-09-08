import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

export default function ButtonCancel(props) {
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate('Home');
      }}
      style={styles.uploadButton}>
      <Text style={styles.buttonText}>Cancel</Text>
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
});
