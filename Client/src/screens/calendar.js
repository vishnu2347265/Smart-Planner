// src/screens/calendar.js
import React from 'react';
import { Calendar } from 'react-native-calendars';
import { View } from 'react-native';

export default function CalendarScreen({ navigation }) {
  return (
    <View>
      <Calendar
        onDayPress={(day) => {
          navigation.navigate('Task', { selectedDate: day.dateString });
        }}
      />
    </View>
  );
}