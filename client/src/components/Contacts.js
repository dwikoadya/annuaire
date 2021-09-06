import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const Contact = props => {
  return (
    <View style={styles.item}>
      <Image style={styles.avatar} source={{uri: props.avatar}}></Image>
      <View style={styles.contact}>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.phone}>{props.phone}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 20,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  avatar: {
    height: 50,
    width: 50,
    padding: 20,
    borderRadius: 50,
  },
  name: {
    fontSize: 30,
  },
  phone: {
    fontSize: 20,
  },
  contact: {
    flex: 4,
    flexDirection: 'column',
    marginHorizontal: 10,
  },
});

export default Contact;
