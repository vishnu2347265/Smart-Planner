// src/navigation/BottomTabNavigator.js

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faCalendarAlt, faPlusCircle,  faTasks } from '@fortawesome/free-solid-svg-icons';
import Home from '../screens/home';
import Profile from '../screens/profile';
import Calendar from '../screens/calendar';
import Task from '../screens/task';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          let color;
          switch (route.name) {
            case 'Home':
              iconName = faPlusCircle;
              break;
            case 'Profile':
              iconName = faUser;
              break;
            case 'Calendar':
              iconName = faCalendarAlt;
              break;
            case 'Task':
              iconName = faTasks;
              break;
            default:
              iconName = faPlusCircle;
              break;
          }
          color = focused ? '#DDFF94' : '#748c94';
          return <FontAwesomeIcon icon={iconName} size={24} color={color} />;
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#000000',
          height: 60,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Task" component={Task} />
      <Tab.Screen name="Calendar" component={Calendar} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;