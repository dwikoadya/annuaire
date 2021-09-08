import React from 'react';
import {TouchableOpacity, StyleSheet, Image} from 'react-native';

function ButtonAdd(props) {
  return (
    <TouchableOpacity
      onPress={() => {props.navigation.navigate('AddContact')}}
      style={styles.touch}>
      <Image style={styles.add} source={require('../../assets/plus.jpeg')} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  add: {
    width: 70,
    height: 70,
    borderRadius: 75,
    position: 'absolute',
  },
  touch: {
    width: 70,
    height: 70,
    borderRadius: 50,
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginRight: 20,
    marginBottom: 20,
  },
});

export default ButtonAdd;
