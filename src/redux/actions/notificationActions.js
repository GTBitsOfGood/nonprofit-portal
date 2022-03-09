import {
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
  CLOSE_NOTIFICATIONS,
} from "./types";

export const addNotification =
  ({ header, body, type, persist, expiresIn }) =>
  (dispatch) => {
    const key = `${Date.now()}${Math.floor(1000 + Math.random() * 9000)}`;

    return dispatch({
      type: ADD_NOTIFICATION,
      payload: {
        key,
        notification: {
          key,
          header,
          body,
          expiresIn: expiresIn || 8000,
          type: type || "default",
          persist: persist || false,
        },
      },
    });
  };

/*
To be able to delete a persisted notification, you can get the created key by
const { payload } = await addNotification({..., persist: true });
const { key } = payload;
await deleteNotification(key);
 */
export const deleteNotification =
  (...key) =>
  (dispatch) =>
    dispatch({
      type: DELETE_NOTIFICATION,
      payload: {
        key,
      },
    });

export const closeApplications = () => (dispatch) =>
  dispatch({
    type: CLOSE_NOTIFICATIONS,
  });
