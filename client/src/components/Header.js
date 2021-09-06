import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function Header(props) {
  const { label } = props
  return (
    <View style={styles.box}>
      <Text style={styles.header}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gainsboro',
    // borderRadius: 30
  },
  header: {
    marginVertical: 20,
    marginHorizontal: 10,
    fontSize: 30,
    // backgroundColor: 'green',
  },
})
