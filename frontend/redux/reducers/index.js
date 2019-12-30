import { combineReducers } from 'redux';
import applicationReducer from './applicationReducer';
import availabilityReducer from './availabilityReducer';
import notificationReducer from './notificationReducer';

export default combineReducers({
  application: applicationReducer,
  availability: availabilityReducer,
  notifications: notificationReducer,
});
