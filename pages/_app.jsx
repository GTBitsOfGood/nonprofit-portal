import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import nextCookie from 'next-cookies';
import withReduxStore from '../frontend/redux/with-redux-store';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../frontend/static/style/App.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import AppNavbar from '../frontend/components/AppNavbar';

class MyApp extends App {
  static async getInitialProps(appContext) {
    const { token } = nextCookie(appContext.ctx);
    const appProps = await App.getInitialProps(appContext);

    const user = {};
    const jwt = require('jsonwebtoken');
    try {
      const decoded = jwt.verify(token, 'secret');
      user.loggedIn = true;
      user.id = decoded.id;
      user.name = decoded.name;
      user.isAdmin = decoded.isAdmin;
    } catch (e) {
      user.loggedIn = false;
    }

    return {
      ...appProps,
      user,
    };
  }

  render() {
    const {
      Component, pageProps, reduxStore, user,
    } = this.props;

    return (
      <Provider store={reduxStore}>
        <div className="App">
          <AppNavbar user={user} />
          <Component {...pageProps} user={user} />
        </div>
      </Provider>
    );
  }
}

export default withReduxStore(MyApp);
