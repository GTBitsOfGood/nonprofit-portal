import {
  GET_AVAILABILITIES,
  ADD_AVAILABILITY,
  DELETE_AVAILABILITY,
  UPDATE_AVAILABILITY,
  AVAILABILITIES_LOADING,
} from "./types";
import {
  getAvailabilities as getAvailabilitiesBase,
  addAvailability as addAvailabilityBase,
  deleteAvailability as deleteAvailabilityBase,
  updateAvailability as updateAvailabilityBase,
} from "../../actions/availabilities";

export const setAvailabilitiesLoading = () => ({
  type: AVAILABILITIES_LOADING,
});

export const getAvailabilities = () => (dispatch) => {
  dispatch(setAvailabilitiesLoading());

  return getAvailabilitiesBase().then((res) =>
    dispatch({
      type: GET_AVAILABILITIES,
      payload: res,
    })
  );
};

export const addAvailability = (availability) => (dispatch) =>
  addAvailabilityBase(availability).then((res) =>
    dispatch({
      type: ADD_AVAILABILITY,
      payload: res,
    })
  );

export const deleteAvailability = (id) => (dispatch) =>
  deleteAvailabilityBase(id).then(() =>
    dispatch({
      type: DELETE_AVAILABILITY,
      payload: id,
    })
  );

export const updateAvailability = (id, updatedFields) => (dispatch) =>
  updateAvailabilityBase(id, updatedFields).then((res) =>
    dispatch({
      type: UPDATE_AVAILABILITY,
      payload: res,
    })
  );
