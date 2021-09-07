import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {NavigationContainer} from '@react-navigation/native';

import rootReducer from './src/reducers/index';
import Router from './src/router';

const store = createStore(rootReducer, applyMiddleware(thunk));

function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Router />
      </Provider>
    </NavigationContainer>
  );
}

export default App;
