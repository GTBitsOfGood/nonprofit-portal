import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import jwt from 'jsonwebtoken';
import withReduxStore from '../frontend/redux/with-redux-store';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../frontend/static/style/App.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import AppNavbar from '../frontend/components/AppNavbar';

class MyApp extends App {
  static async getInitialProps(appContext) {
    const token = appContext.ctx.res ? nextCookie(appContext.ctx).token : cookie.get('token');
    const appProps = await App.getInitialProps(appContext);

    const user = {};
    try {
      const decoded = appContext.ctx.res
        ? jwt.verify(token, process.env.JWT_SECRET) : jwt.decode(token);
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
