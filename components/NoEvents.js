import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
        height: 40,
        margin: 24
    },
    title: {
        fontSize: 15,
        color: 'blue',
        fontStyle: 'italic',
    },
});

const NoEvents = () => (
    <View style={styles.container}>
        <Text style={styles.title}>No events planned for the day</Text>
    </View>
);

export default NoEvents;