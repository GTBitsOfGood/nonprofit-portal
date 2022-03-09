import axios from "axios";
import urls from "../utils/urls";

export const getApplications = async () => axios.get(urls.apis.application);

export const getApplication = async (url) =>
  axios.get(urls.apis.application, {
    params: {
      url,
    },
  });

export const addApplication = async (application) =>
  axios.post(urls.apis.application, {
    application,
  });

export const updateApplicationState = async (id, state) =>
  axios.patch(urls.apis.application, {
    id,
    state,
  });

export const updateApplicationDecision = async (id, decision) =>
  axios.patch(urls.apis.application, {
    id,
    decision,
  });

export const updateApplicationMeeting = async (id, availabilityId) =>
  axios.patch(urls.apis.application, {
    id,
    availabilityId,
  });

export const deleteApplication = async (id) =>
  axios.delete(urls.apis.application, {
    params: {
      id,
    },
  });
