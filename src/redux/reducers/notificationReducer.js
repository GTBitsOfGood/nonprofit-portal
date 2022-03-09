import {
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
  CLOSE_NOTIFICATIONS,
} from "../actions/types";

const initialState = {
  byId: {},
  byOrder: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return {
        byId: {
          ...state.byId,
          [action.payload.key]: action.payload.notification,
        },
        byOrder: [...state.byOrder, action.payload.key],
      };
    case DELETE_NOTIFICATION:
      // eslint-disable-next-line no-case-declarations
      const byIdClone = { ...state.byId };

      action.payload.key.forEach((key) => {
        delete byIdClone[key];
      });

      return {
        byId: byIdClone,
        byOrder: state.byOrder.filter(
          (key) => !action.payload.key.includes(key)
        ),
      };
    case CLOSE_NOTIFICATIONS:
      return {
        byId: {},
        byOrder: [],
      };
    default:
      return state;
  }
}
