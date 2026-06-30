import React from 'react';

import * as Linking from 'expo-linking';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingScreen from './screens/SettingScreen';


import { AuthProvider } from './context/AuthContext';
import { FavoriteProvider } from './context/FavoriteContext';


const linking = {
  prefixes: [Linking.createURL("/"), "meal-app://"],
  config: {
    screens: {
      Login: "login",
      Home: "home",
      Detail: "detail/:id",
      Profile: "profile",
      Settings: "settings",
    }
  }
}


export default function App() {

  return (
    <AuthProvider>
    <FavoriteProvider>
      <NavigationContainer linking={linking}>
        <Stack.Navigator>
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Detail" 
            component={DetailScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Profile" 
            component={ProfileScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Setting" 
            component={SettingScreen} 
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoriteProvider>  
    </AuthProvider>
  );
}