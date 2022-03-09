import axios from "axios";
import urls from "../utils/urls";

export const getAvailabilities = async () => axios.get(urls.apis.availability);

export const getAvailability = async (id) =>
  axios.get(urls.apis.availability, {
    params: {
      id,
    },
  });

export const addAvailability = async (availability) =>
  axios.post(urls.apis.availability, {
    availability,
  });

export const deleteAvailability = async (id) =>
  axios.delete(urls.apis.availability, {
    params: {
      id,
    },
  });

export const updateAvailability = async (id, updatedFields) =>
  axios.patch(urls.apis.availability, {
    id,
    updatedFields,
  });
