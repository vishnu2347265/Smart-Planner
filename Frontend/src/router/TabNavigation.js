// TabNavigation.js

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendarAlt, faTasks, faUser } from '@fortawesome/free-solid-svg-icons';

// Import screens
import CalendarScreen from '../screens/calendar';
import TasksScreen from '../screens/task';
import ProfileScreen from '../screens/profile';
import { Home } from 'react-native-feather';
import TaskScreen from '../screens/task';
import AddTaskScreen from '../screens/AddTaskScreen';
import Profile from '../screens/profile';
import Calendar from '../screens/calendar';


const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (<Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      tabBarShowLabel: false,
      tabBarStyle: [
        {
          display: 'flex',
        },
        null,
      ],
      tabBarIconStyle: {
        marginBottom: 15, // Adjust the bottom padding as needed
      },
    }}
  >
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
            <FontAwesomeIcon icon={faHome} size={24} color={focused ? '#e32f45' : '#748c94'} />
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Task"
      component={TaskScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
            <FontAwesomeIcon icon={faTasks} size={24} color={focused ? '#e32f45' : '#748c94'} />
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="AddTask"
      component={AddTaskScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <FontAwesomeIcon icon={faPlus} size={35} color="#fff" />
        ),
        tabBarButton: (props) => (
          <CustomTabBarButton {...props} accessibilityLabel="Add Task" />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
            <FontAwesomeIcon icon={faUser} size={24} color={focused ? '#e32f45' : '#748c94'} />
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Calendar"
      component={Calendar}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
            <FontAwesomeIcon icon={faCalendarAlt} size={24} color={focused ? '#e32f45' : '#748c94'} />
          </View>
        ),
      }}

      
    />
    
  </Tab.Navigator>
  );
};

export default BottomTabs;
