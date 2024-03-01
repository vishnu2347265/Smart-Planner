import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Modal, TouchableWithoutFeedback } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const HomeScreen = ({ navigation, route }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tasks, setTasks] = useState([]);

  const formatDate = (date) => {
    const options = { weekday: 'short' };
    return date.toLocaleDateString('en-US', options);
  };

  const formatMonthYear = (date) => {
    const options = { month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const updateCurrentDate = (newDate) => {
    setCurrentDate(newDate);
    setIsModalVisible(false);
    fetchTasks(newDate);
  };

  useEffect(() => {
    fetchTasks(currentDate);
  }, []);

  const fetchTasks = (date) => {
    // Implement your logic to fetch tasks for the given date from your data source
    // For demonstration purposes, here we are setting some dummy tasks
    setTasks([
      { id: 1, title: 'Task 1', date: '2024-03-01' },
      { id: 2, title: 'Task 2', date: '2024-03-01' },
      { id: 3, title: 'Task 3', date: '2024-03-02' },
    ]);
  };

  const getCalendarDates = () => {
    const today = new Date(currentDate);
    const currentMonth = today.getMonth();
    const nextMonth = new Date(today);
    nextMonth.setMonth(currentMonth + 1);

    const calendarDates = [];
    let date = new Date(today);
    while (date.getMonth() === currentMonth) {
      calendarDates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    calendarDates.push('+');

    return calendarDates;
  };

  const monthNames = Array.from({ length: 12 }, (_, index) => {
    return {
      label: formatMonthYear(new Date(currentDate.getFullYear(), index, 1)),
      value: index,
    };
  });

  const navigateToTaskScreen = () => {
    navigation.navigate('Task', { selectedDate: currentDate.toISOString().split('T')[0] });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.profileContainer}>
          <Image source={require('../assets/profile.png')} style={styles.profilePhoto} />
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>Alwin Tomy</Text>
            <Text style={styles.date}>{currentDate.toDateString()}</Text> 
          </View>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <FontAwesomeIcon icon={faBell} style={styles.notificationIcon} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={navigateToTaskScreen}>
        <View style={styles.monthYearContainer}>
          <Text style={styles.monthYearText}>{formatMonthYear(currentDate)}</Text>
          <FontAwesomeIcon icon={faChevronRight} style={styles.arrowIcon} />
        </View>
      </TouchableOpacity>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <ScrollView>
                {monthNames.map((month, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => updateCurrentDate(new Date(currentDate.getFullYear(), month.value, 1))}
                    style={styles.monthButton}>
                    <Text>{month.label}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.calendarContainer}>
        {getCalendarDates().map((date, index) => (
          <TouchableOpacity
            key={index}
            style={styles.calendarBox}
            onPress={() => {
              if (date === '+') {
                updateCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
              }
            }}>
            {date === '+' ? (
              <Text style={styles.nextMonthIndicator}>+</Text>
            ) : (
              <>
                <Text style={styles.calendarDay}>{formatDate(date)}</Text>
                <Text style={styles.calendarDate}>
                  {date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}
                </Text>
              </>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileInfo: {
    flexDirection: 'column', 
    marginLeft: 10,
  },
  profilePhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: 'gray',
  },
  notificationButton: {
    padding: 10,
  },
  notificationIcon: {
    width: 20,
    height: 20,
  },
  monthYearContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  monthYearText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8, 
  },
  arrowIcon: {
    fontSize: 20,
    color: 'black',
  },
  calendarContainer: {
    alignItems: 'flex-start',
  },
  calendarBox: {
    backgroundColor: '#00FF00',
    padding: 15,
    marginRight: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  calendarDay: {
    fontSize: 12,
  },
  calendarDate: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  nextMonthIndicator: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    maxHeight: 500,
    width: "80%", 
  },
  monthButton: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
};

export default HomeScreen;
