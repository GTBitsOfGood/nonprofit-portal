import {
  GET_AVAILABILITIES, ADD_AVAILABILITY, DELETE_AVAILABILITY,
  UPDATE_AVAILABILITY, AVAILABILITIES_LOADING,
} from './types';
import * as availabilityActions from '../../actions/availabilities';

export const setAvailabilitiesLoading = () => ({
  type: AVAILABILITIES_LOADING,
});

export const getAvailabilities = () => (dispatch) => {
  dispatch(setAvailabilitiesLoading());

  return availabilityActions
    .getAvailabilities()
    .then((res) => dispatch({
      type: GET_AVAILABILITIES,
      payload: res,
    }));
};

export const addAvailability = (availability) => (dispatch) => availabilityActions
  .addAvailability(availability)
  .then((res) => dispatch({
    type: ADD_AVAILABILITY,
    payload: res,
  }));

export const deleteAvailability = (id) => (dispatch) => availabilityActions
  .deleteAvailability(id)
  .then(() => dispatch({
    type: DELETE_AVAILABILITY,
    payload: id,
  }));

export const updateAvailability = (id, updatedFields) => (dispatch) => availabilityActions
  .updateAvailability(id, updatedFields)
  .then((res) => dispatch({
    type: UPDATE_AVAILABILITY,
    payload: res,
  }));
