import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
import cookie from 'js-cookie';

import config from '../../config';


export const login = async (email, password) => fetch(
  config.baseUrl + config.apis.login, {
    method: 'post',
    mode: 'same-origin',
    credentials: 'same-origin',
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

    return json;
  });

export const signUp = async (name, email, password) => fetch(
  config.baseUrl + config.apis.signUp, {
    method: 'post',
    mode: 'same-origin',
    credentials: 'same-origin',
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

    return json;
  });

export const verifyToken = async (token) => fetch(
  config.baseUrl + config.apis.verifyToken, {
    method: 'post',
    mode: 'same-origin',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token,
    }),
  },
)
  .then((response) => response.json())
  .then((json) => {
    if (json == null) {
      throw new Error('Unable to verify token at this time.');
    } else if (!json.success) {
      throw new Error(json.message);
    } else if (json.user == null) {
      throw new Error('Unable to verify token at this time.');
    }

    return json.user;
  });

export const signOut = () => {
  cookie.remove('token');

  return Router.push({
    pathname: '/',
  });
};
