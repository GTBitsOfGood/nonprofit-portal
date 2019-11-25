import {
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
  CLOSE_NOTIFICATIONS,
} from './types';

export const addNotification = (key, message) => (dispatch) => {
  const newKey = key || `${Date.now()}${Math.floor(1000 + Math.random() * 9000)}`;

  return dispatch({
    type: ADD_NOTIFICATION,
    payload: {
      key: newKey,
      message,
    },
  })
    .then(() => newKey);
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
