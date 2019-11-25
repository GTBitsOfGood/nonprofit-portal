import {
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
  CLOSE_NOTIFICATIONS,
} from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return {
        ...state,
        [action.payload.key]: action.payload.notification,
      };
    case DELETE_NOTIFICATION:
      return Object.keys(state).filter((key) => key !== action.payload.key);
    case CLOSE_NOTIFICATIONS:
      return {};
    default:
      return state;
  }
}
