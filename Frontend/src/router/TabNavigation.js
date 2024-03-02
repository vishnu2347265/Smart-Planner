// TabNavigation.js

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendarAlt, faTasks, faUser } from '@fortawesome/free-solid-svg-icons';
import { TouchableOpacity, View } from 'react-native'; // Import AddTaskScreen
import { faHome, faPlus } from '@fortawesome/free-solid-svg-icons';

import { Home } from 'react-native-feather';
import TaskScreen from '../screens/task';
import AddTaskScreen from '../screens/AddTaskScreen';
import Profile from '../screens/profile';
import Calendar from '../screens/calendar';


const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress, accessibilityLabel }) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
      // ...styles.shadow,
    }}
    onPress={onPress}
    accessibilityLabel={accessibilityLabel}
  >
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#e32f45',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

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
