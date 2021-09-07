import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PhoneBox from '../screens/PhoneBox';
import AddContact from '../screens/AddContact';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Contact" component={PhoneBox} options={{ headerShown: false}} />
      <Stack.Screen name="AddContact" component={AddContact} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default Router