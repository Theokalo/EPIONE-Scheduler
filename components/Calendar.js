import React, {useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import Date from './Date';
import MoveWeekButton from './MoveWeekButton';

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10
    },
    header: {
        fontSize: 30,
        padding: 10,
    },
    scrollview: {
        height:windowHeight
    }
});

const Calendar = (props) => {
    const { week } = props;
    
    const dates = week.dates.map(({date, events}) => (<Date date={date} events={events} />));
    return (
    <View style={styles.container}>
        <View style={styles.headerContainer}>
            <MoveWeekButton title="<<" moveWeek={props.moveBackwards} />
            <Text style={styles.header}>Week overview</Text>
            <MoveWeekButton title=">>" moveWeek={props.moveForward} />
        </View>
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollview}
        >
            {dates}
        </ScrollView>
    </View>
    );
};

export default Calendar;
