import { createStore } from 'redux'
import schedulerReducer from './reducers/schedulerReducer';

const store = createStore(schedulerReducer)

export default store