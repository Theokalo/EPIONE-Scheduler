import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Event from './Event';
import NoEvents from './NoEvents';
import { useSelector } from 'react-redux';

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        },
        marginBottom: 10,
        minHeight: 200,
        padding: 10,
    },
    title: {
        backgroundColor: '#3891A6',
        fontSize: 20,
        padding: 10,
        borderRadius: 10,
        color: 'white',
    }
});

const Date = ({date}) => {
    const events = useSelector(state => state.eventsReducer.r_events)
    const dailyEvents = events.filter(event => event.date.isSame(date));
    const dateEvents = dailyEvents.length > 0 ?
    dailyEvents.map(({description, title, startTime, endTime, id}) => (<Event id={id} title={title} description={description} start={startTime} end={endTime} />)) :
    <NoEvents />;

    return (
    <View style={styles.container}>
        <Text style={styles.title}>{date}</Text>
        {dateEvents}
    </View>
    );
};

export default Date;