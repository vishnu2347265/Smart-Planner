// // TabNavigation.js

// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faCalendarAlt, faTasks, faUser } from '@fortawesome/free-solid-svg-icons';

// // Import screens
// import CalendarScreen from '../screens/calendar';
// import TasksScreen from '../screens/task';
// import ProfileScreen from '../screens/profile';

// const Tab = createBottomTabNavigator();

// const BottomTabs = () => {
//   return (
//     <Tab.Navigator
//       tabBarOptions={{
//         activeTintColor: 'blue',
//         inactiveTintColor: 'gray',
//         labelStyle: {
//           fontSize: 12,
//         },
//       }}
//     >
//       <Tab.Screen
//         name="Calendar"
//         component={CalendarScreen}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <FontAwesomeIcon icon={faCalendarAlt} style={{ color }} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Tasks"
//         component={TasksScreen}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <FontAwesomeIcon icon={faTasks} style={{ color }} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={ProfileScreen}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <FontAwesomeIcon icon={faUser} style={{ color }} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// export default BottomTabs;
