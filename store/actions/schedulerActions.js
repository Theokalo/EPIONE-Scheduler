import {ADD} from './actions-types/scheduler-action'

// Add event
export const add = (obj) => {
    return {
        type: ADD,
        obj
    }
}