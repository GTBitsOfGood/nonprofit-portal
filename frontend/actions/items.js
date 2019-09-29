import fetch from 'isomorphic-unfetch';

import config from '../../config';

export const getItems = async () => fetch(config.baseUrl + config.apis.getItems, {
  method: 'get',
  mode: 'same-origin',
  credentials: 'include',
})
  .then((response) => response.json());

export const addItem = async (item) => fetch(config.baseUrl + config.apis.addItem, {
  method: 'post',
  mode: 'same-origin',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    item,
  }),
})
  .then((response) => response.json());

export const deleteItem = async (id) => fetch(config.baseUrl + config.apis.deleteItem, {
  method: 'delete',
  mode: 'same-origin',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    id,
  }),
})
  .then((response) => response.json());

export const getItem = async (urlString) => fetch(`${config.baseUrl}${config.apis.getItem}?url=${urlString}`, {
  method: 'get',
  mode: 'same-origin',
  credentials: 'include',
})
  .then((response) => response.json());
