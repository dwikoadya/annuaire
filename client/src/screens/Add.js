import React from 'react';
import {View, StyleSheet} from 'react-native';

import AddContact from '../containers/AddContact';
import Header from '../components/Header';

function Add(props) {
  return (
    <View style={styles.container}>
      <Header label="Add Contact" />
        <AddContact navigation={props.navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: 'gainsboro',
  },
  imgPrev: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Add;
