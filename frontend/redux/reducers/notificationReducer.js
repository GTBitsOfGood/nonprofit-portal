import {
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
  CLOSE_NOTIFICATIONS,
} from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
  const { key, ...rest } = action.payload;

  switch (action.type) {
    case ADD_NOTIFICATION:
      return {
        ...state,
        [key]: {
          ...rest,
        },
      };
    case DELETE_NOTIFICATION:
      return Object.keys(state).filter((notification) => state[notification].key !== key);
    case CLOSE_NOTIFICATIONS:
      return {};
    default:
      return state;
  }
}
