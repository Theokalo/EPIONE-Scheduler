export default function(state = {
    r_events: [{name:''}]
}, action) {
    switch (action.type) {
        case 'ADD':
            return{
                ...state,
                r_events: [...state.r_events]
            }
        default:
            return state
    }
}