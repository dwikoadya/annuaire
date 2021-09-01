import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import rootReducer from './src/reducers/index';
import PhoneBox from './src/components/PhoneBox';

const store = createStore(rootReducer, applyMiddleware(thunk));

function App() {
  return (
    <SafeAreaView>
      <Provider store={store}>
        <PhoneBox />
      </Provider>
    </SafeAreaView>
  );
}

export default App
