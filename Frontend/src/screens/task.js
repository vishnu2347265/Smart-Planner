import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';

const TaskScreen = ({ route, navigation }) => {
  const { selectedDate, navigatedFromCalendar } = route.params || { selectedDate: new Date().toISOString().split('T')[0], navigatedFromCalendar: false }; // Default to today's date and not navigated from calendar

  // State to manage tasks for the selected date
  const [tasks, setTasks] = useState([]);

  // Function to handle marking a task as completed
  const handleTaskCompleted = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  // Define categories and their respective colors
  const categories = [
    { name: 'Academics/Profession', color: '#ffcc00' },
    { name: 'Personal', color: '#66ccff' },
    { name: 'Social', color: '#ff6666' },
    { name: 'General', color: '#99ff99' },
  ];

  // Function to navigate to AddTaskScreen with category name
  const handleCategoryPress = (categoryName) => {
    navigation.navigate('AddTask', { categoryName });
  };

  // Effect to load tasks based on navigation origin
  useEffect(() => {
    if (navigatedFromCalendar) {
      // Load tasks for the selected date if navigated from calendar
      // Replace this with your logic to fetch tasks for the selected date from your data source
      setTasks(/* Fetch tasks for selected date */ []);
    } else {
      // Load tasks for the default date if not navigated from calendar
      // Replace this with your logic to fetch tasks for the default date from your data source
      setTasks(/* Fetch tasks for default date */ []);
    }
  }, [navigatedFromCalendar, selectedDate]);

  return (
    <View>
      <Text>Tasks for: {selectedDate}</Text>
      {/* Container to wrap cards horizontally */}
      <View style={styles.horizontalContainer}>
        {/* Display cards for each category */}
        {categories.map((category, index) => (
          <TouchableOpacity key={index} onPress={() => handleCategoryPress(category.name)}>
            <View style={[styles.card, { backgroundColor: category.color }]}>
              <Text style={{ fontSize: 18, marginBottom: 5 }}>{category.name}</Text>
              {/* Display tasks for the category */}
              {tasks.map((task, taskIndex) => {
                if (task.category === category.name) {
                  return (
                    <View key={taskIndex} style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Switch
                        value={task.completed}
                        onValueChange={() => handleTaskCompleted(taskIndex)}
                      />
                      <Text style={{ textDecorationLine: task.completed ? 'line-through' : 'none' }}>
                        {task.task}
                      </Text>
                    </View>
                  );
                }
              })}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  horizontalContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: 180, // Adjust the width as needed
    height: 200, // Adjust the height as needed
    padding: 30,
    marginVertical: 10, // Adjust the vertical margin
    marginHorizontal: 10, // Adjust the horizontal margin 
    borderRadius: 8,
  },
});

export default TaskScreen;
