import React from "react";
import { Provider } from "react-redux";
import Head from "next/head";
import withReduxStore from "../redux/with-redux-store";
import MainLayout from "../components/MainLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/App.css";
import "../styles/Calendar.css";

function MyApp({ Component, pageProps, reduxStore, user }) {
  return (
    <>
      <Head>
        <title>Nonprofit Portal</title>
      </Head>
      <Provider store={reduxStore}>
        <MainLayout user={user}>
          <Component {...pageProps} user={user} />
        </MainLayout>
      </Provider>
    </>
  );
}

export default withReduxStore(MyApp);
