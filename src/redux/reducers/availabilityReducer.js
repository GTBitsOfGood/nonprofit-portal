import {
  GET_AVAILABILITIES,
  ADD_AVAILABILITY,
  DELETE_AVAILABILITY,
  UPDATE_AVAILABILITY,
  AVAILABILITIES_LOADING,
} from "../actions/types";

const initialState = {
  availabilities: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_AVAILABILITIES:
      return {
        ...state,
        availabilities: action.payload,
        loading: false,
      };
    case DELETE_AVAILABILITY:
      return {
        ...state,
        availabilities: state.availabilities.filter(
          (availability) => availability._id !== action.payload
        ),
      };
    case ADD_AVAILABILITY:
      return {
        ...state,
        availabilities: [action.payload, ...state.availabilities],
      };
    case AVAILABILITIES_LOADING:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_AVAILABILITY:
      return {
        ...state,
        availabilities: state.availabilities.map((availability) => {
          if (availability._id === action.payload._id) {
            return action.payload;
          }

          return availability;
        }),
      };
    default:
      return state;
  }
}
