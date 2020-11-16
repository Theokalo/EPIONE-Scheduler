export default function(state = {
    r_events: []
}, action) {
    console.log(action)
    switch (action.type) {
        case 'ADD':
            return{
                ...state,
                r_events: [...state.r_events,{id: action.payload.id, title:action.payload.title, date:action.payload.date, start: action.payload.startTime, end: action.payload.endTime, description: action.payload.description}]
            }
        default:
            return state
    }
}