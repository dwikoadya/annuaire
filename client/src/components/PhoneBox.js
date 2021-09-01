import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import ListContact from '../containers/ListContact';

function PhoneBox() {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.header}>Contacts</Text>
      </View>
      <ListContact />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    flexDirection: 'column',
    backgroundColor: 'gainsboro',
  },
  box: {
    // marginHorizontal: 20,
    // backgroundColor: 'blue',
  },
  header: {
    marginVertical: 20,
    marginHorizontal: 10,
    fontSize: 40,
    // backgroundColor: 'green',
  },
});

export default PhoneBox;
