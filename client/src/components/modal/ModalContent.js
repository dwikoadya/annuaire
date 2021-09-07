import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function ModalContent(props) {
  const {onPress, label} = props;
  return (
    <TouchableOpacity style={styles.modalContent} onPress={onPress}>
      <Text style={styles.modalText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    padding: 20,
    alignItems: 'center',
    borderTopWidth: 0.5,
    marginHorizontal: 30,
  },
  modalText: {
    fontSize: 20,
  },
});
