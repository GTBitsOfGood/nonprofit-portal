import fetch from 'isomorphic-unfetch';
import cookie from 'js-cookie';

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
  .then((response) => response.json())
  .then((json) => {
    if (json == null || json.id == null) {
      throw new Error('Unable to login at this time.');
    }

    cookie.set('token', json.id, { expires: 1 });

    return json;
  });

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
  .then((response) => response.json())
  .then((json) => {
    if (json == null || json.id == null) {
      throw new Error('Unable to sign up at this time.');
    }

    cookie.set('token', json.id, { expires: 1 });

    return json;
  });
