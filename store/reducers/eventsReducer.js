export default function(state = {
    r_events: []
}, action) {
    switch (action.type) {
        case 'ADD':
            return{
                ...state,
                r_events: [...state.r_events,{id: action.payload.id, title:action.payload.title, date:action.payload.date, startTime: action.payload.startTime, endTime: action.payload.endTime, description: action.payload.description}]
            }
        case 'EDIT':
            let editItem = state.r_events.filter(event => event.id === action.payload.id)
            editItem[0] = action.payload
            const sevents = state.r_events.map(event => {
                if (event.id === editItem[0].id){
                    event = editItem[0]
                    return event
                } else {
                    return event
                }
                    
            })
            return{
                ...state,
                r_events: sevents
            }
        case 'DELETE':
            let restItems = state.r_events.filter(event => event.id !== action.payload.id)
            return{
                ...state,
                r_events: restItems
            }
        default:
            return state
    }
}