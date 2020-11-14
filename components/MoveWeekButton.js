import React from 'react';
import { TouchableHighlight, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    button: {
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        },
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        height: 30,
        textAlign: 'center',
        width: 60,
    },
});

const MoveWeekButton = (props) => 
    <TouchableHighlight style={styles.button} onPress={() => props.moveWeek() }>
        <Text>{props.title}</Text>
    </TouchableHighlight>

export default MoveWeekButton;