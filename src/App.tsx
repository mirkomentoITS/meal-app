import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';


const linking = {
  prefixes: ["myapp://"],
  config: {
    screens: {
      Login: "login",
      Profile: "profile",
      Home: "home",
      Details: "details/:id",

    }
  }
}
// bottom tabs navigation
// screen solo della parte di codice del lab

export default function App() {

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        {/*<Stack.Screen name="Login" component={LoginScreen} />*/}
        {/*<Stack.Screen name="Profile" component={ProfileScreen} />*/}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}