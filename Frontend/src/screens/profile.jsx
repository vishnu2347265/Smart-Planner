

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icon library
import hardcodedTasks from './hardcodedTasks'; // Import hardcoded tasks
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

// Dummy user data for testing
const user = {
  name: 'Alwin Tomy',
  email: 'alwintomy11@gmail.com',
  avatar: require('../assets/profile.png'), // Assuming you have an avatar image
  bio: 'Previous Month Analytics',
};

const ProfileScreen = ({ navigation }) => {
  const [items, setItems] = useState({});
  const [selectedGraph, setSelectedGraph] = useState('previousMonth');
  const [graphHeading, setGraphHeading] = useState(user.bio);

  useEffect(() => {
    // Update items with hardcoded tasks data
    updateItems(hardcodedTasks);
  }, []); // Empty dependency array to run the effect only once

  // Function to update items state with task data
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
              name: task.name,
              startTime: task.startTime,
              endTime: task.endTime,
            },
          ],
        }));
      }
    });
  };

  const handleLeftButtonPress = () => {
    switch (selectedGraph) {
      case 'previousMonth':
        setSelectedGraph('general');
        setGraphHeading('General');
        break;
      case 'personal':
        setSelectedGraph('previousMonth');
        setGraphHeading(user.bio);
        break;
      case 'social':
        setSelectedGraph('personal');
        setGraphHeading('Personal');
        break;
      case 'general':
        setSelectedGraph('social');
        setGraphHeading('Social');
        break;
      default:
        break;
    }
  };

  const handleRightButtonPress = () => {
    switch (selectedGraph) {
      case 'previousMonth':
        setSelectedGraph('personal');
        setGraphHeading('Personal');
        break;
      case 'personal':
        setSelectedGraph('social');
        setGraphHeading('Social');
        break;
      case 'social':
        setSelectedGraph('general');
        setGraphHeading('General');
        break;
      case 'general':
        setSelectedGraph('previousMonth');
        setGraphHeading(user.bio);
        break;
      default:
        break;
    }
  };

  // Calculate analysis data from calendar items
  const calculateAnalysisData =  async () => {
    const token = await AsyncStorage.getItem("token");
    // Initialize analysis data object
    await axios.post('http://172.20.10.13:5001/user/previous-month-tasks', { token })
    .then(response => {
        console.log('Response:', response.data);
    })
    .catch(error => {
        console.error('Error:', error.response.data);
    });
    
    const previousMonthData = {
      'Academics/Profession': 50,
      'Personal': 10,
      'Social': 50,
      'General': 100,
    };

    // Initialize data for personal, social, and general graphs
    const personalData = {
      'Sleep': 8,
      'Exercise': 2,
      'Hobbies': 4,
      'Self-Care': 3,
    };

    const socialData = {
      'Family': 10,
      'Friends': 8,
      'Events': 6,
      'Meetings': 4,
    };

    const generalData = {
      'Work': 60,
      'Study': 20,
      'Household': 10,
      'Errands': 10,
    };

    switch (selectedGraph) {
      case 'previousMonth':
        return previousMonthData;
      case 'personal':
        return personalData;
      case 'social':
        return socialData;
      case 'general':
        return generalData;
      default:
        return previousMonthData;
    }
  };

  // Get analysis data
  const analysisData = calculateAnalysisData();

  // Automated feedback for each category
  const feedback = {
    'previousMonth': [
      `Your efficiency in academic or professional tasks appears to be moderate. Consider allocating more time or effort to these areas for improved performance.`,
      `You've dedicated a reasonable amount of time to personal activities. Keep maintaining a healthy balance between personal and other aspects of your life.`,
      `Your social engagement seems to be quite active, reflecting a good level of social interaction. Continue nurturing your social connections.`,
      `A significant portion of your time is spent on general tasks. Consider prioritizing tasks or organizing your activities more efficiently to optimize productivity.`,
    ],
    'personal': [
      `Your sleep duration seems adequate.`,
      `Consider increasing your exercise time for better health.`,
      `You're spending a good amount of time on your hobbies.`,
      `Maintaining self-care routines is crucial for overall well-being. Keep up the good work!`,
    ],
    'social': [
      `Maintaining a healthy relationship with family is important.`,
      `Nurturing friendships is essential for social well-being.`,
      `Attending events can be refreshing and beneficial.`,
      `Balancing meetings with other activities is key for time management.`,
    ],
    'general': [
      `Your work engagement seems substantial.`,
      `Dedicate enough time to your studies for better academic performance.`,
      `Keeping up with household chores is important for a tidy environment.`,
      `Efficiently completing errands is essential for daily life.`,
    ],
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topContainer}>
        <Image source={user.avatar} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.chartContainer}>
        <View style={styles.chartHeader}>
          {/* Left button */}
          <TouchableOpacity onPress={handleLeftButtonPress}>
            <FontAwesome name="angle-left" size={24} color="white" style={styles.button} />
          </TouchableOpacity>
          {/* Chart heading */}
          <Text style={styles.chartHeading}>{graphHeading}</Text>
          {/* Right button */}
          <TouchableOpacity onPress={handleRightButtonPress}>
            <FontAwesome name="angle-right" size={24} color="white" style={styles.button} />
          </TouchableOpacity>
        </View>
        <View style={styles.chartBox}>
          <BarChart
            data={{
              labels: Object.keys(analysisData),
              datasets: [{
                data: Object.values(analysisData),
              }],
            }}
            width={350} // Adjust the width to make the chart smaller
            height={250} //
            yAxisSuffix=""
            chartConfig={{
              backgroundGradientFrom: '#ffffff', // Set background color to white
              backgroundGradientTo: '#ffffff', // Set background color to white
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Set data color to black
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Set label color to black
              style: {
                borderRadius: 16,
              },
            }}
            style={styles.chart}
          />
        </View>
      </View>

      {/* Feedback for each category */}
      <View style={styles.feedbackContainer}>
        {feedback[selectedGraph].map((text, index) => (
          <Text key={index} style={styles.feedbackText}>{text}</Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  topContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 5, color: 'white', },
  email: { fontSize: 18, marginBottom: 10, color: 'white', },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 20, // Add margin bottom to provide space for the chart
  },
  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Align items along the main axis (horizontal centering)
    marginBottom: 10,
  },
  chartHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    flex: 1, // Take up available space
    textAlign: 'center', // Center the text
  },
  button: {
    marginLeft: 10, // Add some spacing between the buttons and the heading
    marginRight: 10, // Add some spacing between the heading and the buttons
  },
  chartBox: {
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
  },
  chart: {
    borderRadius: 16,
  },
  feedbackContainer: {},
  feedbackText: {
    color: 'white',
    marginBottom: 10,
  },
});

export default ProfileScreen;

