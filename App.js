import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import Calendar from './components/Calendar';
import Navbar from './components/Navbar';
import { Provider as StateProvider } from 'react-redux'
import store from './store/store'
import { getStartWeek, moveWeekBackwards, moveWeekForward } from './services/calendar'; 
import ModalScreen from './components/ModalScreen';

export default function App() {
  //local state in order to update the week calendar 
  const [week,setWeek] = useState(getStartWeek())
  const [modalAddVisible, setAddModalVisible] = useState(false);
  
  const moveBackwards = () => {
    setWeek(moveWeekBackwards());
  };
  
  const moveForward = () => {
   setWeek(moveWeekForward());
  };
  console.log(modalAddVisible)
  return (
    <View style={styles.container}>
      <StateProvider store={store}>
        <Navbar addEvent={() => { setAddModalVisible(true) }} />
        <Calendar week={week} moveBackwards={moveBackwards} moveForward={moveForward} />
        <StatusBar style="auto" />
        <ModalScreen visible={modalAddVisible} hide={() => {setAddModalVisible(false)}}/>
      </StateProvider>
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
