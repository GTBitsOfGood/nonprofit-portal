import {
  GET_APPLICATIONS,
  ADD_APPLICATION,
  DELETE_APPLICATION,
  APPLICATIONS_LOADING,
  UPDATE_APPLICATION_STATE,
  UPDATE_APPLICATION_DECISION,
} from '../actions/types';

const initialState = {
  applications: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_APPLICATIONS:
      return {
        ...state,
        applications: action.payload,
        loading: false,
      };
    case DELETE_APPLICATION:
      return {
        ...state,
        applications: state.applications.filter(
          (application) => application._id !== action.payload,
        ),
      };
    case ADD_APPLICATION:
      return {
        ...state,
        applications: [action.payload, ...state.applications],
      };
    case APPLICATIONS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_APPLICATION_STATE:
      return {
        ...state,
        applications: state.applications.map((application) => {
          if (application._id === action.payload._id) {
            return action.payload;
          }
          return application;
        }),
      };
    case UPDATE_APPLICATION_DECISION:
      return {
        ...state,
        applications: state.applications.map((application) => {
          if (application._id === action.payload._id) {
            return action.payload;
          }
          return application;
        }),
      };
    default:
      return state;
  }
}
