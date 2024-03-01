// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/home';
import Task from './src/screens/task';
import Profile from './src/screens/profile';
import Calendar from './src/screens/calendar';
import StartScreen from './src/screens/StartScreen';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import { Text, View } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown:false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        
        <Stack.Screen name="Task" component={Task} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Calendar" component={Calendar} />
        {/* <Stack.Screen name="StartScreen" component={StartScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}