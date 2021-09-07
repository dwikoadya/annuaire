import React from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';

export default function ModalScene(props) {
  const {isVisible, onSwipeComplete, onBackdropPress, children, onBackButtonPress} = props;
  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={onSwipeComplete}
      onBackdropPress={onBackdropPress}
      onBackButtonPress={onBackButtonPress}
      swipeDirection={['up', 'left', 'right', 'down']}
      style={styles.view}>
      <View style={styles.modalView}>
        {children}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalView: {
    backgroundColor: 'white',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
});
