import urls from "../utils/urls";
import { apiGet, apiPost, apiPut, apiDelete } from "../utils/api";

export const getApplications = async () => apiGet(urls.apis.application);

export const getApplication = async (urlString) =>
  apiGet(urls.apis.application + `?url=${urlString}`);

export const addApplication = async (application) =>
  apiPost(urls.apis.application, {
    application,
  });

export const deleteApplication = async (id) =>
  apiDelete(urls.apis.application, {
    id,
  });

export const updateApplicationState = async (id, state) =>
  apiPut(urls.apis.application, {
    id,
    state,
  });

export const updateApplicationDecision = async (id, decision) =>
  apiPut(urls.apis.application, {
    id,
    decision,
  });

export const updateApplicationMeeting = async (id, availabilityId) =>
  apiPut(urls.apis.application, {
    id,
    availabilityId,
  });
