import urls from "../utils/urls";
import { apiGet, apiPost, apiPut, apiDelete } from "../utils/api";

export const getAvailabilities = async () => apiGet(urls.apis.availability);

export const getAvailability = async (id) =>
  apiGet(urls.apis.availability + `?id=${id}`);

export const addAvailability = async (availability) =>
  apiPost(urls.apis.availability, {
    availability,
  });

export const deleteAvailability = async (id) =>
  apiDelete(urls.apis.availability, {
    id,
  });

export const updateAvailability = async (id, updatedFields) =>
  apiPut(urls.apis.availability, {
    id,
    updatedFields,
  });
