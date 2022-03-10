import React from "react";
import Head from "next/head";
import { wrapper } from "../redux/store";
import MainLayout from "../components/MainLayout";
import "../utils/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/App.css";
import "../styles/Calendar.css";

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
