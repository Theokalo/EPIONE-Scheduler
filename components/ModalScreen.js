import React, {useEffect, useState} from 'react'
import { StyleSheet, View, Modal, Alert, Text, TouchableHighlight, TextInput, Dimensions, ScrollView } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

const windowWidth = Dimensions.get('window').width;

const ModalScreen = (props) => {

  const storeEvents = useSelector(state => state.eventsReducer.r_events);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [maskDate, setMaskDate] = useState('');
  const [maskStartTime, setMaskStartTime] = useState('');
  const [maskEndTime, setMaskEndTime] = useState('');

  const dispatch = useDispatch();

  const confirmMsg = (msg, atitle) => {
    Alert.alert(
      atitle,
      msg,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
  }

  // function of date
  const inputDate = (text) => {
    setMaskDate(text)
  }
  // function of start time
  const inputStartTime = (text) => {
    setMaskStartTime(text)
  }
  // function of end time
  const inputEndTime = (text) => {
    setMaskEndTime(text)
  }
  // function to hide the modal
  const close = (e) => {
    props.hide && props.hide(e)
  }
  // adding the event to Redux store
  const addEvent = () => {
    if (title === '' || maskDate === '' || maskStartTime === '' || maskEndTime === '' || description === '') {
      let atitle = 'Error message'
      let msg = 'All fileds must be filled out'
      confirmMsg(msg, atitle)
    }
    else if(maskStartTime.localeCompare(maskEndTime) === 1 || maskStartTime.localeCompare(maskEndTime) === 0){
      let atitle = 'Error message'
      let msg = 'End time must be bigger than Start time'
      confirmMsg(msg, atitle)
    } else {
      let atitle = 'Confirmation message'
      let msg = "Event added succesfully"
      let date = ''
      let formatdate = ''
      let id = '_' + Math.random().toString(36).substr(2, 9)
      let array = maskDate.split('/')
      if (array.length === 3){
        date = new Date(array[2],array[1]-1,array[0])
        formatdate = moment(date)
      }   
      const setEvent = () => ({type: "ADD", payload: {id:id, title:title,date:formatdate, startTime: maskStartTime, endTime: maskEndTime, description: description} });
      dispatch(setEvent())
      close()
      confirmMsg(msg,atitle)
      setTitle('')
      setMaskDate()
      setMaskStartTime()
      setMaskEndTime()
      setDescription('')
    }    
  }
  // edit the event and store it to redux store
  const editEvent = () => {
    if (title === '' || maskDate === '' || maskStartTime === '' || maskEndTime === '' || description === '') {
      let atitle = 'Error message'
      let msg = 'All fileds must be filled out'
      confirmMsg(msg, atitle)
    }
    else if(maskStartTime.localeCompare(maskEndTime) === 1 || maskStartTime.localeCompare(maskEndTime) === 0){
      let atitle = 'Error message'
      let msg = 'End time must be bigger than Start time'
      confirmMsg(msg, atitle)
    } else {
      let atitle = 'Confirmation message'
      let msg = "Event edit succesfully"
      let date = ''
      let formatdate = ''
      let array = maskDate.split('/')
      if (array.length === 3){
        date = new Date(array[2],array[1]-1,array[0])
        formatdate = moment(date)
      }  
      const setEvent = () => ({type: "EDIT", payload: {id:props.editID, title:title,date:formatdate, startTime: maskStartTime, endTime: maskEndTime, description: description} });
      dispatch(setEvent())
      close()
      confirmMsg(msg,atitle)
      setTitle('')
      setMaskDate()
      setMaskStartTime()
      setMaskEndTime()
      setDescription('')
    }    
  }
  // check the props of the parent component and update the state
  // if it's Add event or Edit event
  useEffect(() => {
    if (props.editID !== undefined) {
      let editItem = storeEvents.filter(event => event.id === props.editID)
      if (props.editID === editItem[0].id) {
        let convertedDate = editItem[0].date.toDate().getDate()+'/'+(editItem[0].date.toDate().getMonth()+1)+'/'+editItem[0].date.toDate().getFullYear()
        setTitle(editItem[0].title)
        setMaskDate(convertedDate)
        setMaskStartTime(editItem[0].startTime)
        setMaskEndTime(editItem[0].endTime)
        setDescription(editItem[0].description)
      }    
    }
  }, [props])

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
            <ScrollView style={styles.modalView}>
              <View style={styles.contentView}>
                <Text style={styles.modalText}>{props.title}</Text>
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
                    style={styles.maskInput}
                    placeholder="DD/MM/YYYY"
                    type={'datetime'}
                    options={{
                      maskType: 'DD/MM/YYYY',
                    }}
                    value={maskDate}
                    onChangeText={text => inputDate(text)}
                  />
                </View>
                <Text style={styles.modalText}>
                  Start time
                </Text>
                <View style={styles.fields}>
                  <TextInputMask
                    style={styles.maskInput}
                    placeholder="HH:mm"
                    type={'datetime'}
                    options={{
                      format: 'HH:mm',
                    }}
                    value={maskStartTime}
                    onChangeText={text => inputStartTime(text)}
                  />
                </View>
                <Text style={styles.modalText}>
                  End time
                </Text>
                <View style={styles.fields}>
                  <TextInputMask
                    style={styles.maskInput}
                    placeholder="HH:mm"
                    type={'datetime'}
                    options={{
                      format: 'HH:mm',
                    }}
                    value={maskEndTime}
                    onChangeText={text => inputEndTime(text)}
                  />                  
                </View>
                <Text style={styles.modalText}>
                  Brief description
                </Text>
                <TextInput 
                    style={styles.maskInput}
                    onChangeText = {text => setDescription(text)}
                    value = {description} 
                    placeholder="Brief description"
                    placeholderTextColor="grey" 
                />
                {props.title === 'Add Event' ?
                  <TouchableHighlight
                    style={{ ...styles.addButton}}
                    onPress={() => { addEvent()}}
                  >
                    <Text style={styles.textStyle}>Add</Text>
                  </TouchableHighlight>
                  :
                  <TouchableHighlight
                    style={{ ...styles.addButton}}
                    onPress={() => { editEvent()}}
                  >
                    <Text style={styles.textStyle}>Edit</Text>
                  </TouchableHighlight>
                }
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
            </ScrollView>
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
      //alignItems: "center",
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
    contentView:{
      paddingBottom: 60
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
    maskInput: {
      width: windowWidth-40,
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