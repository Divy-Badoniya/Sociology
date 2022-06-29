import { combineReducers } from "redux";
import authReducer from './user'
import postReducer from './post'

export default combineReducers({
    authReducer, postReducer
});
