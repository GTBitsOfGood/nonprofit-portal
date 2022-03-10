import axios from "axios";
import urls from "./urls";

axios.defaults.baseURL = urls.baseUrl;
axios.defaults.timeout = 15000;

axios.interceptors.response.use(
  function (response) {
    if (response?.data && !response.data?.success) {
      throw new Error(response.data.message);
    }

    return response;
  },
  function (error) {
    if (error.response?.data && !error.response.data?.success) {
      throw new Error(error.response.data.message);
    }

    throw error;
  }
);
