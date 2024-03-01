import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell, faCalendarAlt, faTasks, faUser } from '@fortawesome/free-solid-svg-icons'; // Import necessary icons

const HomeScreen = () => {
  // Dummy percentage value for testing
  const percentage = 75;

  // Function to determine the text based on the percentage
  const getText = () => {
    if (percentage >= 90) {
      return "Your daily tasks are almost done";
    } else {
      return "Complete your tasks";
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.profileContainer}>
          <Image source={require('../assets/profile.png')} style={styles.profilePhoto} />
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>John Doe</Text>
            <Text style={styles.date}>September 20, 2022</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <FontAwesomeIcon icon={faBell} style={styles.notificationIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.statusTextContainer}>
        <Text style={styles.statusText}>
          {getText()}
        </Text>
        <View style={styles.percentageContainer}>
          <View style={[styles.percentageIndicator, { backgroundColor: percentage >= 90 ? 'green' : 'red' }]} />
          <Text style={styles.percentageText}>{percentage}%</Text>
        </View>
      </View>
      {/* Add individual tasks here */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomBarButton}>
          <FontAwesomeIcon icon={faCalendarAlt} style={styles.bottomBarButtonIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomBarButton}>
          <FontAwesomeIcon icon={faTasks} style={styles.bottomBarButtonIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomBarButton}>
          <FontAwesomeIcon icon={faUser} style={styles.bottomBarButtonIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between', // Add this to position the bottomBar at the bottom
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
    flexDirection: 'column', // Change to column layout
    marginLeft: 10, // Add
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
  statusTextContainer: {
    backgroundColor: 'black',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 600, // Add marginBottom
    marginRight: 20, // Add marginRight
    marginLeft: 20, // Add marginLeft
  },
  statusText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  percentageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  percentageIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  percentageText: {
    color: 'white',
    marginLeft: 10,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute', // Add this to position the bottomBar at the bottom
    bottom: 0, // Add this to position the bottomBar at the bottom
    width: '120%', // Add this to stretch the bottomBar across the screen
    paddingHorizontal: 70, // Add this for some padding on both sides
    backgroundColor: 'blue', // Add this to give a background color to the bottomBar
  },
  bottomBarButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  bottomBarButtonIcon: {
    color: 'white',
  },
};

export default HomeScreen;
