
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Agenda } from 'react-native-calendars';
import hardcodedTasks from './hardcodedTasks'; // Import hardcoded tasks

const CalendarScreen = ({ navigation, route }) => {
  const [items, setItems] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Default to current date

  useEffect(() => {
    // Update items with hardcoded tasks data
    updateItems(hardcodedTasks);
  }, []); // Empty dependency array to run the effect only once

  // Function to update the items state with the task data
  const updateItems = (taskData) => {
    const tasks = taskData;

    tasks.forEach(task => {
      const startDate = new Date(task.startTime);
      const endDate = new Date(task.endTime);
  
      // Calculate the number of days the task spans
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Use Math.ceil to include the end day
  
      // Loop through the range of dates and add task data
      for (let i = 0; i < diffDays; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
    
        // Determine if it's the first or last day of the task
        const isFirstDay = i === 0;
        const isLastDay = i === diffDays - 1;
    
        // For the first day, use the original start time; for the last day, use the original end time
        const startTime = isFirstDay ? task.startTime.toLocaleTimeString() : '00:00:00';
        const endTime = isLastDay ? task.endTime.toLocaleTimeString() : '23:59:59';
    
        // Add task data for the current date
        const date = currentDate.toISOString().split('T')[0];
        setItems((prevItems) => ({
          ...prevItems,
          [date]: [
            ...(prevItems[date] ? prevItems[date] : []),
            {
              category: task.category, // Use category name instead of task name
              startTime: task.startTime,
              endTime: task.endTime,
            },
          ],
        }));
      }
    });
  };


  // Handle newly created task data passed from AddTaskScreen
  useEffect(() => {
    if (route.params && route.params.taskData) {
      const newTaskData = route.params.taskData;
      updateItems([newTaskData, ...hardcodedTasks]); // Update items with the new task data along with hardcoded tasks
    }
  }, [route.params]); // Include route.params in the dependency array

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ position: 'absolute', top: 100, left: 40 }}>
        <Text style={{ color: 'white', fontSize: 24 }}>Calendar</Text>
      </View>

      <View style={{ flex: 1, marginTop: 150 }}>
        {/* Render your calendar component here */}
        {/* Placeholder for the Agenda component */}
        <Agenda
          items={items}
          selected={selectedDate}
          renderItem={(item, firstItemInDay) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.category}</Text>
              <Text style={styles.cardText}>Start Time: {new Date(item.startTime).toLocaleTimeString()}</Text>
              <Text style={styles.cardText}>End Time: {new Date(item.endTime).toLocaleTimeString()}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default CalendarScreen;
