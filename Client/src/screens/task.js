import React from 'react';
import { View, Text, Button } from 'react-native';

export default function Task({ route, navigation }) {
  const { selectedDate } = route.params;
  return (
    <View>
      <Text>Task Screen</Text>
      <Text>Selected date: {selectedDate}</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
}
