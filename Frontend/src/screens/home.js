// 






import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell, faSort, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CircularProgress } from 'react-native-circular-progress';

const HomeScreen = ({ navigation, route }) => {
  const [tasks, setTasks] = useState([]);
  const [recentTask, setRecentTask] = useState(undefined);
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [filterDone, setFilterDone] = useState(false);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [taskCategories, setTaskCategories] = useState([
    { name: "Total Tasks", count: 0 },
    { name: "Academics/Profession", count: 0 },
    { name: "Personal", count: 0 },
    { name: "Social", count: 0 },
    { name: "General", count: 0 }
  ]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (route.params && route.params.newTask) {
      // Convert startTime to a serializable format (string representation of the date)
      const newTask = {
        ...route.params.newTask,
        startTime: route.params.newTask.startTime.getTime() // Convert Date to milliseconds since Unix epoch
      };
      

      setTasks(prevTasks => [newTask, ...prevTasks]);
      setRecentTask(newTask);

      // Update total tasks count
      setTaskCategories(categories => {
        const newCategories = [...categories];
        newCategories[0].count++;
        return newCategories;
      });

      // Update category-specific tasks count
      const categoryIndex = taskCategories.findIndex(category => category.name === newTask.category);
      if (categoryIndex !== -1) {
        setTaskCategories(categories => {
          const newCategories = [...categories];
          newCategories[categoryIndex].count++;
          return newCategories;
        });
      }
    }
  }, [route.params]);

  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    const taskToMove = { ...updatedTasks[index] }; // Create a copy of the task

    // Toggle the completion status of the task
    taskToMove.completed = !taskToMove.completed;

    // Update the task in the array
    updatedTasks[index] = taskToMove;

    // Recalculate the completion percentage
    const completedTaskCount = updatedTasks.filter(task => task.completed).length;
    const totalTaskCount = updatedTasks.length;
    const newCompletionPercentage = totalTaskCount === 0 ? 0 : (completedTaskCount / totalTaskCount) * 100;

    // Update the state with the new task list and completion percentage
    setTasks(updatedTasks);
    setCompletionPercentage(newCompletionPercentage);
  };

  const handleTaskPress = (task) => {
    setSelectedTask(task);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setModalVisible(false);
  };

  const deleteTask = () => {
    const updatedTasks = tasks.filter(task => task !== selectedTask);
    setTasks(updatedTasks);
    closeModal();
  };

  const applyFilter = () => {
    setFilterDone(!filterDone);
    // Toggle the sorting order based on completion status
    setTasks(prevTasks => {
      return [...prevTasks].sort((a, b) => {
        if (a.completed !== b.completed) {
          // If completion status is different, sort by completion status
          return filterDone ? (a.completed ? -1 : 1) : (a.completed ? 1 : -1);
        } else {
          // If completion status is same, maintain the existing order
          return 0;
        }
      });
    });
  };


  return (
    <View style={{ flex: 1, backgroundColor: 'black', borderTopWidth: 0, paddingHorizontal: 30, paddingTop: 80 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <View>
          <Text style={{ color: 'white', fontSize: 24 }}>Hey Alwin 🙋‍♂️</Text>
        </View>
        <TouchableOpacity onPress={() => console.log("Notification bell icon pressed")} style={{ paddingHorizontal: 8, paddingTop: 30 }}>
          <FontAwesomeIcon icon={faBell} size={20} color="white" />
        </TouchableOpacity>
      </View>
      <View style={{ borderWidth: 1, borderColor: 'black', marginBottom: 20 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ marginTop: 10, marginBottom: 20 }}>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={{ backgroundColor: '#DDFF94', width: 150, height: 170, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginHorizontal: 5 }}>
            <Text style={{ color: 'black', fontSize: 18, marginBottom: 10 }}>My Tasks</Text>
            <CircularProgress
              size={50}
              width={6}
              fill={completionPercentage}
              tintColor="blue" // Color when progress is filled
              backgroundColor="white" // Color when progress is not filled
            >
              {() => (
                <Text style={{ color: 'black', fontSize: 15 }}>{Math.round(completionPercentage)}%</Text>
              )}
            </CircularProgress>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: '#9F7AF9', width: 150, height: 170, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginHorizontal: 5 }}>
            <Text style={{ color: 'white', fontSize: 18 }}>Review Analytics</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: '#FB83F7', width: 150, height: 170, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginHorizontal: 5 }}>
            <Text style={{ color: 'white', fontSize: 18 }}>Pandora</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <Text style={{ color: 'white', fontSize: 20, marginLeft: 10 }}>Recent Tasks</Text>
        <TouchableOpacity onPress={applyFilter} style={{ paddingHorizontal: 8, marginTop: 10 }}>
          <FontAwesomeIcon icon={faSort} size={20} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ flex: 1 }}>
        {tasks.map((task, index) => (
          <TouchableOpacity
            key={index}
            style={{
              backgroundColor: task.completed ? '#808080' : '#FFD700',
              width: '100%',
              height: 100,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
              marginTop: 10,
              marginHorizontal: 5
            }}
            onPress={() => handleTaskPress(task)}
          >
            <Text style={{ color: 'black', fontSize: 18 }}>{task.name}</Text>
            <Text style={{ color: 'black', fontSize: 16 }}>{task.description}</Text>
            <TouchableOpacity onPress={() => toggleTaskCompletion(index)} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
              <View style={[styles.radioButton, { backgroundColor: task.completed ? 'green' : 'red' }]} />
              <Text style={{ color: 'black', marginLeft: 5 }}>{task.completed ? 'Mark as Undone' : 'Mark as Done'}</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {taskCategories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={styles.categoryItem}
                onPress={() => handleCategoryPress(category)}
              >
                <Text style={styles.modalText}>{category.name} ({category.count})</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  categoryItem: {
    padding: 10,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginRight: 10
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
