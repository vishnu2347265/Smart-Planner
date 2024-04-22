import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios'; // Import axios
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import hardcodedTasks from './hardcodedTasks';

const ProfileScreen = ({ navigation }) => {
  const [items, setItems] = useState({});
  const [selectedGraph, setSelectedGraph] = useState('previousMonth');
  const [graphHeading, setGraphHeading] = useState('Previous Month Analytics'); // Set default graph heading

  useEffect(() => {
    updateItems(hardcodedTasks);
  }, []);

  const updateItems = (taskData) => {
    // Your existing code for updating items
  };

  const handleLeftButtonPress = () => {
    console.log('Left button pressed');
  };
  
  const handleRightButtonPress = () => {
    const graphs = ['previousMonth', 'academicsProfession', 'personal', 'social', 'general'];
    const currentIndex = graphs.indexOf(selectedGraph);
    const nextIndex = (currentIndex + 1) % graphs.length;
    setSelectedGraph(graphs[nextIndex]);

    // Update graph heading based on selected graph
    switch (graphs[nextIndex]) {
      case 'academicsProfession':
        setGraphHeading('Academics/Profession');
        break;
      case 'personal':
        setGraphHeading('Personal');
        break;
      case 'social':
        setGraphHeading('Social');
        break;
      case 'general':
        setGraphHeading('General');
        break;
      default:
        setGraphHeading('Previous Month Analytics');
        break;
    }
  };

  const calculateAnalysisData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post('http://10.4.132.146:5001/user/previous-month-tasks', { token });
      console.log('Response:', response.data);
      // Return response data or manipulate as needed
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  const [categories, setCategories] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.post("http://10.4.132.146:5001/task/getAllTasks", { token });

        if (response.data && response.data.data) {
          const tasks = response.data.data;
          setCategories(tasks);

          const counts = {};
          tasks.forEach((task) => {
            counts[task.categoryName] = (counts[task.categoryName] || 0) + 1;
          });
          setCategoryCounts(counts);
        } else {
          console.error("Error fetching task categories: Response data is invalid");
        }
      } catch (error) {
        console.error("Error fetching task categories:", error);
      }
    };

    fetchCategories();
  }, [categories]);

  return (

    <ScrollView contentContainerStyle={styles.container}>
     
      <View style={styles.chartContainer}>
      <View style={styles.headerRow}>
        <Text>Vishnu</Text>
      </View>
        <View style={styles.chartHeader}>
          <TouchableOpacity onPress={handleLeftButtonPress}>
            <FontAwesome name="angle-left" size={24} color="white" style={styles.button} />
          </TouchableOpacity>
          <Text style={styles.chartHeading}>{graphHeading}</Text>
          <TouchableOpacity onPress={handleRightButtonPress}>
            <FontAwesome name="angle-right" size={24} color="white" style={styles.button} />
          </TouchableOpacity>
        </View>
        <View style={styles.chartBox}>
          <BarChart
            data={{
              labels: Object.keys(categoryCounts),
              datasets: [{ data: Object.values(categoryCounts) }],
            }}
            width={350}
            height={250}
            yAxisSuffix=""
            chartConfig={{
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: { borderRadius: 16 },
            }}
            style={styles.chart}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  container: {
    flexGrow: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  chartHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  button: {
    marginLeft: 10,
    marginRight: 10,
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
});

export default ProfileScreen;
