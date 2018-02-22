import { createStore } from 'redux';
import allReducers from './reducers/all.reducer';
const store = createStore(allReducers);

export default store;