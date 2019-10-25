import fetch from 'isomorphic-unfetch';

import config from '../../config';

export const getApplications = async () => fetch(
  config.baseUrl + config.apis.getApplications, {
    method: 'get',
    mode: 'same-origin',
    credentials: 'include',
  },
)
  .then((response) => response.json());

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
  .then((response) => response.json());

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
  .then((response) => response.json());

export const getApplication = async (urlString) => fetch(
  `${config.baseUrl}${config.apis.getApplication}?url=${urlString}`, {
    method: 'get',
    mode: 'same-origin',
    credentials: 'include',
  },
)
  .then((response) => response.json());
