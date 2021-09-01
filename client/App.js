import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import rootReducer from './src/reducers/index';
import PhoneBox from './src/components/PhoneBox';

const store = createStore(rootReducer, applyMiddleware(thunk));

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <PhoneBox />
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    flexDirection: 'column',
    backgroundColor: 'grey',
  },
})

export default App
