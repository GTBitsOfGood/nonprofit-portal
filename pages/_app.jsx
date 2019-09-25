import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withReduxStore from '../frontend/redux/with-redux-store';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../frontend/static/style/App.css';

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props;

    return (
      <Provider store={reduxStore}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}

export default withReduxStore(MyApp);
