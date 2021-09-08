import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import ListContact from '../containers/ListContact';
import Header from '../components/Header';
import ButtonAdd from '../components/button/ButtonAdd';

function Home(props) {
  return (
    <SafeAreaView style={styles.container}>
      <Header label="Contacts" />
      <ListContact navigation={props.navigation} />
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

export default Home;
