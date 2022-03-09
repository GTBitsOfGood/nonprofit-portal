import React from "react";
import Head from "next/head";
import axios from "axios";
import { wrapper } from "../redux/store";
import MainLayout from "../components/MainLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/App.css";
import "../styles/Calendar.css";

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

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Nonprofit Portal</title>
      </Head>

      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </>
  );
}

export default wrapper.withRedux(MyApp);
