import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import cookie from 'js-cookie';
import { verifyToken } from '../frontend/actions/users';
import withReduxStore from '../frontend/redux/with-redux-store';
import MainLayout from '../frontend/layouts/Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../frontend/static/style/App.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

class MyApp extends App {
  static async getInitialProps(appContext) {
    const appProps = await App.getInitialProps(appContext);

    // eslint-disable-next-line global-require
    const token = appContext.ctx.res ? require('next-cookies')(appContext.ctx).token : cookie.get('token');

    return verifyToken(token)
      .then((decoded) => ({
        ...appProps,
        user: {
          id: decoded.id,
          name: decoded.name,
          isAdmin: decoded.isAdmin,
        },
      }))
      .catch(() => appProps);
  }

  render() {
    const {
      Component, pageProps, reduxStore, user,
    } = this.props;

    return (
      <Provider store={reduxStore}>
        <MainLayout user={user}>
          <Component {...pageProps} user={user} />
        </MainLayout>
      </Provider>
    );
  }
}

export default withReduxStore(MyApp);
