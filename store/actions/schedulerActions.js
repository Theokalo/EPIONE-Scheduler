import {ADD, DELETE, EDIT} from './actions-types/scheduler-action'

// Add event
export const add = (obj) => {
    return {
        type: ADD,
        obj
    }
}

// Delete event
export const remove = (obj) => {
    return {
        type: DELETE,
        obj
    }
}

// Edit event
export const edit = (obj) => {
    return {
        type: EDIT,
        obj
    }
}