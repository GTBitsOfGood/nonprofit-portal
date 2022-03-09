import {
  GET_APPLICATIONS,
  ADD_APPLICATION,
  DELETE_APPLICATION,
  APPLICATIONS_LOADING,
  UPDATE_APPLICATION_STATE,
  UPDATE_APPLICATION_DECISION,
  UPDATE_APPLICATION_MEETING,
} from "./types";
import {
  getApplications as getApplicationsBase,
  addApplication as addApplicationBase,
  deleteApplication as deleteApplicationBase,
  updateApplicationState as updateApplicationStateBase,
  updateApplicationDecision as updateApplicationDecisionBase,
  updateApplicationMeeting as updateApplicationMeetingBase,
} from "../../actions/applications";

export const setApplicationsLoading = () => ({
  type: APPLICATIONS_LOADING,
});

export const getApplications = () => (dispatch) => {
  dispatch(setApplicationsLoading());

  return getApplicationsBase().then((res) =>
    dispatch({
      type: GET_APPLICATIONS,
      payload: res,
    })
  );
};

export const addApplication = (application) => (dispatch) =>
  addApplicationBase(application).then((res) =>
    dispatch({
      type: ADD_APPLICATION,
      payload: res,
    })
  );

export const deleteApplication = (id) => (dispatch) =>
  deleteApplicationBase(id).then(() =>
    dispatch({
      type: DELETE_APPLICATION,
      payload: id,
    })
  );

export const updateApplicationState = (id, state) => (dispatch) =>
  updateApplicationStateBase(id, state).then((res) =>
    dispatch({
      type: UPDATE_APPLICATION_STATE,
      payload: res,
    })
  );

export const updateApplicationDecision = (id, decision) => (dispatch) =>
  updateApplicationDecisionBase(id, decision).then((res) =>
    dispatch({
      type: UPDATE_APPLICATION_DECISION,
      payload: res,
    })
  );

export const updateApplicationMeeting = (id, availabilityId) => (dispatch) =>
  updateApplicationMeetingBase(id, availabilityId).then((res) =>
    dispatch({
      type: UPDATE_APPLICATION_MEETING,
      payload: res,
    })
  );
