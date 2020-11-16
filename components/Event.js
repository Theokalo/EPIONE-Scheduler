import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import ModalScreen from './ModalScreen';

const styles = StyleSheet.create({
    container: {
        height: 40,
        flexDirection: 'row',
        //paddingLeft: 20,
        marginTop: 5,
        backgroundColor: '#e6e6fa',
    },
    subContainer: {
        flexDirection: 'column',
        marginLeft: 10
    },
    time: {
        fontSize: 15,
        color:'grey'
    },
    description: {
        fontSize: 15,
        alignSelf: 'flex-start',
    },
    title: {
        fontSize: 15,
        color:'#3891A6',
        alignSelf: 'flex-start',
    }
});

const Event = (props) => {
    const dispatch = useDispatch();
    const [modalAddVisible, setAddModalVisible] = useState(false);
    const [editID, setEditID] = useState();

    const deleteConfirm = (id) => {
        Alert.alert(
            "Delete message",
            "Are you sure you want to delete this Event?",
            [
                { text: "No", onPress: () => console.log('No') },
                { text: "Yes", onPress: () => remove(id) }
            ],
            { cancelable: false }
        );
    }

    const remove = (id) => {
        const setRemove = () => ({type: "DELETE", payload: {id:id} });
        dispatch(setRemove())
    }

    return(
    <>
    <View style={styles.container}>
        <View style={styles.subContainer}>
            <Text style={styles.time}>{props.start}</Text>
            <Text style={styles.time}>{props.end}</Text>
        </View>
        <View style={styles.subContainer}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.description}>{props.description}</Text>
        </View>   
        <View style={styles.subContainer}>
            <TouchableHighlight                
                onPress={() => { setAddModalVisible(true); setEditID(props.id)}}
            >
              <Icon
                name="edit"
                size={20}
                color="#ff9900"
              />
            </TouchableHighlight>
            <TouchableHighlight                
                onPress={() => { deleteConfirm(props.id)}}
            >
              <Icon
                name="minus-circle"
                size={20}
                color="red"
              />
            </TouchableHighlight>
        </View>  
    </View>
    <ModalScreen visible={modalAddVisible} title={'Edit Event'} editID={editID} hide={() => {setAddModalVisible(false)}}/>
    </>
    );
};

export default Event;