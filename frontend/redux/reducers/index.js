import { combineReducers } from 'redux';
import applicationReducer from './applicationReducer';
import availabilityReducer from './availabilityReducer';

export default combineReducers({
  application: applicationReducer,
  availability: availabilityReducer,
});
