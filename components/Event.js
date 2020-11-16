import React, {useEffect, useRef} from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
        height: 40,
        flexDirection: 'row',
        paddingLeft: 20,
        marginTop: 5,
        backgroundColor: '#e6e6fa'
    },
    subContainer: {
        flexDirection: 'column'
    },
    time: {
        fontSize: 15,
        color:'grey'
    },
    description: {
        fontSize: 15,
        alignSelf: 'flex-start',
        marginLeft: 10
    },
    title: {
        fontSize: 15,
        color:'#3891A6',
        alignSelf: 'flex-start',
        marginLeft: 10
    }
});

// function usePrevious(value) {
//     const ref = useRef();
//     console.log(ref.current)
//     useEffect(() => {
//       ref.current = value;
//     });
//     return ref.current;
// }

const Event = (props) => {
    const {end} = props
    // const prevAmount = usePrevious(end);
    // useEffect(() => {
    //     //if(prevAmount !== undefined) {
    //         console.log(prevAmount, end)
    //      //} 
    //     //  else {
    //     //     console.log(prevAmount.end > end)
    //     // }
    // }, [end])
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
    </View>
    </>
    );
};

export default Event;