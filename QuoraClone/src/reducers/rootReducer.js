import { combineReducers } from 'redux';
import questionsReducer from './questionsReducer';
import answersReducer from './answersReducer';
import authReducer from './authReducer';

export default combineReducers({
    questionsReducer,
    answersReducer,
    authReducer
})