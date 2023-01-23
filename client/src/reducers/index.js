import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
      //         ^
      //         |
      //  for changing name of a named export to avoid confusion between names

import streamReducers from './streamReducers';

import authReducer from './authReducer';

export default combineReducers({
      auth:authReducer,
      form:formReducer,
      streams:streamReducers
});