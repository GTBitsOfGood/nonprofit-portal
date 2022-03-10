import axios from "axios";
import urls from "../utils/urls";

export const getApplications = async () =>
  axios.get(urls.apis.application).then((res) => res.data.payload);

export const getApplication = async (url) =>
  axios
    .get(urls.apis.application, {
      params: {
        url,
      },
    })
    .then((res) => res.data.payload);

export const addApplication = async (application) =>
  axios
    .post(urls.apis.application, {
      application,
    })
    .then((res) => res.data.payload);

export const updateApplicationState = async (id, state) =>
  axios
    .patch(urls.apis.application, {
      id,
      state,
    })
    .then((res) => res.data.payload);

export const updateApplicationDecision = async (id, decision) =>
  axios
    .patch(urls.apis.application, {
      id,
      decision,
    })
    .then((res) => res.data.payload);

export const updateApplicationMeeting = async (id, availabilityId) =>
  axios
    .patch(urls.apis.application, {
      id,
      availabilityId,
    })
    .then((res) => res.data.payload);

export const deleteApplication = async (id) =>
  axios.delete(urls.apis.application, {
    params: {
      id,
    },
  });
