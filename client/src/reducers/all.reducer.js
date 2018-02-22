import {combineReducers} from 'redux';
import AppReducer from './app.reducer';

const allReducers = combineReducers({app: AppReducer});
export default allReducers;