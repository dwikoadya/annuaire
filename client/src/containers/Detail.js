import React, { Component } from 'react';
import {SafeAreaView, View, Image, TouchableOpacity, Text} from 'react-native';

class Detail extends Component {
  constructor(props) {
    super(props)
    console.log("ngaran",props.route.params.name)
  }
  render() {
    return (
      <SafeAreaView style={{backgroundColor: 'red', flex: 1, flexDirection: 'column'}}>
        <View style={{backgroundColor: 'blue', flex: 3}}>
          <Text style={{backgroundColor: 'green'}}>{this.props.route.params.name}</Text>
        </View>
        <View style={{backgroundColor: 'blue', flex: 2}}>
          <Text style={{backgroundColor: 'green'}}>{this.props.route.params.phone}</Text>
        </View>
      </SafeAreaView>
    )
  }
}

export default Detail