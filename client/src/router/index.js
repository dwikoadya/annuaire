import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
// import AddContact from '../containers/AddContact';
import Detail from '../containers/Detail';
import Add from '../screens/Add'

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false}} />
      <Stack.Screen name="AddContact" component={Add} options={{ headerShown: false }} />
      <Stack.Screen name="Details" component={Detail} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default Router