import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, TextInput, Switch, Button, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddTaskScreen = ({ route, navigation }) => {
  const { categoryName } = route.params || { categoryName: '' };
  const [tasksByCategory, setTasksByCategory] = useState({
    'Academics/Profession': ['Homework/Assignments', 'Exams/Tests', 'Study Sessions', 'Projects'],
    'Personal': ['Fitness/Health', 'Career/Internship', 'Personal Tasks'],
    'Social': ['Extracurricular Activities', 'Meetings', 'Social Events'],
    'General': ['Reminders', 'Travel Plans', 'Sleep/Rest'],
  });
  const [modalVisible, setModalVisible] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(categoryName);
  const [selectedTask, setSelectedTask] = useState('');
  const [isAddingCustomTask, setIsAddingCustomTask] = useState(false);
  const [customTask, setCustomTask] = useState('');
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
    setTaskName(task); // Set task name to the selected task
    setModalVisible(false);
  };

  const handleAddCustomTask = () => {
    if (customTask.trim() !== '') {
      const updatedTasks = [...tasksByCategory[selectedCategory]];
      updatedTasks.push(customTask.trim());
      setTasksByCategory({
        ...tasksByCategory,
        [selectedCategory]: updatedTasks,
      });
      setCustomTask('');
      setIsAddingCustomTask(false);
    }
  };

  const handleSaveTask = () => {
    // Save the task details and navigate back to the previous screen
    // You can implement your logic here to save the task to your data source
    navigation.goBack();
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select a Category</Text>
            <Picker
              selectedValue={selectedCategory}
              onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            >
              {Object.keys(tasksByCategory).map((category) => (
                <Picker.Item key={category} label={category} value={category} />
              ))}
            </Picker>
            <Text style={styles.modalTitle}>Select a Task</Text>
            {tasksByCategory[selectedCategory] && tasksByCategory[selectedCategory].map((task, index) => (
              <TouchableOpacity
                key={index}
                style={styles.taskItem}
                onPress={() => handleTaskSelect(task)}
              >
                <Text style={styles.taskText}>{task}</Text>
              </TouchableOpacity>
            ))}
            <View style={styles.switchContainer}>
              <Text>Add Custom Task</Text>
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isAddingCustomTask ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={(value) => setIsAddingCustomTask(value)}
                value={isAddingCustomTask}
              />
            </View>
            {isAddingCustomTask && (
              <View style={styles.customTaskInputContainer}>
                <TextInput
                  style={styles.customTaskInput}
                  value={customTask}
                  onChangeText={setCustomTask}
                  placeholder="Enter custom task"
                />
                <TouchableOpacity style={styles.addButton} onPress={handleAddCustomTask}>
                  <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      
      {/* Task details input */}
      <View style={styles.taskDetailsContainer}>
        <Text style={styles.categoryText}>Category: {selectedCategory}</Text>
        <TextInput
          style={styles.input}
          placeholder="Task Name"
          value={taskName}
          onChangeText={setTaskName}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Select Time"
            onPress={() => setShowDatePicker(true)}
          />
          <View style={styles.buttonSpace}></View>
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View>
        <View style={styles.buttonSpace}></View>
        <Button
          title="Add Task"
          onPress={handleSaveTask}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  taskItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  taskText: {
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  customTaskInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  customTaskInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#007AFF',
  },
  taskDetailsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  categoryText: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: '100%', // or specify a fixed width that suits your design
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonSpace: {
    width: 10, // Adjust width for spacing
  },
});

export default AddTaskScreen;
