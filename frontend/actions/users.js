import fetch from 'isomorphic-unfetch';

import config from '../../config';


export const login = async (username, password) => fetch(
  config.baseUrl + config.apis.login, {
    method: 'post',
    mode: 'same-origin',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  },
)
  .then((response) => response.json());

export const signUp = async (username, password) => fetch(
  config.baseUrl + config.apis.signUp, {
    method: 'post',
    mode: 'same-origin',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  },
)
  .then((response) => response.json());
