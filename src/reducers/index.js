import { combineReducers } from 'redux';
import Home from './home'; 

const rootReducer = combineReducers({
  player_list: Home
});

export default rootReducer;
