import React from 'react';
import { Button, ImagePropTypes, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        borderColor: '#3891A6',
        borderWidth: 2,
        height: 52,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        margin: 10
    },
    text: {
        color: '#E3655B',
        fontSize: 20,
    },
});

const Navbar = (props) => (
<View style={styles.container}>
    <Text style={styles.text}>EPIONE Scheduler</Text>
    <Button title="Add Event" color='#3891A6' onPress={() => { props.addEvent() }} />
</View>
);

export default Navbar;
