import fetch from 'isomorphic-unfetch';

import config from '../../config';

export const getAvailabilities = async () => fetch(
  config.baseUrl + config.apis.getAvailabilities, {
    method: 'get',
    mode: 'same-origin',
    credentials: 'include',
  },
)
  .then((response) => response.json());

export const addAvailability = async (availability) => fetch(
  config.baseUrl + config.apis.addAvailability, {
    method: 'post',
    mode: 'same-origin',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      availability,
    }),
  },
)
  .then((response) => response.json());

export const deleteAvailability = async (id) => fetch(
  config.baseUrl + config.apis.deleteAvailability, {
    method: 'post',
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

export const updateAvailability = async (id, isBooked, team) => fetch(
  config.baseUrl + config.apis.updateAvailability, {
    method: 'post',
    mode: 'same-origin',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      isBooked,
      team,
    }),
  },
)
  .then((response) => response.json());

export const getAvailability = async (id) => fetch(
  config.baseUrl + config.apis.getAvailability, {
    method: 'post',
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
