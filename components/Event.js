import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
        height: 40,
        //flexDirection: 'row',
        margin: 24
    },
    description: {
        fontSize: 12,
    },
    title: {
        fontSize: 15,
    }
});

const Event = ({title, description}) => (
    <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
    </View>
);

export default Event;