import {
  GET_APPLICATIONS,
  ADD_APPLICATION,
  DELETE_APPLICATION,
  APPLICATIONS_LOADING,
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
        applications: state.applications.filter((application) => application._id !== action.payload),
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
    default:
      return state;
  }
}
