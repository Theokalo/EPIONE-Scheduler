import moment from 'moment';

// const EVENTS = []

let pivot = moment();

// export const addOneEvent = (event) => {
//     EVENTS.push(event);
// };

const generateOneWeek = () => {
    let startOfWeek = pivot.startOf('week');
    return [...Array(7).keys()].map(
        offset => { 
            const date = moment(startOfWeek).add(offset, 'days');
            // const events = EVENTS.filter(event => event.date.isSame(date));
            return {
                date: date.format("ddd DD MMM YYYY"),
                // events
            }
        }
    );
};

const populateWeekEvents = () => {
    let dates = generateOneWeek();

    return {
        dates
    };
}

export const getStartWeek = () => populateWeekEvents();

export const moveWeekBackwards = () => {
    pivot = pivot.subtract(1, 'week');
    return populateWeekEvents();
};

export const moveWeekForward = () => {
    pivot = pivot.add(1, 'week');
    return populateWeekEvents();
};