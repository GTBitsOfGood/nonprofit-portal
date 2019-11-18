import fetch from 'isomorphic-unfetch';

import config from '../../config';

export const getApplications = async () => fetch(
  config.baseUrl + config.apis.getApplications, {
    method: 'get',
    mode: 'same-origin',
    credentials: 'include',
  },
)
  .then((response) => response.json())
  .then((json) => {
    if (json == null || !json.success) {
      throw new Error(json.message);
    }

    return json.payload;
  });

export const addApplication = async (application) => fetch(
  config.baseUrl + config.apis.addApplication, {
    method: 'post',
    mode: 'same-origin',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      application,
    }),
  },
)
  .then((response) => response.json())
  .then((json) => {
    if (json == null || !json.success) {
      throw new Error(json.message);
    }

    return json.payload;
  });

export const deleteApplication = async (id) => fetch(
  config.baseUrl + config.apis.deleteApplication, {
    method: 'delete',
    mode: 'same-origin',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
    }),
  },
)
  .then((response) => response.json())
  .then((json) => {
    if (json == null || !json.success) {
      throw new Error(json.message);
    }

    return json.payload;
  });

export const updateApplicationState = async (id, state) => fetch(
  config.baseUrl + config.apis.updateApplicationState, {
    method: 'post',
    mode: 'same-origin',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      state,
    }),
  },
)
  .then((response) => response.json())
  .then((json) => {
    if (json == null || !json.success) {
      throw new Error(json.message);
    }

    return json.payload;
  });

export const updateApplicationDecision = async (id, decision) => fetch(
  config.baseUrl + config.apis.updateApplicationDecision, {
    method: 'post',
    mode: 'same-origin',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      decision,
    }),
  },
)
  .then((response) => response.json())
  .then((json) => {
    if (json == null || !json.success) {
      throw new Error(json.message);
    }

    return json.payload;
  });

export const updateApplicationMeeting = async (id, availabilityId) => fetch(
  config.baseUrl + config.apis.updateApplicationMeeting, {
    method: 'post',
    mode: 'same-origin',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      availabilityId,
    }),
  },
)
  .then((response) => response.json())
  .then((json) => {
    if (json == null || !json.success) {
      throw new Error(json.message);
    }

    return json.payload;
  });

export const getApplication = async (urlString) => fetch(
  `${config.baseUrl}${config.apis.getApplication}?url=${urlString}`, {
    method: 'get',
    mode: 'same-origin',
    credentials: 'include',
  },
)
  .then((response) => response.json())
  .then((json) => {
    if (json == null || !json.success) {
      throw new Error(json.message);
    }

    return json.payload;
  });
