import fetch from 'isomorphic-unfetch';

import config from '../../config';

export const getClients = async () => fetch(config.baseUrl + config.apis.getClients, {
  method: 'post',
  mode: 'same-origin',
  credentials: 'include',
})
  .then((response) => response.json());

export const addClient = async (name, company) => fetch(config.baseUrl + config.apis.addClient, {
  method: 'post',
  mode: 'same-origin',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name,
    company,
  }),
})
  .then((response) => response.json());
