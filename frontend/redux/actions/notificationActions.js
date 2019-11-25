import {
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
  CLOSE_NOTIFICATIONS,
} from './types';

export const addNotification = (args) => (dispatch) => {
  const key = args.key || `${Date.now()}${Math.floor(1000 + Math.random() * 9000)}`;

  return dispatch({
    type: ADD_NOTIFICATION,
    payload: {
      key,
      notification: {
        message: args.message,
        expiresIn: args.expiresIn || 3000,
        type: args.type || 'default',
        persist: args.persist || false,
      },
    },
  })
    .then(() => key);
};

export const deleteNotification = (key) => (dispatch) => dispatch({
  type: DELETE_NOTIFICATION,
  payload: {
    key,
  },
});

export const closeApplications = () => (dispatch) => dispatch({
  type: CLOSE_NOTIFICATIONS,
});
