import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Calendar from './components/Calendar';
import Navbar from './components/Navbar';
import { getStartWeek, moveWeekBackwards, moveWeekForward } from './services/calendar'; 

export default function App() {
  let week = getStartWeek();
  
  const moveBackwards = () => {
    week = moveWeekBackwards();
  };
  
  const moveForward = () => {
    week = moveWeekForward();
  };

  return (
    <View style={styles.container}>
      <Navbar addEvent={() => { setAddModalVisible(true) }} />
      <Calendar week={week} moveBackwards={moveBackwards} moveForward={moveForward} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
});
