import React from 'react';
import {View, Text} from 'react-native';

const Contact = (props) => {
  return (
    <View>
      <Text>{props.name}</Text>
      <Text>{props.phone}</Text>
    </View>
  );
};

export default Contact;
