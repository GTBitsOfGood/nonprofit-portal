import fetch from 'isomorphic-unfetch';
import cookie from 'js-cookie';
import Router from 'next/router';

import config from '../../config';


export const login = async (email, password) => fetch(
  config.baseUrl + config.apis.login, {
    method: 'post',
    mode: 'same-origin',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  },
)
  .then((response) => response.json())
  .then((json) => {
    if (json == null) {
      throw new Error('Unable to login at this time.');
    } else if (!json.success) {
      throw new Error(json.message);
    } else if (json.token == null) {
      throw new Error('Unable to login at this time.');
    }

    cookie.set('token', json.token, { expires: 7 });

    return json;
  });

export const signUp = async (name, email, password) => fetch(
  config.baseUrl + config.apis.signUp, {
    method: 'post',
    mode: 'same-origin',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  },
)
  .then((response) => response.json())
  .then((json) => {
    if (json == null) {
      throw new Error('Unable to sign up at this time.');
    } else if (!json.success) {
      throw new Error(json.message);
    } else if (json.token == null) {
      throw new Error('Unable to sign up at this time.');
    }

    cookie.set('token', json.token, { expires: 7 });

    return json;
  });

export const signOut = () => {
  cookie.remove('token');

  return Router.push({
    pathname: '/',
  });
};
