import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import AddContact from '../containers/AddContact';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Contact" component={Home} options={{ headerShown: false}} />
      <Stack.Screen name="AddContact" component={AddContact} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default Router