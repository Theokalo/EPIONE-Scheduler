import React, {useState} from 'react'
import { StyleSheet, View, Modal, Alert, Text, TouchableHighlight, TextInput, Dimensions } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInputMask } from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import moment from 'moment';


const windowWidth = Dimensions.get('window').width;

const ModalScreen = (props) => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date(1598051730000));
  const [endDate, setEndDate] = useState(new Date(1598051730000));
  const [maskDate, setMaskDate] = useState();
  const [maskStartTime, setMaskStartTime] = useState();
  const [maskEndTime, setMaskEndTime] = useState();

  const dispatch = useDispatch();

  const confirmMsg = (msg) => {
    Alert.alert(
      "Confirmation message",
      msg,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
  }

  // function of date
  const inputDate = (text) => {
    let array = text.split('/')
    if (array.length === 3)
      setDate(new Date(array[2],array[1]-1,array[0]))
    setMaskDate(text)
  }
  // function of start time
  const inputStartTime = (text) => {
    let array = text.split(':')
    if (array.length === 2)
      setDate(new Date(date.getFullYear(),date.getMonth(),date.getDay(),array[0],array[1]))
    setMaskStartTime(text)
  }
  // function of end time
  const inputEndTime = (text) => {
    let array = text.split(':')
    if (array.length === 2)
      setEndDate(new Date(date.getFullYear(),date.getMonth(),date.getDay(),array[0],array[1]))
    setMaskEndTime(text)
  }
  // function to hide the modal
  const close = (e) => {
    props.hide && props.hide(e)
  }
  // addin the event to Redux store
  const addEvent = () => {
    let compareTime = maskStartTime.localeCompare(maskEndTime)
    if (title === '' || maskDate === '' || maskStartTime === '' || maskEndTime === '' || description === '') {
      let msg = 'All fileds must be filled out'
      confirmMsg(msg)
    }
    else if(compareTime === 1 || compareTime === 0){
      let msg = 'End time must be bigger than Start time'
      confirmMsg(msg)
    } else {
      let msg = "Event added succesfully"
      let date = ''
      let formatdate = ''
      let id = '_' + Math.random().toString(36).substr(2, 9)
      let array = maskDate.split('/')
      if (array.length === 3){
        date = new Date(array[2],array[1]-1,array[0])
        formatdate = moment(date)
      }    
      console.log(maskStartTime.localeCompare(maskEndTime))    
      const setEvent = () => ({type: "ADD", payload: {id:id, title:title,date:formatdate, startTime: maskStartTime, endTime: maskEndTime, description: description} });
      dispatch(setEvent())
      confirmMsg(msg)
      setTitle('')
      setMaskDate()
      setMaskStartTime()
      setMaskEndTime()
      setDescription('')
    }    
  }
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add new event!</Text>
            <Text style={styles.modalText}>
                Title
            </Text>
            <TextInput 
                style={styles.input}
                onChangeText = {text => setTitle(text)}
                value = {title} 
                placeholder="Event Title"
                placeholderTextColor="grey" 
            />
            <Text style={styles.modalText}>
              Date
            </Text>
            <View style={styles.fields}>
              <TextInputMask
                style={styles.input}
                placeholder="DD/MM/YYYY"
                type={'datetime'}
                options={{
                  maskType: 'DD/MM/YYYY',
                }}
                value={maskDate}
                onChangeText={text => inputDate(text)}
              />
              <Icon
                style={styles.icon}
                name="calendar"
                size={15}
                color="#3891A6"
              />
            </View>
            <Text style={styles.modalText}>
              Start time
            </Text>
            <View style={styles.fields}>
              <TextInputMask
                style={styles.input}
                placeholder="HH:mm"
                type={'datetime'}
                options={{
                  format: 'HH:mm',
                }}
                value={maskStartTime}
                onChangeText={text => inputStartTime(text)}
              />
              <Icon
                style={styles.icon}
                name="clock-o"
                size={15}
                color="#3891A6"
              />
            </View>
            <Text style={styles.modalText}>
              End time
            </Text>
            <View style={styles.fields}>
              <TextInputMask
                style={styles.input}
                placeholder="HH:mm"
                type={'datetime'}
                options={{
                  format: 'HH:mm',
                }}
                value={maskEndTime}
                onChangeText={text => inputEndTime(text)}
              />
              <Icon
                style={styles.icon}
                name="clock-o"
                size={15}
                color="#3891A6"
              />
            </View>
            <Text style={styles.modalText}>
              Brief description
            </Text>
            <TextInput 
                style={styles.input}
                onChangeText = {text => setDescription(text)}
                value = {description} 
                placeholder="Δώστε διεύθυνση"
                placeholderTextColor="grey" 
            />
            <TouchableHighlight
              style={{ ...styles.addButton}}
              onPress={() => { addEvent()}}
            >
              <Text style={styles.textStyle}>Add</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ ...styles.closeButton }}
              onPress={() => { close()}}
            >
              <Icon
                style={styles.icon}
                name="times-circle"
                size={30}
                color="red"
              />
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
  </View>
  );
};

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      width: windowWidth-20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.8,
      shadowRadius: 3.84,
      elevation: 5
    },
    addButton: {
      backgroundColor: "#3891A6",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    closeButton: {
      position: 'absolute',
      top: 10,
      right: 20
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    input: {
      borderBottomWidth: 1,
      borderBottomColor: '#000',
      marginBottom: 5,
      color: '#000'        
    },
    fields: {
      flexDirection: 'row',
    },
    icon: {
      alignSelf: 'center'
    }
  });
  
  export default ModalScreen;