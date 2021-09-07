import React from 'react';
import {StyleSheet, SafeAreaView, TouchableOpacity, Image, Button} from 'react-native';

import ListContact from '../containers/ListContact';
import Header from '../components/Header';
import ButtonAdd from '../components/ButtonAdd';

function PhoneBox(props) {
  return (
    <SafeAreaView style={styles.container}>
      <Header label="Contacts" />
      <ListContact />
      <ButtonAdd navigation={props.navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'gainsboro',
  },
});

export default PhoneBox;
