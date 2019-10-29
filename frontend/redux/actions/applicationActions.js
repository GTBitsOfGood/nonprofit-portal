import {
  GET_APPLICATIONS, ADD_APPLICATION, DELETE_APPLICATION, APPLICATIONS_LOADING,
  UPDATE_APPLICATION_STATE,
} from './types';
import * as applicationActions from '../../actions/applications';

export const setApplicationsLoading = () => ({
  type: APPLICATIONS_LOADING,
});

export const getApplications = () => (dispatch) => {
  dispatch(setApplicationsLoading());

  return applicationActions
    .getApplications()
    .then((res) => dispatch({
      type: GET_APPLICATIONS,
      payload: res,
    }));
};

export const addApplication = (application) => (dispatch) => applicationActions
  .addApplication(application)
  .then((res) => dispatch({
    type: ADD_APPLICATION,
    payload: res,
  }));

export const deleteApplication = (id) => (dispatch) => applicationActions
  .deleteApplication(id)
  .then(() => dispatch({
    type: DELETE_APPLICATION,
    payload: id,
  }));

export const updateApplicationState = (id, state) => (dispatch) => applicationActions
  .updateApplicationState(id, state)
  .then(() => dispatch({
    type: UPDATE_APPLICATION_STATE,
    payload: id,
  }));
