// import React, { useState, useEffect } from 'react';
// import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';

// const TaskScreen = ({ route, navigation }) => {
//   const { selectedDate, navigatedFromCalendar } = route.params || { selectedDate: new Date().toISOString().split('T')[0], navigatedFromCalendar: false }; // Default to today's date and not navigated from calendar

//   // State to manage tasks for the selected date
//   const [tasks, setTasks] = useState([]);

//   // Function to handle marking a task as completed
//   const handleTaskCompleted = (index) => {
//     const updatedTasks = [...tasks];
//     updatedTasks[index].completed = !updatedTasks[index].completed;
//     setTasks(updatedTasks);
//   };

//   // Define categories and their respective colors
//   const categories = [
//     { name: 'Academics/Profession', color: '#ffcc00' },
//     { name: 'Personal', color: '#66ccff' },
//     { name: 'Social', color: '#ff6666' },
//     { name: 'General', color: '#99ff99' },
//   ];

//   // Function to navigate to AddTaskScreen with category name
//   const handleCategoryPress = (categoryName) => {
//     navigation.navigate('AddTask', { categoryName });
//   };

//   // Effect to load tasks based on navigation origin
//   useEffect(() => {
//     if (navigatedFromCalendar) {
//       // Load tasks for the selected date if navigated from calendar
//       // Replace this with your logic to fetch tasks for the selected date from your data source
//       setTasks(/* Fetch tasks for selected date */ []);
//     } else {
//       // Load tasks for the default date if not navigated from calendar
//       // Replace this with your logic to fetch tasks for the default date from your data source
//       setTasks(/* Fetch tasks for default date */ []);
//     }
//   }, [navigatedFromCalendar, selectedDate]);

//   return (
//     <View>
//       <Text>Tasks for: {selectedDate}</Text>
//       {/* Container to wrap cards horizontally */}
//       <View style={styles.horizontalContainer}>
//         {/* Display cards for each category */}
//         {categories.map((category, index) => (
//           <TouchableOpacity key={index} onPress={() => handleCategoryPress(category.name)}>
//             <View style={[styles.card, { backgroundColor: category.color }]}>
//               <Text style={{ fontSize: 
// 8, marginBottom: 5 }}>{category.name}</Text>
//               {/* Display tasks for the category */}
//               {tasks.map((task, taskIndex) => {
//                 if (task.category === category.name) {
//                   return (
//                     <View key={taskIndex} style={{ flexDirection: 'row', alignItems: 'center' }}>
//                       <Switch
//                         value={task.completed}
//                         onValueChange={() => handleTaskCompleted(taskIndex)}
//                       />
//                       <Text style={{ textDecorationLine: task.completed ? 'line-through' : 'none' }}>
//                         {task.task}
//                       </Text>
//                     </View>
//                   );
//                 }
//               })}
//             </View>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   horizontalContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   card: {
//     width: 180, // Adjust the width as needed
//     height: 200, // Adjust the height as needed
//     padding: 30,
//     marginVertical: 10, // Adjust the vertical margin
//     marginHorizontal: 10, // Adjust the horizontal margin 
//     borderRadius: 8,
//   },
// });

// export default TaskScreen;





import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AddTaskScreen from './AddTaskScreen';

const Stack = createStackNavigator();

const TaskScreen = ({ navigation }) => {
  // Define categories
  const categories = [
    { name: 'Academics/Profession', color: '#222222', image: require('../assets/Academics.png') },
    { name: 'Personal', color: '#222222', image: require('../assets/Personal.png') }, 
    { name: 'Social', color: '#222222', image: require('../assets/Social.png') }, 
    { name: 'General', color: '#222222', image: require('../assets/General.png') }, 
  ];

  // Function to navigate to AddTaskScreen when a category card is pressed
  const handleCategoryPress = (selectedCategory) => {
    navigation.navigate('AddTaskScreen', { selectedCategory });
  };

  // Function to render each category item
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity style={[styles.card, { backgroundColor: item.color }]} onPress={() => handleCategoryPress(item.name)}>
      {/* Display image */}
      {item.image && <Image source={item.image} style={styles.image} />}
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TaskList">
        {() => (
          <View style={styles.container}>
            <Text style={styles.heading}>Categories</Text>
            {/* FlatList to display categories */}
            <FlatList
              data={categories}
              renderItem={renderCategoryItem}
              keyExtractor={(item) => item.name}
              numColumns={2}
              contentContainerStyle={styles.flatListContent}
            />
          </View>
        )}
      </Stack.Screen>
      <Stack.Screen name="AddTaskScreen" component={AddTaskScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  heading: {
    fontSize: 25,
    color: 'white',
    marginBottom: 20,
  },
  flatListContent: {
    alignItems: 'center',
  },
  card: {
    width: '45%',
    height: 180,
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 18,
    color: 'white',
    marginTop: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 40, 
  },
});

export default TaskScreen;
